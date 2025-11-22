import { fetchPages, fetchBlogPosts, getTools } from '@/lib/api'
import { MetadataRoute } from 'next'
import { getAllPopularTools } from '@/data/popular-tools'

// Direct WooCommerce API credentials for efficient product fetching
const WOOCOMMERCE_BASE_URL = process.env.WOOCOMMERCE_BASE_URL || 'https://app.faditools.com'
const WOO_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || ''
const WOO_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET || ''

export const revalidate = 3600 // Revalidate every hour

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
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
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

    // Fetch WordPress posts
    const posts = await fetchBlogPosts()
    const wordPressPosts = posts
      ?.filter(post => post.status === 'publish')
      .map(post => ({
        url: `${baseUrl}/${post.slug}`,
        lastModified: new Date(post.modified || post.date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })) || []

    // Fetch WooCommerce products directly (without SEO data to avoid timeout)
    let wordPressProducts: MetadataRoute.Sitemap = []
    
    if (WOO_CONSUMER_KEY && WOO_CONSUMER_SECRET) {
      try {
        const auth = Buffer.from(`${WOO_CONSUMER_KEY}:${WOO_CONSUMER_SECRET}`).toString('base64')
        
        // Fetch first 100 products only for main sitemap (use sitemap-products.xml for full list)
        const productsResponse = await fetch(
          `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?per_page=100&status=publish&orderby=modified&order=desc`,
          {
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 }
          }
        )
        
        if (productsResponse.ok) {
          const products = await productsResponse.json()
          wordPressProducts = products
            .filter((product: any) => product.status === 'publish' && product.slug)
            .map((product: any) => ({
              url: `${baseUrl}/${product.slug}`,
              lastModified: new Date(product.date_modified || product.date_created || new Date()),
              changeFrequency: 'weekly' as const,
              priority: 0.5,
            }))
        }
      } catch (productError) {
        console.error('Error fetching products for sitemap:', productError)
      }
    }

    return [...staticPages, ...popularToolPages, ...apiToolPages, ...wordPressPages, ...wordPressPosts, ...wordPressProducts]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [...staticPages, ...popularToolPages, ...apiToolPages]
  }
}
