import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Caption } from './typography';

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
          {caption}
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
