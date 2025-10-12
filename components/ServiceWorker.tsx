'use client'

import { useEffect } from 'react'

/**
 * Service Worker Registration
 * 
 * Registers service worker for offline caching and performance
 */

export default function ServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker: Registered successfully')
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('Service Worker: New version available')
                  // You can show a notification to user here
                }
              })
            }
          })
        })
        .catch((error) => {
          console.log('Service Worker: Registration failed', error)
        })
      
      // Handle service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker: Controller changed')
        // Reload page to get new version
        window.location.reload()
      })
    }
  }, [])

  return null // This component doesn't render anything
}
