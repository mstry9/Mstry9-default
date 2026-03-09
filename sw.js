const CACHE_NAME = "ns-stats-cache-v1";
const CORE_ASSETS = [
  "./",
  "./ns-stats.html",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // Network-first for Nightscout API
  if (req.url.includes("/api/v1/entries/sgv.json")) {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
  } else {
    // Cache-first for local files
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req))
    );
  }
});
