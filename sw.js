const CACHE = 'carb-cycle-v1';
const URLS = [
  '.',
  'index.html',
  'tracker.html',
  'manifest.json',
  'icons/icon.svg',
  'icons/icon-192.svg',
  'wechat-pay.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => new Response('离线模式', {status: 200})))
  );
});
