// Separate page cache keys prevent the planner from replacing the hub offline.
const CACHE_NAME = 'rince-hub-v2';
const ROOT = new URL('./', self.location.href);
const CORE_ASSETS = ['index.html', 'training.html', 'hub.css?v=2', 'training-theme.css',
  'register-sw.js', 'manifest.json', 'images/dancer-guides.png', 'images/boy-guides.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key !== CACHE_NAME && (key.startsWith('dance-matrix-') || key.startsWith('rince-hub-')))
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname)) return;
  if (event.request.mode === 'navigate') {
    const cacheKey = url.pathname === ROOT.pathname ? new URL('index.html', ROOT).href : url.href;
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(cacheKey, copy)));
      }
      return response;
    }).catch(async () => (await caches.match(cacheKey)) || new Response('This page is not available offline.', {status:503, headers:{'Content-Type':'text/plain'}})));
  } else {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
  }
});
