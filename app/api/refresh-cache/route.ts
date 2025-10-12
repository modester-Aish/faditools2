import { NextRequest, NextResponse } from 'next/server'
import { wooCommerceService } from '@/lib/woocommerce-service'

/**
 * API Route to manually refresh WooCommerce product cache
 * 
 * Usage:
 * GET /api/refresh-cache?secret=YOUR_SECRET_KEY
 * 
 * You can call this endpoint whenever you update products in WooCommerce
 * and want to immediately refresh the cache on your site.
 * 
 * For security, set CACHE_REFRESH_SECRET in your .env file
 */
export async function GET(request: NextRequest) {
  try {
    // Get the secret from query params
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    
    // Check if secret matches (optional security measure)
    const expectedSecret = process.env.CACHE_REFRESH_SECRET || 'faditools-refresh-2024'
    
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid or missing secret key. Please provide ?secret=YOUR_SECRET_KEY',
          message: 'Set CACHE_REFRESH_SECRET in your .env file for security'
        },
        { status: 401 }
      )
    }

    console.log('🔄 Manual cache refresh requested...')
    
    // Force refresh all WooCommerce data
    const data = await wooCommerceService.refreshAllData()
    
    console.log('✅ Cache refreshed successfully')
    
    return NextResponse.json({
      success: true,
      message: 'WooCommerce cache refreshed successfully',
      data: {
        totalProducts: data.products.length,
        totalCategories: data.categories.length,
        featuredProducts: data.featuredProducts.length,
        onSaleProducts: data.onSaleProducts.length,
        inStockProducts: data.inStockProducts.length,
        lastUpdated: data.lastUpdated
      }
    })

  } catch (error) {
    console.error('❌ Error refreshing cache:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to refresh cache',
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

