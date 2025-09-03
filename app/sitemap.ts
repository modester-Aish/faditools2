import { fetchPages, fetchBlogPosts, fetchProducts } from '@/lib/api'
import { MetadataRoute } from 'next'

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

  // Tool pages with clean URLs
  const toolPages = [
    'ahrefs',
    'semrush', 
    'moz',
    'canva',
    'grammarly',
    'spyfu',
    'majestic',
    'buzzsumo'
  ].map(tool => ({
    url: `${baseUrl}/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Package pages with clean URLs
  const packagePages = [
    'seo-combo',
    'heavy-pack',
    'mega-pack',
    'mega-combo'
  ].map(pkg => ({
    url: `${baseUrl}/${pkg}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  try {
    // Fetch WordPress pages
    const pages = await fetchPages()
    const wordPressPages = pages
      ?.filter(page => page.status === 'publish')
      .map(page => ({
        url: `${baseUrl}/pages/${page.slug}`,
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

    // Fetch WordPress products
    const products = await fetchProducts()
    const wordPressProducts = products
      ?.filter(product => product.status === 'publish')
      .map(product => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: new Date(product.modified || product.date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })) || []

    return [...staticPages, ...toolPages, ...packagePages, ...wordPressPages, ...wordPressPosts, ...wordPressProducts]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [...staticPages, ...toolPages, ...packagePages]
  }
}
