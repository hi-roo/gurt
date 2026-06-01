import { describe, expect, it } from 'vitest';
import { layoutTreemap, toTreemapItems, type TreemapItem } from './treemap';

const items: TreemapItem[] = [
  { label: 'Mineralöl', value: 3822 },
  { label: 'Erdgas', value: 2655 },
  { label: 'Erneuerbare', value: 2107 },
  { label: 'Steinkohle', value: 931 },
  { label: 'Braunkohle', value: 895 },
];

describe('layoutTreemap', () => {
  it('füllt die Box vollständig (Summe der Flächen = Boxfläche)', () => {
    const W = 800;
    const H = 450;
    const rects = layoutTreemap(items, W, H);
    const area = rects.reduce((acc, r) => acc + r.w * r.h, 0);
    expect(area).toBeCloseTo(W * H, 2);
  });

  it('Kachelfläche ist proportional zum Wert', () => {
    const W = 800;
    const H = 450;
    const total = items.reduce((acc, it) => acc + it.value, 0);
    const rects = layoutTreemap(items, W, H);
    for (const r of rects) {
      const expected = (r.value / total) * W * H;
      expect(r.w * r.h).toBeCloseTo(expected, 1);
    }
  });

  it('alle Kacheln liegen innerhalb der Box und haben positive Maße', () => {
    const W = 600;
    const H = 600;
    const rects = layoutTreemap(items, W, H);
    expect(rects).toHaveLength(items.length);
    for (const r of rects) {
      expect(r.w).toBeGreaterThan(0);
      expect(r.h).toBeGreaterThan(0);
      expect(r.x).toBeGreaterThanOrEqual(-1e-6);
      expect(r.y).toBeGreaterThanOrEqual(-1e-6);
      expect(r.x + r.w).toBeLessThanOrEqual(W + 1e-6);
      expect(r.y + r.h).toBeLessThanOrEqual(H + 1e-6);
    }
  });

  it('liefert [] bei Gesamtsumme 0', () => {
    expect(layoutTreemap([{ label: 'leer', value: 0 }], 100, 100)).toEqual([]);
  });

  it('toTreemapItems aggregiert nach Label und behält Reihenfolge', () => {
    const got = toTreemapItems(
      [
        { k: 'A', v: 10 },
        { k: 'B', v: 5 },
        { k: 'A', v: 2 },
      ],
      'k',
      'v',
    );
    expect(got).toEqual([
      { label: 'A', value: 12 },
      { label: 'B', value: 5 },
    ]);
  });
});
