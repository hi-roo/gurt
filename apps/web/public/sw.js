// GURT Service Worker — schlankes Fundament für künftiges Offline.
// Strategie: NETZWERK-FIRST. Nur Seiten-Navigationen werden abgefangen; ist das Netz
// weg, kommt die Offline-Seite. Assets, API und Sanity bleiben unberührt → für Online-
// Nutzer nie veraltete Inhalte (entscheidend für eine Nachrichten-/Journalismus-Seite).
const VERSION = 'gurt-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.add(OFFLINE_URL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || request.mode !== 'navigate') return;
  event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
});
