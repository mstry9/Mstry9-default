// --- Nightscout Stats: Always-Fresh Service Worker ---
// This service worker forces Safari/iOS to always load the newest
// HTML/JS/CSS while preserving localStorage and user data.
// It does NOT cache anything except the service worker itself.

self.addEventListener("install", (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control of all clients immediately
  event.waitUntil(self.clients.claim());
});

// Always fetch from network, never cache HTML/JS/CSS
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== "GET") return;

  // Force network fetch for everything
  event.respondWith(
    fetch(req, { cache: "no-store" }).catch(() => {
      // If offline, fall back to normal fetch (may hit browser cache)
      return fetch(req);
    })
  );
});
