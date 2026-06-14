/** Eine Datenzeile — bewusst eng typisiert für Tabellen/Charts. */
export type Cell = string | number | null | undefined;
export type Row = Record<string, Cell>;

/** Spaltendefinition für Tabellen & Achsenbeschriftung. */
export interface Column {
  key: string;
  label: string;
  unit?: string;
  align?: 'left' | 'right';
}

/**
 * Normalisierte Pin-Nutzlast (Tap-to-Pin): die EINE Sprache, in der jede Chart-Familie
 * den aktiven Datenpunkt an die gemeinsame aria-live-Senke (`ChartReadout`) meldet —
 * „Label, Wert Einheit, Serie“ statt „Punkt 4“. Farbe ist nie alleiniger Träger.
 */
export interface ReadoutEntry {
  /** Kategorie-/Achsenwert, z. B. „2024“ oder „Deutschland“. */
  label: string;
  /** Formatierter Wert, z. B. „3,2“. */
  value: string;
  /** Einheit, z. B. „Mrd €“ oder „% BIP“. */
  unit?: string;
  /** Optionale Serie/Gruppe, z. B. „Erneuerbare“. */
  series?: string;
  /** Optionale Reihenfarbe (nie alleiniger Bedeutungsträger). */
  color?: string;
}
