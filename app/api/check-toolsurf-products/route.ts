import { NextRequest, NextResponse } from 'next/server'
import { fetchAllProducts } from '@/lib/woocommerce-api'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking for scraped products...')
    
    // Fetch all products
    const productsResponse = await fetchAllProducts()
    
    if (productsResponse.error || !productsResponse.data) {
      return NextResponse.json({
        success: false,
        error: productsResponse.error || 'No products found'
      }, { status: 500 })
    }
    
    const products = productsResponse.data
    
    // Search for scraped products by looking for specific patterns
    const scrapedProducts = products.filter(product => {
      const name = product.name.toLowerCase()
      const metaData = product.meta_data || []
      
      // Check if it has scraped meta data
      const hasScrapedMeta = metaData.some((meta: any) => 
        meta.key === 'source_url' && meta.value && meta.value !== ''
      )
      
      // Check if name contains relevant keywords
      const hasRelevantKeywords = name.includes('group buy') || 
                                 name.includes('tool') ||
                                 name.includes('seo') ||
                                 name.includes('shutterstock') ||
                                 name.includes('picmonkey') ||
                                 name.includes('animoto')
      
      return hasScrapedMeta || hasRelevantKeywords
    })
    
    // Get some sample products to show
    const sampleProducts = scrapedProducts.slice(0, 10).map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      hasAffiliateLink: product.meta_data?.some((meta: any) => meta.key === 'affiliate_link'),
      sourceUrl: product.meta_data?.find((meta: any) => meta.key === 'source_url')?.value,
      focusKeyword: product.meta_data?.find((meta: any) => meta.key === 'focus_keyword')?.value
    }))
    
    return NextResponse.json({
      success: true,
      totalProducts: products.length,
      scrapedProductsFound: scrapedProducts.length,
      sampleProducts,
      message: `Found ${scrapedProducts.length} scraped products out of ${products.length} total products`
    })
    
  } catch (error: any) {
    console.error('Error checking scraped products:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
