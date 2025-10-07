import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const WOOCOMMERCE_BASE_URL = process.env.WOOCOMMERCE_BASE_URL || 'https://app.faditools.com'
    const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || ''
    const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || ''

    console.log('Environment Check:')
    console.log('WOOCOMMERCE_BASE_URL:', WOOCOMMERCE_BASE_URL)
    console.log('CONSUMER_KEY exists:', !!CONSUMER_KEY)
    console.log('CONSUMER_SECRET exists:', !!CONSUMER_SECRET)

    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      return NextResponse.json({
        success: false,
        error: 'WooCommerce credentials missing',
        details: {
          hasBaseUrl: !!WOOCOMMERCE_BASE_URL,
          hasKey: !!CONSUMER_KEY,
          hasSecret: !!CONSUMER_SECRET
        }
      }, { status: 500 })
    }

    const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=5`
    
    console.log('Fetching from:', WOOCOMMERCE_BASE_URL)
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const products = await response.json()

    return NextResponse.json({
      success: true,
      productCount: products.length,
      products: products.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price
      })),
      message: 'WooCommerce connection successful!'
    })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

