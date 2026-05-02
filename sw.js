const CACHE = 'naaimicode-v1';
const FILES = [
  '/naaimicode/',
  '/naaimicode/index.html',
  '/naaimicode/shakhbat_music.html',
  '/naaimicode/manifest.json',
  '/naaimicode/icon-192.png',
  '/naaimicode/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/naaimicode/index.html')))
  );
});
