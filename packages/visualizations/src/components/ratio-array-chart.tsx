import { dataPalette } from '@gurt/ui/tokens';
import type { Column, Row } from '../lib/types';
import { DataTable } from './data-table';
import { toRatioPanels } from './ratio-array';

export interface RatioArrayProps {
  data: Row[];
  /** Feld für die Zeilen-Beschriftung (z. B. „jahr“). */
  label: string;
  /** Feld mit dem Wert „N je Basis“. */
  value: string;
  ariaLabel: string;
  /** Basisgröße (Default 100). */
  base?: number;
  baseLabel?: string;
  valueLabel?: string;
  unit?: string;
  columns?: Column[];
  /**
   * Zweifarbig: Basis und Hervorhebung sind zwei gleichwertige Kategorien (z. B. Arbeit
   * vs. Kapital) — die Basis erhält dann eine eigene Palettenfarbe statt des neutralen
   * Grau, damit die Mehrheit nicht „untergeht“. Default false (Basis = neutraler Hintergrund).
   */
  zweifarbig?: boolean;
}

/** Personen-Silhouette (gefüllt). */
const PERSON =
  'M12 12.4c2.1 0 3.8-1.8 3.8-4S14.1 4.4 12 4.4 8.2 6.2 8.2 8.4s1.7 4 3.8 4Zm0 1.7c-3.2 0-7.6 1.6-7.6 4.8v1.7h15.2v-1.7c0-3.2-4.4-4.8-7.6-4.8Z';

/** Erwerbsfähige = neutraler Hintergrund; Hervorhebung = vibrantes Marken-Pink. */
const BASE_COLOR = '#d4d0cb';
const HILITE = dataPalette[0];

const fmt = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

function Person({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <path d={PERSON} fill={color} />
    </svg>
  );
}

/**
 * Verhältnis-/Icon-Array: macht ein Verhältnis „N je Basis“ tangibel — eine feste
 * Reihe von Basis-Personen plus die hervorgehobene Zahl, je Zeile/Jahr. Bei 20 Spalten
 * bilden 100 Basis-Icons exakt fünf Zeilen; die wachsende Hervorhebung darunter zeigt
 * Sprung und Plateau auf einen Blick. Reines SVG/CSS → SSR-fähig. Tabellen-Fallback.
 */
export function RatioArray({
  data,
  label,
  value,
  ariaLabel,
  base = 100,
  baseLabel = 'Basis',
  valueLabel = 'Anteil',
  unit,
  columns,
  zweifarbig = false,
}: RatioArrayProps) {
  const panels = toRatioPanels(data, label, value);
  // Zweifarbig: Basis bekommt eine eigene, kräftige Palettenfarbe (Teal) statt Grau.
  const baseColor = zweifarbig ? dataPalette[7] : BASE_COLOR;

  const tableColumns: Column[] = columns?.length
    ? columns
    : [
        { key: label, label },
        { key: value, label: value, unit },
      ];
  const tableRows: Row[] = panels.map((p) => ({ [label]: p.label, [value]: p.value }));

  return (
    <div role="img" aria-label={ariaLabel} className="mx-auto max-w-3xl">
      <div className="space-y-7">
        {panels.map((panel) => (
          <div key={panel.label}>
            <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-xl font-bold text-ink">{panel.label}</span>
              <span className="text-muted">
                {valueLabel ? `${valueLabel}: ` : ''}
                <span className="font-semibold text-ink">{fmt(panel.value)}</span> von {base}
              </span>
            </div>
            {/* Feste Basis (z. B. 100 Icons je Jahr), nur der Anteil ist eingefärbt
                → die Jahre sind direkt vergleichbar. */}
            <div className="grid w-full grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
              {Array.from({ length: base }).map((_, i) => {
                const highlighted = i >= base - Math.min(base, Math.max(0, panel.cells));
                return (
                  <span key={i} className="aspect-square">
                    <Person color={highlighted ? HILITE : baseColor} />
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-3 w-3" style={{ backgroundColor: baseColor }} />
          <span className="text-ink">{baseLabel}</span>
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-3 w-3" style={{ backgroundColor: HILITE }} />
          <span className="text-ink">{valueLabel}</span>
        </li>
      </ul>

      <details className="mt-4 text-sm text-muted">
        <summary className="cursor-pointer">Daten als Tabelle anzeigen</summary>
        <div className="mt-2 overflow-x-auto">
          <DataTable columns={tableColumns} rows={tableRows} />
        </div>
      </details>
    </div>
  );
}
