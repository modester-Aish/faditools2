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

    // Track Web Vitals
    const trackWebVitals = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Import web-vitals with proper typing
          const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals')
          
          // Track Core Web Vitals
          if (getCLS) {
            getCLS((metric: any) => {
              console.log('CLS:', metric)
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'CLS',
                  metric_value: Math.round(metric.value * 1000) / 1000,
                  metric_delta: Math.round(metric.delta * 1000) / 1000
                })
              }
            })
          }

          if (getFID) {
            getFID((metric: any) => {
              console.log('FID:', metric)
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'FID',
                  metric_value: Math.round(metric.value),
                  metric_delta: Math.round(metric.delta)
                })
              }
            })
          }

          if (getFCP) {
            getFCP((metric: any) => {
              console.log('FCP:', metric)
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'FCP',
                  metric_value: Math.round(metric.value),
                  metric_delta: Math.round(metric.delta)
                })
              }
            })
          }

          if (getLCP) {
            getLCP((metric: any) => {
              console.log('LCP:', metric)
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'LCP',
                  metric_value: Math.round(metric.value),
                  metric_delta: Math.round(metric.delta)
                })
              }
            })
          }

          if (getTTFB) {
            getTTFB((metric: any) => {
              console.log('TTFB:', metric)
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'TTFB',
                  metric_value: Math.round(metric.value),
                  metric_delta: Math.round(metric.delta)
                })
              }
            })
          }
        } catch (error) {
          console.error('Error loading web-vitals:', error)
        }
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
