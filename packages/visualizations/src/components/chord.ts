// Reine Layout-Logik für das Chord-Diagramm (symmetrische Beziehungen zwischen
// Entitäten). Kein Rendering, kein DOM → SSR-sicher und mit Vitest testbar.

export interface ChordSubArc {
  /** Start-Winkel (Radiant). */
  a0: number;
  /** End-Winkel (Radiant). */
  a1: number;
}

export interface ChordGroup {
  index: number;
  label: string;
  startAngle: number;
  endAngle: number;
  /** Summe der Beziehungen dieser Entität (ohne Selbstbezug). */
  total: number;
}

export interface ChordRibbon {
  i: number;
  j: number;
  value: number;
  /** Teilbogen an Entität i (zeigt auf j). */
  source: ChordSubArc;
  /** Teilbogen an Entität j (zeigt auf i). */
  target: ChordSubArc;
}

export interface ChordLayout {
  groups: ChordGroup[];
  ribbons: ChordRibbon[];
}

const TAU = Math.PI * 2;

/**
 * Baut aus ungerichteten Paaren `{a, b, wert}` eine symmetrische Matrix samt
 * Label-Liste (in Reihenfolge des ersten Auftretens). Diagonale bleibt 0.
 */
export function pairsToMatrix(
  rows: ReadonlyArray<Record<string, unknown>>,
  aKey: string,
  bKey: string,
  valueKey: string,
): { labels: string[]; matrix: number[][] } {
  const labels: string[] = [];
  const indexOf = (name: string): number => {
    let i = labels.indexOf(name);
    if (i === -1) {
      i = labels.length;
      labels.push(name);
    }
    return i;
  };
  const pairs: Array<[number, number, number]> = [];
  for (const row of rows) {
    const a = String(row[aKey] ?? '').trim();
    const b = String(row[bKey] ?? '').trim();
    const v = Number(row[valueKey]);
    if (!a || !b || !Number.isFinite(v)) continue;
    pairs.push([indexOf(a), indexOf(b), v]);
  }
  const n = labels.length;
  const matrix: number[][] = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  for (const [i, j, v] of pairs) {
    if (i === j) continue;
    (matrix[i] as number[])[j] = v;
    (matrix[j] as number[])[i] = v;
  }
  return { labels, matrix };
}

/**
 * Berechnet Gruppen-Bögen (je Entität, Größe ∝ Summe ihrer Beziehungen) und die
 * Ribbon-Endpunkte (Teilbögen je Paar). Winkel in Radiant; der Renderer legt 0°
 * nach oben und zeichnet im Uhrzeigersinn. `padAngle` ist der Spalt zwischen Gruppen.
 */
export function buildChord(labels: string[], matrix: number[][], padAngle = 0.045): ChordLayout {
  const n = labels.length;
  const rowTotal = matrix.map((row, i) =>
    row.reduce((sum, v, j) => (i === j ? sum : sum + (v > 0 ? v : 0)), 0),
  );
  const grand = rowTotal.reduce((s, v) => s + v, 0) || 1;
  const usable = Math.max(0, TAU - n * padAngle);

  const groups: ChordGroup[] = [];
  const sub = new Map<string, ChordSubArc>();
  let cursor = 0;

  for (let i = 0; i < n; i += 1) {
    const total = rowTotal[i] ?? 0;
    const span = (total / grand) * usable;
    const start = cursor;
    let subCursor = start;
    const row = matrix[i] ?? [];
    for (let j = 0; j < n; j += 1) {
      if (i === j) continue;
      const v = row[j] ?? 0;
      if (v <= 0) continue;
      const subSpan = total > 0 ? (v / total) * span : 0;
      sub.set(`${i},${j}`, { a0: subCursor, a1: subCursor + subSpan });
      subCursor += subSpan;
    }
    groups.push({ index: i, label: labels[i] ?? '', startAngle: start, endAngle: start + span, total });
    cursor = start + span + padAngle;
  }

  const ribbons: ChordRibbon[] = [];
  for (let i = 0; i < n; i += 1) {
    const row = matrix[i] ?? [];
    for (let j = i + 1; j < n; j += 1) {
      const v = row[j] ?? 0;
      if (v <= 0) continue;
      const source = sub.get(`${i},${j}`);
      const target = sub.get(`${j},${i}`);
      if (!source || !target) continue;
      ribbons.push({ i, j, value: v, source, target });
    }
  }

  return { groups, ribbons };
}
