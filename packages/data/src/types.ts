/** Herkunfts-Metadaten — reisen mit jedem Datensatz (siehe docs/08-methodology.md). */
export interface Provenance {
  /** Herausgeber, z. B. „Deutscher Bundestag". */
  herausgeber: string;
  /** Original-URL der Quelle. */
  url: string;
  /** Abrufzeitpunkt (ISO 8601). */
  abgerufenAm: string;
  /** Lizenz der Quelle, z. B. „dl-de/by-2-0", „CC BY 4.0". */
  lizenz?: string;
  /** Optionaler Archiv-Snapshot. */
  archivUrl?: string;
  /** Was wurde transformiert? */
  hinweis?: string;
}

export interface Spalte {
  name: string;
  typ: 'string' | 'number' | 'date' | 'boolean';
  einheit?: string;
  beschreibung?: string;
}

/** Normalisierter Datensatz, bereit zur Kuratierung in Sanity. */
export interface Datensatz<T extends Record<string, unknown> = Record<string, unknown>> {
  titel: string;
  provenance: Provenance;
  spalten: Spalte[];
  daten: T[];
}
