/**
 * Design-Tokens als JS-Werte — für Visualisierungen (D3/Plot), die Farben
 * programmatisch brauchen. Muss synchron zu src/styles/theme.css bleiben.
 * Siehe docs/03-design-system.md.
 */

/** Kategoriale Daten-Palette (farbenblind-sicher, Okabe-Ito). */
export const dataPalette = [
  '#0072b2', // data-1 blau
  '#e69f00', // data-2 orange
  '#009e73', // data-3 grün
  '#cc79a7', // data-4 pink
  '#56b4e9', // data-5 hellblau
  '#d55e00', // data-6 zinnober
  '#caa800', // data-7 gold
  '#999999', // data-8 grau
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

/** Liefert eine kategoriale Farbe zyklisch nach Index. */
export function categorical(index: number): string {
  return dataPalette[index % dataPalette.length] ?? dataPalette[0];
}
