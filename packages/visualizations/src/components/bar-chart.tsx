'use client';

import * as Plot from '@observablehq/plot';
import { useMemo } from 'react';
import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { capFirst } from '../lib/labels';
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
        label: valueLabel ?? columns.find((c) => c.key === value)?.unit ?? capFirst(value),
        grid: true,
        nice: true,
        tickFormat: (d: number) => d.toLocaleString('de-DE'),
      },
      y: { label: null },
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
        // Interaktiver Tooltip (Hover/Pointer): Kategorie + Wert der Zeile. Die Kategorie
        // über einen benannten Kanal mit großgeschriebenem Feldnamen (z. B. „stichwort“ →
        // „Stichwort“), die Roh-Zeile unterdrückt; der Wert deutsch formatiert.
        Plot.tip(
          data,
          Plot.pointerY({
            y: category,
            x: value,
            channels: { [capFirst(category)]: category },
            format: {
              y: false,
              x: (d: unknown) => (typeof d === 'number' ? d.toLocaleString('de-DE') : String(d)),
            },
          }),
        ),
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
