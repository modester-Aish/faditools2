/**
 * Static Products Loader
 * 
 * Ye file static JSON files se products load karti hai
 * No API calls - sab kuch frontend pe stored hai!
 */

import { WooCommerceProduct } from './woocommerce-api'

export interface StaticProductsData {
  products: WooCommerceProduct[]
  totalProducts: number
  lastUpdated: string
  fetchedAt: string
}

export interface StaticCategoriesData {
  categories: any[]
  totalCategories: number
  lastUpdated: string
}

export interface StaticMetadata {
  lastUpdated: string
  lastUpdatedFormatted: string
  totalProducts: number
  totalCategories: number
  publishedProducts: number
  featuredProducts: number
  onSaleProducts: number
  inStockProducts: number
  outOfStockProducts: number
}

/**
 * Load products from static JSON file
 * Frontend se directly JSON file load hogi - no API call!
 */
export async function loadStaticProducts(): Promise<WooCommerceProduct[]> {
  try {
    // In browser (client-side)
    if (typeof window !== 'undefined') {
      const response = await fetch('/data/products.json')
      if (!response.ok) {
        throw new Error('Failed to load products')
      }
      const data: StaticProductsData = await response.json()
      console.log(`📦 Loaded ${data.totalProducts} products from static file (last updated: ${data.lastUpdated})`)
      return data.products
    }
    
    // On server (SSR/SSG)
    else {
      const fs = require('fs')
      const path = require('path')
      const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
      
      if (!fs.existsSync(filePath)) {
        console.warn('⚠️ products.json not found. Run: node scripts/fetch-and-save-products.js')
        return []
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const data: StaticProductsData = JSON.parse(fileContent)
      console.log(`📦 Loaded ${data.totalProducts} products from static file (SSR)`)
      return data.products
    }
  } catch (error) {
    console.error('❌ Error loading static products:', error)
    return []
  }
}

/**
 * Load categories from static JSON file
 */
export async function loadStaticCategories(): Promise<any[]> {
  try {
    if (typeof window !== 'undefined') {
      const response = await fetch('/data/categories.json')
      if (!response.ok) {
        throw new Error('Failed to load categories')
      }
      const data: StaticCategoriesData = await response.json()
      console.log(`📦 Loaded ${data.totalCategories} categories from static file`)
      return data.categories
    } else {
      const fs = require('fs')
      const path = require('path')
      const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json')
      
      if (!fs.existsSync(filePath)) {
        console.warn('⚠️ categories.json not found')
        return []
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const data: StaticCategoriesData = JSON.parse(fileContent)
      console.log(`📦 Loaded ${data.totalCategories} categories from static file`)
      return data.categories
    }
  } catch (error) {
    console.error('❌ Error loading static categories:', error)
    return []
  }
}

/**
 * Load metadata from static JSON file
 */
export async function loadStaticMetadata(): Promise<StaticMetadata | null> {
  try {
    if (typeof window !== 'undefined') {
      const response = await fetch('/data/metadata.json')
      if (!response.ok) {
        throw new Error('Failed to load metadata')
      }
      return await response.json()
    } else {
      const fs = require('fs')
      const path = require('path')
      const filePath = path.join(process.cwd(), 'public', 'data', 'metadata.json')
      
      if (!fs.existsSync(filePath)) {
        return null
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(fileContent)
    }
  } catch (error) {
    console.error('❌ Error loading static metadata:', error)
    return null
  }
}

/**
 * Check if static data is stale (older than specified hours)
 */
export async function isStaticDataStale(maxAgeHours: number = 24): Promise<boolean> {
  try {
    const metadata = await loadStaticMetadata()
    if (!metadata) return true
    
    const lastUpdated = new Date(metadata.lastUpdated)
    const now = new Date()
    const ageHours = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60)
    
    return ageHours > maxAgeHours
  } catch (error) {
    return true
  }
}

/**
 * Get products with filtering
 */
export async function getStaticProducts(options?: {
  category?: string
  featured?: boolean
  onSale?: boolean
  inStock?: boolean
  limit?: number
  offset?: number
}): Promise<WooCommerceProduct[]> {
  let products = await loadStaticProducts()
  
  // Apply filters
  if (options?.category) {
    products = products.filter(p => 
      p.categories.some(cat => cat.slug === options.category)
    )
  }
  
  if (options?.featured) {
    products = products.filter(p => p.featured)
  }
  
  if (options?.onSale) {
    products = products.filter(p => p.on_sale)
  }
  
  if (options?.inStock) {
    products = products.filter(p => p.stock_status === 'instock')
  }
  
  // Apply pagination
  if (options?.offset !== undefined) {
    products = products.slice(options.offset)
  }
  
  if (options?.limit !== undefined) {
    products = products.slice(0, options.limit)
  }
  
  return products
}

/**
 * Search products
 */
export async function searchStaticProducts(query: string): Promise<WooCommerceProduct[]> {
  const products = await loadStaticProducts()
  const searchTerm = query.toLowerCase()
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.short_description.toLowerCase().includes(searchTerm) ||
    product.sku.toLowerCase().includes(searchTerm)
  )
}

/**
 * Get product by slug
 */
export async function getStaticProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
  const products = await loadStaticProducts()
  return products.find(p => p.slug === slug) || null
}

/**
 * Get product by ID
 */
export async function getStaticProductById(id: number): Promise<WooCommerceProduct | null> {
  const products = await loadStaticProducts()
  return products.find(p => p.id === id) || null
}

