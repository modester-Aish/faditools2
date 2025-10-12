/**
 * Service Worker for FadiTools
 * 
 * Provides offline caching and performance improvements
 * Caches static assets and API responses
 */

const CACHE_NAME = 'faditools-v1.0.0'
const STATIC_CACHE = 'faditools-static-v1.0.0'
const DYNAMIC_CACHE = 'faditools-dynamic-v1.0.0'

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

// Fetch event - serve from cache, fallback to network
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
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache:', url.pathname)
          return cachedResponse
        }
        
        // Otherwise fetch from network
        console.log('Service Worker: Fetching from network:', url.pathname)
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse
            }
            
            // Cache successful responses
            const responseToCache = networkResponse.clone()
            
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache)
              })
            
            return networkResponse
          })
          .catch((error) => {
            console.log('Service Worker: Network error:', error)
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/')
            }
            
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