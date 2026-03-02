/**
 * Service Worker for FadiTools
 * 
 * Provides offline caching and performance improvements
 * Caches static assets and API responses
 */

// Bump version when changing caching strategy
const CACHE_NAME = 'faditools-v1.0.2'
const STATIC_CACHE = 'faditools-static-v1.0.2'
const DYNAMIC_CACHE = 'faditools-dynamic-v1.0.2'

// Assets to cache immediately (mobile-optimized)
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/faditools-favicon.svg',
  '/data/homepage-products.json',
  '/data/homepage-categories.json'
]

// Mobile-specific assets
const MOBILE_ASSETS = [
  '/data/homepage-products.json',
  '/data/homepage-categories.json'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Installation complete')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activation complete')
        return self.clients.claim()
      })
  )
})

// Fetch event - control caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // IMPORTANT: Don't intercept cross-origin requests.
  // This prevents CORS preflight issues (e.g. cache-control header) for WordPress/WooCommerce API calls.
  if (url.origin !== self.location.origin) {
    return
  }

  // Always use network-first for navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Do not cache HTML navigations; we want the freshest content on normal refresh.
          return networkResponse
        })
        .catch((error) => {
          console.log('Service Worker: Navigation network error:', error)
          // Fallback to cached page or home when offline
          return caches.match(request).then((cached) => cached || caches.match('/'))
        })
    )
    return
  }

  // Network-first strategy for /data/ JSON (homepage data etc.)
  if (url.pathname.startsWith('/data/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse
          }
          const responseToCache = networkResponse.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache)
          })
          return networkResponse
        })
        .catch((error) => {
          console.log('Service Worker: Network error for /data/ request:', error)
          return caches.match(request)
        })
    )
    return
  }

  // Cache-first ONLY for static build assets (avoid caching app routes/API responses)
  const isStaticAsset =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/_next/image') ||
    url.pathname === '/favicon.ico' ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.gif') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js')

  if (!isStaticAsset) {
    // Network-only for everything else (ensures normal refresh never shows old cached HTML/data)
    event.respondWith(fetch(request))
    return
  }

  // Default: cache-first for static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('Service Worker: Serving from cache:', url.pathname)
        return cachedResponse
      }

      console.log('Service Worker: Fetching from network:', url.pathname)
      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse
          }

          const responseToCache = networkResponse.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache)
          })

          return networkResponse
        })
        .catch((error) => {
          console.log('Service Worker: Network error:', error)
          throw error
        })
    })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered')
    
    event.waitUntil(
      // Handle offline actions when connection is restored
      Promise.resolve()
    )
  }
})

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/faditools-favicon.svg',
    badge: '/faditools-favicon.svg',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  
  event.waitUntil(
    self.registration.showNotification('FadiTools', options)
  )
})