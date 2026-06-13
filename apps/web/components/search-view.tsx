'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { SearchDoc } from '../content/types';
import { buildIndex, rawTermsOf, runSearch, termsOf } from '../content/search';
import { highlight, snippet } from './search-highlight';

export interface SearchViewProps {
  docs: SearchDoc[];
  initialQuery?: string;
}

export function SearchView({ docs, initialQuery = '' }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);

  const index = useMemo(() => buildIndex(docs), [docs]);
  const terms = useMemo(() => termsOf(query), [query]);
  const rawTerms = useMemo(() => rawTermsOf(query), [query]);
  const hits = useMemo(() => runSearch(index, query), [index, query]);

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
                <h2 className="font-display text-xl tracking-tight text-ink group-hover:text-accent">
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
