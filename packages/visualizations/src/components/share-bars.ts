/**
 * Reine Logik für den „Anteilsvergleich" (mehrere 100-%-Balken nebeneinander, je
 * in dieselben Gruppen geteilt). Macht Konzentration sichtbar — z. B. „10 % der
 * Haushalte ↔ 54 % des Vermögens". Ohne React → testbar.
 */
import type { Row } from '../lib/types';

export interface ShareSegment {
  group: string;
  value: number;
  /** Anteil am Balken in Prozent (0–100). */
  pct: number;
  /** Kumulierter Startpunkt in Prozent (für gestapelte Darstellung). */
  x0: number;
}

export interface ShareBar {
  label: string;
  total: number;
  segments: ShareSegment[];
}

export interface ShareBarsData {
  bars: ShareBar[];
  /** Gruppen in fester Reihenfolge (erstes Auftreten) — gleiche Farbe je Gruppe über alle Balken. */
  groups: string[];
}

/**
 * Aggregiert Langformat-Zeilen `{bar, gruppe, wert}` zu Balken mit Segmenten.
 * Jeder Balken wird auf seine eigene Summe normiert (100 %); die Gruppen-Reihenfolge
 * ist über alle Balken gleich, damit dieselbe Gruppe dieselbe Farbe/Position erhält.
 */
export function toShareBars(
  data: ReadonlyArray<Row>,
  barKey: string,
  groupKey: string,
  valueKey: string,
): ShareBarsData {
  const groups: string[] = [];
  const barOrder: string[] = [];
  const byBar = new Map<string, Map<string, number>>();

  for (const row of data) {
    const bar = String(row[barKey] ?? '');
    const group = String(row[groupKey] ?? '');
    const value = Number(row[valueKey] ?? 0);
    if (!byBar.has(bar)) {
      byBar.set(bar, new Map());
      barOrder.push(bar);
    }
    if (!groups.includes(group)) groups.push(group);
    const m = byBar.get(bar)!;
    m.set(group, (m.get(group) ?? 0) + value);
  }

  const bars: ShareBar[] = barOrder.map((label) => {
    const m = byBar.get(label)!;
    const total = groups.reduce((sum, g) => sum + (m.get(g) ?? 0), 0);
    let cum = 0;
    const segments: ShareSegment[] = groups.map((group) => {
      const value = m.get(group) ?? 0;
      const pct = total > 0 ? (value / total) * 100 : 0;
      const seg: ShareSegment = { group, value, pct, x0: cum };
      cum += pct;
      return seg;
    });
    return { label, total, segments };
  });

  return { bars, groups };
}
