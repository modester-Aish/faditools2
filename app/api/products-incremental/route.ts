import { NextRequest, NextResponse } from 'next/server'
import { getProductsIncremental, forceRefreshAllProducts, getIncrementalCacheStats, clearIncrementalCache } from '@/lib/woocommerce-incremental'

/**
 * Incremental Products API
 * 
 * This API uses incremental fetching - only fetches new/updated products
 * instead of fetching all 624 products every time
 * 
 * Actions:
 * - get: Get products with incremental updates
 * - force-refresh: Force refresh all products
 * - stats: Get cache statistics
 * - clear: Clear cache
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'get'

    switch (action) {
      case 'get':
        const result = await getProductsIncremental()
        
        return NextResponse.json({
          success: true,
          data: {
            products: result.products,
            total: result.totalProducts,
            fromCache: result.fromCache,
            newProductsCount: result.newProductsCount,
            updatedProductsCount: result.updatedProductsCount
          },
          message: result.fromCache 
            ? `Using cached products (${result.totalProducts} products)`
            : `Fetched ${result.newProductsCount} new and ${result.updatedProductsCount} updated products`
        })

      case 'force-refresh':
        console.log('🔄 Force refresh requested via API')
        const products = await forceRefreshAllProducts()
        
        return NextResponse.json({
          success: true,
          data: {
            products,
            total: products.length
          },
          message: `Force refreshed all products (${products.length} total)`
        })

      case 'stats':
        const stats = getIncrementalCacheStats()
        
        return NextResponse.json({
          success: true,
          data: stats,
          message: 'Cache statistics retrieved'
        })

      case 'clear':
        clearIncrementalCache()
        
        return NextResponse.json({
          success: true,
          message: 'Cache cleared successfully'
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action. Use: get, force-refresh, stats, or clear'
          },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('❌ Incremental products API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Also support POST method
export async function POST(request: NextRequest) {
  return GET(request)
}

