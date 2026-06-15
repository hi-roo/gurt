'use client';

import { useEffect } from 'react';

/**
 * Aufräumer: deregistriert einen früher registrierten Service Worker und löscht dessen Caches —
 * eigenständig im Seiten-Kontext, unabhängig vom SW-Update-Zyklus. Früher wurde hier ein
 * netzwerk-first-SW registriert; der fing jede Navigation ab (kein bfcache, SW-Kaltstart je
 * Navigation) und brachte für eine Nachrichtenseite kaum Nutzen. Bleibt aktiv, bis alle Clients
 * sauber sind; danach kann die Komponente entfernt werden.
 */
export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (const registration of registrations) registration.unregister();
      })
      .catch(() => {
        /* best-effort: Aufräumen darf die Seite nie beeinträchtigen. */
      });
    if (typeof caches !== 'undefined') {
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .catch(() => {
          /* best-effort */
        });
    }
  }, []);
  return null;
}
