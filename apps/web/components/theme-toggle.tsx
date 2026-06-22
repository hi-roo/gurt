'use client';

import { useEffect, useState } from 'react';

/**
 * Globaler Hell/Dunkel-Umschalter. Schaltet die `.dark`-Klasse am <html> und speichert die
 * Wahl in localStorage. Ohne explizite Wahl folgt die Darstellung `prefers-color-scheme`
 * (auch reaktiv). Die Icons sind CSS-getrieben (`dark:`-Variante) → kein Hydration-Mismatch;
 * der initiale Zustand kommt aus dem No-Flash-Script in app/layout.tsx.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      let explicit: string | null = null;
      try {
        explicit = localStorage.getItem('theme');
      } catch {
        return;
      }
      if (explicit) return; // explizite Wahl hat Vorrang
      document.documentElement.classList.toggle('dark', mq.matches);
      setDark(mq.matches);
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* localStorage nicht verfügbar (z. B. Private Mode) — Klasse wirkt trotzdem für die Session */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mounted ? dark : undefined}
      aria-label="Dunkler Modus"
      title={mounted ? (dark ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln') : 'Darstellung umschalten'}
      className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-ink [&_svg]:size-[21px] md:[&_svg]:size-[18px]"
    >
      {/* Mond — sichtbar im Hellmodus (Klick → Dunkel) */}
      <svg className="dark:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      {/* Sonne — sichtbar im Dunkelmodus (Klick → Hell) */}
      <svg className="hidden dark:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
      </svg>
    </button>
  );
}
