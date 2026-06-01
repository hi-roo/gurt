/**
 * Reine Logik für den Treemap-Chart (Anteile am Ganzen mit Fläche = Größe).
 * Squarified-Treemap nach Bruls, Huizing & van Wijk (2000) — erzeugt möglichst
 * quadratische Kacheln. Ohne React → testbar.
 */
import type { Row } from '../lib/types';

export interface TreemapItem {
  label: string;
  value: number;
}

export interface TreemapRect {
  label: string;
  value: number;
  share: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Scaled {
  index: number;
  area: number;
}

/** Schlechtestes (höchstes) Seitenverhältnis einer Reihe — Zielgröße zum Minimieren. */
function worstRatio(row: Scaled[], side: number): number {
  if (row.length === 0) return Infinity;
  let sum = 0;
  let max = -Infinity;
  let min = Infinity;
  for (const r of row) {
    sum += r.area;
    if (r.area > max) max = r.area;
    if (r.area < min) min = r.area;
  }
  const s2 = sum * sum;
  const side2 = side * side;
  return Math.max((side2 * max) / s2, s2 / (side2 * min));
}

/** Legt eine fertige Reihe an die kurze Seite der Restfläche und schrumpft diese. */
function layoutRow(row: Scaled[], box: Box, out: TreemapRect[], items: TreemapItem[], total: number): void {
  const rowSum = row.reduce((acc, r) => acc + r.area, 0);
  if (rowSum <= 0) return;
  if (box.w >= box.h) {
    const rw = rowSum / box.h;
    let yy = box.y;
    for (const r of row) {
      const rh = r.area / rw;
      const item = items[r.index]!;
      out[r.index] = { label: item.label, value: item.value, share: item.value / total, x: box.x, y: yy, w: rw, h: rh };
      yy += rh;
    }
    box.x += rw;
    box.w -= rw;
  } else {
    const rh = rowSum / box.w;
    let xx = box.x;
    for (const r of row) {
      const rw = r.area / rh;
      const item = items[r.index]!;
      out[r.index] = { label: item.label, value: item.value, share: item.value / total, x: xx, y: box.y, w: rw, h: rh };
      xx += rw;
    }
    box.y += rh;
    box.h -= rh;
  }
}

/**
 * Verteilt `items` flächenproportional in die Box `width × height`.
 * Reihenfolge der Eingabe wird im Ergebnis beibehalten (out[index]).
 */
export function layoutTreemap(items: TreemapItem[], width: number, height: number): TreemapRect[] {
  const positive = items.filter((it) => Number.isFinite(it.value) && it.value > 0);
  const totalValue = positive.reduce((acc, it) => acc + it.value, 0);
  if (totalValue <= 0 || width <= 0 || height <= 0) return [];

  const boxArea = width * height;
  const scaled: Scaled[] = items.map((it, index) => ({
    index,
    area: it.value > 0 && Number.isFinite(it.value) ? (it.value / totalValue) * boxArea : 0,
  }));
  const queue = scaled.filter((s) => s.area > 0);

  const out: TreemapRect[] = new Array(items.length);
  const box: Box = { x: 0, y: 0, w: width, h: height };

  let row: Scaled[] = [];
  let i = 0;
  while (i < queue.length) {
    const side = Math.min(box.w, box.h);
    const next = queue[i]!;
    const withNext = [...row, next];
    if (row.length === 0 || worstRatio(withNext, side) <= worstRatio(row, side)) {
      row = withNext;
      i += 1;
    } else {
      layoutRow(row, box, out, items, totalValue);
      row = [];
    }
  }
  if (row.length) layoutRow(row, box, out, items, totalValue);

  return out.filter(Boolean);
}

/** Aggregiert Rohzeilen nach Label und summiert die Werte (Eingangsreihenfolge bleibt). */
export function toTreemapItems(data: ReadonlyArray<Row>, labelKey: string, valueKey: string): TreemapItem[] {
  const order: string[] = [];
  const totals = new Map<string, number>();
  for (const row of data) {
    const label = String(row[labelKey] ?? '');
    if (!label) continue;
    const raw = row[valueKey];
    const value = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isFinite(value)) continue;
    if (!totals.has(label)) order.push(label);
    totals.set(label, (totals.get(label) ?? 0) + value);
  }
  return order.map((label) => ({ label, value: totals.get(label) ?? 0 }));
}
