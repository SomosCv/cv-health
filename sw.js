// Static service worker for the active no-build demo client.
// For a new static client deployment, manually update CLIENT and PRECACHE.
const APP_VERSION = '1.0.0';
const CACHE = `epng-${APP_VERSION}`;
const CLIENT = './clients/emergency-preparedness-knoxville/';

const PRECACHE = [
  './',
  './index.html',
  './active-client.json',
  './core/app.js',
  './core/styles.css',
  './vendor/fontawesome/css/all.min.css',
  `${CLIENT}config.json`,
  `${CLIENT}manifest.json`,
  `${CLIENT}theme.css`,
  `${CLIENT}languages/en.json`,
  `${CLIENT}languages/es.json`,
  `${CLIENT}data/cards.json`,
  `${CLIENT}data/checklists.json`,
  `${CLIENT}data/flows.json`,
  `${CLIENT}data/resources.json`,
  `${CLIENT}data/roles.json`,
  `${CLIENT}data/sections.json`,
  `${CLIENT}assets/icons/icon-192.png`,
  `${CLIENT}assets/icons/icon-512.png`,
  `${CLIENT}assets/images/background.jpg`,
  `${CLIENT}assets/logos/logo.png`,
  `${CLIENT}assets/pdfs/emergency-preparedness-neighborhood-guide.pdf`
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('epng-') && key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        const copy = res.clone();
        const url = new URL(req.url);
        if (url.origin === self.location.origin && res.ok) {
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => new Response('', {
        status: 503,
        statusText: 'Offline and not cached'
      }));
    })
  );
});
