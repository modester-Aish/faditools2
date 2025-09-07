import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

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
    console.log('🧪 Testing single product post to WooCommerce...');
    
    // Test product data
    const testProduct = {
      name: 'Test Shutterstock Group Buy',
      type: 'simple',
      regular_price: '19.00',
      price: '19.00',
      sale_price: '',
      images: [
        {
          src: 'https://www.toolsurf.com/wp-content/uploads/2020/04/Shutterstock-Group-Buy-Starting-just-19-per-month-Toolsurf.png'
        }
      ],
      meta_data: [
        {
          key: 'affiliate_link',
          value: AFFILIATE_LINK
        },
        {
          key: 'scraped_price',
          value: '19.00'
        },
        {
          key: 'focus_keyword',
          value: 'shutterstock group buy'
        },
        {
          key: 'source_url',
          value: 'Source'
        }
      ]
    };

    // Create auth header
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    console.log('📤 Posting test product to WooCommerce...');
    console.log('Product data:', JSON.stringify(testProduct, null, 2));
    
    const response = await axios.post(
      `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products`,
      testProduct,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    console.log('✅ Product posted successfully!');
    console.log('Response:', response.data);

    return NextResponse.json({
      success: true,
      message: 'Test product posted successfully',
      productId: response.data.id,
      productName: response.data.name,
      productData: response.data
    });

  } catch (error: any) {
    console.error('❌ Error posting test product:', error.response?.data || error.message);
    
    return NextResponse.json({
      success: false,
      error: error.response?.data || error.message,
      message: 'Failed to post test product'
    }, { status: 500 });
  }
}
