import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

// ToolSurf sitemap URL
const TOOLSURF_SITEMAP_URL = 'https://www.toolsurf.com/product-sitemap.xml';

// WooCommerce configuration using existing credentials
const WOOCOMMERCE_CONFIG = {
  siteUrl: 'https://app.faditools.com',
  consumerKey: 'ck_6f94477acb6864e94e9f206fa4853c251928c638',
  consumerSecret: 'cs_770cfcaa05a4732d3774a4e91f42e285f9140683'
};

interface ScrapedProduct {
  name: string;
  image: string;
}

// Function to fetch all product URLs from ToolSurf sitemap
async function fetchAllProductUrlsFromSitemap(): Promise<string[]> {
  try {
    console.log('🔄 Fetching product URLs from ToolSurf sitemap...');
    
    const response = await axios.get(TOOLSURF_SITEMAP_URL, {
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

    console.log(`✅ Found ${productUrls.length} product URLs from sitemap`);
    return productUrls;
  } catch (error) {
    console.error('❌ Error fetching sitemap:', error);
    return [];
  }
}

interface ScrapingResult {
  url: string;
  success: boolean;
  product?: {
    name: string;
    image: string;
  };
  error?: string;
}

interface WooCommerceResult {
  url: string;
  success: boolean;
  productId?: number;
  error?: string;
}


// Simplified scraping function using only axios and cheerio
async function scrapeProductWithAxios(url: string): Promise<ScrapedProduct | null> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    });

    const $ = cheerio.load(response.data);
    
    // Try multiple selectors for product name
    let productName = '';
    const nameSelectors = [
      'h1.product_title',
      'h1.entry-title',
      'h1[class*="product"]',
      'h1[class*="title"]',
      '.product-title h1',
      '.product-name h1',
      'h1'
    ];

    for (const selector of nameSelectors) {
      const nameElement = $(selector).first();
      if (nameElement.length && nameElement.text().trim()) {
        productName = nameElement.text().trim();
        break;
      }
    }

    // Try multiple selectors for product image
    let productImage = '';
    const imageSelectors = [
      '.woocommerce-product-gallery__image img',
      '.product-image img',
      '.product-photo img',
      '.main-image img',
      '.featured-image img',
      'img[class*="product"]',
      'img[class*="main"]',
      'img[class*="featured"]'
    ];

    for (const selector of imageSelectors) {
      const imgElement = $(selector).first();
      if (imgElement.length) {
        const src = imgElement.attr('src') || imgElement.attr('data-src') || imgElement.attr('data-lazy-src');
        if (src && src.startsWith('http')) {
          productImage = src;
          break;
        }
      }
    }

    if (!productName || !productImage) {
      return null;
    }

    return {
      name: productName,
      image: productImage
    };
  } catch (error) {
    console.error(`Axios scraping failed for ${url}:`, error);
    return null;
  }
}

async function scrapeProduct(url: string): Promise<ScrapingResult> {
  // Use simplified scraping with axios and cheerio
  const scrapedData = await scrapeProductWithAxios(url);

  if (!scrapedData) {
    return {
      url,
      success: false,
      error: 'Failed to scrape product data - no valid selectors found'
    };
  }

  return {
    url,
    success: true,
    product: scrapedData
  };
}

async function postToWooCommerce(product: ScrapedProduct): Promise<WooCommerceResult> {
  try {
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    const productData = {
      name: product.name,
      type: 'simple',
      regular_price: '10.00',
      images: [
        {
          src: product.image
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
      url: product.name, // Using product name as identifier
      success: true,
      productId: response.data.id
    };
  } catch (error: any) {
    console.error('WooCommerce API error:', error.response?.data || error.message);
    return {
      url: product.name,
      success: false,
      error: error.response?.data?.message || error.message || 'Unknown WooCommerce API error'
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // First, fetch all product URLs from ToolSurf sitemap
    const productUrls = await fetchAllProductUrlsFromSitemap();
    
    if (productUrls.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No product URLs found in ToolSurf sitemap'
      }, { status: 400 });
    }

    const scrapingResults: ScrapingResult[] = [];
    const wooCommerceResults: WooCommerceResult[] = [];

    console.log(`🚀 Starting to scrape ${productUrls.length} products from ToolSurf...`);

    // Scrape all products
    for (let i = 0; i < productUrls.length; i++) {
      const url = productUrls[i];
      console.log(`📦 [${i + 1}/${productUrls.length}] Scraping: ${url}`);
      
      const result = await scrapeProduct(url);
      scrapingResults.push(result);
      
      // If scraping was successful, post to WooCommerce
      if (result.success && result.product) {
        console.log(`✅ Posting to WooCommerce: ${result.product.name}`);
        const wooResult = await postToWooCommerce(result.product);
        wooCommerceResults.push(wooResult);
      } else {
        console.log(`❌ Failed to scrape: ${url} - ${result.error}`);
        wooCommerceResults.push({
          url,
          success: false,
          error: result.error || 'Scraping failed'
        });
      }

      // Add a small delay to avoid overwhelming the servers
      if (i < productUrls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successfulScrapes = scrapingResults.filter(r => r.success).length;
    const successfulPosts = wooCommerceResults.filter(r => r.success).length;

    console.log(`🎉 Scraping completed! Successfully scraped: ${successfulScrapes}/${productUrls.length}, Posted to WooCommerce: ${successfulPosts}/${productUrls.length}`);

    return NextResponse.json({
      success: true,
      summary: {
        totalUrls: productUrls.length,
        successfulScrapes,
        successfulPosts,
        failedScrapes: productUrls.length - successfulScrapes,
        failedPosts: productUrls.length - successfulPosts
      },
      scrapingResults,
      wooCommerceResults
    });

  } catch (error: any) {
    console.error('❌ Scraping process error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred during scraping process'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch current product count from sitemap
    const productUrls = await fetchAllProductUrlsFromSitemap();
    
    return NextResponse.json({
      message: 'Product scraping API endpoint',
      instructions: 'Send a POST request to start scraping products',
      sitemapUrl: TOOLSURF_SITEMAP_URL,
      currentProductCount: productUrls.length,
      wooCommerceConfigured: !!(WOOCOMMERCE_CONFIG.consumerKey && WOOCOMMERCE_CONFIG.consumerSecret),
      wooCommerceSite: WOOCOMMERCE_CONFIG.siteUrl
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Product scraping API endpoint',
      instructions: 'Send a POST request to start scraping products',
      sitemapUrl: TOOLSURF_SITEMAP_URL,
      error: 'Could not fetch current product count from sitemap',
      wooCommerceConfigured: !!(WOOCOMMERCE_CONFIG.consumerKey && WOOCOMMERCE_CONFIG.consumerSecret),
      wooCommerceSite: WOOCOMMERCE_CONFIG.siteUrl
    });
  }
}
