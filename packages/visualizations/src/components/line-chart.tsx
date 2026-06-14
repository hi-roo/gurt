'use client';

import * as Plot from '@observablehq/plot';
import { useMemo } from 'react';
import { dataPalette, chartContrast } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { capFirst } from '../lib/labels';
import { DataTable } from './data-table';
import { ObservablePlot } from './observable-plot';

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
 * Liniendiagramm (Observable Plot) mit Tabellen-Fallback.
 * Für Entwicklungen über Zeit; mehrere Serien via `series`.
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

  const options = useMemo<Plot.PlotOptions>(() => {
    // Einzellinie: Höchstkontrast (Schwarz im Light-, Weiß im Dark-Mode) statt Paletten-Pink
    // → editorial-ruhige Hauptlinie, maximal lesbar. Mehrere Serien laufen über die Farbskala.
    const colorChannel = series ? { stroke: series } : { stroke: chartContrast };
    // Numerische X-Werte (z. B. Jahre) → lineare Skala mit automatisch
    // ausgedünnten Ticks. Sonst Punkt-Skala für ordinale Kategorien.
    const numericX =
      data.length > 0 && data.every((row) => row[x] != null && !Number.isNaN(Number(row[x])));
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
    // Bei dichten Reihen (viele Stützpunkte, z. B. jährliche Projektionen) die
    // Punkt-Marker ausblenden → ruhigere Linien (wie bei amtlichen Vorausberechnungen).
    // Datenpunkte sind Standard auf allen Liniendiagrammen — sie machen die echten Stützstellen
    // sichtbar (statt einer interpolierten Linie). Wert-LABELS bleiben dünnen Reihen vorbehalten
    // (sonst Gedränge), gerundet auf max. 1 Nachkommastelle.
    const showDots = true;
    const showPointLabels = plotData.length <= 14;
    // Y-Skala an die Daten anpassen (nicht zwingend bei 0 beginnen), damit die
    // Kurve die Fläche füllt und Verläufe sichtbar werden statt flach zu wirken —
    // mit Polster, damit Extrempunkte nicht auf den Achsen kleben. Die exakten
    // Werte stehen im Tabellen-Fallback; die Achse ist beschriftet.
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
        // Interaktiver Tooltip (Hover/Pointer): zeigt den nächsten Datenpunkt
        // (x, y, ggf. Serie). Reine Hover-Ergänzung — Tastatur/SR über die Tabelle.
        Plot.tip(
          plotData,
          Plot.pointerX({
            x,
            y,
            // Serie farbcodiert anzeigen, aber die Roh-Zeile unterdrücken und den Wert
            // über einen benannten Kanal mit großgeschriebenem Feldnamen führen
            // (z. B. „reihe“ → „Reihe“) — Substantive im Tooltip groß.
            ...(series ? { stroke: series, channels: { [capFirst(series)]: series } } : {}),
            format: {
              x: (d: unknown) => (typeof d === 'number' ? d.toLocaleString('de-DE', { useGrouping: false }) : String(d)),
              y: (d: unknown) => (typeof d === 'number' ? d.toLocaleString('de-DE') : String(d)),
              ...(series ? { stroke: false } : {}),
            },
          }),
        ),
      ],
    };
  }, [data, x, y, series, dashedSeries, xLabel, yLabel, width]);

  return (
    <div ref={ref} className="overflow-x-auto">
      {mounted ? (
        <>
          <ObservablePlot options={options} ariaLabel={ariaLabel} />
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
