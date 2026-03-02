/**
 * Minimal Service Worker for FadiTools
 *
 * IMPORTANT: No runtime caching at all.
 * Every request goes directly to the network so
 * WordPress/WooCommerce updates are always fresh.
 */

// Bump version so browsers pick up the new no-cache SW
const SW_VERSION = 'faditools-v1.0.3'

// Install: activate immediately
self.addEventListener('install', (event) => {
  console.log('Service Worker install:', SW_VERSION)
  event.waitUntil(self.skipWaiting())
})

// Activate: clear all old caches and take control
self.addEventListener('activate', (event) => {
  console.log('Service Worker activate (no caching):', SW_VERSION)
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map((name) => caches.delete(name)))).then(() => self.clients.claim())
  )
})

// Fetch: DO NOTHING – let browser/network handle everything
// This guarantees no SW-level cache for HTML, JSON, or assets.