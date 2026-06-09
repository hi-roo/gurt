'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

/**
 * Globale Mobil-Navigation (< md): Hamburger + Side-Nav-Drawer (Carbon-Stil), token-getrieben
 * (passt sich Hell/Dunkel an). A11y: role=dialog/aria-modal, Fokus in den Drawer, Tab zyklisch
 * gefangen (Fokus-Falle), Rückgabe des Fokus an den Auslöser, Escape/Backdrop/Link schließen,
 * Hintergrund-Scroll gesperrt.
 */
type Ressort = { slug: string; name: string };

const PRIMARY = [
  { label: 'Themen', href: '/themen' },
  { label: 'Über', href: '/ueber' },
  { label: 'Suche', href: '/suche' },
];

export function SiteMobileNav({ ressorts }: { ressorts: Ressort[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const focusables = () =>
      panel ? Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')) : [];
    (focusables()[0] ?? panel)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables();
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Menü öffnen"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-ml-2 inline-flex min-h-11 min-w-11 items-center justify-center text-ink md:hidden"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {open ? createPortal(
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button aria-label="Menü schließen" tabIndex={-1} onClick={() => setOpen(false)} className="absolute inset-0 bg-black/45" />
          <nav ref={panelRef} className="absolute inset-y-0 left-0 flex w-[19rem] max-w-[86vw] flex-col overflow-y-auto border-r border-line bg-surface">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-line pl-5">
              <span className="text-lg font-bold text-ink">GURT</span>
              <button type="button" aria-label="Menü schließen" onClick={() => setOpen(false)} className="flex h-14 w-14 items-center justify-center text-ink hover:bg-ink/5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </div>
            <ul>
              {PRIMARY.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="flex min-h-[3.25rem] items-center border-b border-line px-5 text-base text-ink hover:bg-ink/5">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            {ressorts.length ? (
              <>
                <p className="px-5 pb-2 pt-5 font-mono text-[11px] uppercase tracking-widest text-subtle">Bereiche</p>
                <ul className="pb-4">
                  {ressorts.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/ressort/${r.slug}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center px-5 text-sm text-muted hover:bg-ink/5 hover:text-ink">
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </nav>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
