// health-sw.js - Service Worker for Somos.CV Health Resources PWA

const CACHE_NAME = 'somos-cv-health-v1';

// Files to cache on install
const FILES_TO_CACHE = [
  '/health/',
  '/health/index.html',
  '/health/cv-health-styles.css',
  '/health/ri_logo.png',
  '/health/ri-bg.mp4',
  '/health/health-manifest.json'
];

// External resources to cache
const EXTERNAL_CACHE = [
  'https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching core assets');
      // Cache local files
      return cache.addAll(FILES_TO_CACHE).catch((err) => {
        console.log('[SW] Cache error for local files:', err);
        // Continue even if some files fail (like missing video)
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
  
  // Skip non-GET requests and chrome-extension
  if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') {
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
          // Cache successful responses
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      }).catch(() => {
        // If both cache and network fail, return a fallback
        if (event.request.destination === 'style') {
          return new Response('/* Fallback CSS */', { headers: { 'Content-Type': 'text/css' } });
        }
        return new Response('', { status: 200 });
      })
    );
    return;
  }

  // For our own assets: network-first for API-like content, cache-first for static
  if (url.pathname.includes('.mp4') || url.pathname.includes('.css') || 
      url.pathname.includes('.js') && !url.pathname.includes('health-sw.js')) {
    // Cache-first for static assets
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
            return caches.match('/health/index.html');
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
      url: data.url || '/health/'
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
    clients.openWindow(event.notification.data.url || '/health/')
  );
});