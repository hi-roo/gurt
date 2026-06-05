import { describe, expect, it } from 'vitest';
import { toShareBars } from './share-bars';

describe('toShareBars', () => {
  const rows = [
    { bar: 'Haushalte', gruppe: 'reichstes Zehntel', anteil: 10 },
    { bar: 'Haushalte', gruppe: 'übrige 90 %', anteil: 90 },
    { bar: 'Vermögen', gruppe: 'reichstes Zehntel', anteil: 54 },
    { bar: 'Vermögen', gruppe: 'übrige 90 %', anteil: 46 },
  ];
  const { bars, groups } = toShareBars(rows, 'bar', 'gruppe', 'anteil');

  it('erhält Balken- und Gruppen-Reihenfolge (erstes Auftreten)', () => {
    expect(bars.map((b) => b.label)).toEqual(['Haushalte', 'Vermögen']);
    expect(groups).toEqual(['reichstes Zehntel', 'übrige 90 %']);
  });

  it('normiert je Balken auf 100 % und stapelt korrekt', () => {
    const haushalte = bars[0]!;
    expect(haushalte.total).toBe(100);
    expect(haushalte.segments.map((s) => s.pct)).toEqual([10, 90]);
    expect(haushalte.segments.map((s) => s.x0)).toEqual([0, 10]);

    const vermoegen = bars[1]!;
    expect(vermoegen.segments.map((s) => s.pct)).toEqual([54, 46]);
    expect(vermoegen.segments.map((s) => s.x0)).toEqual([0, 54]);
  });

  it('normiert auch, wenn die Werte nicht auf 100 summieren', () => {
    const { bars: b } = toShareBars(
      [
        { bar: 'A', gruppe: 'x', anteil: 1 },
        { bar: 'A', gruppe: 'y', anteil: 3 },
      ],
      'bar',
      'gruppe',
      'anteil',
    );
    expect(b[0]!.segments.map((s) => s.pct)).toEqual([25, 75]);
  });
});
