'use client';

import * as Plot from '@observablehq/plot';
import { useCallback, useMemo, useState } from 'react';
import { dataPalette } from '@gurt/ui/tokens';
import type { Cell, Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { DataTable } from './data-table';
import { ObservablePlot } from './observable-plot';
import { PlotXGuideOverlay, type XGuideColumn } from './plot-xguide-overlay';

type PlotScale = { apply: (v: unknown) => number };
type ColorScale = { apply: (v: unknown) => string };

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
 * Flächendiagramm (Observable Plot) mit Tabellen-Fallback. Für Zusammensetzung über
 * Zeit: mit `series` gestapelte Bänder, mit `offset: 'wiggle'` ein Stream-Graph.
 * Tap-to-Pin über die vertikale x-Führung (`PlotXGuideOverlay`): Antippen einer
 * Zeitstelle zeigt die Werte aller Bänder an diesem x — passend zum gestapelten Aufbau.
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
  const unit = columns.find((c) => c.key === y)?.unit;
  const yLabelText = columns.find((c) => c.key === y)?.label ?? y;
  const numericX = useMemo(
    () => data.length > 0 && data.every((row) => row[x] != null && !Number.isNaN(Number(row[x]))),
    [data, x],
  );

  const [cols, setCols] = useState<XGuideColumn[]>([]);

  // Nach jedem (Re-)Plot die Werte je x gruppieren (Auftrittsreihenfolge der Serien),
  // x-Pixel aus der Skala. Keine Stapel-Geometrie nötig — die x-Führung zeigt alle Bänder.
  const onPlot = useCallback(
    (plot: ReturnType<typeof Plot.plot>) => {
      const sx = plot.scale('x') as unknown as PlotScale | undefined;
      const sc = plot.scale('color') as unknown as ColorScale | undefined;
      if (!sx?.apply) {
        setCols([]);
        return;
      }
      const fmtX = (v: Cell) =>
        numericX ? Number(v).toLocaleString('de-DE', { useGrouping: false }) : String(v ?? '');
      const fmtY = (v: Cell) =>
        `${Number(v).toLocaleString('de-DE', { maximumFractionDigits: 1 })}${unit ? ` ${unit}` : ''}`;
      const byX = new Map<string, XGuideColumn>();
      for (const d of data) {
        const k = String(d[x]);
        let c = byX.get(k);
        if (!c) {
          c = { x: sx.apply(numericX ? Number(d[x]) : d[x]), label: fmtX(d[x]), entries: [] };
          byX.set(k, c);
        }
        const sv = series ? String(d[series]) : yLabelText;
        c.entries.push({
          series: sv,
          value: fmtY(d[y]),
          color: series && sc?.apply ? sc.apply(sv) : dataPalette[0],
        });
      }
      setCols([...byX.values()].sort((a, b) => a.x - b.x));
    },
    [data, x, y, series, unit, yLabelText, numericX],
  );

  const options = useMemo<Plot.PlotOptions>(() => {
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
      marks: [...(offset === 'zero' ? [Plot.ruleY([0])] : []), area],
    };
  }, [data, x, y, series, offset, xLabel, yLabel, numericX, width]);

  return (
    <div ref={ref} className="overflow-x-auto">
      {mounted ? (
        <>
          <div className="relative">
            <ObservablePlot options={options} ariaLabel={ariaLabel} onPlot={onPlot} />
            {cols.length ? (
              <PlotXGuideOverlay
                columns={cols}
                width={width}
                ariaLabel={`${ariaLabel} — Zeitstelle antippen oder mit Pfeiltasten wählen, Enter heftet an`}
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
