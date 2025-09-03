import { NextRequest, NextResponse } from 'next/server'
import { wooCommerceService } from '@/lib/woocommerce-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'products'
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'
    const onSale = searchParams.get('onSale') === 'true'

    console.log('🔄 WooCommerce API request:', { action, limit, category, featured, onSale })

    switch (action) {
      case 'products':
        const data = await wooCommerceService.getWooCommerceData()
        let products = data.products

        // Apply filters
        if (category) {
          const categoryId = parseInt(category)
          products = products.filter(product => 
            product.categories.some(cat => cat.id === categoryId)
          )
        }

        if (featured) {
          products = products.filter(product => product.featured)
        }

        if (onSale) {
          products = products.filter(product => product.on_sale)
        }

        // Apply limit
        products = products.slice(0, limit)

        return NextResponse.json({
          success: true,
          data: {
            products,
            total: products.length,
            stats: wooCommerceService.getProductStats(data)
          }
        })

      case 'categories':
        const categoriesData = await wooCommerceService.getWooCommerceData()
        return NextResponse.json({
          success: true,
          data: {
            categories: categoriesData.categories,
            total: categoriesData.categories.length
          }
        })

      case 'featured':
        const featuredData = await wooCommerceService.getWooCommerceData()
        const featuredProducts = featuredData.featuredProducts.slice(0, limit)
        return NextResponse.json({
          success: true,
          data: {
            products: featuredProducts,
            total: featuredProducts.length
          }
        })

      case 'onSale':
        const onSaleData = await wooCommerceService.getWooCommerceData()
        const onSaleProducts = onSaleData.onSaleProducts.slice(0, limit)
        return NextResponse.json({
          success: true,
          data: {
            products: onSaleProducts,
            total: onSaleProducts.length
          }
        })

      case 'stats':
        const statsData = await wooCommerceService.getWooCommerceData()
        return NextResponse.json({
          success: true,
          data: {
            stats: wooCommerceService.getProductStats(statsData)
          }
        })

      case 'refresh':
        const refreshedData = await wooCommerceService.refreshAllData()
        return NextResponse.json({
          success: true,
          data: {
            message: 'Data refreshed successfully',
            stats: wooCommerceService.getProductStats(refreshedData)
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Use: products, categories, featured, onSale, stats, or refresh'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('❌ WooCommerce API Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, productId, slug } = body

    console.log('🔄 WooCommerce API POST request:', { action, productId, slug })

    switch (action) {
      case 'product':
        if (productId) {
          const product = await wooCommerceService.getProductById(productId)
          return NextResponse.json({
            success: true,
            data: { product }
          })
        } else if (slug) {
          const product = await wooCommerceService.getProductBySlug(slug)
          return NextResponse.json({
            success: true,
            data: { product }
          })
        } else {
          return NextResponse.json({
            success: false,
            error: 'Product ID or slug is required'
          }, { status: 400 })
        }

      case 'category':
        if (!productId) {
          return NextResponse.json({
            success: false,
            error: 'Category ID is required'
          }, { status: 400 })
        }
        
        const categoryProducts = await wooCommerceService.getProductsByCategory(productId)
        return NextResponse.json({
          success: true,
          data: {
            products: categoryProducts,
            total: categoryProducts.length
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Use: product or category'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('❌ WooCommerce API POST Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
