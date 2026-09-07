// Service worker for The Film Dealer PWA.
// Cache-first for the app shell only. Gallery images are intentionally
// NOT cached - they update frequently when new photos are uploaded, so
// always fetching fresh is safer than risking stale images.

const CACHE_NAME = 'film-dealer-shell-v1';

// App shell files to precache (relative paths resolved against scope).
const SHELL_URLS = [
  './',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests.
  if (url.origin !== self.location.origin) return;

  // Never cache gallery images or other user content - always fetch fresh.
  if (url.pathname.includes('/images/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request).then((response) => {
        // Only cache successful GET responses.
        if (event.request.method === 'GET' && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
      // Prefer cached shell, fall back to network; on network failure use cache.
      return cached || fetched;
    })
  );
});
