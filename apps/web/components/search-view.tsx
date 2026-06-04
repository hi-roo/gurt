'use client';

import Link from 'next/link';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import type { SearchDoc } from '../content/types';

/** Kleinschreibung + Diakritika-Falte (ä→a, ü→u, ß→ss) für robustes Matching. */
function fold(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ß/g, 'ss');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const SNIPPET_BEFORE = 70;
const SNIPPET_AFTER = 150;
const WEIGHT = { titel: 5, themen: 3, standfirst: 2, text: 1 } as const;

interface Indexed {
  doc: SearchDoc;
  titel: string;
  standfirst: string;
  themen: string;
  text: string;
}

/** Markiert Treffer (Roh-Terme, case-insensitiv) im Text. */
function highlight(text: string, rawTerms: string[]): ReactNode {
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
function snippet(doc: SearchDoc, rawTerms: string[]): ReactNode {
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

export interface SearchViewProps {
  docs: SearchDoc[];
  initialQuery?: string;
}

export function SearchView({ docs, initialQuery = '' }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);

  const index = useMemo<Indexed[]>(
    () =>
      docs.map((doc) => ({
        doc,
        titel: fold(doc.titel),
        standfirst: fold(doc.standfirst),
        themen: fold(doc.themen.map((t) => t.name).join(' ')),
        text: fold(doc.text),
      })),
    [docs],
  );

  const terms = useMemo(() => fold(query.trim()).split(/\s+/).filter(Boolean), [query]);
  const rawTerms = useMemo(() => query.trim().toLowerCase().split(/\s+/).filter(Boolean), [query]);

  const hits = useMemo(() => {
    if (terms.length === 0) return [];
    const out: { doc: SearchDoc; score: number }[] = [];
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
  }, [index, terms]);

  // ?q= teilbar halten — ohne Navigation/Reload.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set('q', query.trim());
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
  }, [query]);

  const hasQuery = terms.length > 0;
  const list = hasQuery ? hits.map((h) => h.doc) : docs;

  return (
    <div>
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="suche-feld" className="mb-2 block text-sm font-medium text-muted">
          Beiträge durchsuchen
        </label>
        <input
          id="suche-feld"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Suchbegriff … (z. B. Rente, Klima, Sozialstaat)"
          autoComplete="off"
          className="w-full border border-line bg-paper px-4 py-3 text-lg text-ink placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </form>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {hasQuery
          ? `${hits.length} ${hits.length === 1 ? 'Treffer' : 'Treffer'} für „${query.trim()}“`
          : `Alle ${docs.length} Beiträge`}
      </p>

      {hasQuery && hits.length === 0 ? (
        <p className="mt-8 text-muted">
          Keine Treffer. Versuch es mit einem anderen Begriff — z. B. einem Thema oder Schlagwort.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-line border-t border-line">
          {list.map((doc) => (
            <li key={doc.slug} className="py-6">
              <Link href={`/beitrag/${doc.slug}`} className="group block">
                <h2 className="font-display text-xl font-bold tracking-tight text-ink group-hover:text-accent">
                  {highlight(doc.titel, rawTerms)}
                </h2>
                {doc.themen.length ? (
                  <div className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
                    {doc.themen.map((t) => t.name).join(' · ')}
                  </div>
                ) : null}
                <p className="mt-2 text-muted">{hasQuery ? snippet(doc, rawTerms) : doc.standfirst}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
