import { Product, WooCommerceImage, WooCommerceAttribute } from '@/types/wordpress'

// WooCommerce API Configuration
const WOOCOMMERCE_BASE_URL = process.env.WOOCOMMERCE_BASE_URL || 'https://app.faditools.com'
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || ''
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET || ''

// WooCommerce API Response Types
export interface WooCommerceApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export interface WooCommerceProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_created_gmt: string
  date_modified: string
  date_modified_gmt: string
  type: string
  status: string
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: string | null
  date_on_sale_from_gmt: string | null
  date_on_sale_to: string | null
  date_on_sale_to_gmt: string | null
  price_html: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  related_ids: number[]
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  images: WooCommerceImage[]
  attributes: WooCommerceAttribute[]
  default_attributes: any[]
  variations: number[]
  grouped_products: number[]
  menu_order: number
  meta_data: Array<{
    id: number
    key: string
    value: any
  }>
  _links: {
    self: Array<{ href: string }>
    collection: Array<{ href: string }>
  }
}

// Cache for storing API responses
const cache = new Map<string, { data: any; timestamp: number }>()
// Increased cache duration to 24 hours (86400000ms) for better performance
// Products will be cached for 1 day instead of 2 minutes
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours cache for optimal performance

// Generic fetch function with caching and error handling
async function fetchWithCache<T>(
  url: string,
  options?: RequestInit
): Promise<WooCommerceApiResponse<T>> {
  const cacheKey = `${url}-${JSON.stringify(options || {})}`
  const cached = cache.get(cacheKey)

  // Return cached data if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { data: cached.data, error: null, loading: false }
  }

  try {
    const response = await fetch(url, {
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
    console.error(`WooCommerce API Error for ${url}:`, error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      loading: false
    }
  }
}

// WooCommerce Products API functions
export async function fetchAllProducts(): Promise<WooCommerceApiResponse<WooCommerceProduct[]>> {
  const cacheKey = 'all-products'
  const cached = cache.get(cacheKey)

  // Return cached data if still valid - using 24 hour cache for better performance
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`📦 Using cached products: ${cached.data.length} products (cached for ${Math.round((Date.now() - cached.timestamp) / 1000 / 60)} minutes)`)
    return { data: cached.data, error: null, loading: false }
  }

  try {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      throw new Error('WooCommerce credentials are missing. Set WC_CONSUMER_KEY/WC_CONSUMER_SECRET (or legacy WOO_CONSUMER_KEY/WOO_CONSUMER_SECRET) in env.')
    }

    let allProducts: WooCommerceProduct[] = [];
    let page = 1;
    let hasMore = true;
    const perPage = 100;

    while (hasMore) {
      const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${perPage}&page=${page}`;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products: WooCommerceProduct[] = await response.json();
      
      if (products.length === 0) {
        hasMore = false;
      } else {
        allProducts = [...allProducts, ...products];
        page++;
        
        // If we got less than perPage products, we've reached the end
        if (products.length < perPage) {
          hasMore = false;
        }
      }
    }

    // Cache the successful response
    cache.set(cacheKey, { data: allProducts, timestamp: Date.now() })

    console.log(`✅ Fetched ${allProducts.length} total products from WooCommerce`);
    return { data: allProducts, error: null, loading: false };
  } catch (error) {
    console.error('WooCommerce API Error:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      loading: false
    };
  }
}

export async function fetchProductById(id: number): Promise<WooCommerceApiResponse<WooCommerceProduct>> {
  const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products/${id}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
  return fetchWithCache<WooCommerceProduct>(url)
}

export async function fetchProductBySlug(slug: string): Promise<WooCommerceApiResponse<WooCommerceProduct[]>> {
  const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&slug=${encodeURIComponent(slug)}`
  return fetchWithCache<WooCommerceProduct[]>(url)
}

export async function fetchProductsByCategory(categoryId: number): Promise<WooCommerceApiResponse<WooCommerceProduct[]>> {
  const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&category=${categoryId}&per_page=100`
  return fetchWithCache<WooCommerceProduct[]>(url)
}

export async function fetchFeaturedProducts(): Promise<WooCommerceApiResponse<WooCommerceProduct[]>> {
  const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&featured=true&per_page=100`
  return fetchWithCache<WooCommerceProduct[]>(url)
}

export async function fetchOnSaleProducts(): Promise<WooCommerceApiResponse<WooCommerceProduct[]>> {
  const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&on_sale=true&per_page=100`
  return fetchWithCache<WooCommerceProduct[]>(url)
}

// WooCommerce Categories API functions
export async function fetchProductCategories(): Promise<WooCommerceApiResponse<any[]>> {
  const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products/categories?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=100`
  return fetchWithCache<any[]>(url)
}

export async function fetchProductCategoryById(id: number): Promise<WooCommerceApiResponse<any>> {
  const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products/categories/${id}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
  return fetchWithCache<any>(url)
}

// WooCommerce Orders API functions (if needed)
export async function fetchOrders(): Promise<WooCommerceApiResponse<any[]>> {
  const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/orders?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=100`
  return fetchWithCache<any[]>(url)
}

// Utility functions for filtering and processing
export function filterPublishedProducts(products: WooCommerceProduct[]): WooCommerceProduct[] {
  return products.filter(product => product.status === 'publish')
}

export function filterInStockProducts(products: WooCommerceProduct[]): WooCommerceProduct[] {
  return products.filter(product => product.stock_status === 'instock')
}

export function sortProductsByPrice<T extends { price: string }>(products: T[], ascending: boolean = true): T[] {
  return [...products].sort((a, b) => {
    const priceA = parseFloat(a.price) || 0
    const priceB = parseFloat(b.price) || 0
    return ascending ? priceA - priceB : priceB - priceA
  })
}

export function sortProductsByDate<T extends { date_created: string }>(products: T[], ascending: boolean = false): T[] {
  return [...products].sort((a, b) => {
    const dateA = new Date(a.date_created).getTime()
    const dateB = new Date(b.date_created).getTime()
    return ascending ? dateA - dateB : dateB - dateA
  })
}

// Helper function to get product price
export function getProductPrice(product: WooCommerceProduct): string {
  return product.on_sale && product.sale_price ? product.sale_price : product.price
}

// Helper function to get product image URL
export function getProductImageUrl(product: WooCommerceProduct): string | null {
  return product.images && product.images.length > 0 ? product.images[0].src : null
}

// Helper function to get product gallery images
export function getProductGalleryImages(product: WooCommerceProduct): WooCommerceImage[] {
  return product.images && product.images.length > 1 ? product.images.slice(1) : []
}

// Helper function to check if product is on sale
export function isProductOnSale(product: WooCommerceProduct): boolean {
  return product.on_sale && !!product.sale_price
}

// Helper function to get discount percentage
export function getDiscountPercentage(product: WooCommerceProduct): number | null {
  if (!isProductOnSale(product) || !product.regular_price || !product.sale_price) {
    return null
  }
  
  const regularPrice = parseFloat(product.regular_price)
  const salePrice = parseFloat(product.sale_price)
  
  if (regularPrice <= 0) return null
  
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100)
}

// Utility function to clear cache
export function clearWooCommerceCache(): void {
  cache.clear()
  console.log('🧹 WooCommerce cache cleared - fresh data will be fetched')
}

// Utility function to clear specific cache entry
export function clearSpecificCache(key: string): void {
  cache.delete(key)
  console.log(`🧹 Cleared cache for: ${key}`)
}

// Utility function to force refresh all products
export async function forceRefreshProducts(): Promise<WooCommerceApiResponse<WooCommerceProduct[]>> {
  clearSpecificCache('all-products')
  return fetchAllProducts()
}

// Utility function to get cache stats
export function getWooCommerceCacheStats(): { size: number; entries: string[] } {
  return {
    size: cache.size,
    entries: Array.from(cache.keys())
  }
}

// WooCommerce API endpoints for reference
export const WOOCOMMERCE_ENDPOINTS = {
  products: `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products`,
  categories: `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products/categories`,
  orders: `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/orders`,
  productById: (id: number) => `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products/${id}`,
  categoryById: (id: number) => `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products/categories/${id}`,
  productsByCategory: (categoryId: number) => `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?category=${categoryId}`,
  featuredProducts: `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?featured=true`,
  onSaleProducts: `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?on_sale=true`,
} as const
