'use client';

import * as Plot from '@observablehq/plot';
import { useCallback, useMemo, useState } from 'react';
import { dataPalette, chartContrast } from '@gurt/ui/tokens';
import type { Cell, Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { POINTER_X, type Frame } from '../lib/pick-nearest';
import { DataTable } from './data-table';
import { ObservablePlot } from './observable-plot';
import { PlotPinOverlay, type PlotPinPoint } from './plot-pin-overlay';

/** Minimal-Sicht auf eine Observable-Plot-Skala. */
type PlotScale = { apply: (v: unknown) => number; range?: number[] };
type ColorScale = { apply: (v: unknown) => string };

export interface LineChartProps {
  data: Row[];
  /** X-Feld (i. d. R. Zeit). */
  x: string;
  /** Y-Feld (Wert). */
  y: string;
  /** Optionales Serien-Feld (mehrere Linien, farbcodiert). */
  series?: string;
  /**
   * Optionale Serien-Werte, die gestrichelt gezeichnet werden (z. B. Projektionen).
   * Greift nur zusammen mit `series`. Farbe bleibt identisch zur Legende.
   */
  dashedSeries?: string[];
  ariaLabel: string;
  columns: Column[];
  xLabel?: string;
  yLabel?: string;
}

/**
 * Liniendiagramm (Observable Plot) mit Tabellen-Fallback. Für Entwicklungen über
 * Zeit; mehrere Serien via `series`. Tap-to-Pin über das `PlotPinOverlay` (ersetzt
 * Plots Hover-Tip): Tap/Tastatur heftet x · Serie · Wert an.
 */
export function LineChart({
  data,
  x,
  y,
  series,
  dashedSeries,
  ariaLabel,
  columns,
  xLabel,
  yLabel,
}: LineChartProps) {
  const { ref, width } = useResize<HTMLDivElement>();
  const mounted = useMounted();
  const unit = columns.find((c) => c.key === y)?.unit;
  const numericX = useMemo(
    () => data.length > 0 && data.every((row) => row[x] != null && !Number.isNaN(Number(row[x]))),
    [data, x],
  );

  const [pin, setPin] = useState<{ points: PlotPinPoint[]; frame?: Frame }>({ points: [] });

  // Nach jedem (Re-)Plot je Stützstelle den Pixel-Punkt aus den Skalen (x=scale-x(Jahr),
  // y=scale-y(Wert)); nach x sortiert → Tastatur-Nav links→rechts. POINTER_X (x dominant,
  // y nur zum Trennen mehrerer Serien an derselben Stelle).
  const onPlot = useCallback(
    (plot: ReturnType<typeof Plot.plot>) => {
      const sx = plot.scale('x') as unknown as PlotScale | undefined;
      const sy = plot.scale('y') as unknown as PlotScale | undefined;
      const sc = plot.scale('color') as unknown as ColorScale | undefined;
      if (!sx?.apply || !sy?.apply) {
        setPin({ points: [] });
        return;
      }
      const fmtX = (v: Cell) =>
        numericX ? Number(v).toLocaleString('de-DE', { useGrouping: false }) : String(v ?? '');
      const fmtY = (v: Cell) => Number(v).toLocaleString('de-DE', { maximumFractionDigits: 1 });
      const points: PlotPinPoint[] = data
        .map((d) => {
          const sv = series ? String(d[series]) : undefined;
          return {
            x: sx.apply(numericX ? Number(d[x]) : d[x]),
            y: sy.apply(Number(d[y])),
            text: `${fmtX(d[x])}${sv ? ` · ${sv}` : ''}: ${fmtY(d[y])}${unit ? ` ${unit}` : ''}`,
            color: series && sc?.apply ? sc.apply(sv) : undefined,
          };
        })
        .sort((a, b) => a.x - b.x);
      const frame: Frame | undefined =
        Array.isArray(sx.range) && Array.isArray(sy.range)
          ? {
              x0: Math.min(...sx.range),
              x1: Math.max(...sx.range),
              y0: Math.min(...sy.range),
              y1: Math.max(...sy.range),
            }
          : undefined;
      setPin({ points, frame });
    },
    [data, x, y, series, unit, numericX],
  );

  const options = useMemo<Plot.PlotOptions>(() => {
    // Einzellinie: Höchstkontrast (Schwarz im Light-, Weiß im Dark-Mode) statt Paletten-Pink
    // → editorial-ruhige Hauptlinie, maximal lesbar. Mehrere Serien laufen über die Farbskala.
    const colorChannel = series ? { stroke: series } : { stroke: chartContrast };
    const plotData = numericX ? data.map((row) => ({ ...row, [x]: Number(row[x]) })) : data;
    // Linien-Marks: optional getrennt in solide + gestrichelte Reihen (z. B.
    // Projektion). Beide nutzen dieselbe Farbskala (stroke: series) → Legende
    // bleibt konsistent; die Strichelung kommt zusätzlich zur Farbe.
    const dashed = series ? (dashedSeries ?? []) : [];
    // Farb-Domain deterministisch: durchgezogene (solide) Reihen zuerst → sie
    // erhalten die kräftigsten Palettenfarben; gestrichelte (z. B. Korridor-
    // Ränder) danach. Sonst sortiert Plot alphabetisch und die Hauptlinie
    // bekäme eine zufällige (ggf. blasse) Farbe.
    const seriesDomain = (() => {
      if (!series) return null;
      const seen: string[] = [];
      for (const row of plotData) {
        const v = String(row[series]);
        if (!seen.includes(v)) seen.push(v);
      }
      const solid = seen.filter((s) => !dashed.includes(s));
      const dash = dashed.filter((s) => seen.includes(s));
      return [...solid, ...dash];
    })();
    const lineBase = { x, y, strokeWidth: 2, curve: 'monotone-x' as const };
    const lineMarks =
      dashed.length > 0 && series
        ? [
            Plot.lineY(
              plotData.filter((row) => !dashed.includes(String(row[series]))),
              { ...lineBase, stroke: series },
            ),
            Plot.lineY(
              plotData.filter((row) => dashed.includes(String(row[series]))),
              { ...lineBase, stroke: series, strokeDasharray: '5,4' },
            ),
          ]
        : [Plot.lineY(plotData, { ...lineBase, ...colorChannel })];
    const showDots = true;
    // Wert-Labels am Punkt verdichten sich auf schmalen Viewports schnell → mobil
    // (< 480 px) nur bei wenigen Stützstellen zeigen, sonst über Tabelle/Tooltip lesbar.
    const showPointLabels = plotData.length <= (width < 480 ? 7 : 14);
    // Y-Skala an die Daten anpassen (nicht zwingend bei 0 beginnen), damit die
    // Kurve die Fläche füllt und Verläufe sichtbar werden statt flach zu wirken —
    // mit Polster, damit Extrempunkte nicht auf den Achsen kleben.
    const yVals = plotData.map((row) => Number(row[y])).filter((v) => Number.isFinite(v));
    const yMin = yVals.length ? Math.min(...yVals) : 0;
    const yMax = yVals.length ? Math.max(...yVals) : 1;
    const yPad = (yMax - yMin || Math.abs(yMax) || 1) * 0.12;
    const yDomain: [number, number] = [yMin - yPad, yMax + yPad];
    return {
      width,
      height: Math.max(260, Math.round(width * 0.5)),
      // Auf schmalen Viewports kleinere Achsen-Ränder → mehr Zeichenfläche fürs Diagramm.
      marginLeft: width < 480 ? 44 : 56,
      marginRight: width < 480 ? 14 : 24,
      x: {
        label: xLabel ?? null,
        grid: false,
        ...(numericX
          ? { tickFormat: (d: number) => d.toLocaleString('de-DE', { useGrouping: false }) }
          : { type: 'point', tickFormat: (d: unknown) => String(d) }),
      },
      y: { label: yLabel ?? null, grid: true, domain: yDomain, tickFormat: (d: number) => d.toLocaleString('de-DE') },
      color: series
        ? { legend: true, ...(seriesDomain ? { domain: seriesDomain } : {}), range: [chartContrast, ...dataPalette] }
        : undefined,
      marks: [
        ...lineMarks,
        ...(showDots
          ? [Plot.dot(plotData, { x, y, ...(series ? { fill: series } : { fill: chartContrast }), r: 2.5 })]
          : []),
        // Wert-Label am Datenpunkt (gerundet) mit Paper-Halo → lesbar über Linie/Gitter.
        ...(showPointLabels
          ? [
              Plot.text(plotData, {
                x,
                y,
                text: (d: Row) => Number(d[y]).toLocaleString('de-DE', { maximumFractionDigits: 1 }),
                dy: -10,
                fontSize: 11,
                fontWeight: 600,
                ...(series ? { fill: series } : { fill: chartContrast }),
                stroke: 'var(--color-paper)',
                strokeWidth: 3,
                paintOrder: 'stroke',
              }),
            ]
          : []),
      ],
    };
  }, [data, x, y, series, dashedSeries, xLabel, yLabel, numericX, width]);

  return (
    <div ref={ref} className="overflow-x-auto">
      {mounted ? (
        <>
          <div className="relative">
            <ObservablePlot options={options} ariaLabel={ariaLabel} onPlot={onPlot} />
            {pin.points.length ? (
              <PlotPinOverlay
                points={pin.points}
                weight={POINTER_X}
                frame={pin.frame}
                ariaLabel={`${ariaLabel} — Punkt antippen oder mit Pfeiltasten wählen, Enter heftet an`}
              />
            ) : null}
          </div>
          <details className="mt-3 text-sm text-muted">
            <summary className="cursor-pointer">Daten als Tabelle anzeigen</summary>
            <div className="mt-2 overflow-x-auto">
              <DataTable columns={columns} rows={data} />
            </div>
          </details>
        </>
      ) : (
        <DataTable caption={ariaLabel} columns={columns} rows={data} />
      )}
    </div>
  );
}
