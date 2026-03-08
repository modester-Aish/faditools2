import { fetchPages, fetchBlogPosts, fetchProducts } from '@/lib/local-wp'
import { getTools } from '@/lib/api'
import { MetadataRoute } from 'next'
import { getAllPopularTools } from '@/data/popular-tools'

/**
 * Sitemap Auto-Update System:
 * - Revalidates every 5 minutes (300 seconds)
 * - Automatically includes ALL new WordPress pages when published
 * - Automatically includes ALL new blog posts when published
 * - Automatically includes ALL new WooCommerce products when published
 * - No manual intervention needed - fully automatic!
 */
export const revalidate = 300 // Revalidate every 5 minutes for faster updates

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://faditools.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pages`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    // Important EEAT Pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/editorial-guidelines`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/authors-team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Popular tools pages (from popular-tools.ts) - these are at /[slug] (direct slug)
  const popularTools = getAllPopularTools()
  const popularToolPages = popularTools.map(tool => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Higher priority for popular tools
  }))
  
  // Regular tools from API (use slug if available, otherwise id)
  let apiToolPages: MetadataRoute.Sitemap = []
  try {
    const tools = await getTools()
    apiToolPages = tools.map(tool => ({
      url: `${baseUrl}/${tool.slug || tool.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching tools for sitemap:', error)
  }

  try {
    // Fetch WordPress pages (direct slug, no /pages/ prefix)
    const pages = await fetchPages()
    const wordPressPages = pages
      ?.filter(page => page.status === 'publish')
      .map(page => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.modified || page.date || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })) || []

    // Fetch WordPress posts - AUTO-UPDATES when new posts are published
    const posts = await fetchBlogPosts()
    const wordPressPosts = posts
      ?.filter(post => post.status === 'publish' && post.slug) // Only published posts with slugs
      .map(post => ({
        url: `${baseUrl}/${post.slug}`,
        lastModified: new Date(post.modified || post.date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })) || []

    // Products from local JSON (first 100 in main sitemap)
    const products = await fetchProducts()
    const wordPressProducts: MetadataRoute.Sitemap = products
      .filter(product => product.status === 'publish' && product.slug)
      .slice(0, 100)
      .map(product => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: new Date(product.modified || product.date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))

    // Combine all pages and remove duplicates based on URL
    const allPages = [...staticPages, ...popularToolPages, ...apiToolPages, ...wordPressPages, ...wordPressPosts, ...wordPressProducts]
    
    // Remove duplicates using a Map (keeps first occurrence, higher priority)
    const uniquePagesMap = new Map<string, MetadataRoute.Sitemap[0]>()
    
    allPages.forEach(page => {
      const url = page.url
      // If URL already exists, keep the one with higher priority
      if (!uniquePagesMap.has(url) || (uniquePagesMap.get(url)?.priority || 0) < (page.priority || 0)) {
        uniquePagesMap.set(url, page)
      }
    })
    
    // Convert back to array
    const uniquePages = Array.from(uniquePagesMap.values())
    
    return uniquePages
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Remove duplicates in error case too
    const errorPages = [...staticPages, ...popularToolPages, ...apiToolPages]
    const uniqueErrorPagesMap = new Map<string, MetadataRoute.Sitemap[0]>()
    errorPages.forEach(page => {
      const url = page.url
      if (!uniqueErrorPagesMap.has(url) || (uniqueErrorPagesMap.get(url)?.priority || 0) < (page.priority || 0)) {
        uniqueErrorPagesMap.set(url, page)
      }
    })
    return Array.from(uniqueErrorPagesMap.values())
  }
}
