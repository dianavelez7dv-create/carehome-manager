// CareHome Manager Service Worker v5
const CACHE = 'carehome-v5';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    })
  );
  return self.clients.claim();
});

// Siempre red primero — si falla, caché
self.addEventListener('fetch', function(e) {
  // Solo manejar peticiones GET
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // Solo cachear respuestas válidas
        if (response && response.status === 200) {
          var r = response.clone();
          caches.open(CACHE).then(function(cache) {
            cache.put(e.request, r);
          });
        }
        return response;
      })
      .catch(function() {
        return caches.match(e.request);
      })
  );
});
