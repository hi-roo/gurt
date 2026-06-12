/**
 * Reine Logik für das Verhältnis-/Icon-Array (z. B. „N je 100“). Ohne React → testbar.
 * Macht ein Verhältnis tangibel: eine feste Basis (Default 100) plus die gerundete
 * Zahl der hervorgehobenen Einheiten je Zeile/Jahr.
 */
import type { Row } from '../lib/types';

export interface RatioPanel {
  /** Beschriftung der Zeile (z. B. das Jahr). */
  label: string;
  /** Exakter Wert (für Tabelle/Beschriftung). */
  value: number;
  /** Gerundete Zahl hervorgehobener Icons. */
  cells: number;
}

/** Wandelt Rohzeilen in Panels um (eine je Zeile, Eingangsreihenfolge bleibt). */
export function toRatioPanels(
  data: ReadonlyArray<Row>,
  labelKey: string,
  valueKey: string,
): RatioPanel[] {
  const panels: RatioPanel[] = [];
  for (const row of data) {
    const label = String(row[labelKey] ?? '');
    if (!label) continue;
    const raw = row[valueKey];
    const value = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isFinite(value) || value < 0) continue;
    panels.push({ label, value, cells: Math.round(value) });
  }
  return panels;
}
