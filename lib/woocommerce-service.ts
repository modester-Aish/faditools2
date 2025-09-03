import {
  fetchAllProducts,
  fetchProductById,
  fetchProductBySlug,
  fetchProductsByCategory,
  fetchFeaturedProducts,
  fetchOnSaleProducts,
  fetchProductCategories,
  fetchProductCategoryById,
  filterPublishedProducts,
  filterInStockProducts,
  sortProductsByPrice,
  sortProductsByDate,
  getProductPrice,
  getProductImageUrl,
  getProductGalleryImages,
  isProductOnSale,
  getDiscountPercentage,
  clearWooCommerceCache,
  WooCommerceProduct,
  WooCommerceApiResponse
} from './woocommerce-api'
import { Product } from '@/types/wordpress'

export interface WooCommerceSiteData {
  products: WooCommerceProduct[]
  categories: any[]
  featuredProducts: WooCommerceProduct[]
  onSaleProducts: WooCommerceProduct[]
  inStockProducts: WooCommerceProduct[]
  lastUpdated: Date
  loading: boolean
  error: string | null
}

export interface ProductStats {
  totalProducts: number
  totalCategories: number
  totalFeatured: number
  totalOnSale: number
  totalInStock: number
  totalOutOfStock: number
}

class WooCommerceService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  // Fetch all WooCommerce data
  async fetchAllWooCommerceData(): Promise<WooCommerceSiteData> {
    try {
      console.log('🔄 Fetching all WooCommerce data...')
      
      const [
        productsResponse,
        categoriesResponse,
        featuredResponse,
        onSaleResponse
      ] = await Promise.all([
        fetchAllProducts(),
        fetchProductCategories(),
        fetchFeaturedProducts(),
        fetchOnSaleProducts()
      ])

      // Process and filter data
      const products = filterPublishedProducts(productsResponse.data || [])
      const categories = categoriesResponse.data || []
      const featuredProducts = filterPublishedProducts(featuredResponse.data || [])
      const onSaleProducts = filterPublishedProducts(onSaleResponse.data || [])
      const inStockProducts = filterInStockProducts(products)

      const siteData: WooCommerceSiteData = {
        products,
        categories,
        featuredProducts,
        onSaleProducts,
        inStockProducts,
        lastUpdated: new Date(),
        loading: false,
        error: null
      }

      // Cache the result
      this.cache.set('wooCommerceData', { data: siteData, timestamp: Date.now() })

      console.log('✅ WooCommerce data fetched successfully')
      return siteData

    } catch (error) {
      console.error('❌ Error fetching WooCommerce data:', error)
      return {
        products: [],
        categories: [],
        featuredProducts: [],
        onSaleProducts: [],
        inStockProducts: [],
        lastUpdated: new Date(),
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Get cached WooCommerce data or fetch fresh
  async getWooCommerceData(): Promise<WooCommerceSiteData> {
    const cached = this.cache.get('wooCommerceData')
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    return this.fetchAllWooCommerceData()
  }

  // Force refresh all WooCommerce data
  async refreshAllData(): Promise<WooCommerceSiteData> {
    console.log('🔄 Force refreshing all WooCommerce data...')
    
    // Clear all caches
    clearWooCommerceCache()
    this.cache.clear()
    
    return this.fetchAllWooCommerceData()
  }

  // Get product statistics
  getProductStats(data: WooCommerceSiteData): ProductStats {
    const outOfStockProducts = data.products.filter(product => product.stock_status === 'outofstock')
    
    return {
      totalProducts: data.products.length,
      totalCategories: data.categories.length,
      totalFeatured: data.featuredProducts.length,
      totalOnSale: data.onSaleProducts.length,
      totalInStock: data.inStockProducts.length,
      totalOutOfStock: outOfStockProducts.length
    }
  }

  // Get popular products (by total sales)
  getPopularProducts(products: WooCommerceProduct[], limit: number = 6): WooCommerceProduct[] {
    return products
      .filter(product => product.total_sales > 0)
      .sort((a, b) => b.total_sales - a.total_sales)
      .slice(0, limit)
  }

  // Get recent products
  getRecentProducts(products: WooCommerceProduct[], limit: number = 6): WooCommerceProduct[] {
    return sortProductsByDate(products, false).slice(0, limit)
  }

  // Get products by price range
  getProductsByPriceRange(products: WooCommerceProduct[], minPrice: number, maxPrice: number): WooCommerceProduct[] {
    return products.filter(product => {
      const price = parseFloat(product.price) || 0
      return price >= minPrice && price <= maxPrice
    })
  }

  // Get products by category
  async getProductsByCategory(categoryId: number): Promise<WooCommerceProduct[]> {
    const response = await fetchProductsByCategory(categoryId)
    return filterPublishedProducts(response.data || [])
  }

  // Get product by ID
  async getProductById(id: number): Promise<WooCommerceProduct | null> {
    const response = await fetchProductById(id)
    return response.data
  }

  // Get product by slug
  async getProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
    const response = await fetchProductBySlug(slug)
    const products = response.data || []
    return products.length > 0 ? products[0] : null
  }

  // Search products
  searchProducts(products: WooCommerceProduct[], query: string): WooCommerceProduct[] {
    const searchTerm = query.toLowerCase()
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.short_description.toLowerCase().includes(searchTerm) ||
      product.sku.toLowerCase().includes(searchTerm)
    )
  }

  // Get related products
  getRelatedProducts(products: WooCommerceProduct[], currentProduct: WooCommerceProduct, limit: number = 4): WooCommerceProduct[] {
    // Get products from the same categories
    const categoryIds = currentProduct.categories.map(cat => cat.id)
    
    return products
      .filter(product => 
        product.id !== currentProduct.id &&
        product.categories.some(cat => categoryIds.includes(cat.id))
      )
      .slice(0, limit)
  }

  // Get upsell products
  getUpsellProducts(products: WooCommerceProduct[], currentProduct: WooCommerceProduct): WooCommerceProduct[] {
    return products.filter(product => 
      currentProduct.upsell_ids.includes(product.id)
    )
  }

  // Get cross-sell products
  getCrossSellProducts(products: WooCommerceProduct[], currentProduct: WooCommerceProduct): WooCommerceProduct[] {
    return products.filter(product => 
      currentProduct.cross_sell_ids.includes(product.id)
    )
  }

  // Convert WooCommerce product to Product type (for compatibility)
  convertToProduct(wooProduct: WooCommerceProduct): Product {
    return {
      id: wooProduct.id,
      date: wooProduct.date_created,
      modified: wooProduct.date_modified,
      slug: wooProduct.slug,
      status: wooProduct.status as any,
      link: wooProduct.permalink,
      title: { rendered: wooProduct.name },
      content: { rendered: wooProduct.description },
      excerpt: { rendered: wooProduct.short_description },
      featured_media: wooProduct.images?.[0]?.id || 0,
      // WooCommerce specific fields
      price: wooProduct.price,
      regular_price: wooProduct.regular_price,
      sale_price: wooProduct.sale_price,
      on_sale: wooProduct.on_sale,
      stock_status: wooProduct.stock_status,
      stock_quantity: wooProduct.stock_quantity || undefined,
      images: wooProduct.images,
      attributes: wooProduct.attributes,
      // Additional fields
      categories: wooProduct.categories.map(cat => cat.id),
      tags: wooProduct.tags.map(tag => tag.id),
      meta: {
        sku: wooProduct.sku,
        total_sales: wooProduct.total_sales,
        average_rating: wooProduct.average_rating,
        rating_count: wooProduct.rating_count,
        featured: wooProduct.featured,
        virtual: wooProduct.virtual,
        downloadable: wooProduct.downloadable,
        weight: wooProduct.weight,
        dimensions: wooProduct.dimensions,
        manage_stock: wooProduct.manage_stock,
        stock_quantity: wooProduct.stock_quantity || undefined,
        backorders: wooProduct.backorders,
        sold_individually: wooProduct.sold_individually,
        purchase_note: wooProduct.purchase_note,
        reviews_allowed: wooProduct.reviews_allowed,
        upsell_ids: wooProduct.upsell_ids,
        cross_sell_ids: wooProduct.cross_sell_ids,
        parent_id: wooProduct.parent_id,
        grouped_products: wooProduct.grouped_products,
        menu_order: wooProduct.menu_order
      }
    }
  }

  // Convert multiple WooCommerce products to Product type
  convertToProducts(wooProducts: WooCommerceProduct[]): Product[] {
    return wooProducts.map(product => this.convertToProduct(product))
  }

  // Get products with filters
  getFilteredProducts(
    products: WooCommerceProduct[],
    filters: {
      category?: number
      priceRange?: { min: number; max: number }
      inStock?: boolean
      onSale?: boolean
      featured?: boolean
      sortBy?: 'price' | 'date' | 'name' | 'popularity'
      sortOrder?: 'asc' | 'desc'
    }
  ): WooCommerceProduct[] {
    let filtered = [...products]

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.categories.some(cat => cat.id === filters.category)
      )
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = this.getProductsByPriceRange(
        filtered, 
        filters.priceRange.min, 
        filters.priceRange.max
      )
    }

    // Apply stock filter
    if (filters.inStock !== undefined) {
      filtered = filtered.filter(product => 
        filters.inStock ? product.stock_status === 'instock' : product.stock_status !== 'instock'
      )
    }

    // Apply sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => isProductOnSale(product))
    }

    // Apply featured filter
    if (filters.featured) {
      filtered = filtered.filter(product => product.featured)
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price':
          filtered = sortProductsByPrice(filtered, filters.sortOrder === 'asc')
          break
        case 'date':
          filtered = sortProductsByDate(filtered, filters.sortOrder === 'asc')
          break
        case 'name':
          filtered.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            return filters.sortOrder === 'asc' 
              ? nameA.localeCompare(nameB)
              : nameB.localeCompare(nameA)
          })
          break
        case 'popularity':
          filtered.sort((a, b) => {
            return filters.sortOrder === 'asc'
              ? a.total_sales - b.total_sales
              : b.total_sales - a.total_sales
          })
          break
      }
    }

    return filtered
  }

  // Get random products
  getRandomProducts(products: WooCommerceProduct[], count: number = 10): WooCommerceProduct[] {
    const shuffled = [...products].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  // Clear all caches
  clearAllCaches(): void {
    clearWooCommerceCache()
    this.cache.clear()
    console.log('🧹 All WooCommerce caches cleared')
  }
}

// Export singleton instance
export const wooCommerceService = new WooCommerceService()

// Export utility functions
export {
  getProductPrice,
  getProductImageUrl,
  getProductGalleryImages,
  isProductOnSale,
  getDiscountPercentage
}
