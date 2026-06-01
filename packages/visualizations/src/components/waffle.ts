/**
 * Reine Logik für den Waffle-Chart (Anteile am Ganzen). Ohne React → testbar.
 */
import type { Row } from '../lib/types';

export interface WaffleSlice {
  category: string;
  value: number;
  share: number;
  cells: number;
}

/**
 * Verteilt `cellCount` Zellen proportional zum Wert auf die Kategorien
 * (Largest-Remainder/Hamilton), sodass die Summe exakt `cellCount` ergibt.
 * Eingangsreihenfolge der Kategorien bleibt erhalten.
 */
export function allocateWaffle(
  data: ReadonlyArray<Row>,
  categoryKey: string,
  valueKey: string,
  cellCount = 100,
): WaffleSlice[] {
  const totals = new Map<string, number>();
  for (const row of data) {
    const category = String(row[categoryKey] ?? '');
    if (!category) continue;
    const raw = row[valueKey];
    const value = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isFinite(value)) continue;
    totals.set(category, (totals.get(category) ?? 0) + value);
  }

  const total = [...totals.values()].reduce((acc, v) => acc + v, 0);
  if (total <= 0) return [];

  const provisional = [...totals.entries()].map(([category, value]) => {
    const exact = (value / total) * cellCount;
    return { category, value, share: value / total, exact, cells: Math.floor(exact) };
  });

  let remaining = cellCount - provisional.reduce((acc, p) => acc + p.cells, 0);
  const byRemainder = [...provisional].sort(
    (a, b) => b.exact - Math.floor(b.exact) - (a.exact - Math.floor(a.exact)),
  );
  for (let i = 0; remaining > 0 && i < byRemainder.length; i += 1, remaining -= 1) {
    const item = byRemainder[i];
    if (item) item.cells += 1;
  }

  return provisional.map(({ category, value, share, cells }) => ({ category, value, share, cells }));
}
