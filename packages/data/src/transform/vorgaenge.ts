import type { DipVorgang } from '../schemas/dip';
import type { Datensatz, Provenance } from '../types';

/**
 * Aggregiert DIP-Vorgänge zu „Anzahl nach Jahr" — ein chartbarer Datensatz
 * (z. B. für ein Balken-/Liniendiagramm). Reine Funktion → testbar.
 */
export function vorgaengeNachJahr(vorgaenge: DipVorgang[], provenance: Provenance): Datensatz {
  const counts = new Map<string, number>();
  for (const vorgang of vorgaenge) {
    const jahr = vorgang.datum?.slice(0, 4);
    if (!jahr || jahr.length !== 4) continue;
    counts.set(jahr, (counts.get(jahr) ?? 0) + 1);
  }

  const daten = [...counts.entries()]
    .map(([jahr, anzahl]) => ({ jahr, anzahl }))
    .sort((a, b) => a.jahr.localeCompare(b.jahr));

  return {
    titel: 'Vorgänge nach Jahr',
    provenance,
    spalten: [
      { name: 'jahr', typ: 'string', beschreibung: 'Jahr des Vorgangs' },
      { name: 'anzahl', typ: 'number', einheit: 'Vorgänge' },
    ],
    daten,
  };
}

/** Aggregiert Vorgänge nach Vorgangstyp (z. B. Gesetzgebung, Antrag, …). */
export function vorgaengeNachTyp(vorgaenge: DipVorgang[], provenance: Provenance): Datensatz {
  const counts = new Map<string, number>();
  for (const vorgang of vorgaenge) {
    const typ = vorgang.vorgangstyp ?? 'Unbekannt';
    counts.set(typ, (counts.get(typ) ?? 0) + 1);
  }

  const daten = [...counts.entries()]
    .map(([typ, anzahl]) => ({ typ, anzahl }))
    .sort((a, b) => b.anzahl - a.anzahl);

  return {
    titel: 'Vorgänge nach Typ',
    provenance,
    spalten: [
      { name: 'typ', typ: 'string', beschreibung: 'Vorgangstyp' },
      { name: 'anzahl', typ: 'number', einheit: 'Vorgänge' },
    ],
    daten,
  };
}
