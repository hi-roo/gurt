import { describe, it, expect } from 'vitest';
import { parseFlatTimeSeries, parseGermanNumber } from './genesis-destatis';

// Auszug aus einer echten GENESIS-`data/table`-Antwort (Object.Content),
// Tabelle 12411-0001 „Bevölkerung: Deutschland, Stichtag".
const SAMPLE = `Tabelle: 12411-0001
Bevölkerung: Deutschland, Stichtag;
Fortschreibung des Bevölkerungsstandes;
Deutschland;
;Bevölkerungsstand
;Anzahl
31.12.1950;50958125
31.12.1960;55958321
31.12.2023;83456045
__________
`;

describe('parseGermanNumber', () => {
  it('parst deutsche Tausender/Dezimaltrennung', () => {
    expect(parseGermanNumber('1.234,5')).toBe(1234.5);
    expect(parseGermanNumber('50958125')).toBe(50958125);
  });
  it('liefert null für nicht-numerische / Platzhalter-Werte', () => {
    expect(parseGermanNumber('Anzahl')).toBeNull();
    expect(parseGermanNumber('...')).toBeNull();
    expect(parseGermanNumber('-')).toBeNull();
    expect(parseGermanNumber('')).toBeNull();
  });
});

describe('parseFlatTimeSeries', () => {
  it('extrahiert Label/Wert-Paare und überspringt Kopf-/Titelzeilen', () => {
    const rows = parseFlatTimeSeries(SAMPLE);
    expect(rows).toEqual([
      { label: '31.12.1950', wert: 50958125 },
      { label: '31.12.1960', wert: 55958321 },
      { label: '31.12.2023', wert: 83456045 },
    ]);
  });

  it('ignoriert Zeilen ohne numerische Wert-Spalte und ohne Label', () => {
    const rows = parseFlatTimeSeries(';Anzahl\nDeutschland;\n;Bevölkerungsstand');
    expect(rows).toHaveLength(0);
  });
});
