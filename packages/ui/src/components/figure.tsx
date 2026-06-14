import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Caption } from './typography';

/** Abkürzungen, deren Punkt KEIN Satzende ist (sonst bräche der Fett-Lead zu früh ab). */
const LEAD_ABBR = new Set([
  'mrd', 'mio', 'tsd', 'mt', 'nr', 'ca', 'bzw', 'vgl', 'ggf', 'inkl', 'exkl', 'sog', 'usw',
  'etc', 'u', 'a', 'z', 'b', 'd', 'h', 'i', 's', 'o', 'ä',
]);

/**
 * Hebt den ersten Satz einer Caption fett hervor (schnelleres Erfassen des
 * Zusammenhangs). Greift nur bei String-Captions; sucht das erste echte Satzende
 * (Punkt + Leerzeichen) und überspringt dabei Abkürzungen (Mrd., Mio., z. B. …)
 * sowie Dezimal-/Ordnungs-Punkte (vor dem Punkt steht dann eine Ziffer).
 */
function withBoldLead(caption: ReactNode): ReactNode {
  if (typeof caption !== 'string') return caption;
  for (let i = caption.indexOf('. '); i !== -1; i = caption.indexOf('. ', i + 1)) {
    const before = caption.slice(0, i);
    const ordinal = before.match(/(\d{1,2})$/)?.[1]; // kurze Ordnungszahl, z. B. „16.“, „20.“
    if (ordinal) continue; // Ordnungspunkt (Jahre ≥ 3 Ziffern bleiben Satzende) → weiter
    const word = (before.match(/(\p{L}+)$/u)?.[1] ?? '').toLowerCase();
    if (word.length === 1 || LEAD_ABBR.has(word)) continue; // Initiale/Abkürzung → weiter
    return (
      <>
        <strong className="font-semibold text-ink">{caption.slice(0, i + 1)}</strong>
        {caption.slice(i + 1)}
      </>
    );
  }
  return <strong className="font-semibold text-ink">{caption}</strong>;
}

export interface FigureProps {
  /** Die Visualisierung / das Medium. */
  children: ReactNode;
  /** Bildunterschrift. */
  caption?: ReactNode;
  /** Quellenangabe (Pflicht für veröffentlichte Daten — siehe docs/08). */
  source?: ReactNode;
  /** Kicker / Label über der Figur. */
  label?: ReactNode;
  /**
   * Volle Breite ausbrechen lassen (gutter-geklemmt). Setzt voraus, dass der Containing-Block
   * im Viewport ZENTRIERT ist (aktuell: die zentrierte Prosespalte) — die Klemmung rechnet mit
   * `calc(50% - 50vw)`. In nicht zentrierten/asymmetrischen Containern wäre der Bleed schief.
   */
  bleed?: boolean;
  className?: string;
}

/**
 * Editorialer Rahmen für Visualisierungen: Label, Inhalt, Caption + Quelle.
 * Erzwingt strukturell die Quellen-/Kontextpflicht aus den Leitlinien.
 */
export function Figure({ children, caption, source, label, bleed, className }: FigureProps) {
  // Full-Bleed (breiter als die Textspalte) — aber GUTTER-GEKLEMMT: der negative Außenabstand
  // wächst höchstens bis zur Kappe (3rem/6rem), bleibt aber stets ≥ 0,5rem INNERHALB der
  // Clip-Kante. Diese Kante ist nicht der Viewport-Rand, sondern `--page-gutter` (Karten-/
  // Seitenrand, auf dem `<main>` `overflow-clip` trägt). Sonst ragte die Figur auf schmalen
  // Tablets (z. B. iPad 10,5", wo der Steg knapp wird) über die Karte hinaus und das Clip
  // schnitt Eyebrow/Caption ab (die — anders als die gepolsterte Chart-Fläche — bündig am
  // Figur-Rand sitzen). `calc(50% - 50vw)` ist der negative Steg bis zum Viewport; `+ --page-
  // gutter` holt auf die Karten-Kante zurück; `max(...)` nimmt den sichereren (kleineren) Wert.
  const bleedStyle = bleed
    ? {
        marginInline:
          'max(calc(var(--fig-bleed, 0rem) * -1), calc(50% - 50vw + var(--page-gutter, 1.25rem) + 0.5rem))',
      }
    : undefined;
  return (
    <figure
      className={cn('my-10', bleed && 'sm:[--fig-bleed:3rem] lg:[--fig-bleed:6rem]', className)}
      style={bleedStyle}
    >
      {label ? (
        <div className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-accent">
          {label}
        </div>
      ) : null}
      <div className="bg-figure-surface p-4 sm:p-6">{children}</div>
      {(caption || source) && (
        <Caption className="mt-3">
          {withBoldLead(caption)}
          {source ? (
            <span className="mt-1 block text-subtle">
              <span className="font-medium">Quelle:</span> {source}
            </span>
          ) : null}
        </Caption>
      )}
    </figure>
  );
}
