import { describe, expect, it } from 'vitest';
import type { DipVorgang } from '../schemas/dip';
import type { Provenance } from '../types';
import { vorgaengeNachJahr, vorgaengeNachTyp } from './vorgaenge';

const provenance: Provenance = {
  herausgeber: 'Deutscher Bundestag',
  url: 'https://search.dip.bundestag.de/api/v1/vorgang',
  abgerufenAm: '2026-05-31T00:00:00.000Z',
  lizenz: 'amtliches Werk',
};

const vorgaenge: DipVorgang[] = [
  { id: '1', titel: 'A', vorgangstyp: 'Gesetzgebung', datum: '2023-03-01' },
  { id: '2', titel: 'B', vorgangstyp: 'Gesetzgebung', datum: '2023-09-12' },
  { id: '3', titel: 'C', vorgangstyp: 'Antrag', datum: '2024-01-20' },
  { id: '4', titel: 'D', vorgangstyp: 'Antrag', datum: '2024-06-30' },
  { id: '5', titel: 'E', vorgangstyp: 'Antrag', datum: '2024-11-02' },
  { id: '6', titel: 'F', vorgangstyp: 'Antrag' }, // ohne Datum → ignoriert bei Jahr
];

describe('vorgaengeNachJahr', () => {
  it('zählt Vorgänge pro Jahr und sortiert aufsteigend', () => {
    const datensatz = vorgaengeNachJahr(vorgaenge, provenance);
    expect(datensatz.daten).toEqual([
      { jahr: '2023', anzahl: 2 },
      { jahr: '2024', anzahl: 3 },
    ]);
    expect(datensatz.provenance.herausgeber).toBe('Deutscher Bundestag');
  });
});

describe('vorgaengeNachTyp', () => {
  it('zählt Vorgänge pro Typ und sortiert absteigend', () => {
    const datensatz = vorgaengeNachTyp(vorgaenge, provenance);
    expect(datensatz.daten).toEqual([
      { typ: 'Antrag', anzahl: 4 },
      { typ: 'Gesetzgebung', anzahl: 2 },
    ]);
  });
});
