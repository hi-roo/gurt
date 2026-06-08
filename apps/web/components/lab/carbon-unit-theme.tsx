'use client';

import { useState, type ReactNode } from 'react';

/**
 * Discovery — Hell/Dunkel-Umschalter für die FF-Unit/„Glut im Dunkel"-Variante.
 * Setzt `data-cu-theme` am Wurzel-Div; die Palette lebt als CSS-Variablen (siehe Seite),
 * sodass die server-gerenderten Kinder ohne Re-Render umschalten. Vorbereitung für den
 * späteren globalen Dark-Mode-Track.
 */
export function CarbonUnitTheme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  return (
    <div
      data-cu-theme={theme}
      style={{ minHeight: '100vh', background: 'var(--cu-bg)', color: 'var(--cu-text)', fontFamily: '"unit", sans-serif' }}
    >
      {children}
      <button
        type="button"
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        aria-label={theme === 'dark' ? 'Zu heller Variante wechseln' : 'Zu dunkler Variante wechseln'}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 px-4 text-xs"
        style={{ height: 44, background: 'var(--cu-primary)', color: '#1c0e03', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
      >
        <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: theme === 'dark' ? '#1c0e03' : 'transparent', boxShadow: 'inset 0 0 0 2px #1c0e03' }} />
        {theme === 'dark' ? 'Hell' : 'Dunkel'}
      </button>
    </div>
  );
}
