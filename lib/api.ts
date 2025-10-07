import { Tool, Package, Testimonial, WordPressPost, WordPressPage, Product } from '@/types'

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'
const API_BASE = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`
const WOOCOMMERCE_API_BASE = process.env.WOOCOMMERCE_BASE_URL || WORDPRESS_BASE_URL
const WOOCOMMERCE_API = `${WOOCOMMERCE_API_BASE}/wp-json/wc/v3`

// WooCommerce API credentials (configured via environment)
const WOO_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || ''
const WOO_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET || ''

// Helper function to get Products category ID
async function getProductsCategoryId(): Promise<number | null> {
  try {
    const timestamp = Date.now()
    const response = await fetch(`${API_BASE}/categories?slug=product&_t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    })
    const categories = await response.json()
    return categories[0]?.id || null
  } catch (error) {
    console.error('Error fetching products category:', error)
    return null
  }
}

// Enhanced SEO data extraction from multiple plugins
function extractSEOData(item: any) {
  // Try Yoast SEO first
  if (item.yoast_head_json) {
    const yoast = item.yoast_head_json
    return {
      title: yoast.title || item.title?.rendered || '',
      description: yoast.description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      canonical: yoast.canonical || `https://www.faditools.com/${item.slug}`,
      ogTitle: yoast.og_title || yoast.title || item.title?.rendered || '',
      ogDescription: yoast.og_description || yoast.description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      twitterTitle: yoast.twitter_title || yoast.title || item.title?.rendered || '',
      twitterDescription: yoast.twitter_description || yoast.description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      robots: { index: true, follow: true }
    }
  }

  // Try RankMath SEO
  if (item.rank_math_seo) {
    const rankmath = item.rank_math_seo
    return {
      title: rankmath.title || item.title?.rendered || '',
      description: rankmath.description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      canonical: rankmath.canonical_url || `https://www.faditools.com/${item.slug}`,
      ogTitle: rankmath.facebook_title || rankmath.title || item.title?.rendered || '',
      ogDescription: rankmath.facebook_description || rankmath.description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      twitterTitle: rankmath.twitter_title || rankmath.title || item.title?.rendered || '',
      twitterDescription: rankmath.twitter_description || rankmath.description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      robots: rankmath.robots || { index: true, follow: true }
    }
  }

  // Fallback to basic SEO
  return {
    title: item.title?.rendered || '',
    description: item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
    canonical: `https://www.faditools.com/${item.slug}`,
    ogTitle: item.title?.rendered || '',
    ogDescription: item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
    twitterTitle: item.title?.rendered || '',
    twitterDescription: item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
    robots: { index: true, follow: true }
  }
}

// Enhanced fetch function with all plugin fields
async function fetchWithPluginFields(endpoint: string, params: string = '') {
  // Add cache-busting timestamp to prevent CDN caching
  const timestamp = Date.now()
  const separator = params ? '&' : ''
  const response = await fetch(`${API_BASE}/${endpoint}?${params}${separator}_embed&acf=1&_t=${timestamp}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
    }
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

// WooCommerce fetch function with SEO data
export async function fetchWooCommerceProducts(params: string = '') {
  if (!WOO_CONSUMER_KEY || !WOO_CONSUMER_SECRET) {
    console.warn('WooCommerce credentials not configured (set WC_CONSUMER_KEY/WC_CONSUMER_SECRET or legacy WOO_CONSUMER_KEY/WOO_CONSUMER_SECRET)')
    return []
  }

  const auth = Buffer.from(`${WOO_CONSUMER_KEY}:${WOO_CONSUMER_SECRET}`).toString('base64')
  
  const response = await fetch(`${WOOCOMMERCE_API}/products?${params}`, {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })
  
  if (!response.ok) {
    throw new Error(`WooCommerce API error! status: ${response.status}`)
  }
  
  const products = await response.json()
  
  // For WooCommerce products, we need to fetch SEO data separately
  // since WooCommerce API doesn't include plugin fields by default
  const productsWithSEO = await Promise.all(
    products.map(async (product: any) => {
      try {
        // Try to fetch SEO data from WordPress REST API
        const seoResponse = await fetch(`${API_BASE}/posts?slug=${product.slug}&_embed&acf=1`, {
          cache: 'no-store'
        })
        const seoData = await seoResponse.json()
        const seoItem = seoData[0]
        
        return {
          ...product,
          seo: seoItem ? extractSEOData(seoItem) : {
            title: product.name,
            description: product.short_description?.replace(/<[^>]*>/g, '') || '',
            canonical: `https://www.faditools.com/${product.slug}`,
            ogTitle: product.name,
            ogDescription: product.short_description?.replace(/<[^>]*>/g, '') || '',
            twitterTitle: product.name,
            twitterDescription: product.short_description?.replace(/<[^>]*>/g, '') || '',
            robots: { index: true, follow: true }
          }
        }
      } catch (error) {
        console.error(`Error fetching SEO for product ${product.slug}:`, error)
        return {
          ...product,
          seo: {
            title: product.name,
            description: product.short_description?.replace(/<[^>]*>/g, '') || '',
            canonical: `https://www.faditools.com/${product.slug}`,
            ogTitle: product.name,
            ogDescription: product.short_description?.replace(/<[^>]*>/g, '') || '',
            twitterTitle: product.name,
            twitterDescription: product.short_description?.replace(/<[^>]*>/g, '') || '',
            robots: { index: true, follow: true }
          }
        }
      }
    })
  )
  
  return productsWithSEO
}

// 1. Get Blog Posts (exclude Products category) with all plugin fields
export async function fetchBlogPosts(): Promise<WordPressPost[]> {
  try {
    const productCategoryId = await getProductsCategoryId()
    const excludeParam = productCategoryId ? `&categories_exclude=${productCategoryId}` : ''
    
    const posts = await fetchWithPluginFields('posts', `per_page=100${excludeParam}`)
    
    return posts.map((post: any) => ({
      ...post,
      seo: extractSEOData(post)
    }))
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// 2. Get Single Post by Slug with all plugin fields
export async function fetchPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const posts = await fetchWithPluginFields('posts', `slug=${encodeURIComponent(slug)}`)
    const post = posts[0]
    
    if (!post) return null
    
    return { 
      ...post,
      seo: extractSEOData(post)
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

// 3. Get All Pages with all plugin fields
export async function fetchPages(): Promise<WordPressPage[]> {
  try {
    const pages = await fetchWithPluginFields('pages', 'per_page=100')
    
    return pages.map((page: any) => ({
      ...page,
      seo: extractSEOData(page)
    }))
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

// 4. Get Single Page by Slug with all plugin fields
export async function fetchPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const pages = await fetchWithPluginFields('pages', `slug=${encodeURIComponent(slug)}`)
    const page = pages[0]
    
    if (!page) return null
    
    return {
      ...page,
      seo: extractSEOData(page)
    }
  } catch (error) {
    console.error('Error fetching page by slug:', error)
    return null
  }
}

// 5. Get WooCommerce Products with SEO data
export async function fetchProducts(): Promise<Product[]> {
  try {
    const products = await fetchWooCommerceProducts('per_page=100&status=publish')
    
    return products.map((product: any) => ({
      id: product.id,
      date: product.date_created,
      modified: product.date_modified,
      slug: product.slug,
      status: product.status,
      title: { rendered: product.name },
      content: { rendered: product.description },
      excerpt: { rendered: product.short_description },
      featured_media: product.images?.[0]?.id || null,
      categories: product.categories?.map((cat: any) => cat.id) || [],
      tags: product.tags?.map((tag: any) => tag.id) || [],
      // WooCommerce specific fields
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      stock_status: product.stock_status,
      stock_quantity: product.stock_quantity,
      images: product.images || [],
      attributes: product.attributes || [],
      // SEO data
      seo: product.seo
    }))
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error)
    return []
  }
}

// 6. Get WooCommerce Categories
export async function fetchProductCategories(): Promise<Array<{ id: number; name: string; slug: string }>> {
  try {
    if (!WOO_CONSUMER_KEY || !WOO_CONSUMER_SECRET) {
      console.warn('WooCommerce credentials not configured (set WC_CONSUMER_KEY/WC_CONSUMER_SECRET or legacy WOO_CONSUMER_KEY/WOO_CONSUMER_SECRET)')
      return []
    }

    const auth = Buffer.from(`${WOO_CONSUMER_KEY}:${WOO_CONSUMER_SECRET}`).toString('base64')
    
    const response = await fetch(`${WOOCOMMERCE_API}/products/categories?per_page=100`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`WooCommerce API error! status: ${response.status}`)
    }
    
    const categories = await response.json()
    
    return categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug
    }))
  } catch (error) {
    console.error('Error fetching WooCommerce categories:', error)
    return []
  }
}

// 6. Get Single WooCommerce Product by Slug with SEO data
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await fetchWooCommerceProducts(`slug=${encodeURIComponent(slug)}`)
    const product = products[0]
    
    if (!product) return null
    
    return {
      id: product.id,
      date: product.date_created,
      modified: product.date_modified,
      slug: product.slug,
      status: product.status,
      title: { rendered: product.name },
      content: { rendered: product.description },
      excerpt: { rendered: product.short_description },
      featured_media: product.images?.[0]?.id || null,
      categories: product.categories?.map((cat: any) => cat.id) || [],
      tags: product.tags?.map((tag: any) => tag.id) || [],
      // WooCommerce specific fields
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      stock_status: product.stock_status,
      stock_quantity: product.stock_quantity,
      images: product.images || [],
      attributes: product.attributes || [],
      // SEO data
      seo: product.seo
    }
  } catch (error) {
    console.error('Error fetching WooCommerce product by slug:', error)
    return null
  }
}

// Static data functions (keep existing)
export async function getTools(): Promise<Tool[]> {
  const { tools } = await import('@/data/tools')
  return tools
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const tools = await getTools()
  return tools.find(tool => tool.slug === slug || tool.id === slug) || null
}

export async function getPackages(): Promise<Package[]> {
  const { packages } = await import('@/data/packages')
  return packages
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const packages = await getPackages()
  return packages.find(pkg => pkg.slug === slug || pkg.id === slug) || null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { testimonials } = await import('@/data/testimonials')
  return testimonials
}

// Legacy functions for compatibility
export async function forceRefreshPackages() {
  const packages = await getPackages()
  return { data: packages, error: null, loading: false }
}

export async function forceRefreshTools() {
  const tools = await getTools()
  return { data: tools, error: null, loading: false }
}

export async function fetchTestimonials() {
  const testimonials = await getTestimonials()
  return { data: testimonials, error: null, loading: false }
}

export async function fetchTools(): Promise<Tool[]> {
  return getTools()
}


