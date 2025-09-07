import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Source sitemap URL
const SOURCE_SITEMAP_URL = 'https://www.toolsurf.com/product-sitemap.xml';

// Affiliate link for all products
const AFFILIATE_LINK = 'https://members.seotoolsgroupbuy.us/signup';

// WooCommerce configuration
const WOOCOMMERCE_CONFIG = {
  siteUrl: 'https://app.faditools.com',
  consumerKey: 'ck_6f94477acb6864e94e9f206fa4853c251928c638',
  consumerSecret: 'cs_770cfcaa05a4732d3774a4e91f42e285f9140683'
};

interface ScrapedProduct {
  name: string;
  image: string;
  price?: string;
  regularPrice?: string;
  affiliateLink: string;
}

// Function to scrape product data from source
async function scrapeProductWithAxios(url: string): Promise<ScrapedProduct | null> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    });

    const html = response.data;
    
    // Extract product name
    let productName = '';
    const namePatterns = [
      /<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>(.*?)<\/h1>/i,
      /<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h1>/i,
      /<h1[^>]*class="[^"]*product[^"]*"[^>]*>(.*?)<\/h1>/i,
      /<h1[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/h1>/i,
      /<h1[^>]*>(.*?)<\/h1>/i
    ];

    for (const pattern of namePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        productName = match[1].replace(/<[^>]*>/g, '').trim();
        if (productName) break;
      }
    }

    // Extract product image
    let productImage = '';
    const imagePatterns = [
      /<img[^>]*class="[^"]*woocommerce-product-gallery[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*product-image[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*product-photo[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*main-image[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*featured-image[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*product[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*main[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*featured[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*data-src="([^"]+)"[^>]*class="[^"]*product[^"]*"/i,
      /<img[^>]*data-lazy-src="([^"]+)"[^>]*class="[^"]*product[^"]*"/i
    ];

    for (const pattern of imagePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        const src = match[1];
        if (src && (src.startsWith('http') || src.startsWith('//'))) {
          productImage = src.startsWith('//') ? 'https:' + src : src;
          break;
        }
      }
    }

    // Extract product price
    let productPrice = '';
    let regularPrice = '';
    
    const pricePatterns = [
      /<span[^>]*class="[^"]*price[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/span>/i,
      /<span[^>]*class="[^"]*woocommerce-Price-amount[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/span>/i,
      /<div[^>]*class="[^"]*price[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/div>/i,
      /<p[^>]*class="[^"]*price[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/p>/i,
      /<span[^>]*class="[^"]*amount[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/span>/i,
      /(\$[\d,]+\.?\d*)/i
    ];

    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        productPrice = match[1].replace(/[^\d.,]/g, ''); // Clean price
        regularPrice = productPrice;
        break;
      }
    }

    // If no price found, set default
    if (!productPrice) {
      productPrice = '10.00';
      regularPrice = '10.00';
    }

    if (!productName || !productImage) {
      return null;
    }

    return {
      name: productName,
      image: productImage,
      price: productPrice,
      regularPrice: regularPrice,
      affiliateLink: AFFILIATE_LINK
    };
  } catch (error) {
    console.error(`Scraping failed for ${url}:`, error);
    return null;
  }
}

// Function to update WooCommerce product
async function updateWooCommerceProduct(productId: number, product: ScrapedProduct): Promise<boolean> {
  try {
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    const updateData = {
      regular_price: product.price || '10.00',
      price: product.price || '10.00',
      meta_data: [
        {
          key: 'affiliate_link',
          value: product.affiliateLink
        },
        {
          key: 'scraped_price',
          value: product.price || '10.00'
        },
        {
          key: 'source_url',
          value: 'Source'
        }
      ]
    };

    await axios.put(
      `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products/${productId}`,
      updateData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    return true;
  } catch (error: any) {
    console.error(`Failed to update product ${productId}:`, error.response?.data || error.message);
    return false;
  }
}

// Function to get all WooCommerce products
async function getAllWooCommerceProducts(): Promise<any[]> {
  try {
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    let allProducts: any[] = [];
    let page = 1;
    let hasMore = true;
    const perPage = 100;

    while (hasMore) {
      const response = await axios.get(
        `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products?consumer_key=${WOOCOMMERCE_CONFIG.consumerKey}&consumer_secret=${WOOCOMMERCE_CONFIG.consumerSecret}&per_page=${perPage}&page=${page}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 15000
        }
      );

      const products = response.data;
      
      if (products.length === 0) {
        hasMore = false;
      } else {
        allProducts = [...allProducts, ...products];
        page++;
        
        if (products.length < perPage) {
          hasMore = false;
        }
      }
    }

    return allProducts;
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Starting product update process...');
    
    // Get all existing WooCommerce products
    const existingProducts = await getAllWooCommerceProducts();
    console.log(`📦 Found ${existingProducts.length} existing products`);
    
    let updatedCount = 0;
    let failedCount = 0;
    
    // Update each product with affiliate link and real prices
    for (const product of existingProducts) {
      try {
        // Update with affiliate link and default price
        const updateData = {
          meta_data: [
            {
              key: 'affiliate_link',
              value: AFFILIATE_LINK
            },
            {
              key: 'scraped_price',
              value: product.regular_price || '10.00'
            },
            {
              key: 'source_url',
              value: 'Source'
            }
          ]
        };

        const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
        
        await axios.put(
          `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products/${product.id}`,
          updateData,
          {
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json'
            },
            timeout: 15000
          }
        );

        updatedCount++;
        console.log(`✅ Updated product: ${product.name}`);
        
        // Add small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        failedCount++;
        console.error(`❌ Failed to update product ${product.name}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product update process completed',
      summary: {
        totalProducts: existingProducts.length,
        updatedCount,
        failedCount
      }
    });

  } catch (error: any) {
    console.error('❌ Product update process error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred during product update process'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Product update API endpoint',
    instructions: 'Send a POST request to update all products with affiliate links and real prices',
    affiliateLink: AFFILIATE_LINK
  });
}
