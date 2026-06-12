import type { Article, VisualisierungBlock } from './types';

export interface PosterSegment {
  label: string;
  value: number;
}

export interface PosterData {
  kicker?: string;
  title: string;
  segments: PosterSegment[];
  unit?: string;
  source?: string;
}

/**
 * Leitet aus dem ersten „Anteil am Ganzen“-Datensatz eines Beitrags die Daten
 * für ein Signatur-Poster / Share-Bild ab (Segmente nach Kategorie summiert).
 * Gemeinsame Quelle für die Poster-Seite und das OG-Image.
 */
export function posterData(article: Article): PosterData | null {
  for (const block of article.body) {
    if (block._type !== 'visualisierungBlock') continue;
    const viz = (block as VisualisierungBlock).visualisierung;
    const datensatz = viz.datensatz;
    if (!datensatz?.daten?.length) continue;
    if (!['waffle', 'treemap', 'balken'].includes(viz.typ)) continue;
    const catKey = viz.encoding?.kategorieFeld ?? viz.encoding?.xFeld;
    const valKey = viz.encoding?.yFeld;
    if (!catKey || !valKey) continue;

    const order: string[] = [];
    const totals = new Map<string, number>();
    for (const row of datensatz.daten) {
      const label = String(row[catKey] ?? '');
      if (!label) continue;
      const raw = row[valKey];
      const num = typeof raw === 'number' ? raw : Number(raw);
      if (!Number.isFinite(num)) continue;
      if (!totals.has(label)) order.push(label);
      totals.set(label, (totals.get(label) ?? 0) + num);
    }
    if (!order.length) continue;

    return {
      kicker: article.themen?.[0]?.name,
      title: viz.titel,
      segments: order.map((label) => ({ label, value: totals.get(label) ?? 0 })),
      unit: datensatz.spalten.find((s) => s.name === valKey)?.einheit,
      source: datensatz.quelle?.titel,
    };
  }
  return null;
}
