import type { ReactNode } from 'react';
import { dataPalette } from '@gurt/ui/tokens';

/**
 * DISCOVERY (Spur 01) — generatives, deterministisches Themen-/Beitragsbild.
 * Aus einem Seed (z. B. Slug oder Thema) entsteht ein stabiles, marken-konformes
 * Gradient-Mesh aus der „GURT Vibrant"-Palette. SSR-sicher (reines CSS), kein Canvas.
 * Farbe ist hier rein dekorativ — nie bedeutungstragend (A11y).
 */
function seededHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface BrandedTeaserProps {
  seed: string;
  className?: string;
  /** Tailwind-Aspect-Ratio, z. B. 'aspect-[4/3]'. */
  ratio?: string;
  children?: ReactNode;
}

export function BrandedTeaser({ seed, className, ratio = 'aspect-[16/10]', children }: BrandedTeaserProps) {
  const h = seededHash(seed);
  const pal = dataPalette;
  const color = (shift: number) => pal[(h >> shift) % pal.length] ?? pal[0];
  const val = (shift: number, min: number, span: number) => min + ((h >> shift) % span);

  const blobs = [
    { c: color(2), x: val(4, 8, 42), y: val(7, 6, 38), s: val(10, 48, 34) },
    { c: color(11), x: val(13, 44, 46), y: val(16, 38, 46), s: val(19, 42, 30) },
    { c: color(21), x: val(22, 18, 62), y: val(25, 28, 52), s: val(28, 38, 28) },
  ];
  const layers = blobs
    .map((b) => `radial-gradient(${b.s}% ${b.s}% at ${b.x}% ${b.y}%, ${b.c}, transparent 70%)`)
    .join(', ');

  return (
    <div className={`relative overflow-hidden ${ratio} ${className ?? ''}`} role="img" aria-label="" aria-hidden="true">
      <div
        className="absolute inset-[-25%]"
        style={{ background: layers, backgroundColor: blobs[0]?.c ?? pal[0], filter: 'blur(38px)' }}
      />
      {children ? <div className="relative">{children}</div> : null}
    </div>
  );
}
