import { WooCommerceProduct } from './woocommerce-api'

/**
 * Incremental Product Fetching System
 * 
 * یہ system صرف نئے products fetch کرتا ہے، پرانے products کو cache میں رکھتا ہے
 * This system only fetches new products, keeps old products in cache
 */

// WooCommerce API Configuration
const WOOCOMMERCE_BASE_URL = process.env.WOOCOMMERCE_BASE_URL || 'https://app.faditools.com'
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || ''
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET || ''

// In-memory product storage
interface ProductCache {
  products: WooCommerceProduct[]
  lastFetchTime: Date
  lastProductId: number
  totalProducts: number
}

let productCache: ProductCache = {
  products: [],
  lastFetchTime: new Date(0), // epoch time
  lastProductId: 0,
  totalProducts: 0
}

/**
 * Fetch only NEW products that were created after last fetch
 * صرف نئے products fetch کریں جو last fetch کے بعد add ہوئے
 */
async function fetchNewProducts(afterDate: Date): Promise<WooCommerceProduct[]> {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    console.warn('WooCommerce credentials missing')
    return []
  }

  try {
    const afterDateISO = afterDate.toISOString()
    console.log(`🔄 Fetching products created after: ${afterDateISO}`)
    
    let allNewProducts: WooCommerceProduct[] = []
    let page = 1
    let hasMore = true
    const perPage = 100

    while (hasMore) {
      // Fetch only products created after specific date
      const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${perPage}&page=${page}&after=${encodeURIComponent(afterDateISO)}&orderby=date&order=asc`
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const products: WooCommerceProduct[] = await response.json()
      
      if (products.length === 0) {
        hasMore = false
      } else {
        allNewProducts = [...allNewProducts, ...products]
        page++
        
        if (products.length < perPage) {
          hasMore = false
        }
      }
    }

    console.log(`✅ Fetched ${allNewProducts.length} new products`)
    return allNewProducts

  } catch (error) {
    console.error('❌ Error fetching new products:', error)
    return []
  }
}

/**
 * Fetch only UPDATED products (modified after last fetch)
 * صرف updated products fetch کریں
 */
async function fetchUpdatedProducts(afterDate: Date): Promise<WooCommerceProduct[]> {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    return []
  }

  try {
    const afterDateISO = afterDate.toISOString()
    console.log(`🔄 Fetching products modified after: ${afterDateISO}`)
    
    let allUpdatedProducts: WooCommerceProduct[] = []
    let page = 1
    let hasMore = true
    const perPage = 100

    while (hasMore) {
      // Fetch products modified after specific date
      const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${perPage}&page=${page}&modified_after=${encodeURIComponent(afterDateISO)}&orderby=modified&order=asc`
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const products: WooCommerceProduct[] = await response.json()
      
      if (products.length === 0) {
        hasMore = false
      } else {
        allUpdatedProducts = [...allUpdatedProducts, ...products]
        page++
        
        if (products.length < perPage) {
          hasMore = false
        }
      }
    }

    console.log(`✅ Fetched ${allUpdatedProducts.length} updated products`)
    return allUpdatedProducts

  } catch (error) {
    console.error('❌ Error fetching updated products:', error)
    return []
  }
}

/**
 * Merge updated products into existing cache
 * Updated products کو existing cache میں merge کریں
 */
function mergeProducts(
  existingProducts: WooCommerceProduct[], 
  newProducts: WooCommerceProduct[], 
  updatedProducts: WooCommerceProduct[]
): WooCommerceProduct[] {
  // Create a map of existing products by ID
  const productMap = new Map<number, WooCommerceProduct>()
  
  // Add all existing products
  existingProducts.forEach(product => {
    productMap.set(product.id, product)
  })
  
  // Update modified products
  updatedProducts.forEach(product => {
    productMap.set(product.id, product)
  })
  
  // Add new products
  newProducts.forEach(product => {
    productMap.set(product.id, product)
  })
  
  // Convert map back to array and sort by date (newest first)
  const mergedProducts = Array.from(productMap.values())
  mergedProducts.sort((a, b) => 
    new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
  )
  
  return mergedProducts
}

/**
 * Get all products with incremental updates
 * تمام products لیں incremental updates کے ساتھ
 */
export async function getProductsIncremental(): Promise<{
  products: WooCommerceProduct[]
  fromCache: boolean
  newProductsCount: number
  updatedProductsCount: number
  totalProducts: number
}> {
  const now = new Date()
  const cacheAge = now.getTime() - productCache.lastFetchTime.getTime()
  const cacheAgeMinutes = Math.round(cacheAge / 1000 / 60)
  
  // If cache is empty, do initial full fetch
  if (productCache.products.length === 0) {
    console.log('📦 Initial fetch - fetching all products...')
    
    // Import the full fetch function
    const { fetchAllProducts } = await import('./woocommerce-api')
    const response = await fetchAllProducts()
    
    if (response.data && response.data.length > 0) {
      productCache = {
        products: response.data,
        lastFetchTime: now,
        lastProductId: Math.max(...response.data.map(p => p.id)),
        totalProducts: response.data.length
      }
      
      console.log(`✅ Initial fetch complete: ${productCache.products.length} products cached`)
      
      return {
        products: productCache.products,
        fromCache: false,
        newProductsCount: productCache.products.length,
        updatedProductsCount: 0,
        totalProducts: productCache.products.length
      }
    }
  }
  
  // If cache is less than 24 hours old, return cached data
  const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours
  if (cacheAge < CACHE_DURATION) {
    console.log(`📦 Using cached products: ${productCache.products.length} products (cached for ${cacheAgeMinutes} minutes)`)
    
    return {
      products: productCache.products,
      fromCache: true,
      newProductsCount: 0,
      updatedProductsCount: 0,
      totalProducts: productCache.products.length
    }
  }
  
  // Cache is old - fetch incremental updates
  console.log(`🔄 Cache is ${cacheAgeMinutes} minutes old - checking for updates...`)
  
  const lastFetchTime = productCache.lastFetchTime
  
  // Fetch new and updated products in parallel
  const [newProducts, updatedProducts] = await Promise.all([
    fetchNewProducts(lastFetchTime),
    fetchUpdatedProducts(lastFetchTime)
  ])
  
  // If no updates, just update timestamp and return cache
  if (newProducts.length === 0 && updatedProducts.length === 0) {
    console.log('✅ No new or updated products found')
    productCache.lastFetchTime = now
    
    return {
      products: productCache.products,
      fromCache: true,
      newProductsCount: 0,
      updatedProductsCount: 0,
      totalProducts: productCache.products.length
    }
  }
  
  // Merge updates into cache
  const mergedProducts = mergeProducts(productCache.products, newProducts, updatedProducts)
  
  // Update cache
  productCache = {
    products: mergedProducts,
    lastFetchTime: now,
    lastProductId: Math.max(...mergedProducts.map(p => p.id)),
    totalProducts: mergedProducts.length
  }
  
  console.log(`✅ Incremental update complete:`)
  console.log(`   - New products: ${newProducts.length}`)
  console.log(`   - Updated products: ${updatedProducts.length}`)
  console.log(`   - Total products: ${productCache.products.length}`)
  
  return {
    products: productCache.products,
    fromCache: false,
    newProductsCount: newProducts.length,
    updatedProductsCount: updatedProducts.length,
    totalProducts: productCache.products.length
  }
}

/**
 * Force refresh all products
 * سب products کو force refresh کریں
 */
export async function forceRefreshAllProducts(): Promise<WooCommerceProduct[]> {
  console.log('🔄 Force refresh - clearing cache and fetching all products...')
  
  // Clear cache
  productCache = {
    products: [],
    lastFetchTime: new Date(0),
    lastProductId: 0,
    totalProducts: 0
  }
  
  // Fetch all products
  const result = await getProductsIncremental()
  return result.products
}

/**
 * Get cache statistics
 * Cache کی statistics دیکھیں
 */
export function getIncrementalCacheStats() {
  const cacheAge = Date.now() - productCache.lastFetchTime.getTime()
  const cacheAgeMinutes = Math.round(cacheAge / 1000 / 60)
  const cacheAgeHours = Math.round(cacheAge / 1000 / 60 / 60)
  
  return {
    totalProducts: productCache.products.length,
    lastFetchTime: productCache.lastFetchTime,
    cacheAgeMinutes,
    cacheAgeHours,
    lastProductId: productCache.lastProductId,
    oldestProduct: productCache.products.length > 0 
      ? productCache.products[productCache.products.length - 1].date_created 
      : null,
    newestProduct: productCache.products.length > 0 
      ? productCache.products[0].date_created 
      : null
  }
}

/**
 * Clear incremental cache
 * Incremental cache clear کریں
 */
export function clearIncrementalCache() {
  console.log('🧹 Clearing incremental cache...')
  productCache = {
    products: [],
    lastFetchTime: new Date(0),
    lastProductId: 0,
    totalProducts: 0
  }
}

