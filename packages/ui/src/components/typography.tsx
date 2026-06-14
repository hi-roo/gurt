import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

type Level = 1 | 2 | 3 | 4;

// Georgia-Headlines laufen regular (400) — die Serife trägt die Hierarchie über Größe,
// nicht über Gewicht. Level 4 ist Unit (Sans) und behält semibold.
const headingClass: Record<Level, string> = {
  1: 'font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-balance hyphens-auto [overflow-wrap:anywhere]',
  2: 'font-display text-2xl sm:text-3xl tracking-tight',
  3: 'font-display text-xl sm:text-2xl',
  4: 'font-sans text-lg font-semibold',
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  children?: ReactNode;
}

/** Editoriale Überschrift mit Serifen-Display-Schrift. */
export function Heading({ level = 2, className, children, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={cn(headingClass[level], className)} {...rest}>
      {children}
    </Tag>
  );
}

/** Vorspann / Lead-Absatz. */
export function Lead({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('font-display text-xl leading-relaxed text-muted text-pretty', className)}
      {...rest}
    >
      {children}
    </p>
  );
}

/** Standard-Fließtext. */
export function Text({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-base leading-relaxed', className)} {...rest}>
      {children}
    </p>
  );
}

/** Bildunterschrift / Quellenzeile — klein, gedämpft, FF Unit (Token --font-caption). */
export function Caption({ className, children, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <figcaption className={cn('font-caption text-sm leading-snug text-subtle', className)} {...rest}>
      {children}
    </figcaption>
  );
}

/** Kleines Label / Kicker — Versalien, getrackt. */
export function Label({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'font-mono text-xs font-medium uppercase tracking-widest text-accent',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
