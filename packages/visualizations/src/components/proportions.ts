/**
 * Reine Logik für die Anteils-Balkenliste (`ProportionList`) — der mobile Reflow
 * für „Teil am Ganzen“-Charts (Treemap/Waffle). Getrennt vom Rendering → testbar.
 */

export interface ProportionInput {
  label: string;
  value: number;
  /** Kategoriefarbe (Hex aus der Palette); rein dekorativ, nie alleiniger Träger. */
  color?: string;
  /** Optionaler Zusatz (z. B. „was steckt drin“) — erscheint als Beschreibung. */
  note?: string;
}

export interface ProportionEntry extends ProportionInput {
  /** Anteil am Gesamtwert in [0, 1]. */
  share: number;
  /** Anteil in Prozent, ganzzahlig gerundet (wie die Treemap-Legende). */
  percent: number;
}

/**
 * Wandelt Wert-Einträge in Anteils-Einträge (Share am Gesamtwert), absteigend nach
 * Wert sortiert. Negative/nicht-endliche Werte zählen als 0; bei Gesamtsumme 0 sind
 * alle Anteile 0 (kein Division-durch-Null).
 */
export function toProportions(items: ProportionInput[]): {
  entries: ProportionEntry[];
  total: number;
} {
  const clean = items.map((it) => ({
    ...it,
    value: Number.isFinite(it.value) && it.value > 0 ? it.value : 0,
  }));
  const total = clean.reduce((acc, it) => acc + it.value, 0);
  const entries = clean
    .map((it) => {
      const share = total > 0 ? it.value / total : 0;
      return { ...it, share, percent: Math.round(share * 100) };
    })
    .sort((a, b) => b.value - a.value);
  return { entries, total };
}
