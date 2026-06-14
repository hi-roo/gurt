'use client';

import { type KeyboardEvent as ReactKeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SearchDoc } from '../content/types';
import { buildIndex, type Indexed, rawTermsOf, runSearch, termsOf } from '../content/search';
import { highlight, snippet } from './search-highlight';

/**
 * Modales Suchfeld (Command-Palette) — von jeder Seite per ⌘/Strg-K oder Header-Trigger.
 * Nutzt dieselbe Such-Logik wie /suche (content/search.ts); der Index wird beim ersten Öffnen
 * lazy geladen (api/search-index), damit er nicht auf jeder Seite mitgeschickt wird.
 *
 * A11y: role=dialog/aria-modal, Combobox-Muster (aria-expanded/-controls/-activedescendant),
 * Fokus-Falle + Fokus-Rückgabe, Escape/Backdrop schließen, Body-Scroll gesperrt, Tastatur-Nav.
 */
const MAX_RESULTS = 8;

const MagnifierIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMac, setIsMac] = useState(true);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indexRef = useRef<Indexed[] | null>(null);

  useEffect(() => {
    setMounted(true);
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform) || /Mac OS/.test(navigator.userAgent));
  }, []);

  // Index beim ersten Öffnen lazy laden.
  const ensureIndex = useCallback(async () => {
    if (indexRef.current || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/search-index');
      const data = (await res.json()) as SearchDoc[];
      indexRef.current = buildIndex(data);
      setDocs(data);
    } catch {
      indexRef.current = [];
      setDocs([]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // ⌘K / Strg+K global zum Öffnen/Schließen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Beim Öffnen: Index laden, Fokus ins Feld, Body-Scroll sperren, Escape + Fokus-Falle, Fokus-Rückgabe.
  useEffect(() => {
    if (!open) return undefined;
    void ensureIndex();
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      const f = panel
        ? Array.from(panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])'))
        : [];
      if (!f.length) return;
      const first = f[0]!;
      const last = f[f.length - 1]!;
      const a = document.activeElement;
      if (e.shiftKey) {
        if (a === first || !panel?.contains(a)) {
          e.preventDefault();
          last.focus();
        }
      } else if (a === last || !panel?.contains(a)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open, ensureIndex]);

  const hasQuery = termsOf(query).length > 0;
  const rawTerms = useMemo(() => rawTermsOf(query), [query]);
  const results = useMemo<SearchDoc[]>(() => {
    if (!indexRef.current) return [];
    if (hasQuery) return runSearch(indexRef.current, query).map((h) => h.doc);
    return docs ?? [];
  }, [query, hasQuery, docs]);
  const shown = results.slice(0, MAX_RESULTS);

  // Aktiven Treffer bei jeder Query-Änderung zurücksetzen.
  useEffect(() => setActive(0), [query]);

  // Aktiven Eintrag in den sichtbaren Bereich scrollen.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  const go = useCallback(
    (slug: string) => {
      close();
      router.push(`/beitrag/${slug}`);
    },
    [close, router],
  );

  const onInputKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, shown.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const pick = shown[active];
      if (pick) go(pick.slug);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Suche öffnen"
        aria-keyshortcuts="Meta+K Control+K"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <MagnifierIcon />
        <span className="hidden md:inline">Suche</span>
        {mounted ? (
          <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] leading-none text-subtle lg:inline">
            {isMac ? '⌘K' : 'Strg K'}
          </kbd>
        ) : null}
      </button>

      {open
        ? createPortal(
            <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Beiträge durchsuchen">
              <button aria-label="Suche schließen" tabIndex={-1} onClick={close} className="absolute inset-0 bg-black/45 motion-safe:transition-opacity" />
              <div
                ref={panelRef}
                className="absolute inset-x-0 top-0 mx-auto mt-[8vh] flex max-h-[80vh] w-[min(40rem,92vw)] flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-2xl"
              >
                <div className="flex items-center gap-3 border-b border-line px-4 text-muted">
                  <MagnifierIcon size={18} />
                  <input
                    ref={inputRef}
                    type="search"
                    role="combobox"
                    aria-expanded={shown.length > 0}
                    aria-controls="search-modal-list"
                    aria-activedescendant={shown.length ? `search-opt-${active}` : undefined}
                    aria-label="Beiträge durchsuchen"
                    autoComplete="off"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onInputKey}
                    placeholder="Beiträge durchsuchen …"
                    className="w-full bg-transparent py-3.5 text-base text-ink placeholder:text-subtle focus:outline-none"
                  />
                  <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] leading-none text-subtle sm:inline">
                    Esc
                  </kbd>
                </div>

                <div className="overflow-y-auto">
                  {loading && !indexRef.current ? (
                    <p className="px-4 py-6 text-sm text-muted">Lädt …</p>
                  ) : hasQuery && shown.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-muted">
                      Keine Treffer für „{query.trim()}“. Versuch ein anderes Thema oder Schlagwort.
                    </p>
                  ) : (
                    <ul ref={listRef} id="search-modal-list" role="listbox" aria-label="Treffer">
                      {shown.map((doc, i) => (
                        <li key={doc.slug} role="option" aria-selected={i === active} id={`search-opt-${i}`} data-idx={i}>
                          <Link
                            href={`/beitrag/${doc.slug}`}
                            onClick={close}
                            onMouseEnter={() => setActive(i)}
                            className={`block border-b border-line/60 px-4 py-3 ${i === active ? 'bg-accent/10' : ''}`}
                          >
                            <span className="block font-display leading-tight tracking-tight text-ink">{highlight(doc.titel, rawTerms)}</span>
                            {doc.themen.length ? (
                              <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-widest text-accent">
                                {doc.themen.map((t) => t.name).join(' · ')}
                              </span>
                            ) : null}
                            <span className="mt-1 block text-sm text-muted">
                              {hasQuery ? snippet(doc, rawTerms) : doc.standfirst}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2 text-[11px] text-subtle">
                  <span className="hidden sm:inline">↑↓ wählen · ⏎ öffnen · Esc schließen</span>
                  <Link href={hasQuery ? `/suche?q=${encodeURIComponent(query.trim())}` : '/suche'} onClick={close} className="ml-auto font-mono uppercase tracking-widest text-accent hover:text-ink">
                    Alle Treffer
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
