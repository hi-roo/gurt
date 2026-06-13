import type { SearchDoc } from './types';

/**
 * Geteilte Volltext-Such-Logik (pure, ohne JSX) — genutzt von der /suche-Seite (`SearchView`)
 * UND dem modalen Suchfeld (`SearchModal`). Eine einzige Implementierung des Rankings.
 */

/** Kleinschreibung + Diakritika-Falte (ä→a, ü→u, ß→ss) für robustes Matching. */
export function fold(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ß/g, 'ss');
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const WEIGHT = { titel: 5, themen: 3, standfirst: 2, text: 1 } as const;

export interface Indexed {
  doc: SearchDoc;
  titel: string;
  standfirst: string;
  themen: string;
  text: string;
}

export interface SearchHit {
  doc: SearchDoc;
  score: number;
}

/** Baut den gefalteten Index einmalig aus den Roh-Dokumenten. */
export function buildIndex(docs: SearchDoc[]): Indexed[] {
  return docs.map((doc) => ({
    doc,
    titel: fold(doc.titel),
    standfirst: fold(doc.standfirst),
    themen: fold(doc.themen.map((t) => t.name).join(' ')),
    text: fold(doc.text),
  }));
}

/** Gefaltete Suchterme (fürs Matching). */
export function termsOf(query: string): string[] {
  return fold(query.trim()).split(/\s+/).filter(Boolean);
}

/** Roh-Terme (für die Treffer-Hervorhebung, case-insensitiv). */
export function rawTermsOf(query: string): string[] {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

/** AND-Matching über alle Terme; gewichteter Score (Titel > Themen > Standfirst > Text). */
export function runSearch(index: Indexed[], query: string): SearchHit[] {
  const terms = termsOf(query);
  if (terms.length === 0) return [];
  const out: SearchHit[] = [];
  for (const item of index) {
    let score = 0;
    let all = true;
    for (const term of terms) {
      let s = 0;
      if (item.titel.includes(term)) s += WEIGHT.titel;
      if (item.themen.includes(term)) s += WEIGHT.themen;
      if (item.standfirst.includes(term)) s += WEIGHT.standfirst;
      if (item.text.includes(term)) s += WEIGHT.text;
      if (s === 0) {
        all = false;
        break;
      }
      score += s;
    }
    if (all) out.push({ doc: item.doc, score });
  }
  return out.sort((a, b) => b.score - a.score);
}
