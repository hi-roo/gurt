import type { ProportionInput } from './proportions';
import { toProportions } from './proportions';

export interface ProportionListProps {
  items: ProportionInput[];
  /** Einheit für den Wert (z. B. „PJ“, „Mrd €“). */
  unit?: string;
  ariaLabel?: string;
  className?: string;
}

const fmt = (n: number): string => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });

/**
 * Vertikale Anteils-Balkenliste — der mobile Reflow für „Teil am Ganzen“-Charts
 * (Treemap/Waffle). Je Kategorie eine Zeile: Farbchip + Label + anteiliger Balken
 * (Breite ∝ Anteil) + Wert und Prozent. Reines HTML/CSS, SSR-sicher; ersetzt auf
 * schmalen Viewports das quergelegte Diagramm — kein horizontales Scrollen, alle
 * Werte lesbar. Farbe ist nie alleiniger Bedeutungsträger (Label + Wert immer dabei).
 *
 * Bewusst aus `div`s statt `ul/li` aufgebaut: als `role="img"`-Grafik soll es nicht
 * als Liste vorgelesen werden — und es entgeht der `Prose`-Listenformatierung (Punkte/
 * Einzug), in der es im Artikel steht.
 */
export function ProportionList({ items, unit, ariaLabel, className }: ProportionListProps) {
  const { entries } = toProportions(items);
  return (
    <div className={`text-sm ${className ?? ''}`} role="img" aria-label={ariaLabel}>
      {entries.map((e) => (
        <div key={e.label} className="mb-3 last:mb-0">
          <div className="flex items-baseline justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-3 shrink-0"
                style={{ backgroundColor: e.color }}
              />
              <span className="truncate font-medium text-ink">{e.label}</span>
            </span>
            <span className="shrink-0 font-caption tabular-nums text-subtle">
              {fmt(e.value)}
              {unit ? ` ${unit}` : ''} · {e.percent} %
            </span>
          </div>
          <div className="mt-1 h-2 w-full bg-line/40">
            <div
              className="h-full"
              style={{ width: `${Math.max(e.share * 100, 1.5)}%`, backgroundColor: e.color }}
            />
          </div>
          {e.note ? <p className="mt-1 text-muted">{e.note}</p> : null}
        </div>
      ))}
    </div>
  );
}
