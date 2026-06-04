/**
 * Einbettbare Schriften für die OG-/Share-Bilder (next/og · Satori).
 *
 * Satori kennt kein Typekit/CSS-`@font-face` — Schriften müssen als Datei
 * eingebettet werden. Die Marken-Schrift FF Info (Adobe Fonts/Typekit) ist als
 * Web-Kit nicht einbettbar; als lizenzfreier, sehr naher Ersatz dienen
 * **Fira Sans** + **Fira Mono** (Erik Spiekermann, OFL — gleiche Design-DNA wie
 * FF Info/FF Meta). Fira Mono übernimmt den „Correspondence"-Charakter (Kicker/Meta).
 * Liegen echte FF-Info-Dateien (Desktop-Lizenz) vor, lassen sie sich hier 1:1 tauschen.
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export interface OgFont {
  name: string;
  data: Buffer;
  weight: 400 | 700;
  style: 'normal';
}

// Satori braucht die Font-Bytes. In der Node-Runtime scheitert fetch(file://…),
// daher direkt vom Dateisystem lesen (Pfad relativ zu diesem Modul).
async function loadFont(file: string): Promise<Buffer> {
  return readFile(fileURLToPath(new URL(`./fonts/${file}`, import.meta.url)));
}

let cached: Promise<OgFont[]> | null = null;

/** Lädt (einmalig, gecacht) die OG-Schriften für `ImageResponse({ fonts })`. */
export function ogFonts(): Promise<OgFont[]> {
  if (!cached) {
    cached = Promise.all([
      loadFont('FiraSans-Regular.ttf'),
      loadFont('FiraSans-Bold.ttf'),
      loadFont('FiraMono-Regular.ttf'),
    ]).then(([regular, bold, mono]): OgFont[] => [
      { name: 'Fira Sans', data: regular, weight: 400, style: 'normal' },
      { name: 'Fira Sans', data: bold, weight: 700, style: 'normal' },
      { name: 'Fira Mono', data: mono, weight: 400, style: 'normal' },
    ]);
  }
  return cached;
}
