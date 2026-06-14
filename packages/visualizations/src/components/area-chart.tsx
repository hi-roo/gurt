'use client';

import * as Plot from '@observablehq/plot';
import { useMemo } from 'react';
import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { capFirst } from '../lib/labels';
import { DataTable } from './data-table';
import { ObservablePlot } from './observable-plot';

export interface AreaChartProps {
  data: Row[];
  /** X-Feld (i. d. R. Zeit). */
  x: string;
  /** Y-Feld (Wert). */
  y: string;
  /** Optionales Serien-Feld → gestapelte Bänder (farbcodiert). */
  series?: string;
  /**
   * Stapel-Versatz. `zero` (Default) stapelt auf der Nulllinie (Anteil + Summe
   * über Zeit). `wiggle`/`center` erzeugen einen Stream-Graph (zentrierte Bänder,
   * Betonung der Veränderung statt der absoluten Höhe).
   */
  offset?: 'zero' | 'wiggle' | 'center';
  ariaLabel: string;
  columns: Column[];
  xLabel?: string;
  yLabel?: string;
}

/**
 * Flächendiagramm (Observable Plot) mit Tabellen-Fallback. Für Zusammensetzung
 * über Zeit: mit `series` gestapelte Bänder, mit `offset: 'wiggle'` ein
 * Stream-Graph. Numerische X-Werte (Jahre) → lineare Skala wie beim Liniendiagramm.
 */
export function AreaChart({
  data,
  x,
  y,
  series,
  offset = 'zero',
  ariaLabel,
  columns,
  xLabel,
  yLabel,
}: AreaChartProps) {
  const { ref, width } = useResize<HTMLDivElement>();
  const mounted = useMounted();

  const options = useMemo<Plot.PlotOptions>(() => {
    const numericX =
      data.length > 0 && data.every((row) => row[x] != null && !Number.isNaN(Number(row[x])));
    const plotData = numericX ? data.map((row) => ({ ...row, [x]: Number(row[x]) })) : data;
    const stackOffset = offset === 'zero' ? undefined : offset;
    const area = series
      ? Plot.areaY(plotData, {
          x,
          y,
          fill: series,
          offset: stackOffset,
          curve: 'monotone-x',
          stroke: 'var(--surface, white)',
          strokeWidth: 0.5,
        })
      : Plot.areaY(plotData, { x, y, fill: dataPalette[0], curve: 'monotone-x', fillOpacity: 0.9 });
    return {
      width,
      height: Math.max(260, Math.round(width * 0.5)),
      marginLeft: 56,
      marginRight: 24,
      x: {
        label: xLabel ?? null,
        grid: false,
        ...(numericX
          ? { tickFormat: (d: number) => d.toLocaleString('de-DE', { useGrouping: false }) }
          : { type: 'point', tickFormat: (d: unknown) => String(d) }),
      },
      y: { label: yLabel ?? null, grid: true, nice: true, tickFormat: (d: number) => d.toLocaleString('de-DE') },
      color: series ? { legend: true, range: [...dataPalette] } : undefined,
      marks: [
        ...(offset === 'zero' ? [Plot.ruleY([0])] : []),
        area,
        // Interaktiver Tooltip (Hover/Pointer): Wert (+ Serie) am nächsten x.
        Plot.tip(
          plotData,
          Plot.pointerX({
            x,
            y,
            // Serie farbcodiert, Roh-Zeile unterdrückt, Wert über benannten Kanal mit
            // großgeschriebenem Feldnamen (z. B. „reihe“ → „Reihe“) — Substantive groß.
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
  }, [data, x, y, series, offset, xLabel, yLabel, width]);

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
