/**
 * Kanonische Textlink-Stile — eine Quelle der Wahrheit.
 *
 * Default: Unterstrich immer sichtbar (Barrierefreiheit — Farbe ist nie der
 * alleinige Link-Indikator); beim Hover hebt sich der Unterstrich.
 * Navigationslinks (Header, Breadcrumbs, „mehr →") folgen bewusst NICHT diesem
 * Stil (kein Unterstrich, Farbwechsel beim Hover).
 */
export const linkClass = 'text-accent underline underline-offset-2 hover:no-underline';

/** Stille Variante für gedämpfte Zonen (Footer, Bildunterschriften, Quellen): erbt die Umgebungsfarbe. */
export const quietLinkClass = 'underline underline-offset-2 hover:no-underline';
