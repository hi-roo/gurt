/**
 * Reine Geometrie für „nächster Datenpunkt zum Zeiger“ — bildet Observable Plots
 * `pointerK`-Gewichtung nach, damit unser Tap-to-Pin-Overlay denselben Punkt wählt wie
 * Plots Hover-Tip. Getrennt vom Rendering → testbar (Schicht-Regel: nur Logik getestet).
 */

export interface NearPoint {
  x: number;
  y: number;
}

/** Achsen-Gewichte (kx,ky): dominante Achse zählt voll (1), die andere gestaucht (0.01). */
export interface PointerWeight {
  kx: number;
  ky: number;
}

/** Plot-Presets, gegen @observablehq/plot (pointer.js) verifiziert. */
export const POINTER_X: PointerWeight = { kx: 1, ky: 0.01 }; // pointerX → x dominant
export const POINTER_Y: PointerWeight = { kx: 0.01, ky: 1 }; // pointerY → y dominant
export const POINTER_XY: PointerWeight = { kx: 1, ky: 1 }; // pointer → euklidisch

/** Datenfläche in Pixeln (Plot-Frame ohne Ränder) — für den Rand-Flip. */
export interface Frame {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

/**
 * Index des Punkts mit kleinster gewichteter quadrierter Distanz zu (px,py).
 * `frame` (optional) bildet Plots Rand-Verhalten nach: liegt der Zeiger außerhalb der
 * Datenfläche auf einer Achse, zählt diese Achse wieder voll (Gewicht 1) — modelliert
 * nach pointer.js:146-147; beim Chart-Einbau (Phase „Bar“) im Browser gegenzuprüfen.
 * Liefert -1 bei leerer Punktliste.
 */
export function pickNearest(
  points: ReadonlyArray<NearPoint>,
  px: number,
  py: number,
  weight: PointerWeight,
  frame?: Frame,
): number {
  let kx = weight.kx;
  let ky = weight.ky;
  if (frame) {
    if (px < frame.x0 || px > frame.x1) kx = 1;
    if (py < frame.y0 || py > frame.y1) ky = 1;
  }
  let best = -1;
  let bestDist = Infinity;
  for (let i = 0; i < points.length; i += 1) {
    const p = points[i]!;
    const dx = (px - p.x) * kx;
    const dy = (py - p.y) * ky;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}
