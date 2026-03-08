import { getPages } from '@/lib/local-content'

export interface NavigationItem {
  title: string
  slug: string
  url: string
  menu_order: number
  id: number
  status: string
}

// Pages to exclude from navigation
const EXCLUDED_SLUGS = [
  'home',
  'index',
  'main',
  'privacy-policy',
  'terms-of-service',
  '404',
  'search',
  'sitemap',
  'robots',
  'admin',
  'wp-admin',
  'wp-login',
]

// Cache for navigation data
let navigationCache: NavigationItem[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 60 * 1000 // 1 minute (reduced from 5 minutes for faster updates)

/** Page shape returned by our /api/pages proxy (avoids CORS from direct WP fetch in browser) */
interface ApiPage {
  id: number
  title: string
  slug: string
  status?: string
  menu_order?: number
}

function toNavigationItems(pages: ApiPage[]): NavigationItem[] {
  return pages
    .filter(page => {
      if ((page.status ?? 'publish') !== 'publish') return false
      if (EXCLUDED_SLUGS.includes(page.slug)) return false
      if (page.slug.includes('draft') || page.slug.includes('private')) return false
      return true
    })
    .map(page => ({
      title: page.title,
      slug: page.slug,
      url: `/pages/${page.slug}`,
      menu_order: page.menu_order ?? 0,
      id: page.id,
      status: page.status ?? 'publish',
    }))
    .sort((a, b) => {
      if (a.menu_order !== b.menu_order) return a.menu_order - b.menu_order
      return a.title.localeCompare(b.title)
    })
}

export async function fetchNavigationData(): Promise<NavigationItem[]> {
  if (navigationCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return navigationCache
  }

  try {
    // In the browser, use our API proxy which now serves from local JSON.
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/pages', { cache: 'no-store' })
      if (!res.ok) return []
      const pages: ApiPage[] = await res.json()
      const items = toNavigationItems(Array.isArray(pages) ? pages : [])
      navigationCache = items
      cacheTimestamp = Date.now()
      return items
    }

    const pages = getPages()

    const navigationItems: NavigationItem[] = pages
      .filter(page => {
        if (page.status !== 'publish') return false
        if (EXCLUDED_SLUGS.includes(page.slug)) return false
        if (page.slug.includes('draft') || page.slug.includes('private')) return false
        return true
      })
      .map(page => ({
        title: page.title,
        slug: page.slug,
        url: `/pages/${page.slug}`,
        menu_order: (page as any).menu_order || 0,
        id: page.id,
        status: page.status || 'publish',
      }))
      .sort((a, b) => {
        if (a.menu_order !== b.menu_order) return a.menu_order - b.menu_order
        return a.title.localeCompare(b.title)
      })

    navigationCache = navigationItems
    cacheTimestamp = Date.now()
    return navigationItems
  } catch (error) {
    console.error('Error fetching navigation data:', error)
    return []
  }
}

// Function to clear navigation cache (useful for development)
export function clearNavigationCache(): void {
  navigationCache = null
  cacheTimestamp = 0
}

// Function to get cache status
export function getNavigationCacheStatus(): {
  hasCache: boolean
  age: number
  itemCount: number
} {
  return {
    hasCache: navigationCache !== null,
    age: navigationCache ? Date.now() - cacheTimestamp : 0,
    itemCount: navigationCache ? navigationCache.length : 0,
  }
}

// Function to check if a page should be included in navigation
export function shouldIncludeInNavigation(page: WordPressPage): boolean {
  if (page.status !== 'publish') return false
  if (EXCLUDED_SLUGS.includes(page.slug)) return false
  if (page.slug.includes('draft') || page.slug.includes('private')) return false
  return true
}

// Function to get navigation items for a specific parent page
export function getChildPages(parentId: number, allPages: NavigationItem[]): NavigationItem[] {
  return allPages.filter(page => {
    // This would need to be implemented based on your WordPress page hierarchy
    // For now, return empty array as most WordPress sites don't use page hierarchy in navigation
    return false
  })
}
