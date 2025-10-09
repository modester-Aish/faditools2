'use client'

import { useEffect } from 'react'

interface SEOMonitorProps {
  pageTitle?: string
  pageUrl?: string
  customEvents?: Record<string, any>
}

/**
 * SEO Monitoring Component
 * Tracks page performance and SEO metrics
 */
export default function SEOMonitor({ 
  pageTitle, 
  pageUrl, 
  customEvents = {} 
}: SEOMonitorProps) {
  
  useEffect(() => {
    // Track page view
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-LZWMMJVGJD', {
          page_title: pageTitle || document.title,
          page_location: pageUrl || window.location.href,
          send_page_view: true
        })
      }
    }

    // Track custom events
    const trackCustomEvents = () => {
      Object.entries(customEvents).forEach(([eventName, eventData]) => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', eventName, eventData)
        }
      })
    }

    // Track Web Vitals (Simplified version)
    const trackWebVitals = () => {
      if (typeof window !== 'undefined') {
        // Track page load time
        const trackPageLoadTime = () => {
          window.addEventListener('load', () => {
            const loadTime = performance.now()
            if (window.gtag) {
              window.gtag('event', 'page_load_time', {
                load_time: Math.round(loadTime),
                page_url: window.location.href
              })
            }
          })
        }

        // Track performance metrics
        const trackPerformanceMetrics = () => {
          if (window.performance && window.performance.timing) {
            const timing = window.performance.timing
            const loadTime = timing.loadEventEnd - timing.navigationStart
            
            if (window.gtag) {
              window.gtag('event', 'performance_metrics', {
                load_time: loadTime,
                dom_ready: timing.domContentLoadedEventEnd - timing.navigationStart,
                page_url: window.location.href
              })
            }
          }
        }

        trackPageLoadTime()
        trackPerformanceMetrics()
      }
    }

    // Track scroll depth
    const trackScrollDepth = () => {
      let maxScrollDepth = 0
      
      const updateScrollDepth = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = Math.round((scrollTop / docHeight) * 100)
        
        if (scrollPercent > maxScrollDepth) {
          maxScrollDepth = scrollPercent
          
          // Track milestone scroll depths
          if ([25, 50, 75, 90].includes(scrollPercent)) {
            if (window.gtag) {
              window.gtag('event', 'scroll_depth', {
                scroll_percent: scrollPercent,
                page_url: window.location.href
              })
            }
          }
        }
      }

      window.addEventListener('scroll', updateScrollDepth, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', updateScrollDepth)
      }
    }

    // Track time on page
    const trackTimeOnPage = () => {
      const startTime = Date.now()
      
      const trackTime = () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000)
        
        if (window.gtag) {
          window.gtag('event', 'time_on_page', {
            time_seconds: timeOnPage,
            page_url: window.location.href
          })
        }
      }

      // Track time on page every 30 seconds
      const interval = setInterval(trackTime, 30000)
      
      // Track time on page when user leaves
      const handleBeforeUnload = () => {
        trackTime()
      }

      window.addEventListener('beforeunload', handleBeforeUnload)
      
      return () => {
        clearInterval(interval)
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }

    // Initialize tracking
    trackPageView()
    trackCustomEvents()
    trackWebVitals()
    
    const cleanupScroll = trackScrollDepth()
    const cleanupTime = trackTimeOnPage()

    // Cleanup
    return () => {
      cleanupScroll()
      cleanupTime()
    }
  }, [pageTitle, pageUrl, customEvents])

  return null // This component doesn't render anything
}

// Utility functions for tracking specific events
export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData)
  }
}

export const trackPurchase = (transactionId: string, value: number, currency: string = 'USD', items: any[] = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items
    })
  }
}

export const trackToolView = (toolName: string, toolCategory: string) => {
  trackEvent('view_tool', {
    tool_name: toolName,
    tool_category: toolCategory,
    page_url: window.location.href
  })
}

export const trackPackageView = (packageName: string, packagePrice: string) => {
  trackEvent('view_package', {
    package_name: packageName,
    package_price: packagePrice,
    page_url: window.location.href
  })
}

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
    page_url: window.location.href
  })
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}
