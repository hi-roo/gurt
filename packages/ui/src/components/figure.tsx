import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Caption } from './typography';

/**
 * Hebt den ersten Satz einer Caption fett hervor (schnelleres Erfassen des
 * Zusammenhangs). Greift nur bei String-Captions; sucht das erste Satzende
 * (Punkt + Leerzeichen) und überspringt dabei Dezimal-/Ordnungs-Punkte.
 */
function withBoldLead(caption: ReactNode): ReactNode {
  if (typeof caption !== 'string') return caption;
  const match = caption.match(/^(.+?\.)(\s.*)$/);
  if (!match) return <strong className="font-semibold text-ink">{caption}</strong>;
  return (
    <>
      <strong className="font-semibold text-ink">{match[1]}</strong>
      {match[2]}
    </>
  );
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
  /** Volle Breite ausbrechen lassen. */
  bleed?: boolean;
  className?: string;
}

/**
 * Editorialer Rahmen für Visualisierungen: Label, Inhalt, Caption + Quelle.
 * Erzwingt strukturell die Quellen-/Kontextpflicht aus den Leitlinien.
 */
export function Figure({ children, caption, source, label, bleed, className }: FigureProps) {
  return (
    <figure className={cn('my-10', bleed && 'sm:-mx-12 lg:-mx-24', className)}>
      {label ? (
        <div className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-accent">
          {label}
        </div>
      ) : null}
      <div className="bg-surface p-4 sm:p-6">{children}</div>
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
