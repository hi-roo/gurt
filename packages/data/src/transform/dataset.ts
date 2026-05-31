import type { Datensatz, Provenance, Spalte } from '../types';

export interface ToDatensatzInput<T extends Record<string, unknown>> {
  titel: string;
  daten: T[];
  spalten: Spalte[];
  provenance: Provenance;
}

/**
 * Bündelt normalisierte Daten + Spalten + Provenienz zu einem Datensatz.
 * Reine Funktion → testbar; kein Zugriff auf Uhr/Netz (abgerufenAm kommt rein).
 */
export function toDatensatz<T extends Record<string, unknown>>(
  input: ToDatensatzInput<T>,
): Datensatz<T> {
  return {
    titel: input.titel,
    daten: input.daten,
    spalten: input.spalten,
    provenance: input.provenance,
  };
}

/** Leitet Spaltentypen grob aus der ersten Zeile ab (Hilfe beim Mapping). */
export function inferSpalten(row: Record<string, unknown>): Spalte[] {
  return Object.entries(row).map(([name, value]) => ({
    name,
    typ: typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'boolean' : 'string',
  }));
}
