import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Source sitemap URL
const SOURCE_SITEMAP_URL = 'https://www.toolsurf.com/product-sitemap.xml';

// Affiliate link for all products
const AFFILIATE_LINK = 'https://members.seotoolsgroupbuy.us/signup';

// WooCommerce configuration using existing credentials
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

// Function to fetch first 5 product URLs from source sitemap for testing
async function fetchTestProductUrls(): Promise<string[]> {
  try {
    console.log('🔄 Fetching test product URLs from source sitemap...');
    
    const response = await axios.get(SOURCE_SITEMAP_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000
    });

    // Parse XML using regex to extract URLs
    const xmlContent = response.data;
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls: string[] = [];
    let match;
    
    while ((match = urlRegex.exec(xmlContent)) !== null) {
      urls.push(match[1]);
    }
    
    // Filter out non-product URLs (keep only seo-tools URLs)
    const productUrls = urls.filter((url: string) => 
      url.includes('/seo-tools/') && 
      !url.includes('/shop/') &&
      !url.includes('/category/') &&
      !url.includes('/tag/')
    );

    // Take only first 5 for testing
    const testUrls = productUrls.slice(0, 5);

    console.log(`✅ Found ${testUrls.length} test product URLs from sitemap`);
    return testUrls;
  } catch (error) {
    console.error('❌ Error fetching sitemap:', error);
    return [];
  }
}

// Simplified scraping function using regex parsing
async function scrapeProductWithAxios(url: string): Promise<ScrapedProduct | null> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    });

    const html = response.data;
    
    // Extract product name using regex patterns
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

    // Extract product image using regex patterns
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

    // Extract product price using regex patterns
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
        regularPrice = productPrice; // Set regular price same as current price
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
    console.error(`Axios scraping failed for ${url}:`, error);
    return null;
  }
}

async function postToWooCommerce(product: ScrapedProduct): Promise<any> {
  try {
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    const productData = {
      name: product.name,
      type: 'simple',
      regular_price: product.price || '10.00',
      price: product.price || '10.00',
      images: [
        {
          src: product.image
        }
      ],
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

    return {
      success: true,
      productId: response.data.id,
      productName: product.name
    };
  } catch (error: any) {
    console.error('WooCommerce API error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Unknown WooCommerce API error',
      productName: product.name
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // First, fetch test product URLs from source sitemap
    const productUrls = await fetchTestProductUrls();
    
    if (productUrls.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No product URLs found in source sitemap'
      }, { status: 400 });
    }

    const results: any[] = [];

    console.log(`🚀 Starting to scrape ${productUrls.length} test products from source...`);

    // Scrape all test products
    for (let i = 0; i < productUrls.length; i++) {
      const url = productUrls[i];
      console.log(`📦 [${i + 1}/${productUrls.length}] Scraping: ${url}`);
      
      const scrapedData = await scrapeProductWithAxios(url);
      
      if (scrapedData) {
        console.log(`✅ Scraped: ${scrapedData.name} - Price: ${scrapedData.price}`);
        
        // Post to WooCommerce
        const wooResult = await postToWooCommerce(scrapedData);
        results.push({
          url,
          scraped: true,
          productName: scrapedData.name,
          price: scrapedData.price,
          image: scrapedData.image,
          affiliateLink: scrapedData.affiliateLink,
          wooCommerceResult: wooResult
        });
      } else {
        console.log(`❌ Failed to scrape: ${url}`);
        results.push({
          url,
          scraped: false,
          error: 'Failed to scrape product data'
        });
      }

      // Add a small delay to avoid overwhelming the servers
      if (i < productUrls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successfulScrapes = results.filter(r => r.scraped).length;
    const successfulPosts = results.filter(r => r.scraped && r.wooCommerceResult?.success).length;

    console.log(`🎉 Test scraping completed! Successfully scraped: ${successfulScrapes}/${productUrls.length}, Posted to WooCommerce: ${successfulPosts}/${productUrls.length}`);

    return NextResponse.json({
      success: true,
      summary: {
        totalUrls: productUrls.length,
        successfulScrapes,
        successfulPosts,
        failedScrapes: productUrls.length - successfulScrapes,
        failedPosts: productUrls.length - successfulPosts
      },
      results
    });

  } catch (error: any) {
    console.error('❌ Test scraping process error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred during test scraping process'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test scraping API endpoint',
    instructions: 'Send a POST request to test scraping with first 5 products'
  });
}
