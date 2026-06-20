import { describe, it, expect } from 'vitest';
import { groupedBarLayout } from './grouped-bars';

describe('groupedBarLayout', () => {
  it('staffelt Balken mit gleichmäßiger Dicke und Abstand', () => {
    const { tops, band, innerHeight } = groupedBarLayout(3, 40, 10, 24);
    expect(tops).toEqual([0, 50, 100]);
    expect(band).toBe(40);
    expect(innerHeight).toBe(140);
  });

  it('fügt am Gruppen-Übergang den größeren Abstand ein', () => {
    const { tops, innerHeight } = groupedBarLayout(4, 40, 10, 30, 2);
    // Balken 0/1 dicht (10px), vor Balken 2 der größere Abstand (30px statt 10px).
    expect(tops).toEqual([0, 50, 120, 170]);
    expect(innerHeight).toBe(210);
  });

  it('legt die Trennlinie mittig in den Gruppen-Abstand', () => {
    const { separatorY } = groupedBarLayout(4, 40, 10, 30, 2);
    // Unterkante oben = 50+40 = 90, Oberkante unten = 120 → Mitte 105, je 15px Luft.
    expect(separatorY).toBe(105);
  });

  it('ohne gültigen Trenn-Index keine Linie', () => {
    expect(groupedBarLayout(3, 40, 10, 24).separatorY).toBeUndefined();
    expect(groupedBarLayout(3, 40, 10, 24, 0).separatorY).toBeUndefined();
    expect(groupedBarLayout(3, 40, 10, 24, 3).separatorY).toBeUndefined();
  });
});
