/**
 * Reine Logik für die horizontale Randkorrektur des gemeinsamen Tooltips (`PinTooltip`).
 * Ohne React → testbar.
 *
 * Das Tooltip ist standardmäßig horizontal über dem Datenpunkt zentriert. An den
 * Diagrammrändern (erster/letzter Datenpunkt) ragt die halbe Boxbreite über den
 * Container hinaus und wird von `overflow`-Vorfahren abgeschnitten. `tooltipShift`
 * liefert den Versatz (dx in px), der die Box innerhalb des Containers hält —
 * der Orientierungspfeil bleibt dabei auf dem Datenpunkt (er wird um -dx gegenversetzt).
 */
export function tooltipShift(
  /** X-Position des Datenpunkts im Container-Koordinatensystem (px). */
  pointX: number,
  /** Gemessene Breite der Tooltip-Box (px). */
  boxWidth: number,
  /** Breite des Containers, in dem die Box bleiben soll (px). */
  containerWidth: number,
  /** Mindestabstand zum Containerrand (px). */
  pad = 4,
): number {
  if (!Number.isFinite(pointX) || !Number.isFinite(boxWidth) || !Number.isFinite(containerWidth)) {
    return 0;
  }
  if (boxWidth <= 0 || containerWidth <= 0) return 0;

  const centeredLeft = pointX - boxWidth / 2;
  const min = pad;
  const max = containerWidth - pad - boxWidth;

  // Box breiter als der Container: linksbündig mit Randabstand (Lesbarkeit vor Zentrierung).
  if (max < min) return min - centeredLeft;

  const clampedLeft = Math.min(Math.max(centeredLeft, min), max);
  return clampedLeft - centeredLeft;
}

/**
 * Position des Orientierungspfeils innerhalb der Box (px von links), sodass er trotz
 * Versatz weiter auf den Datenpunkt zeigt — aber nie aus der Box wandert (Kanten-Puffer,
 * damit der Pfeil optisch an der Box bleibt).
 */
export function tooltipArrowLeft(boxWidth: number, dx: number, edge = 10): number {
  if (!Number.isFinite(boxWidth) || boxWidth <= 0) return 0;
  const target = boxWidth / 2 - dx;
  const min = Math.min(edge, boxWidth / 2);
  const max = Math.max(boxWidth - edge, boxWidth / 2);
  return Math.min(Math.max(target, min), max);
}
