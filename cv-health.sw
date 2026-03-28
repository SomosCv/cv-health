// health-sw.js - Service Worker for Somos.CV Health Resources PWA

const CACHE_NAME = 'somos-cv-health-v1';

// Files to cache on install
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/cv-health-styles.css',
  '/ri_logo.png',
  '/ri-bg.mp4',
  '/health-manifest.json',
  '/cv-health.js'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching core assets');
      return cache.addAll(FILES_TO_CACHE).catch((err) => {
        console.log('[SW] Cache error:', err);
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[SW] Removing old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external resources that don't need offline support
  if (url.hostname.includes('google-analytics') || 
      url.hostname.includes('googletagmanager') ||
      url.pathname.includes('sockjs')) {
    return;
  }

  // For external CSS/JS from CDNs, try cache-first with network fallback
  if (url.hostname.includes('fonts.bunny.net') ||
      url.hostname.includes('cdnjs.cloudflare.com') ||
      url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      }).catch(() => {
        if (event.request.destination === 'style') {
          return new Response('/* Fallback CSS */', { headers: { 'Content-Type': 'text/css' } });
        }
        return new Response('', { status: 200 });
      })
    );
    return;
  }

  // For our own assets: cache-first for static assets
  if (url.pathname.includes('.mp4') || 
      url.pathname.includes('.css') || 
      url.pathname.includes('.js') && !url.pathname.includes('health-sw.js') ||
      url.pathname.includes('.png')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  } else {
    // Network-first for HTML pages with cache fallback
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline page for HTML requests
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
          return new Response('Offline content not available', { status: 404 });
        });
      })
    );
  }
});

// Handle push notifications (optional - for future use)
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body || 'New health resource available',
    icon: '/ri_logo.png',
    badge: '/ri_logo.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Somos.CV Health', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});