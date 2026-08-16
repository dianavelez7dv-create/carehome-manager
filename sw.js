// Versión del caché — cambiar este número fuerza actualización
const CACHE = 'carehome-v3';

// Instalar — sin pre-caché para evitar problemas
self.addEventListener('install', function(e) {
  self.skipWaiting(); // activar inmediatamente
});

// Activar — eliminar cachés viejos
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch — red primero, caché como respaldo
// Esto garantiza que siempre se vea la versión más nueva
self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // Guardar copia fresca en caché
        var clone = response.clone();
        caches.open(CACHE).then(function(cache) {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(function() {
        // Si no hay red, usar caché
        return caches.match(e.request);
      })
  );
});
