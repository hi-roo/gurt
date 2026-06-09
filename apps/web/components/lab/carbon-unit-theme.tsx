'use client';

import { useState, type ReactNode } from 'react';

/**
 * Discovery — Umschalter für die FF-Unit/„Glut im Dunkel"-Variante:
 * — Hell/Dunkel (Palette als CSS-Variablen, `data-cu-theme`).
 * — Headline-Schrift als visueller Test (`data-cu-head`): Sans (FF Unit) ↔ Slab (FF Unit Slab)
 *   ↔ Serif (Georgia/Garamond). Nur Section-/Display-Headlines schalten um, Body bleibt FF Unit.
 */
const HEADS = ['sans', 'slab', 'serif'] as const;
type Head = (typeof HEADS)[number];
const HEAD_LABEL: Record<Head, string> = { sans: 'Sans', slab: 'Slab', serif: 'Serif' };

export function CarbonUnitTheme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [head, setHead] = useState<Head>('sans');

  return (
    <div
      data-cu-theme={theme}
      data-cu-head={head}
      style={{ minHeight: '100vh', background: 'var(--cu-bg)', color: 'var(--cu-text)', fontFamily: '"unit", sans-serif' }}
    >
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => setHead((h) => HEADS[(HEADS.indexOf(h) + 1) % HEADS.length] as Head)}
          aria-label={`Headline-Schrift wechseln (aktuell ${HEAD_LABEL[head]})`}
          className="inline-flex items-center gap-2 px-3 text-xs"
          style={{ height: 38, background: 'var(--cu-surfaceAlt)', color: 'var(--cu-text)', boxShadow: 'inset 0 0 0 1px var(--cu-line)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          <span aria-hidden="true" style={{ fontFamily: 'var(--cu-head)', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 16, lineHeight: 1 }}>Aa</span>
          {HEAD_LABEL[head]}
        </button>
        <button
          type="button"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          aria-label={theme === 'dark' ? 'Zu heller Variante wechseln' : 'Zu dunkler Variante wechseln'}
          className="inline-flex items-center gap-2 px-4 text-xs"
          style={{ height: 44, background: 'var(--cu-primary)', color: '#1c0e03', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: theme === 'dark' ? '#1c0e03' : 'transparent', boxShadow: 'inset 0 0 0 2px #1c0e03' }} />
          {theme === 'dark' ? 'Hell' : 'Dunkel'}
        </button>
      </div>
    </div>
  );
}
