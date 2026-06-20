// Pixel-Layout für gruppierte Balken. Entkoppelt den Abstand am Gruppen-Übergang von der
// Balkendicke: so bleibt ein knapper, exakt steuerbarer Abstand möglich (z. B. ~12px je Seite
// einer Trennlinie), während die Balken innerhalb einer Gruppe dicht zusammenstehen. Reine
// Geometrie ohne Rendering → testbar.

export interface GroupedBarLayout {
  /** y-Oberkante je Balken (in Reihenfolge), in px relativ zur Zeichenfläche (0 = oben). */
  tops: number[];
  /** Balkendicke in px. */
  band: number;
  /** Höhe der Zeichenfläche (ohne Achsen-Margins) in px. */
  innerHeight: number;
  /** y-Pixel der Trennlinie (mittig im Gruppen-Übergang), falls ein gültiger Index vorliegt. */
  separatorY?: number;
}

/**
 * Staffelt `count` Balken gleicher Dicke mit `barGap` Abstand; vor dem Balken `separatorAfter`
 * wird stattdessen der größere `groupGap` eingefügt. Die Trennlinie liegt mittig im Gruppen-
 * Abstand → je Seite `groupGap/2` Luft.
 */
export function groupedBarLayout(
  count: number,
  band: number,
  barGap: number,
  groupGap: number,
  separatorAfter?: number,
): GroupedBarLayout {
  const tops: number[] = [];
  let y = 0;
  for (let i = 0; i < count; i++) {
    if (i > 0) y += separatorAfter != null && i === separatorAfter ? groupGap : barGap;
    tops.push(y);
    y += band;
  }
  let separatorY: number | undefined;
  if (separatorAfter != null && separatorAfter > 0 && separatorAfter < count) {
    const upperBottom = (tops[separatorAfter - 1] ?? 0) + band;
    const lowerTop = tops[separatorAfter] ?? 0;
    separatorY = (upperBottom + lowerTop) / 2;
  }
  return { tops, band, innerHeight: y, separatorY };
}
