'use client';

import * as Plot from '@observablehq/plot';
import { useMemo } from 'react';
import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { DataTable } from './data-table';
import { ObservablePlot } from './observable-plot';

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

/**
 * Horizontales Balkendiagramm (Observable Plot) mit Tabellen-Fallback.
 * Standardfall für Kategorie-Vergleiche.
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

  const options = useMemo<Plot.PlotOptions>(() => {
    // Moderater linker Rand; lange Labels werden umgebrochen (Plot.axisY lineWidth),
    // statt den Rand aufzublähen → kein großer Leerraum links.
    const longest = data.reduce((m, d) => Math.max(m, String(d[category] ?? '').length), 0);
    const marginLeft = Math.min(Math.max(96, Math.round(longest * 6.8)), 196);
    return {
      width,
      height: Math.max(200, data.length * 54 + 60),
      marginLeft,
      marginRight: 64,
      x: {
        label: valueLabel ?? null,
        grid: true,
        nice: true,
        tickFormat: (d: number) => d.toLocaleString('de-DE'),
      },
      y: { label: null },
      marks: [
        // Lange Kategorie-Labels umbrechen statt abschneiden (Plot wickelt bei lineWidth).
        // Breit genug für ~2 Zeilen, damit die Labels den linken Rand füllen (wenig Leerraum).
        Plot.axisY({ lineWidth: 13, tickSize: 0, tickPadding: 6 }),
        Plot.barX(data, {
          y: category,
          x: value,
          fill: color,
          sort: { y: 'x', reverse: true },
        }),
        Plot.ruleX([0]),
        // Interaktiver Tooltip (Hover/Pointer): Kategorie + Wert der Zeile.
        Plot.tip(data, Plot.pointerY({ y: category, x: value })),
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
  }, [data, category, value, color, valueLabel, width]);

  return (
    <div ref={ref}>
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
