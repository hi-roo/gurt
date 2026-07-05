import { describe, expect, it } from 'vitest';
import { tooltipArrowLeft, tooltipShift } from './tooltip-shift';

describe('tooltipShift', () => {
  it('lässt eine mittig passende Box unverschoben', () => {
    // Box 100 px zentriert über Punkt 150 in 300 px Container → passt (50..250).
    expect(tooltipShift(150, 100, 300)).toBe(0);
  });

  it('schiebt am rechten Rand nach links (letzter Datenpunkt)', () => {
    // Punkt 290, Box 100 → zentriert 240..340, Container 300, pad 4 → max-left 196.
    expect(tooltipShift(290, 100, 300)).toBe(-44);
  });

  it('schiebt am linken Rand nach rechts (erster Datenpunkt)', () => {
    // Punkt 10, Box 100 → zentriert -40, min-left 4 → +44.
    expect(tooltipShift(10, 100, 300)).toBe(44);
  });

  it('hält exakt den Randabstand ein', () => {
    const dx = tooltipShift(300, 120, 300, 8);
    const left = 300 - 60 + dx;
    expect(left).toBe(300 - 8 - 120);
  });

  it('richtet eine übergroße Box linksbündig am Randabstand aus', () => {
    // Box 400 in 300 px Container: links = pad, Rest darf rechts überstehen.
    const dx = tooltipShift(150, 400, 300, 4);
    expect(150 - 200 + dx).toBe(4);
  });

  it('ist robust gegen kaputte Eingaben', () => {
    expect(tooltipShift(Number.NaN, 100, 300)).toBe(0);
    expect(tooltipShift(150, 0, 300)).toBe(0);
    expect(tooltipShift(150, 100, 0)).toBe(0);
  });
});

describe('tooltipArrowLeft', () => {
  it('zeigt ohne Versatz auf die Boxmitte', () => {
    expect(tooltipArrowLeft(100, 0)).toBe(50);
  });

  it('folgt dem Datenpunkt gegen den Versatz', () => {
    // Box um -30 nach links geschoben → Pfeil wandert 30 px nach rechts.
    expect(tooltipArrowLeft(100, -30)).toBe(80);
  });

  it('bleibt trotz großem Versatz in der Box (Kanten-Puffer)', () => {
    expect(tooltipArrowLeft(100, -80)).toBe(90);
    expect(tooltipArrowLeft(100, 80)).toBe(10);
  });

  it('ist robust gegen kaputte Eingaben', () => {
    expect(tooltipArrowLeft(0, 10)).toBe(0);
    expect(tooltipArrowLeft(Number.NaN, 10)).toBe(0);
  });
});
