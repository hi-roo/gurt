/**
 * Reine Logik für ein geschichtetes Sankey-Diagramm (Flüsse zwischen Knoten).
 * Unterstützt beliebig viele Spalten (Layer) — vom einfachen 1→N-Fächer bis zum
 * mehrstufigen Fluss. Ohne React → testbar. Rendering: gestrichene Bézier-Bänder.
 */
import type { Row } from '../lib/types';

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyLayoutOptions {
  width: number;
  height: number;
  /** Breite der Knoten-Rechtecke. */
  nodeWidth?: number;
  /** Vertikaler Abstand zwischen Knoten einer Spalte. */
  nodePadding?: number;
}

export interface SankeyNode {
  key: string;
  layer: number;
  value: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SankeyComputedLink {
  source: string;
  target: string;
  value: number;
  width: number;
  /** Mittellinie am Quell- bzw. Zielknoten (für gestrichene Bänder). */
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  path: string;
}

export interface SankeyLayout {
  nodes: SankeyNode[];
  links: SankeyComputedLink[];
}

/** Sammelt Knoten in Reihenfolge des ersten Auftretens. */
function collectNodes(links: ReadonlyArray<SankeyLink>): string[] {
  const seen: string[] = [];
  const set = new Set<string>();
  for (const l of links) {
    for (const key of [l.source, l.target]) {
      if (!set.has(key)) {
        set.add(key);
        seen.push(key);
      }
    }
  }
  return seen;
}

/** Längster-Pfad-Layering: Quellen (ohne Eingang) → Layer 0, dann Fixpunkt. */
function assignLayers(keys: string[], links: ReadonlyArray<SankeyLink>): Map<string, number> {
  const layer = new Map<string, number>();
  for (const k of keys) layer.set(k, 0);
  for (let iter = 0; iter < keys.length; iter += 1) {
    let changed = false;
    for (const l of links) {
      const next = (layer.get(l.source) ?? 0) + 1;
      if (next > (layer.get(l.target) ?? 0)) {
        layer.set(l.target, next);
        changed = true;
      }
    }
    if (!changed) break;
  }
  return layer;
}

export function layoutSankey(links: ReadonlyArray<SankeyLink>, options: SankeyLayoutOptions): SankeyLayout {
  const { width, height } = options;
  const nodeWidth = options.nodeWidth ?? 16;
  const nodePadding = options.nodePadding ?? 14;
  const valid = links.filter((l) => Number.isFinite(l.value) && l.value > 0 && l.source && l.target);
  if (valid.length === 0 || width <= 0 || height <= 0) return { nodes: [], links: [] };

  const keys = collectNodes(valid);
  const layerOf = assignLayers(keys, valid);

  // Knotenwert = max(Summe ein, Summe aus).
  const inSum = new Map<string, number>();
  const outSum = new Map<string, number>();
  for (const l of valid) {
    outSum.set(l.source, (outSum.get(l.source) ?? 0) + l.value);
    inSum.set(l.target, (inSum.get(l.target) ?? 0) + l.value);
  }
  const valueOf = (k: string) => Math.max(inSum.get(k) ?? 0, outSum.get(k) ?? 0);

  const maxLayer = Math.max(...keys.map((k) => layerOf.get(k) ?? 0));
  const layers: string[][] = Array.from({ length: maxLayer + 1 }, () => []);
  for (const k of keys) layers[layerOf.get(k) ?? 0]!.push(k);

  // Globaler Maßstab: kleinste „passt-in-Höhe“-Skala über alle Spalten.
  let scale = Infinity;
  for (const col of layers) {
    const total = col.reduce((acc, k) => acc + valueOf(k), 0);
    if (total <= 0) continue;
    const pad = nodePadding * Math.max(0, col.length - 1);
    scale = Math.min(scale, (height - pad) / total);
  }
  if (!Number.isFinite(scale) || scale <= 0) scale = 0;

  const xOf = (layer: number) => (maxLayer === 0 ? 0 : (layer * (width - nodeWidth)) / maxLayer);

  const nodes: SankeyNode[] = [];
  const nodeByKey = new Map<string, SankeyNode>();
  layers.forEach((col, layer) => {
    const total = col.reduce((acc, k) => acc + valueOf(k), 0);
    const pad = nodePadding * Math.max(0, col.length - 1);
    const colHeight = total * scale + pad;
    let y = Math.max(0, (height - colHeight) / 2);
    for (const k of col) {
      const h = valueOf(k) * scale;
      const node: SankeyNode = { key: k, layer, value: valueOf(k), x: xOf(layer), y, w: nodeWidth, h };
      nodes.push(node);
      nodeByKey.set(k, node);
      y += h + nodePadding;
    }
  });

  // Verbindungen: Offsets an Quelle (nach Ziel-y sortiert) und Ziel (nach Quell-y).
  const srcOffset = new Map<string, number>();
  const tgtOffset = new Map<string, number>();
  const ordered = [...valid].sort((a, b) => {
    const ay = nodeByKey.get(a.target)?.y ?? 0;
    const by = nodeByKey.get(b.target)?.y ?? 0;
    return ay - by;
  });

  const computed: SankeyComputedLink[] = [];
  for (const l of ordered) {
    const s = nodeByKey.get(l.source);
    const t = nodeByKey.get(l.target);
    if (!s || !t) continue;
    const w = l.value * scale;
    const so = srcOffset.get(l.source) ?? 0;
    const to = tgtOffset.get(l.target) ?? 0;
    const x0 = s.x + s.w;
    const x1 = t.x;
    const y0 = s.y + so + w / 2;
    const y1 = t.y + to + w / 2;
    const xc = (x0 + x1) / 2;
    computed.push({
      source: l.source,
      target: l.target,
      value: l.value,
      width: w,
      x0,
      y0,
      x1,
      y1,
      path: `M${x0},${y0} C${xc},${y0} ${xc},${y1} ${x1},${y1}`,
    });
    srcOffset.set(l.source, so + w);
    tgtOffset.set(l.target, to + w);
  }

  // Verbindungen wieder in Eingabereihenfolge bringen (stabil fürs Rendern/Testen).
  const indexOf = new Map(valid.map((l, i) => [`${l.source}→${l.target}`, i]));
  computed.sort((a, b) => (indexOf.get(`${a.source}→${a.target}`) ?? 0) - (indexOf.get(`${b.source}→${b.target}`) ?? 0));

  return { nodes, links: computed };
}

/** Baut Sankey-Links aus Rohzeilen (Quelle/Ziel/Wert-Spalten). */
export function toSankeyLinks(
  data: ReadonlyArray<Row>,
  sourceKey: string,
  targetKey: string,
  valueKey: string,
): SankeyLink[] {
  const links: SankeyLink[] = [];
  for (const row of data) {
    const source = String(row[sourceKey] ?? '');
    const target = String(row[targetKey] ?? '');
    if (!source || !target) continue;
    const raw = row[valueKey];
    const value = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isFinite(value)) continue;
    links.push({ source, target, value });
  }
  return links;
}
