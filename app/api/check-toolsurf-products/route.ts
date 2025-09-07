import { NextRequest, NextResponse } from 'next/server'
import { fetchAllProducts } from '@/lib/woocommerce-api'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking for ToolSurf products...')
    
    // Fetch all products
    const products = await fetchAllProducts()
    
    // Search for ToolSurf products by looking for specific patterns
    const toolsurfProducts = products.filter(product => {
      const name = product.name.toLowerCase()
      const metaData = product.meta_data || []
      
      // Check if it has ToolSurf meta data
      const hasToolSurfMeta = metaData.some((meta: any) => 
        meta.key === 'source_url' && meta.value === 'ToolSurf'
      )
      
      // Check if name contains ToolSurf-related keywords
      const hasToolSurfKeywords = name.includes('group buy') || 
                                 name.includes('tool') ||
                                 name.includes('seo') ||
                                 name.includes('shutterstock') ||
                                 name.includes('picmonkey') ||
                                 name.includes('animoto')
      
      return hasToolSurfMeta || hasToolSurfKeywords
    })
    
    // Get some sample products to show
    const sampleProducts = toolsurfProducts.slice(0, 10).map(product => ({
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
      toolsurfProductsFound: toolsurfProducts.length,
      sampleProducts,
      message: `Found ${toolsurfProducts.length} ToolSurf products out of ${products.length} total products`
    })
    
  } catch (error: any) {
    console.error('Error checking ToolSurf products:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
