import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Kupfer-Bausteine (Designsprache „Glut im Dunkel"). Die Kupfer-Fläche
 * (`var(--color-primary)`) ist theme-invariant → ihr Inhalt nutzt feste dunkle
 * Farben (nicht die mode-aware Tokens). AA-geprüft: Dunkel auf Kupfer.
 */
export const ON_COPPER = '#1c0e03';
// 0.80 statt 0.74 → 5,27:1 auf Kupfer (AA mit Puffer; deckt die gesperrten Versal-Labels ab).
export const ON_COPPER_SOFT = 'rgba(28,14,3,0.80)';
const COPPER_BTN_BG = '#1c0e03';
const COPPER_BTN_TEXT = '#f5ecdd';

export const copperLabel: CSSProperties = {
  fontWeight: 700,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
};

export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z" />
    </svg>
  );
}

export function CopperButton({
  href,
  text,
  variant = 'solid',
}: {
  href: string;
  text: string;
  variant?: 'solid' | 'ghost';
}) {
  const style: CSSProperties =
    variant === 'solid'
      ? { background: COPPER_BTN_BG, color: COPPER_BTN_TEXT }
      : { background: 'transparent', color: ON_COPPER, boxShadow: `inset 0 0 0 1px ${ON_COPPER}` };
  return (
    <Link
      href={href}
      style={{ ...style, minWidth: 220, height: 48 }}
      // Fokus-Ring theme-invariant (alle CopperButton sitzen auf Kupfer): #1c0e03 = 7,33:1 auf #f2852c.
      // Der globale --accent-Ring wäre auf Kupfer unsichtbar (Dark 1,00:1) bzw. < 3:1 (Light).
      className="inline-flex items-center justify-between px-4 text-sm font-medium leading-none transition-opacity hover:opacity-90 focus-visible:[outline:2px_solid_#1c0e03] focus-visible:[outline-offset:2px]"
    >
      <span className="pr-10">{text}</span>
      <ArrowRight />
    </Link>
  );
}

/**
 * Kupfer-CTA-Bahn — die wiederkehrende Marken-Signatur (volle Breite). Trägt den
 * Methoden-Leitsatz und einen Weiterweg. Als full-bleed `<section>` außerhalb eines
 * `Container` einsetzen (`main` ist nicht breitenbegrenzt).
 */
export function CopperCTA({
  eyebrow = 'Haltung zur Methode',
  statement = (
    <>Mehrere Dinge können gleichzeitig richtig sein. Aber nicht alles.</>
  ),
  attribution,
  ctaText,
  ctaHref,
}: {
  eyebrow?: string;
  statement?: ReactNode;
  /** Zitatnachweis (z. B. „— J. W. v. Goethe") — klein unter der Aussage; die Eyebrow bleibt Konzept-Label. */
  attribution?: string;
  ctaText: string;
  ctaHref: string;
}) {
  return (
    <section style={{ background: 'var(--color-primary)', color: ON_COPPER }}>
      <div className="mx-auto w-full max-w-[82rem] px-6 py-20 sm:px-10">
        <p style={{ ...copperLabel, color: ON_COPPER_SOFT }} className="text-xs">
          {eyebrow}
        </p>
        <p
          style={{ fontWeight: 400 }}
          className="mt-6 max-w-[18ch] font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl"
        >
          {statement}
        </p>
        {attribution ? (
          <p style={{ color: ON_COPPER_SOFT }} className="mt-5 text-sm">
            {attribution}
          </p>
        ) : null}
        <div className="mt-10">
          <CopperButton href={ctaHref} text={ctaText} />
        </div>
      </div>
    </section>
  );
}
