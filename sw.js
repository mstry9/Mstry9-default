// --- Nightscout Stats: Always-Fresh Service Worker ---
// Version 2 - forces Safari to reload updated HTML/JS/CSS

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Always fetch from network, never cache HTML/JS/CSS
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  event.respondWith(
    fetch(req, { cache: "no-store" }).catch(() => fetch(req))
  );
});
