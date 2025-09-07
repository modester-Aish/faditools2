import { NextResponse } from 'next/server';
import axios from 'axios';
import { fetchAllProducts } from '@/lib/woocommerce-api';

// WooCommerce configuration
const WOOCOMMERCE_CONFIG = {
  siteUrl: 'https://app.faditools.com',
  consumerKey: 'ck_6f94477acb6864e94e9f206fa4853c251928c638',
  consumerSecret: 'cs_770cfcaa05a4732d3774a4e91f42e285f9140683'
};

export async function POST() {
  try {
    console.log('🗑️ Starting to delete all products...');

    // First, get all products
    const { data: allProducts, error: fetchError } = await fetchAllProducts();

    if (fetchError || !allProducts) {
      return NextResponse.json({
        success: false,
        error: fetchError || 'Failed to fetch products for deletion'
      }, { status: 500 });
    }

    console.log(`Found ${allProducts.length} products to delete`);

    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    const deleteResults: { productId: number; success: boolean; error?: string }[] = [];
    let deletedCount = 0;

    // Delete each product
    for (const product of allProducts) {
      try {
        await axios.delete(
          `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products/${product.id}?force=true`,
          {
            headers: {
              'Authorization': `Basic ${auth}`
            },
            timeout: 15000
          }
        );
        
        console.log(`✅ Deleted product: ${product.name} (ID: ${product.id})`);
        deleteResults.push({ productId: product.id, success: true });
        deletedCount++;

        // Add a small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error: any) {
        console.error(`❌ Error deleting product "${product.name}" (ID: ${product.id}):`, error.response?.data || error.message);
        deleteResults.push({
          productId: product.id,
          success: false,
          error: error.response?.data?.message || error.message || 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product deletion process completed',
      summary: {
        totalProducts: allProducts.length,
        deletedCount,
        failedCount: allProducts.length - deletedCount
      },
      deleteResults
    });

  } catch (error: any) {
    console.error('❌ Error in delete all products process:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred during deletion process'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Delete all products API endpoint',
    instructions: 'Send a POST request to delete all products from WooCommerce'
  });
}
