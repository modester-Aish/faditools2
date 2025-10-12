/**
 * Static Product Detail Loader
 * 
 * Loads individual products from static JSON files
 * Much faster than fetching full WooCommerce data
 */

import { WooCommerceProduct } from './woocommerce-api'

export interface StaticProductDetailData {
  product: WooCommerceProduct
  lastUpdated: string
  note: string
}

/**
 * Load individual product from static data (ULTRA-FAST!)
 * This replaces the slow full WooCommerce fetch in product detail pages
 */
export async function loadProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
  console.log(`🔍 Loading product: ${slug}`)
  
  try {
    // Try to load from full products file
    const fs = require('fs')
    const path = require('path')
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
    
    console.log(`📁 Checking file: ${filePath}`)
    console.log(`📁 File exists: ${fs.existsSync(filePath)}`)
    
    if (!fs.existsSync(filePath)) {
      console.warn('⚠️ products.json not found. Falling back to WooCommerce API...')
      // Fallback to WooCommerce API
      try {
        const { wooCommerceService } = await import('./woocommerce-service')
        const wooCommerceData = await wooCommerceService.getWooCommerceData()
        const product = wooCommerceData.products.find((p: WooCommerceProduct) => p.slug === slug)
        if (product) {
          console.log(`📦 Product Detail: Loaded "${product.name}" from WooCommerce API (fallback)`)
          return product
        }
      } catch (error) {
        console.error('❌ WooCommerce fallback failed:', error)
      }
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    console.log(`📦 Total products in file: ${data.products.length}`)
    
    // Find product by slug
    const product = data.products.find((p: WooCommerceProduct) => p.slug === slug)
    
    if (product) {
      console.log(`✅ Product Detail: Loaded "${product.name}" from static file (instant!)`)
      return product
    }
    
    console.log(`❌ Product not found in static file: ${slug}. Available slugs:`)
    console.log(data.products.slice(0, 5).map((p: WooCommerceProduct) => p.slug))
    
    // Skip WooCommerce fallback for better performance - just return null
    console.log(`⚡ Skipping WooCommerce fallback for faster 404 response`)
    return null
    
  } catch (error) {
    console.error('❌ Error loading product by slug:', error)
    
    // Skip WooCommerce fallback for better performance
    console.log('⚡ Skipping WooCommerce fallback for faster error response')
    
    return null
  }
}

/**
 * Load related products for a given product
 */
export async function loadRelatedProducts(currentProductSlug: string, limit: number = 4): Promise<WooCommerceProduct[]> {
  try {
    const fs = require('fs')
    const path = require('path')
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
    
    if (!fs.existsSync(filePath)) {
      console.warn('⚠️ products.json not found for related products. Returning empty array.')
      return []
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    // Get current product to find related ones
    const currentProduct = data.products.find((p: WooCommerceProduct) => p.slug === currentProductSlug)
    if (!currentProduct) {
      console.warn(`⚠️ Current product not found: ${currentProductSlug}`)
      return []
    }
    
    // Find products in same categories
    const relatedProducts = data.products
      .filter((p: WooCommerceProduct) => {
        if (p.slug === currentProductSlug) return false
        
        // Check if any categories match
        return p.categories.some(cat => 
          currentProduct.categories.some((currentCat: any) => currentCat.id === cat.id)
        )
      })
      .slice(0, limit)
    
    console.log(`📦 Related Products: Loaded ${relatedProducts.length} products for "${currentProduct.name}"`)
    return relatedProducts
    
  } catch (error) {
    console.error('❌ Error loading related products:', error)
    // Return empty array on error to prevent page crashes
    return []
  }
}
