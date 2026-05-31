import type { EuDatasetRecord } from '../sources/data-europa';

/**
 * Aggregiert EU-Datensatz-Stichproben nach Herkunftsland (Top N). Reine,
 * testbare Funktion — keine Uhr, kein Netz.
 */
export function aggregateByCountry(
  records: EuDatasetRecord[],
  topN = 10,
): Array<{ land: string; anzahl: number }> {
  const counts = new Map<string, number>();
  for (const record of records) {
    counts.set(record.land, (counts.get(record.land) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([land, anzahl]) => ({ land, anzahl }))
    .sort((a, b) => b.anzahl - a.anzahl)
    .slice(0, topN);
}
