/**
 * Reine Logik für den Tabellen-Fallback der Anteils-Charts (Waffle/Treemap/Sankey).
 * Ohne React → testbar.
 */
import type { Column } from './types';

/**
 * Hängt abgeleitete Spalten (z. B. die berechnete „Anteil“-Spalte) an die Basis-
 * Spalten an — aber nur, wenn der Key dort noch nicht vorkommt. Führt der Datensatz
 * selbst ein Feld mit demselben Namen (z. B. `anteil`), entstünden sonst zwei Spalten
 * mit identischem React-Key → `DataTable` wirft „Encountered two children with the same
 * key". Zurückgegeben werden die eindeutigen Spalten plus das Set der Keys, die
 * tatsächlich neu angehängt wurden: Nur diese dürfen die Zeilen belegen, damit ein schon
 * vorhandener Spaltenwert (etwa der Rohwert unter `anteil`) nicht still überschrieben wird.
 *
 * Reihenfolge der `derived`-Spalten bleibt erhalten; ein doppelter Key innerhalb von
 * `derived` wird ebenfalls nur einmal übernommen.
 */
export function mergeDerivedColumns(
  base: Column[],
  derived: Column[],
): { columns: Column[]; added: Set<string> } {
  const seen = new Set(base.map((c) => c.key));
  const columns = [...base];
  const added = new Set<string>();
  for (const col of derived) {
    if (seen.has(col.key)) continue;
    seen.add(col.key);
    columns.push(col);
    added.add(col.key);
  }
  return { columns, added };
}
