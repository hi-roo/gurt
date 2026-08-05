/**
 * Design-Tokens als JS-Werte — für Visualisierungen (D3/Plot), die Farben
 * programmatisch brauchen. Muss synchron zu src/styles/theme.css bleiben.
 * Siehe docs/03-design-system.md.
 */

/** Kategoriale Daten-Palette — „GURT Vibrant“ (Marken-Spektrum, hue-divers
 *  für Unterscheidbarkeit). Reihenfolge bewusst alternierend warm/kühl, damit
 *  benachbarte Serien gut trennbar sind. Farbe ist NIE alleiniger Bedeutungs-
 *  träger — Charts liefern stets Labels + Tabellen-Fallback (siehe docs/06). */
export const dataPalette = [
  '#ff0054', // data-1 pink-rot
  '#390099', // data-2 violett
  '#ffbd00', // data-3 amber
  '#1f9e5a', // data-4 grün
  '#ff5400', // data-5 orange
  '#3d6fe0', // data-6 blau
  '#9e0059', // data-7 magenta
  '#00a6a6', // data-8 teal
] as const;

/** „GURT Vibrant“ — Marken-Verlauf (Amber → Orange → Pink → Magenta → Violett).
 *  Für Hero-Flächen, Signatur-Poster und Share-Bilder. Nicht für Datenreihen. */
export const brandGradient = [
  '#ffbd00',
  '#ff5400',
  '#ff0054',
  '#9e0059',
  '#390099',
] as const;

/** Sequenzielle Skala (eine Hue, Teal) — für Mengen/Intensität. */
export const sequentialTeal = [
  '#e6f3f1',
  '#b3ddd7',
  '#80c7bd',
  '#4db0a3',
  '#1a9a89',
  '#14746f',
] as const;

/** Divergierende Skala (Braun ↔ Teal) — bewusst KEIN Rot/Grün, um keine
 *  parteipolitische/wertende Konnotation zu transportieren. */
export const diverging = [
  '#8c510a',
  '#d8b365',
  '#f6e8c3',
  '#f5f5f5',
  '#c7eae5',
  '#5ab4ac',
  '#01665e',
] as const;

/** Semantische Farben (CSS-Variablennamen) — für Achsen, Text, Linien in Charts. */
export const chartInk = 'var(--color-ink)';
export const chartMuted = 'var(--color-muted)';
export const chartLine = 'var(--color-line)';
export const chartAccent = 'var(--color-accent)';
/** Mode-aware Höchstkontrast-Linie: reines Schwarz (Light) / reines Weiß (Dark). Zusätzlich
 *  verwendbare Linienfarbe für maximale Lesbarkeit (Einzellinie / Hauptserie). Plot löst die
 *  var() in `stroke`/`range` auf, daher direkt als Farbwert nutzbar. */
export const chartContrast = 'var(--chart-contrast)';

/** Mode-aware Variante von data-2: dasselbe Markenviolett im Light-Mode (#390099), im
 *  Dark-Mode ein aufgehellter Ton derselben Familie (#8b6cff). Grund: #390099 erreicht auf
 *  der dunklen Figure-Fläche nur rund 1,5:1 und verfehlt damit die von WCAG 2.1 SC 1.4.11
 *  geforderten 3:1 für Grafikelemente; der aufgehellte Ton kommt auf rund 5,3:1. */
export const chartData2 = 'var(--chart-data-2)';

/** Serienpalette für **im DOM gerenderte** Charts (Plot/SVG): wie `dataPalette`, aber mit
 *  der mode-aware Variante von data-2. Plot löst `var()` in `stroke`/`range` auf.
 *
 *  **Nicht** in Canvas- oder OG-Kontexten verwenden — `next/og` (Satori) und `<canvas>`
 *  lösen CSS-Variablen nicht auf. Dort weiter `dataPalette` mit literalen Hex-Werten
 *  nutzen (OG-Bilder, FlowHero, Signatur-Poster). */
export const chartSeriesPalette: string[] = dataPalette.map((c, i) => (i === 1 ? chartData2 : c));

/** Liefert eine kategoriale Farbe zyklisch nach Index. */
export function categorical(index: number): string {
  return dataPalette[index % dataPalette.length] ?? dataPalette[0];
}
