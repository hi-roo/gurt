/**
 * Erster Buchstabe groß — für Tooltip-/Achsen-Labels, die sonst den rohen,
 * kleingeschriebenen Feldnamen zeigen würden (z. B. „reihe“ → „Reihe“,
 * „anzahl“ → „Anzahl“). Deutsche Substantive gehören groß.
 */
export const capFirst = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
