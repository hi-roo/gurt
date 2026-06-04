import { describe, expect, it } from 'vitest';
import { buildChord, pairsToMatrix } from './chord';

describe('pairsToMatrix', () => {
  it('baut eine symmetrische Matrix mit Labels in Auftritts-Reihenfolge', () => {
    const { labels, matrix } = pairsToMatrix(
      [
        { a: 'X', b: 'Y', v: 10 },
        { a: 'X', b: 'Z', v: 4 },
        { a: 'Y', b: 'Z', v: 6 },
      ],
      'a',
      'b',
      'v',
    );
    expect(labels).toEqual(['X', 'Y', 'Z']);
    expect(matrix[0]?.[1]).toBe(10);
    expect(matrix[1]?.[0]).toBe(10); // symmetrisch gespiegelt
    expect(matrix[0]?.[2]).toBe(4);
    expect(matrix[1]?.[2]).toBe(6);
    expect(matrix[0]?.[0]).toBe(0); // Diagonale bleibt 0
  });

  it('ignoriert Zeilen mit fehlenden Werten oder NaN', () => {
    const { labels, matrix } = pairsToMatrix(
      [
        { a: 'X', b: 'Y', v: 5 },
        { a: '', b: 'Z', v: 9 },
        { a: 'X', b: 'Z', v: Number.NaN },
      ],
      'a',
      'b',
      'v',
    );
    expect(labels).toEqual(['X', 'Y']);
    expect(matrix[0]?.[1]).toBe(5);
  });
});

describe('buildChord', () => {
  const labels = ['X', 'Y', 'Z'];
  const matrix = [
    [0, 10, 4],
    [10, 0, 6],
    [4, 6, 0],
  ];
  const pad = 0.05;
  const usable = 2 * Math.PI - 3 * pad;

  it('legt je Entität einen Bogen an, Größe ∝ Summe der Beziehungen', () => {
    const { groups } = buildChord(labels, matrix, pad);
    expect(groups).toHaveLength(3);
    expect(groups[0]?.total).toBe(14); // X: 10 + 4
    expect(groups[1]?.total).toBe(16); // Y: 10 + 6
    expect(groups[2]?.total).toBe(10); // Z: 4 + 6
    // Spannweite proportional zum Anteil am Gesamttotal (40)
    expect((groups[0]?.endAngle ?? 0) - (groups[0]?.startAngle ?? 0)).toBeCloseTo((14 / 40) * usable, 6);
  });

  it('Bögen folgen lückenlos mit padAngle aufeinander', () => {
    const { groups } = buildChord(labels, matrix, pad);
    expect(groups[0]?.startAngle).toBeCloseTo(0, 6);
    expect((groups[1]?.startAngle ?? 0) - (groups[0]?.endAngle ?? 0)).toBeCloseTo(pad, 6);
  });

  it('erzeugt ein Ribbon je Paar mit symmetrisch passenden Teilbögen', () => {
    const { ribbons } = buildChord(labels, matrix, pad);
    expect(ribbons).toHaveLength(3); // X-Y, X-Z, Y-Z
    const xy = ribbons.find((r) => r.i === 0 && r.j === 1);
    expect(xy?.value).toBe(10);
    const xSpan = (14 / 40) * usable;
    const ySpan = (16 / 40) * usable;
    // X→Y-Teilbogen: 10/14 der X-Spanne; Y→X-Teilbogen: 10/16 der Y-Spanne
    expect((xy?.source.a1 ?? 0) - (xy?.source.a0 ?? 0)).toBeCloseTo((10 / 14) * xSpan, 6);
    expect((xy?.target.a1 ?? 0) - (xy?.target.a0 ?? 0)).toBeCloseTo((10 / 16) * ySpan, 6);
  });

  it('kommt mit leerer Eingabe klar', () => {
    const empty = buildChord([], []);
    expect(empty.groups).toHaveLength(0);
    expect(empty.ribbons).toHaveLength(0);
  });
});
