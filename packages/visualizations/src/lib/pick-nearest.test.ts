import { describe, expect, it } from 'vitest';
import { pickNearest, POINTER_X, POINTER_Y, POINTER_XY } from './pick-nearest';

const pts = [
  { x: 0, y: 0 }, // 0
  { x: 100, y: 50 }, // 1
  { x: 100, y: 0 }, // 2
  { x: 200, y: 100 }, // 3
];

describe('pickNearest', () => {
  it('liefert -1 bei leerer Liste', () => {
    expect(pickNearest([], 10, 10, POINTER_XY)).toBe(-1);
  });

  it('euklidisch: wählt den absolut nächsten Punkt', () => {
    expect(pickNearest(pts, 95, 5, POINTER_XY)).toBe(2); // (100,0)
  });

  it('pointerX: x dominiert, y kaum gewichtet', () => {
    expect(pickNearest(pts, 100, 40, POINTER_X)).toBe(1); // (100,50) — y-nah bei gleichem x
    expect(pickNearest(pts, 100, 5, POINTER_X)).toBe(2); // (100,0)
    expect(pickNearest(pts, 5, 90, POINTER_X)).toBe(0); // x≈0 gewinnt trotz y-Ferne
  });

  it('pointerY: y dominiert', () => {
    expect(pickNearest(pts, 5, 95, POINTER_Y)).toBe(3); // y≈100 → (200,100)
  });

  it('Rand-Flip: außerhalb der x-Fläche zählt x wieder voll', () => {
    const frame = { x0: 0, x1: 200, y0: 0, y1: 100 };
    // weit links außerhalb (x=-50): ohne Flip würde pointerY (200,100) wählen;
    // mit Flip zählt x voll → x-nächster bei x=0 gewinnt
    expect(pickNearest(pts, -50, 95, POINTER_Y, frame)).toBe(0);
    // innerhalb der Fläche kein Flip → pointerY wählt y-nah
    expect(pickNearest(pts, 5, 95, POINTER_Y, frame)).toBe(3);
  });
});
