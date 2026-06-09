'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Discovery — Mobil-Navigation für /lab/carbon-unit (< md): Hamburger + Side-Nav-Drawer
 * (Carbon-Stil). Themen-bewusst über die CSS-Variablen der Seite.
 * A11y: role=dialog/aria-modal, Fokus beim Öffnen in den Drawer, Tab zyklisch gefangen
 * (Fokus-Falle), Rückgabe des Fokus an den Auslöser beim Schließen, Escape/Backdrop/Link
 * schließen, Hintergrund-Scroll gesperrt.
 */
const NAV = [
  { label: 'Beiträge', href: '#beitraege' },
  { label: 'Bereiche', href: '#beitraege' },
  { label: 'Themen', href: '#beitraege' },
  { label: 'Methodik', href: '#vorschlag' },
];

export function CarbonUnitMobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const focusables = () =>
      panel ? Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')) : [];

    // Fokus in den Drawer (erstes fokussierbares Element).
    const initial = focusables();
    (initial[0] ?? panel)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (f.length === 0) return;
      const first = f[0]!;
      const last = f[f.length - 1]!;
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !panel?.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel?.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus(); // Fokus zurück an den Auslöser
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
        className="flex w-12 items-center justify-center transition-colors hover:bg-[var(--cu-hover)] md:hidden"
        style={{ borderRight: '1px solid var(--cu-line)', color: 'var(--cu-text)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button aria-label="Menü schließen" tabIndex={-1} onClick={() => setOpen(false)} className="absolute inset-0" style={{ background: 'rgba(0,0,0,.45)' }} />
          <nav
            ref={panelRef}
            className="absolute left-0 top-0 flex h-full w-[19rem] max-w-[86vw] flex-col"
            style={{ background: 'var(--cu-surface)', borderRight: '1px solid var(--cu-line)', color: 'var(--cu-text)', fontFamily: '"unit", sans-serif' }}
          >
            <div className="flex h-12 items-center justify-between pl-6" style={{ borderBottom: '1px solid var(--cu-line)' }}>
              <span style={{ fontWeight: 700 }}>GURT</span>
              <button type="button" aria-label="Menü schließen" onClick={() => setOpen(false)} className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-[var(--cu-hover)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <ul>
              {NAV.map((n, i) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center px-6 transition-colors hover:bg-[var(--cu-hover)]"
                    style={{ height: 56, borderBottom: '1px solid var(--cu-line)', fontWeight: 500, boxShadow: i === 0 ? 'inset 4px 0 0 0 var(--cu-primary)' : undefined }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="/suche" onClick={() => setOpen(false)} className="mt-auto flex items-center gap-3 px-6 text-sm transition-colors hover:bg-[var(--cu-hover)]" style={{ height: 56, borderTop: '1px solid var(--cu-line)', color: 'var(--cu-text2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              Suche
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
