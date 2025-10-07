import { NextResponse } from 'next/server'
import { fetchAllProducts } from '@/lib/woocommerce-api'

export async function GET() {
  try {
    console.log('🔄 Fetching all products...')
    
    const response = await fetchAllProducts()
    
    if (response.error || !response.data) {
      return NextResponse.json(
        { error: response.error || 'Failed to fetch products' },
        { status: 500 }
      )
    }

    const products = response.data
    const productNames = products.map((product, index) => ({
      number: index + 1,
      name: product.name,
      id: product.id,
      slug: product.slug
    }))

    console.log(`✅ Found ${productNames.length} products`)

    return NextResponse.json({
      total: productNames.length,
      products: productNames
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

