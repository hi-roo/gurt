import { type ReactNode } from 'react';
import { escapeRegExp } from '../content/search';
import type { SearchDoc } from '../content/types';

/**
 * Präsentations-Helfer der Volltextsuche (JSX) — geteilt von `SearchView` und `SearchModal`.
 * Markiert Treffer und schneidet einen Kontext-Ausschnitt um den ersten Treffer.
 */
const SNIPPET_BEFORE = 70;
const SNIPPET_AFTER = 150;

/** Markiert Treffer (Roh-Terme, case-insensitiv) im Text. */
export function highlight(text: string, rawTerms: string[]): ReactNode {
  if (rawTerms.length === 0) return text;
  const re = new RegExp(`(${rawTerms.map(escapeRegExp).join('|')})`, 'gi');
  const lookup = new Set(rawTerms);
  return text.split(re).map((part, i) =>
    lookup.has(part.toLowerCase()) ? (
      <mark key={i} className="bg-accent/20 text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/** Textausschnitt rund um den ersten Treffer (sonst Standfirst). */
export function snippet(doc: SearchDoc, rawTerms: string[]): ReactNode {
  const text = doc.text || doc.standfirst || '';
  const lower = text.toLowerCase();
  let pos = -1;
  for (const term of rawTerms) {
    const i = lower.indexOf(term);
    if (i !== -1 && (pos === -1 || i < pos)) pos = i;
  }
  if (pos === -1) return highlight(doc.standfirst || text.slice(0, SNIPPET_BEFORE + SNIPPET_AFTER), rawTerms);
  const start = Math.max(0, pos - SNIPPET_BEFORE);
  const end = Math.min(text.length, pos + SNIPPET_AFTER);
  const slice = `${start > 0 ? '… ' : ''}${text.slice(start, end).trim()}${end < text.length ? ' …' : ''}`;
  return highlight(slice, rawTerms);
}
