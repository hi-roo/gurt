// Weiche Trennstellen (U+00AD, Soft Hyphen) an den Komposita-Fugen langer deutscher Substantive.
// NUR fürs Rendering von Headlines gedacht — die Roh-Daten (Suche-Index, RSS, OG-Bild, <title>)
// bleiben unberührt. Der Browser bricht an einer weichen Trennstelle nur, WENN das Wort sonst
// überliefe (schmale Viewports), und dann an der gewählten Fuge statt mitten im Wort.
//
// Default ist `hyphens: manual` → genau diese U+00AD sind die einzigen Trennstellen (keine
// automatische Silbentrennung). Neue lange Komposita einfach unten ergänzen.

// ASCII-sicher im Quelltext (kein unsichtbares Zeichen): U+00AD = 0xAD.
const SHY = String.fromCharCode(0xad);

/** Wort → Wort mit weicher Trennstelle an der Fuge. Schlüssel in der Schreibweise wie im Titel. */
const COMPOUNDS: Record<string, string> = {
  Arbeitsmarktintegration: `Arbeitsmarkt${SHY}integration`,
  Technologieoffenheit: `Technologie${SHY}offenheit`,
  Umweltschädliche: `Umwelt${SHY}schädliche`,
  Schuldenbremse: `Schulden${SHY}bremse`,
  Bundeshaushalt: `Bundes${SHY}haushalt`,
  Grundsicherung: `Grund${SHY}sicherung`,
  Treibhausgase: `Treibhaus${SHY}gase`,
  Zeitenwende: `Zeiten${SHY}wende`,
};

/**
 * Fügt weiche Trennstellen in bekannte lange Komposita ein. Idempotent (die Schlüssel sind
 * SHY-frei, also wird nichts doppelt getrennt). Reine Anzeige-Hilfe für Headlines.
 */
export function softHyphenate(text: string): string {
  let out = text;
  for (const [word, hyphenated] of Object.entries(COMPOUNDS)) {
    if (out.includes(word)) out = out.split(word).join(hyphenated);
  }
  return out;
}
