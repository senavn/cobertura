// Gerado no build. Guarda o app inteiro para funcionar sem internet.
const CACHE = 'cobertura-1nip09i';
const FILES = ["./","./apple-touch-icon.png","./assets/index-B8idar5A.css","./assets/index-DvLaN5Z6.js","./assets/worker-B7JGypft.js","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('cobertura-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    // ignoreVary: o servidor pode mandar "Vary: Origin", e aí o script da página não casaria com o que foi guardado
    caches.match(request, { ignoreSearch: true, ignoreVary: true }).then(
      (hit) => hit || fetch(request).catch(() => (request.mode === 'navigate' ? caches.match('./', { ignoreVary: true }) : Response.error())),
    ),
  );
});
