// GURT Service Worker — KILL-SWITCH.
// Frühere Versionen fingen jede Navigation ab (netzwerk-first) → kein bfcache, SW-Kaltstart je
// Navigation. Das wird hier vollständig zurückgenommen: KEIN fetch-Handler mehr, und diese Version
// deregistriert sich selbst und löscht alle SW-Caches, sobald ein Client sie lädt. Die Datei bleibt
// bestehen, bis sicher alle Clients sauber sind; danach kann sie entfernt werden.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => {
        /* Cache-Löschen ist best-effort. */
      })
      .then(() => self.registration.unregister())
      .catch(() => {
        /* unregister ist best-effort. */
      }),
  );
});
