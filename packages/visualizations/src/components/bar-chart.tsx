'use client';

import * as Plot from '@observablehq/plot';
import { useCallback, useMemo, useState } from 'react';
import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { capFirst } from '../lib/labels';
import { POINTER_Y, type Frame } from '../lib/pick-nearest';
import { DataTable } from './data-table';
import { ObservablePlot } from './observable-plot';
import { PlotPinOverlay, type PlotPinPoint } from './plot-pin-overlay';

/** Minimal-Sicht auf eine Observable-Plot-Skala (apply/range/bandwidth). */
type PlotScale = { apply: (v: unknown) => number; range?: number[]; bandwidth?: number };

export interface BarChartProps {
  data: Row[];
  /** Kategorie-Feld (Y-Achse, horizontale Balken). */
  category: string;
  /** Wert-Feld (X-Länge). */
  value: string;
  ariaLabel: string;
  columns: Column[];
  color?: string;
  valueLabel?: string;
}

const fmt = (n: number): string => n.toLocaleString('de-DE');

/**
 * Horizontales Balkendiagramm (Observable Plot) mit Tabellen-Fallback.
 * Standardfall für Kategorie-Vergleiche. Tap-to-Pin über das `PlotPinOverlay`
 * (Plots Hover-Tip ersetzt): Tap/Tastatur heftet den Wert an.
 */
export function BarChart({
  data,
  category,
  value,
  ariaLabel,
  columns,
  color = dataPalette[0],
  valueLabel,
}: BarChartProps) {
  const { ref, width } = useResize<HTMLDivElement>();
  const mounted = useMounted();
  const unit = columns.find((c) => c.key === value)?.unit;

  const [pin, setPin] = useState<{ points: PlotPinPoint[]; frame?: Frame }>({ points: [] });

  // Nach jedem (Re-)Plot die Pixel-Punkte je Balken aus den Skalen ableiten — kein
  // DOM-Scraping. y = Bandmitte; sortiert nach y → Tastatur-Navigation folgt der
  // sichtbaren Reihenfolge (oben → unten). sort:{y:'x'} wird automatisch berücksichtigt,
  // weil scale-y(Kategorie) die gesortete Domäne nutzt.
  const onPlot = useCallback(
    (plot: ReturnType<typeof Plot.plot>) => {
      const sx = plot.scale('x') as unknown as PlotScale | undefined;
      const sy = plot.scale('y') as unknown as PlotScale | undefined;
      if (!sx?.apply || !sy?.apply) {
        setPin({ points: [] });
        return;
      }
      const band = (sy.bandwidth ?? 0) / 2;
      const points: PlotPinPoint[] = data
        .map((d) => ({
          x: sx.apply(Number(d[value])),
          y: sy.apply(d[category]) + band,
          text: `${d[category]} · ${fmt(Number(d[value]))}${unit ? ` ${unit}` : ''}`,
          color,
        }))
        .sort((a, b) => a.y - b.y);
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
    [data, category, value, unit, color],
  );

  const options = useMemo<Plot.PlotOptions>(() => {
    // Label-Spalte skaliert mit der Chart-Breite: nie mehr als ~42 % der Gesamtbreite,
    // sonst werden die Balken auf schmalen Viewports (Mobile) zu Stummeln zerquetscht.
    // lineWidth bricht die Labels passend zur Spaltenbreite um; marginRight schrumpft mit.
    const longest = data.reduce((m, d) => Math.max(m, String(d[category] ?? '').length), 0);
    const labelCap = Math.min(196, Math.max(96, Math.round((width || 0) * 0.42)));
    const marginLeft = Math.min(Math.max(96, Math.round(longest * 6.8)), labelCap);
    const marginRight = width && width < 420 ? 40 : 64;
    const lineWidth = Math.max(6, Math.round((marginLeft - 8) / 14));
    return {
      width,
      height: Math.max(200, data.length * 54 + 60),
      marginLeft,
      marginRight,
      x: {
        // Wert-Achse beschriften: Einheit der Wert-Spalte, sonst großgeschriebener
        // Feldname (z. B. „anzahl“ → „Anzahl“) — Einheit an der Achse und im Tooltip.
        label: valueLabel ?? unit ?? capFirst(value),
        grid: true,
        nice: true,
        tickFormat: (d: number) => d.toLocaleString('de-DE'),
      },
      // type: 'band' explizit — sonst warnt Observable Plot (gelbes ⚠ oben rechts), wenn die
      // Kategorie-Labels wie Zahlen aussehen (z. B. Jahre wie 2023), weil es eine lineare Achse
      // vermuten könnte. Horizontale Balken sind immer ordinal/band.
      y: { label: null, type: 'band' },
      marks: [
        // Lange Kategorie-Labels umbrechen statt abschneiden (Plot wickelt bei lineWidth).
        // Breit genug für ~2 Zeilen, damit die Labels den linken Rand füllen (wenig Leerraum).
        Plot.axisY({ lineWidth, tickSize: 0, tickPadding: 6 }),
        Plot.barX(data, {
          y: category,
          x: value,
          fill: color,
          sort: { y: 'x', reverse: true },
        }),
        Plot.ruleX([0]),
        Plot.text(data, {
          y: category,
          x: value,
          text: (d: Row) => (typeof d[value] === 'number' ? d[value].toLocaleString('de-DE') : ''),
          textAnchor: 'start',
          dx: 6,
          fill: 'currentColor',
        }),
      ],
    };
  }, [data, category, value, color, valueLabel, unit, width]);

  return (
    <div ref={ref}>
      {mounted ? (
        <>
          <div className="relative">
            <ObservablePlot options={options} ariaLabel={ariaLabel} onPlot={onPlot} />
            {pin.points.length ? (
              <PlotPinOverlay
                points={pin.points}
                weight={POINTER_Y}
                frame={pin.frame}
                ariaLabel={`${ariaLabel} — Balken antippen oder mit Pfeiltasten wählen, Enter heftet an`}
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
