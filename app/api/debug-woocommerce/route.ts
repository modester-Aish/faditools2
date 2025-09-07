import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

// WooCommerce configuration
const WOOCOMMERCE_CONFIG = {
  siteUrl: 'https://app.faditools.com',
  consumerKey: 'ck_6f94477acb6864e94e9f206fa4853c251928c638',
  consumerSecret: 'cs_770cfcaa05a4732d3774a4e91f42e285f9140683'
};

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Debugging WooCommerce API...');
    
    // Test product data with different image URLs
    const testProducts = [
      {
        name: 'Debug Test 1 - Original ToolSurf URL',
        type: 'simple',
        regular_price: '19.00',
        price: '19.00',
        images: [
          {
            src: 'https://www.toolsurf.com/wp-content/uploads/2020/04/Shutterstock-Group-Buy-Starting-just-19-per-month-Toolsurf.png'
          }
        ]
      },
      {
        name: 'Debug Test 2 - Production URL',
        type: 'simple',
        regular_price: '19.00',
        price: '19.00',
        images: [
          {
            src: 'https://app.faditools.com/images/products/shutterstock-private-account-1757254019179.png'
          }
        ]
      },
      {
        name: 'Debug Test 3 - No Image',
        type: 'simple',
        regular_price: '19.00',
        price: '19.00',
        images: []
      }
    ];

    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    const results = [];

    for (let i = 0; i < testProducts.length; i++) {
      const product = testProducts[i];
      console.log(`\n🧪 Testing Product ${i + 1}: ${product.name}`);
      console.log(`🖼️ Image URL: ${product.images[0]?.src || 'No image'}`);
      
      try {
        const response = await axios.post(
          `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products`,
          product,
          {
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json'
            },
            timeout: 15000
          }
        );

        console.log(`✅ Success! Product ID: ${response.data.id}`);
        results.push({
          product: product.name,
          success: true,
          productId: response.data.id,
          imageUrl: product.images[0]?.src || 'No image'
        });

      } catch (error: any) {
        console.log(`❌ Failed: ${error.response?.data?.message || error.message}`);
        results.push({
          product: product.name,
          success: false,
          error: error.response?.data || error.message,
          imageUrl: product.images[0]?.src || 'No image'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'WooCommerce debug completed',
      results
    });

  } catch (error: any) {
    console.error('❌ Debug error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
