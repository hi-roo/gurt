import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { DataTable } from './data-table';
import { toShareBars } from './share-bars';

const fmt = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

/** Lesbare Textfarbe auf einer Füllfarbe: Weiß auf dunkler Fläche, sonst Ink (Relativ-Luminanz). */
function readableOn(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length < 6) return 'var(--color-ink)';
  const channel = (i: number): number => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
  return L < 0.42 ? '#ffffff' : 'var(--color-ink)';
}

export interface ShareBarsProps {
  data: Row[];
  /** Feld mit dem Balken-Namen (z. B. „Haushalte“ / „Vermögen“). */
  barField: string;
  /** Feld mit der Gruppe/Segment (z. B. „reichstes Zehntel“). */
  groupField: string;
  /** Feld mit dem Wert je Balken+Gruppe. */
  valueField: string;
  ariaLabel: string;
  unit?: string;
  columns?: Column[];
}

/**
 * Anteilsvergleich: mehrere 100-%-Balken nebeneinander, je in dieselben Gruppen
 * geteilt (gleiche Farbe je Gruppe). Macht Konzentration unmittelbar sichtbar —
 * etwa „10 % der Haushalte ↔ 54 % des Vermögens“. Reines SVG/CSS → SSR-fähig;
 * Farbe ist nie alleiniger Träger (Prozentwerte + Legende + Tabellen-Fallback).
 */
export function ShareBars({
  data,
  barField,
  groupField,
  valueField,
  ariaLabel,
  unit = '%',
  columns,
}: ShareBarsProps) {
  const { bars, groups } = toShareBars(data, barField, groupField, valueField);
  const colorOf = (group: string): string =>
    dataPalette[groups.indexOf(group) % dataPalette.length] ?? dataPalette[0];

  const tableColumns: Column[] = columns?.length
    ? columns
    : [
        { key: barField, label: barField },
        { key: groupField, label: groupField },
        { key: valueField, label: valueField, unit },
      ];

  return (
    <div role="img" aria-label={ariaLabel} className="mx-auto max-w-3xl">
      <div className="space-y-5">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1 font-display text-lg font-bold text-ink">{bar.label}</div>
            <div className="flex h-11 w-full overflow-hidden">
              {bar.segments.map((seg) => {
                const color = colorOf(seg.group);
                return (
                  <div
                    key={seg.group}
                    className="flex items-center justify-center text-sm font-semibold tabular-nums"
                    style={{ width: `${seg.pct}%`, backgroundColor: color, color: readableOn(color) }}
                    title={`${bar.label} — ${seg.group}: ${fmt(seg.pct)} ${unit}`}
                  >
                    {seg.pct >= 7 ? `${fmt(seg.pct)} ${unit}` : ''}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {groups.map((group) => (
          <li key={group} className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-3 w-3" style={{ backgroundColor: colorOf(group) }} />
            <span className="text-ink">{group}</span>
          </li>
        ))}
      </ul>

      <details className="mt-4 text-sm text-muted">
        <summary className="cursor-pointer">Daten als Tabelle anzeigen</summary>
        <div className="mt-2 overflow-x-auto">
          <DataTable columns={tableColumns} rows={data} />
        </div>
      </details>
    </div>
  );
}
