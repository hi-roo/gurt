import { describe, expect, it } from 'vitest';
import { toRatioPanels } from './ratio-array';

describe('toRatioPanels', () => {
  it('rundet Werte zu Icon-Zahlen und behält die Reihenfolge', () => {
    const panels = toRatioPanels(
      [
        { jahr: '2020', q: 34.8 },
        { jahr: '2040', q: 43.4 },
        { jahr: '2060', q: 44.7 },
      ],
      'jahr',
      'q',
    );
    expect(panels).toEqual([
      { label: '2020', value: 34.8, cells: 35 },
      { label: '2040', value: 43.4, cells: 43 },
      { label: '2060', value: 44.7, cells: 45 },
    ]);
  });

  it('überspringt ungültige oder negative Werte und leere Labels', () => {
    const panels = toRatioPanels(
      [
        { jahr: '', q: 10 },
        { jahr: '2030', q: 'x' },
        { jahr: '2035', q: -5 },
        { jahr: '2050', q: 44 },
      ],
      'jahr',
      'q',
    );
    expect(panels).toEqual([{ label: '2050', value: 44, cells: 44 }]);
  });
});
