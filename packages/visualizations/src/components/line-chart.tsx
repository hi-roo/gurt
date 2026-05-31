'use client';

import * as Plot from '@observablehq/plot';
import { useMemo } from 'react';
import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
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
  ariaLabel,
  columns,
  xLabel,
  yLabel,
}: LineChartProps) {
  const { ref, width } = useResize<HTMLDivElement>();
  const mounted = useMounted();

  const options = useMemo<Plot.PlotOptions>(() => {
    const colorChannel = series ? { stroke: series } : { stroke: dataPalette[0] };
    return {
      width,
      height: Math.max(260, Math.round(width * 0.5)),
      marginLeft: 56,
      marginRight: 24,
      x: { label: xLabel ?? null, tickFormat: (d: unknown) => String(d), grid: false },
      y: { label: yLabel ?? null, grid: true, nice: true },
      color: series ? { legend: true, range: [...dataPalette] } : undefined,
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(data, { x, y, ...colorChannel, strokeWidth: 2, curve: 'monotone-x' }),
        Plot.dot(data, { x, y, ...(series ? { fill: series } : { fill: dataPalette[0] }), r: 2.5 }),
      ],
    };
  }, [data, x, y, series, xLabel, yLabel, width]);

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
