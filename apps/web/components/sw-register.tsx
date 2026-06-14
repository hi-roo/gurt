'use client';

import { useEffect } from 'react';

/**
 * Registriert den Service Worker — NUR in Produktion (im Dev-Server würde er HMR/Preview
 * stören). Rendert nichts. Fundament für künftiges Offline (siehe `public/sw.js`).
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* Registrierung ist best-effort; Fehler dürfen die Seite nicht beeinträchtigen. */
    });
  }, []);
  return null;
}
