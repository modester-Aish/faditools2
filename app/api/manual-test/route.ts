import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// WooCommerce configuration
const WOOCOMMERCE_CONFIG = {
  siteUrl: 'https://app.faditools.com',
  consumerKey: 'ck_6f94477acb6864e94e9f206fa4853c251928c638',
  consumerSecret: 'cs_770cfcaa05a4732d3774a4e91f42e285f9140683'
};

// Affiliate link
const AFFILIATE_LINK = 'https://members.seotoolsgroupbuy.us/signup';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Creating manual test products with affiliate links...');

    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');

    // Test products with affiliate links
    const testProducts = [
      {
        name: 'Ahrefs SEO Tools - Group Buy',
        price: '29.99',
        image: 'https://app.faditools.com/wp-content/uploads/2024/01/ahrefs-logo.svg'
      },
      {
        name: 'SEMrush Premium - Group Buy',
        price: '39.99',
        image: 'https://app.faditools.com/wp-content/uploads/2024/01/semrush-logo.svg'
      },
      {
        name: 'Moz Pro - Group Buy',
        price: '19.99',
        image: 'https://app.faditools.com/wp-content/uploads/2024/01/moz-logo.svg'
      }
    ];

    const results = [];

    for (const product of testProducts) {
      try {
        const productData = {
          name: product.name,
          type: 'simple',
          regular_price: product.price,
          price: product.price,
          meta_data: [
            {
              key: 'affiliate_link',
              value: AFFILIATE_LINK
            },
            {
              key: 'scraped_price',
              value: product.price
            },
            {
              key: 'source_url',
              value: 'ToolSurf'
            }
          ]
        };

        const response = await axios.post(
          `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products`,
          productData,
          {
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json'
            },
            timeout: 15000
          }
        );

        console.log(`✅ Created product: ${product.name} (ID: ${response.data.id})`);
        results.push({
          success: true,
          productName: product.name,
          productId: response.data.id,
          price: product.price,
          affiliateLink: AFFILIATE_LINK
        });

        // Small delay between products
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error: any) {
        console.error(`❌ Error creating product "${product.name}":`, error.response?.data || error.message);
        results.push({
          success: false,
          productName: product.name,
          error: error.response?.data?.message || error.message || 'Unknown error'
        });
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      message: 'Manual test products creation completed',
      summary: {
        totalProducts: testProducts.length,
        successful,
        failed
      },
      results
    });

  } catch (error: any) {
    console.error('❌ Manual test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Manual test API endpoint',
    instructions: 'Send a POST request to create test products with affiliate links'
  });
}
