import { NextResponse } from 'next/server';
import { clearWooCommerceCache, fetchAllProducts } from '@/lib/woocommerce-api';

export async function POST() {
  try {
    console.log('🔄 Refreshing WooCommerce products cache...');
    
    // Clear the cache
    clearWooCommerceCache();
    
    // Fetch fresh data
    const response = await fetchAllProducts();
    
    if (response.error) {
      return NextResponse.json({
        success: false,
        error: response.error
      }, { status: 500 });
    }
    
    const productCount = response.data?.length || 0;
    
    return NextResponse.json({
      success: true,
      message: `Successfully refreshed products cache`,
      productCount,
      products: response.data
    });
    
  } catch (error: any) {
    console.error('❌ Error refreshing products:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Product refresh API endpoint',
    instructions: 'Send a POST request to refresh the products cache and fetch all products'
  });
}
