'use client';

import * as Plot from '@observablehq/plot';
import { useCallback, useMemo, useState } from 'react';
import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { useMounted, useResize } from '../lib/hooks';
import { capFirst } from '../lib/labels';
import { POINTER_Y, type Frame } from '../lib/pick-nearest';
import { DataTable } from './data-table';
import { groupedBarLayout } from './grouped-bars';
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
  /** Explizite Balken-Reihenfolge (Y-Domäne). Wenn gesetzt, wird NICHT nach Wert sortiert —
   *  z. B. um nach Gruppen zu ordnen (alle „Deutschland“ oben, alle „EU-27“ unten). */
  order?: string[];
  /** Optionale Trennlinie nach dem n-ten Balken (nur sinnvoll mit `order`). */
  separatorAfter?: number;
}

const fmt = (n: number): string => n.toLocaleString('de-DE');

// Feste Pixelmaße für den Gruppen-Fall (order + separatorAfter): entkoppeln den Abstand am
// Gruppen-Übergang von der Balkendicke. Trennlinie sitzt mittig → GROUP_GROUP_GAP/2 Luft je Seite.
// Balkendicke und Innen-Abstand spiegeln die Standard-Band-Skala (Höhe data.length*54, Padding
// ≈0,1 → ~47px Balken, ~5px Abstand), damit gruppierte Balken zu den übrigen Charts konsistent sind.
const GROUP_BAND = 47; // Balkendicke px (wie Standard-Band)
const GROUP_BAR_GAP = 5; // Abstand innerhalb einer Gruppe px (wie Standard-Band)
const GROUP_GROUP_GAP = 24; // Abstand am Gruppen-Übergang px (→ 12px je Seite der Linie)
const GROUP_MARGIN_TOP = 8;
const GROUP_MARGIN_BOTTOM = 34;

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
  order,
  separatorAfter,
}: BarChartProps) {
  const { ref, width } = useResize<HTMLDivElement>();
  const mounted = useMounted();
  const unit = columns.find((c) => c.key === value)?.unit;

  // Gruppen-Fall: explizite Reihenfolge plus Trennlinie nach dem n-ten Balken. Dann wird statt der
  // Band-Skala ein festes Pixel-Layout genutzt (knapper, exakt steuerbarer Gruppen-Abstand).
  const useGroupGap = !!order && separatorAfter != null && separatorAfter > 0 && separatorAfter < order.length;
  const grouped = useMemo(
    () =>
      useGroupGap && order
        ? groupedBarLayout(order.length, GROUP_BAND, GROUP_BAR_GAP, GROUP_GROUP_GAP, separatorAfter)
        : null,
    [useGroupGap, order, separatorAfter],
  );

  const [pin, setPin] = useState<{ points: PlotPinPoint[]; frame?: Frame; separatorY?: number }>({ points: [] });

  // Nach jedem (Re-)Plot die Pixel-Punkte je Balken aus den Skalen ableiten — kein
  // DOM-Scraping. y = Balkenmitte; sortiert nach y → Tastatur-Navigation folgt der
  // sichtbaren Reihenfolge (oben → unten).
  const onPlot = useCallback(
    (plot: ReturnType<typeof Plot.plot>) => {
      const sx = plot.scale('x') as unknown as PlotScale | undefined;
      const sy = plot.scale('y') as unknown as PlotScale | undefined;
      if (!sx?.apply || !sy?.apply) {
        setPin({ points: [] });
        return;
      }
      const frame: Frame | undefined =
        Array.isArray(sx.range) && Array.isArray(sy.range)
          ? {
              x0: Math.min(...sx.range),
              x1: Math.max(...sx.range),
              y0: Math.min(...sy.range),
              y1: Math.max(...sy.range),
            }
          : undefined;

      // Gruppen-Fall: y aus dem Pixel-Layout (lineare y-Skala), Trennlinie mittig im Übergang.
      if (grouped && order) {
        const points: PlotPinPoint[] = data
          .map((d) => {
            const i = order.indexOf(String(d[category]));
            const cy = (grouped.tops[i] ?? 0) + grouped.band / 2;
            return {
              x: sx.apply(Number(d[value])),
              y: sy.apply(cy),
              text: `${d[category]} · ${fmt(Number(d[value]))}${unit ? ` ${unit}` : ''}`,
              color,
            };
          })
          .sort((a, b) => a.y - b.y);
        const separatorY = grouped.separatorY != null ? sy.apply(grouped.separatorY) : undefined;
        setPin({ points, frame, separatorY });
        return;
      }

      // Standard: Band-Skala, y = Bandmitte.
      const band = (sy.bandwidth ?? 0) / 2;
      const points: PlotPinPoint[] = data
        .map((d) => ({
          x: sx.apply(Number(d[value])),
          y: sy.apply(d[category]) + band,
          text: `${d[category]} · ${fmt(Number(d[value]))}${unit ? ` ${unit}` : ''}`,
          color,
        }))
        .sort((a, b) => a.y - b.y);
      setPin({ points, frame });
    },
    [data, category, value, unit, color, order, grouped],
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
    // Wert-Achse beschriften: Einheit der Wert-Spalte, sonst großgeschriebener Feldname
    // (z. B. „anzahl“ → „Anzahl“) — Einheit an der Achse und im Tooltip.
    const x: Plot.ScaleOptions = {
      label: valueLabel ?? unit ?? capFirst(value),
      grid: true,
      nice: true,
      tickFormat: (d: number) => d.toLocaleString('de-DE'),
    };

    // Gruppen-Fall: festes Pixel-Layout via lineare y-Skala (Identität) und Rechtecke. Die
    // Kategorie-Labels werden per Plot.text gesetzt (keine Band-Achse), damit der Gruppen-
    // Abstand frei von der Band-Geometrie bleibt.
    if (grouped && order) {
      const idx = (d: Row) => order.indexOf(String(d[category]));
      return {
        width,
        height: GROUP_MARGIN_TOP + grouped.innerHeight + GROUP_MARGIN_BOTTOM,
        marginLeft,
        marginRight,
        marginTop: GROUP_MARGIN_TOP,
        marginBottom: GROUP_MARGIN_BOTTOM,
        x,
        y: {
          axis: null,
          domain: [0, grouped.innerHeight],
          range: [GROUP_MARGIN_TOP, GROUP_MARGIN_TOP + grouped.innerHeight],
        },
        marks: [
          Plot.rectX(data, {
            x1: 0,
            x2: value,
            y1: (d: Row) => grouped.tops[idx(d)] ?? 0,
            y2: (d: Row) => (grouped.tops[idx(d)] ?? 0) + grouped.band,
            fill: color,
          }),
          Plot.ruleX([0]),
          // Kategorie-Labels links, an der Balkenmitte, mit Umbruch (lineWidth).
          Plot.text(order, {
            x: 0,
            y: (_c: string, i: number) => (grouped.tops[i] ?? 0) + grouped.band / 2,
            text: (c: string) => c,
            textAnchor: 'end',
            dx: -8,
            lineWidth,
            fill: 'currentColor',
          }),
          // Wert-Labels rechts neben dem Balken.
          Plot.text(data, {
            x: value,
            y: (d: Row) => (grouped.tops[idx(d)] ?? 0) + grouped.band / 2,
            text: (d: Row) => (typeof d[value] === 'number' ? d[value].toLocaleString('de-DE') : ''),
            textAnchor: 'start',
            dx: 6,
            fill: 'currentColor',
          }),
        ],
      };
    }

    return {
      width,
      height: Math.max(200, data.length * 54 + 60),
      marginLeft,
      marginRight,
      x,
      // type: 'band' explizit — sonst warnt Observable Plot (gelbes ⚠ oben rechts), wenn die
      // Kategorie-Labels wie Zahlen aussehen (z. B. Jahre wie 2023), weil es eine lineare Achse
      // vermuten könnte. Horizontale Balken sind immer ordinal/band.
      // Mit `order`: explizite Reihenfolge, sonst nach Wert sortiert.
      y: order ? { label: null, type: 'band', domain: order } : { label: null, type: 'band' },
      marks: [
        // Lange Kategorie-Labels umbrechen statt abschneiden (Plot wickelt bei lineWidth).
        Plot.axisY({ lineWidth, tickSize: 0, tickPadding: 6 }),
        Plot.barX(data, {
          y: category,
          x: value,
          fill: color,
          ...(order ? {} : { sort: { y: 'x', reverse: true } }),
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
  }, [data, category, value, color, valueLabel, unit, width, order, grouped]);

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
            {pin.separatorY != null && pin.frame ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{
                  top: pin.separatorY,
                  left: pin.frame.x0,
                  width: Math.max(0, pin.frame.x1 - pin.frame.x0),
                  borderTop: '1px dashed var(--color-ink)',
                  opacity: 0.35,
                }}
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
