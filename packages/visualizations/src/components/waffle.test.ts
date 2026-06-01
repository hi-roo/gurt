import { describe, expect, it } from 'vitest';
import { allocateWaffle } from './waffle';

describe('allocateWaffle', () => {
  it('verteilt Zellen proportional und summiert exakt auf cellCount', () => {
    const slices = allocateWaffle(
      [
        { k: 'A', v: 50 },
        { k: 'B', v: 30 },
        { k: 'C', v: 20 },
      ],
      'k',
      'v',
      100,
    );
    expect(slices.map((s) => s.cells)).toEqual([50, 30, 20]);
    expect(slices.reduce((acc, s) => acc + s.cells, 0)).toBe(100);
  });

  it('rundet per Largest-Remainder auf genau cellCount', () => {
    const slices = allocateWaffle(
      [
        { k: 'A', v: 1 },
        { k: 'B', v: 1 },
        { k: 'C', v: 1 },
      ],
      'k',
      'v',
      100,
    );
    expect(slices.reduce((acc, s) => acc + s.cells, 0)).toBe(100);
    expect(slices.map((s) => s.cells).sort((a, b) => b - a)).toEqual([34, 33, 33]);
  });

  it('liefert [] bei Gesamtsumme 0', () => {
    expect(allocateWaffle([{ k: 'A', v: 0 }], 'k', 'v')).toEqual([]);
  });
});
