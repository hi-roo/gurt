'use client';

import { useEffect, useState } from 'react';
import { BannerGrid } from './banner-grid';
import { BannerShapes } from './banner-shapes';
import { BannerDla } from './banner-dla';

/**
 * Signatur-Streifen der Startseite: zeigt bei jedem Aufruf zufällig eine der
 * interaktiven/generativen Varianten (1, 2, 3, 7). Die Zufallswahl passiert
 * erst nach dem Mount (Client) → kein Hydration-Mismatch; bis dahin ein
 * gleich hoher, weißer Platzhalter (kein Layout-Shift).
 */
const VARIANTS: Array<() => React.ReactNode> = [
  () => <BannerGrid />, // V1 · Farb-Raster (Maus = Auflösung)
  () => <BannerShapes mode="triangle" />, // V2 · Dreiecke zur Maus
  () => <BannerShapes mode="line" />, // V3 · Linien zur Maus
  () => <BannerDla band />, // V7 · zusammenhängendes Korallen-Band
];

export function SignatureBanner() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * VARIANTS.length));
  }, []);

  if (index === null) {
    return (
      <div aria-hidden="true" className="w-full border-b border-line bg-white">
        <div className="h-20 w-full md:h-24" />
      </div>
    );
  }

  const render = VARIANTS[index] ?? VARIANTS[0];
  return <>{render?.()}</>;
}
