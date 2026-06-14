import { describe, expect, it } from 'vitest';
import { toProportions } from './proportions';

describe('toProportions', () => {
  it('berechnet Anteile, die sich zur Gesamtsumme addieren', () => {
    const { entries, total } = toProportions([
      { label: 'A', value: 30 },
      { label: 'B', value: 70 },
    ]);
    expect(total).toBe(100);
    expect(entries.map((e) => e.share)).toEqual([0.7, 0.3]);
    expect(entries.map((e) => e.percent)).toEqual([70, 30]);
  });

  it('sortiert absteigend nach Wert', () => {
    const { entries } = toProportions([
      { label: 'klein', value: 10 },
      { label: 'groß', value: 90 },
      { label: 'mittel', value: 50 },
    ]);
    expect(entries.map((e) => e.label)).toEqual(['groß', 'mittel', 'klein']);
  });

  it('behandelt negative und nicht-endliche Werte als 0', () => {
    const { entries, total } = toProportions([
      { label: 'A', value: 50 },
      { label: 'B', value: -5 },
      { label: 'C', value: Number.NaN },
    ]);
    expect(total).toBe(50);
    const b = entries.find((e) => e.label === 'B');
    expect(b?.value).toBe(0);
    expect(b?.share).toBe(0);
  });

  it('vermeidet Division durch Null bei Gesamtsumme 0', () => {
    const { entries, total } = toProportions([
      { label: 'A', value: 0 },
      { label: 'B', value: 0 },
    ]);
    expect(total).toBe(0);
    expect(entries.every((e) => e.share === 0 && e.percent === 0)).toBe(true);
  });

  it('reicht Farbe und Notiz unverändert durch', () => {
    const { entries } = toProportions([{ label: 'A', value: 1, color: '#abc', note: 'x' }]);
    expect(entries[0]).toMatchObject({ color: '#abc', note: 'x' });
  });
});
