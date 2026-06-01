import { describe, expect, it } from 'vitest';
import { aggregateGeneration, erneuerbarenAnteil, type PublicPowerResponse } from './energy-charts';

// 2 Zeitpunkte → 1 Intervall von 0,25 h. Werte so gewählt, dass TWh glatt aufgehen.
const fixture: PublicPowerResponse = {
  unix_seconds: [0, 900],
  production_types: [
    { name: 'Wind onshore', data: [2_000_000, 2_000_000] }, // 1,0 TWh
    { name: 'Wind offshore', data: [0, 0] },
    { name: 'Solar', data: [1_000_000, 1_000_000] }, // 0,5 TWh
    { name: 'Fossil gas', data: [1_000_000, 1_000_000] }, // 0,5 TWh
    { name: 'Hydro pumped storage', data: [4_000_000, 4_000_000] }, // ausgeschlossen (Speicher)
    { name: 'Load', data: [9_000_000, 9_000_000] }, // ausgeschlossen
  ],
};

describe('aggregateGeneration', () => {
  it('gruppiert Träger, rechnet TWh und schließt Speicher/Load aus', () => {
    const rows = aggregateGeneration(fixture);
    expect(Object.fromEntries(rows.map((r) => [r.traeger, r.twh]))).toEqual({
      Windkraft: 1,
      Solar: 0.5,
      Erdgas: 0.5,
    });
    expect(rows[0]?.traeger).toBe('Windkraft'); // absteigend sortiert
  });
});

describe('erneuerbarenAnteil', () => {
  it('berechnet den EE-Anteil an der Gesamterzeugung', () => {
    expect(erneuerbarenAnteil(aggregateGeneration(fixture))).toBe(75);
  });
});
