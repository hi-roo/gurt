'use client';

import * as Plot from '@observablehq/plot';
import { useMemo } from 'react';
import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { DataTable } from './data-table';
import { ObservablePlot } from './observable-plot';

export interface BeeswarmChartProps {
  data: Row[];
  /** Wert-Feld (numerisch) — bestimmt die Position auf der Achse. */
  value: string;
  /** Kategorie-Feld (Beschriftung je Punkt, z. B. Land). */
  label: string;
  /** Eine Kategorie hervorheben (z. B. „Deutschland“). */
  highlight?: string;
  /** Optionale Referenzlinie (z. B. ein Richtwert/Schwellenwert). */
  refValue?: number;
  refLabel?: string;
  ariaLabel: string;
  columns: Column[];
  xLabel?: string;
}

const DOT_R = 6;

/**
 * Beeswarm / Punktverteilung (Observable Plot, `dodgeY`) mit Tabellen-Fallback.
 * Ein Punkt je Einheit, ausgebreitet entlang einer Wert-Achse — zeigt die
 * Verteilung im Feld und (per `highlight`) wo eine Einheit darin steht. Eine
 * optionale Referenzlinie markiert einen Schwellenwert.
 */
export function BeeswarmChart({
  data,
  value,
  label,
  highlight,
  refValue,
  refLabel,
  ariaLabel,
  columns,
  xLabel,
}: BeeswarmChartProps) {
  const { ref, width } = useResize<HTMLDivElement>();
  const mounted = useMounted();

  const options = useMemo<Plot.PlotOptions>(() => {
    const plotData = data.map((row) => ({ ...row, [value]: Number(row[value]) }));
    const dodge = { x: value, r: DOT_R };
    const isHi = (d: Row) => highlight != null && d[label] === highlight;
    return {
      width,
      height: Math.max(220, Math.round(width * 0.42)),
      marginLeft: 16,
      marginRight: 16,
      marginTop: refLabel ? 30 : 12,
      x: { label: xLabel ?? null, grid: true, nice: true },
      y: { axis: null },
      marks: [
        ...(refValue != null
          ? [
              Plot.ruleX([refValue], { stroke: 'currentColor', strokeOpacity: 0.45, strokeDasharray: '4 3' }),
              Plot.text([refLabel ?? ''], {
                x: refValue,
                frameAnchor: 'top',
                dy: -14,
                text: (d: string) => d,
                fill: 'currentColor',
                fillOpacity: 0.7,
                fontSize: 12,
              }),
            ]
          : []),
        Plot.dot(
          plotData,
          Plot.dodgeY('middle', {
            ...dodge,
            fill: (d: Row) => (isHi(d) ? dataPalette[0] : dataPalette[5]),
            fillOpacity: (d: Row) => (isHi(d) ? 1 : 0.7),
            stroke: 'var(--surface, white)',
            strokeWidth: 0.75,
          }),
        ),
        ...(highlight != null
          ? [
              Plot.text(
                plotData,
                Plot.dodgeY('middle', {
                  ...dodge,
                  text: (d: Row) =>
                    isHi(d) ? `${d[label]} · ${Number(d[value]).toLocaleString('de-DE')}` : '',
                  dy: -(DOT_R + 4),
                  fontWeight: 600,
                  fontSize: 13,
                  fill: dataPalette[0],
                }),
              ),
            ]
          : []),
        // Interaktiver Tooltip (Hover/Pointer): Label + Wert des nächsten Punkts.
        // MUSS die LETZTE Mark sein → liegt über Punkten und Hervorhebungs-Labels
        // (sonst überlagert das Highlight-Label den Tooltip).
        Plot.tip(
          plotData,
          Plot.pointer(
            Plot.dodgeY('middle', {
              ...dodge,
              channels: { [label]: label },
              format: {
                y: false,
                x: (d: unknown) => (typeof d === 'number' ? d.toLocaleString('de-DE') : String(d)),
              },
            }),
          ),
        ),
      ],
    };
  }, [data, value, label, highlight, refValue, refLabel, xLabel, width]);

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
