'use client'

import { useState, useEffect } from 'react'
import { wooCommerceService } from '@/lib/woocommerce-service'
import { WooCommerceProduct } from '@/lib/woocommerce-api'

export default function TestWooCommercePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<WooCommerceProduct[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchWooCommerceData()
  }, [])

  const fetchWooCommerceData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 Fetching WooCommerce data...')
      const data = await wooCommerceService.getWooCommerceData()
      
      setProducts(data.products)
      setCategories(data.categories)
      setStats(wooCommerceService.getProductStats(data))
      
      console.log('✅ WooCommerce data fetched successfully:', {
        products: data.products.length,
        categories: data.categories.length,
        stats: wooCommerceService.getProductStats(data)
      })
      
    } catch (err) {
      console.error('❌ Error fetching WooCommerce data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 Refreshing WooCommerce data...')
      const data = await wooCommerceService.refreshAllData()
      
      setProducts(data.products)
      setCategories(data.categories)
      setStats(wooCommerceService.getProductStats(data))
      
      console.log('✅ WooCommerce data refreshed successfully')
      
    } catch (err) {
      console.error('❌ Error refreshing WooCommerce data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.categories.some(cat => cat.slug === selectedCategory)
      )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading WooCommerce data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading WooCommerce Data</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchWooCommerceData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">WooCommerce Test Page</h1>
          <p className="text-gray-600 mb-4">
            Testing WooCommerce connection with consumer key and secret
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={refreshData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Refresh Data
            </button>
            <button
              onClick={() => wooCommerceService.clearAllCaches()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Clear Cache
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-purple-600">{stats.totalFeatured}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-orange-600">{stats.totalOnSale}</div>
                <div className="text-sm text-gray-600">On Sale</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">{stats.totalInStock}</div>
                <div className="text-sm text-gray-600">In Stock</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-red-600">{stats.totalOutOfStock}</div>
                <div className="text-sm text-gray-600">Out of Stock</div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Product Image */}
              <div className="aspect-w-1 aspect-h-1 w-full">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.short_description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  {product.on_sale && product.regular_price ? (
                    <>
                      <span className="text-lg font-bold text-green-600">
                        ${parseFloat(product.sale_price).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${parseFloat(product.regular_price).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock_status === 'instock' 
                      ? 'bg-green-100 text-green-800'
                      : product.stock_status === 'onbackorder'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock_status === 'instock' ? 'In Stock' :
                     product.stock_status === 'onbackorder' ? 'On Backorder' : 'Out of Stock'}
                  </span>
                  
                  {product.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Featured
                    </span>
                  )}
                </div>

                {/* Categories */}
                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.categories.slice(0, 2).map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Product Details */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div>SKU: {product.sku}</div>
                  <div>Type: {product.type}</div>
                  {product.total_sales > 0 && (
                    <div>Total Sales: {product.total_sales}</div>
                  )}
                  {product.average_rating && (
                    <div>Rating: {parseFloat(product.average_rating).toFixed(1)}/5 ({product.rating_count} reviews)</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {selectedCategory === 'all' 
                ? 'No products found in WooCommerce store.'
                : `No products found in category "${selectedCategory}".`
              }
            </p>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Base URL:</strong> https://app.faditools.com
            </div>
            <div>
              <strong>Consumer Key:</strong> ck_6f94477acb6864e94e9f206fa4853c251928c638
            </div>
            <div>
              <strong>Consumer Secret:</strong> cs_770cfcaa05a4732d3774a4e91f42e285f9140683
            </div>
            <div>
              <strong>API Endpoint:</strong> /wp-json/wc/v3/products
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
