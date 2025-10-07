import { WordPressPage, WordPressPost, WordPressApiResponse } from '@/types/wordpress'

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'

// Cache for storing API responses
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 60 * 1000 // 1 minute cache (reduced from 5 minutes for faster updates)

// Generic fetch function with caching and error handling
async function fetchWithCache<T>(
  url: string,
  options?: RequestInit
): Promise<WordPressApiResponse<T>> {
  const cacheKey = `${url}-${JSON.stringify(options || {})}`
  const cached = cache.get(cacheKey)

  // Return cached data if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { data: cached.data, error: null, loading: false }
  }

  try {
    // Add cache-busting timestamp to URL
    const timestamp = Date.now()
    const separator = url.includes('?') ? '&' : '?'
    const urlWithTimestamp = `${url}${separator}_t=${timestamp}`
    
    const response = await fetch(urlWithTimestamp, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...options?.headers,
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Cache the successful response
    cache.set(cacheKey, { data, timestamp: Date.now() })

    return { data, error: null, loading: false }
  } catch (error) {
    console.error(`WordPress API Error for ${url}:`, error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      loading: false
    }
  }
}

// WordPress Pages API functions
export async function fetchAllPages(): Promise<WordPressApiResponse<WordPressPage[]>> {
  return fetchWithCache<WordPressPage[]>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/pages?per_page=100`)
}

export async function fetchPageBySlug(slug: string): Promise<WordPressApiResponse<WordPressPage[]>> {
  return fetchWithCache<WordPressPage[]>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`)
}

export async function fetchPageById(id: number): Promise<WordPressApiResponse<WordPressPage>> {
  return fetchWithCache<WordPressPage>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/pages/${id}`)
}

// WordPress Posts API functions
export async function fetchAllPosts(): Promise<WordPressApiResponse<WordPressPost[]>> {
  return fetchWithCache<WordPressPost[]>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/posts?per_page=100&_embed`)
}

export async function fetchPostBySlug(slug: string): Promise<WordPressApiResponse<WordPressPost[]>> {
  return fetchWithCache<WordPressPost[]>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`)
}

export async function fetchPostById(id: number): Promise<WordPressApiResponse<WordPressPost>> {
  return fetchWithCache<WordPressPost>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/posts/${id}`)
}

// WordPress Media API functions
export async function fetchMediaById(id: number): Promise<WordPressApiResponse<any>> {
  return fetchWithCache<any>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/media/${id}`)
}

export async function fetchAllMedia(): Promise<WordPressApiResponse<any[]>> {
  return fetchWithCache<any[]>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/media?per_page=100`)
}

// WordPress Categories API functions
export async function fetchCategories(): Promise<WordPressApiResponse<any[]>> {
  return fetchWithCache<any[]>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/categories?per_page=100`)
}

// WordPress Tags API functions
export async function fetchTags(): Promise<WordPressApiResponse<any[]>> {
  return fetchWithCache<any[]>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/tags?per_page=100`)
}

// WordPress Menus API functions (if available)
export async function fetchMenus(): Promise<WordPressApiResponse<any[]>> {
  return fetchWithCache<any[]>(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/menus`)
}

// Utility functions for filtering and processing
export function filterPublishedPages(pages: WordPressPage[]): WordPressPage[] {
  return pages.filter(page => page.status === 'publish')
}

export function filterPublishedPosts(posts: WordPressPost[]): WordPressPost[] {
  return posts.filter(post => post.status === 'publish')
}

export function sortByDate<T extends { date: string }>(items: T[], ascending: boolean = false): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return ascending ? dateA - dateB : dateB - dateA
  })
}

// Helper function to extract rendered content
export function getRenderedContent(content: { rendered: string; protected?: boolean }): string {
  return content?.rendered || ''
}

// Helper function to get page/post title
export function getTitle(item: WordPressPage | WordPressPost): string {
  return getRenderedContent(item.title)
}

// Helper function to get page/post content
export function getContent(item: WordPressPage | WordPressPost): string {
  return getRenderedContent(item.content)
}

// Helper function to get page/post excerpt
export function getExcerpt(item: WordPressPage | WordPressPost): string {
  return item.excerpt ? getRenderedContent(item.excerpt) : ''
}

// Helper function to get featured image URL
export function getFeaturedImageUrl(item: WordPressPage | WordPressPost): string | null {
  if (item.featured_media && item.featured_media > 0) {
    return `${WORDPRESS_BASE_URL}/wp-content/uploads/${item.featured_media}`
  }
  return null
}

// Utility function to clear cache (useful for development)
export function clearWordPressCache(): void {
  cache.clear()
}

// Utility function to get cache stats
export function getWordPressCacheStats(): { size: number; entries: string[] } {
  return {
    size: cache.size,
    entries: Array.from(cache.keys())
  }
}

// Force refresh functions that bypass cache
export async function forceRefreshAllPages(): Promise<WordPressApiResponse<WordPressPage[]>> {
  // Clear cache for this endpoint
  const cacheKey = `${WORDPRESS_ENDPOINTS.pages}-${JSON.stringify({})}`
  cache.delete(cacheKey)
  return fetchAllPages()
}

export async function forceRefreshPageBySlug(slug: string): Promise<WordPressApiResponse<WordPressPage[]>> {
  const cacheKey = `${WORDPRESS_ENDPOINTS.pageBySlug(slug)}-${JSON.stringify({})}`
  cache.delete(cacheKey)
  return fetchPageBySlug(slug)
}

export async function forceRefreshAllPosts(): Promise<WordPressApiResponse<WordPressPost[]>> {
  const cacheKey = `${WORDPRESS_ENDPOINTS.posts}-${JSON.stringify({})}`
  cache.delete(cacheKey)
  return fetchAllPosts()
}

export async function forceRefreshPostBySlug(slug: string): Promise<WordPressApiResponse<WordPressPost[]>> {
  const cacheKey = `${WORDPRESS_ENDPOINTS.postBySlug(slug)}-${JSON.stringify({})}`
  cache.delete(cacheKey)
  return fetchPostBySlug(slug)
}

// WordPress API endpoints for reference
export const WORDPRESS_ENDPOINTS = {
  pages: `${WORDPRESS_BASE_URL}/wp-json/wp/v2/pages`,
  posts: `${WORDPRESS_BASE_URL}/wp-json/wp/v2/posts`,
  media: `${WORDPRESS_BASE_URL}/wp-json/wp/v2/media`,
  categories: `${WORDPRESS_BASE_URL}/wp-json/wp/v2/categories`,
  tags: `${WORDPRESS_BASE_URL}/wp-json/wp/v2/tags`,
  menus: `${WORDPRESS_BASE_URL}/wp-json/wp/v2/menus`,
  pageBySlug: (slug: string) => `${WORDPRESS_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`,
  postBySlug: (slug: string) => `${WORDPRESS_BASE_URL}/wp-json/wp/v2/posts?slug=${slug}`,
  pageById: (id: number) => `${WORDPRESS_BASE_URL}/wp-json/wp/v2/pages/${id}`,
  postById: (id: number) => `${WORDPRESS_BASE_URL}/wp-json/wp/v2/posts/${id}`,
  mediaById: (id: number) => `${WORDPRESS_BASE_URL}/wp-json/wp/v2/media/${id}`,
} as const


