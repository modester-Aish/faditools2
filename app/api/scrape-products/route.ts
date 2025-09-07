import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Source sitemap URL
const SOURCE_SITEMAP_URL = 'https://www.toolsurf.com/product-sitemap.xml';

// Affiliate link for all products
const AFFILIATE_LINK = 'https://members.seotoolsgroupbuy.us/signup';

// Function to upload image to production server via WooCommerce
async function uploadImageToWooCommerce(imageUrl: string, productName: string): Promise<string> {
  try {
    console.log(`📤 Downloading and uploading image: ${imageUrl}`);
    
    // Download image first
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'arraybuffer',
      timeout: 30000
    });
    
    // Generate filename
    const sanitizedName = productName
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50);
    
    const fileExtension = imageUrl.split('.').pop() || 'jpg';
    const filename = `${sanitizedName}-${Date.now()}.${fileExtension}`;
    
    // Create FormData for upload
    const formData = new FormData();
    const blob = new Blob([response.data], { type: `image/${fileExtension}` });
    formData.append('file', blob, filename);
    
    // Upload to WordPress media library
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    const uploadResponse = await axios.post(
      `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wp/v2/media`,
      formData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000
      }
    );
    
    const uploadedImageUrl = uploadResponse.data.source_url;
    console.log(`✅ Image uploaded successfully: ${uploadedImageUrl}`);
    return uploadedImageUrl;
    
  } catch (error: any) {
    console.error(`❌ Failed to upload image ${imageUrl}:`, error.response?.data || error.message);
    // Return original URL as fallback
    return imageUrl;
  }
}

// Function to download image and return local path
async function downloadImage(imageUrl: string, productName: string): Promise<string> {
  try {
    console.log(`📥 Downloading image: ${imageUrl}`);
    
    // Create public/images/products directory if it doesn't exist
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Generate filename from product name
    const sanitizedName = productName
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50);
    
    const fileExtension = path.extname(imageUrl) || '.jpg';
    const filename = `${sanitizedName}-${Date.now()}${fileExtension}`;
    const filepath = path.join(imagesDir, filename);
    
    // Download image
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream',
      timeout: 30000
    });
    
    // Save image to file
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        const publicPath = `/images/products/${filename}`;
        const fullUrl = `https://app.faditools.com${publicPath}`;
        console.log(`✅ Image saved: ${publicPath}`);
        console.log(`🔗 Production URL: ${fullUrl}`);
        resolve(publicPath); // Return local path instead of production URL
      });
      writer.on('error', reject);
    });
    
  } catch (error) {
    console.error(`❌ Failed to download image ${imageUrl}:`, error);
    // Return original URL as fallback
    return imageUrl;
  }
}

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
  salePrice?: string;
  focusKeyword?: string;
  affiliateLink: string;
}

// Function to fetch all product data from source sitemap
async function fetchAllProductDataFromSitemap(): Promise<Array<{url: string, name: string, image: string}>> {
  try {
    console.log('🔄 Fetching product data from source sitemap...');
    
    const response = await axios.get(SOURCE_SITEMAP_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000
    });

    // Parse XML using regex to extract URLs, names, and images
    const xmlContent = response.data;
    const products: Array<{url: string, name: string, image: string}> = [];
    
    // Extract URLs
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls: string[] = [];
    let match;
    
    while ((match = urlRegex.exec(xmlContent)) !== null) {
      urls.push(match[1]);
    }
    
    // Extract images
    const imageRegex = /<image:loc>(.*?)<\/image:loc>/g;
    const images: string[] = [];
    let imageMatch;
    
    while ((imageMatch = imageRegex.exec(xmlContent)) !== null) {
      images.push(imageMatch[1]);
    }
    
    // Filter and combine product data
    const productUrls = urls.filter((url: string) => 
      url.includes('/seo-tools/') && 
      !url.includes('/shop/') &&
      !url.includes('/category/') &&
      !url.includes('/tag/')
    );

    // Match URLs with images and create product names
    productUrls.forEach((url, index) => {
      // Extract product name from URL
      const urlParts = url.split('/');
      const productSlug = urlParts[urlParts.length - 2]; // Get the product slug
      
      // Convert slug to readable name
      let productName = productSlug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      
      // Get corresponding image
      const imageUrl = images[index] || '';
      
      products.push({
        url: url,
        name: productName,
        image: imageUrl
      });
    });

    console.log(`✅ Found ${products.length} products with data from sitemap`);
    return products;
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
    price?: string;
    regularPrice?: string;
    affiliateLink: string;
  };
  error?: string;
}

interface WooCommerceResult {
  url: string;
  success: boolean;
  productId?: number;
  error?: string;
}


// Simplified scraping function using regex parsing instead of cheerio
async function scrapeProductWithAxios(url: string, sitemapName?: string, sitemapImage?: string): Promise<ScrapedProduct | null> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    });

    const html = response.data;
    
    // Use sitemap name first, then try to extract from page
    let productName = sitemapName || '';
    
    // If no sitemap name, try to extract from page content
    if (!productName) {
      const namePatterns = [
        // Try to get actual product name from content area
        /<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>(.*?)<\/h1>/i,
        /<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h1>/i,
        /<h1[^>]*class="[^"]*product[^"]*"[^>]*>(.*?)<\/h1>/i,
        /<h1[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/h1>/i,
        /<h1[^>]*>(.*?)<\/h1>/i,
        // Try to extract from image alt text (often contains real product name)
        /<img[^>]*alt="([^"]*(?:Group Buy|Tool|SEO|Account)[^"]*)"[^>]*>/i,
        // Try to extract from breadcrumb or navigation
        /<span[^>]*class="[^"]*breadcrumb[^"]*"[^>]*>.*?([^<]*(?:Group Buy|Tool|SEO|Account)[^<]*)<\/span>/i,
        // Try title tag as fallback but clean it better
        /<title>([^<]*(?:Group Buy|Tool|SEO|Account)[^<]*?)\s*-\s*[^<]*<\/title>/i
      ];

      for (const pattern of namePatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          productName = match[1]
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&amp;/g, '&') // Decode HTML entities
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .trim();
          
          // Skip generic names like "What Is..." and prefer actual product names
          if (productName && !productName.toLowerCase().startsWith('what is')) {
            break;
          }
        }
      }
    }

    // Use sitemap image first, then try to extract from page
    let productImage = sitemapImage || '';
    
    // If no sitemap image, try to extract from page content
    if (!productImage) {
      // Try multiple patterns for product image
    const imagePatterns = [
      /<img[^>]*class="[^"]*wp-post-image[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*woocommerce-product-gallery[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*product-image[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*product-photo[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*main-image[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*featured-image[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*product[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*main[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*class="[^"]*featured[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*data-src="([^"]+)"[^>]*class="[^"]*product[^"]*"/i,
      /<img[^>]*data-lazy-src="([^"]+)"[^>]*class="[^"]*product[^"]*"/i,
      /<img[^>]*data-large_image="([^"]+)"[^>]*class="[^"]*wp-post-image[^"]*"/i
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
    }

    // Extract product price using regex patterns
    let productPrice = '';
    let regularPrice = '';
    let salePrice = '';
    
    // Try multiple patterns for regular price (strikethrough/crossed out)
    const regularPricePatterns = [
      // Source specific patterns
      /~~\$([\d,]+\.?\d*)~~/i, // ~~$9.00~~
      /<del[^>]*>.*?\$([\d,]+\.?\d*).*?<\/del>/i, // <del>$9.00</del>
      /<span[^>]*class="[^"]*price[^"]*"[^>]*>.*?<del[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/del>/i,
      /<span[^>]*class="[^"]*woocommerce-Price-amount[^"]*"[^>]*>.*?<del[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/del>/i,
      /<div[^>]*class="[^"]*price[^"]*"[^>]*>.*?<del[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/del>/i,
      /<p[^>]*class="[^"]*price[^"]*"[^>]*>.*?<del[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/del>/i,
      /<span[^>]*class="[^"]*amount[^"]*"[^>]*>.*?<del[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/del>/i
    ];

    // Try multiple patterns for sale price (current/highlighted price)
    const salePricePatterns = [
      // Source specific patterns - look for current price after strikethrough
      /~~\$[\d,]+\.?\d*~~.*?(\$[\d,]+\.?\d*)/i, // ~~$9.00~~ $1.00
      /<del[^>]*>.*?\$[\d,]+\.?\d*.*?<\/del>.*?(\$[\d,]+\.?\d*)/i, // <del>$9.00</del> $1.00
      // Look for any price that's not strikethrough
      /(?!.*<del>)(?!.*~~)\$([\d,]+\.?\d*)/i, // Any $price not in del or ~~
      /<span[^>]*class="[^"]*price[^"]*"[^>]*>.*?<ins[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/ins>/i,
      /<span[^>]*class="[^"]*woocommerce-Price-amount[^"]*"[^>]*>.*?<ins[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/ins>/i,
      /<div[^>]*class="[^"]*price[^"]*"[^>]*>.*?<ins[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/ins>/i,
      /<p[^>]*class="[^"]*price[^"]*"[^>]*>.*?<ins[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/p>/i,
      /<span[^>]*class="[^"]*amount[^"]*"[^>]*>.*?<ins[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/ins>/i
    ];

    // Try multiple patterns for current price (if no sale)
    const currentPricePatterns = [
      /<span[^>]*class="[^"]*woocommerce-Price-amount[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/span>/i,
      /<span[^>]*class="[^"]*price[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/span>/i,
      /<div[^>]*class="[^"]*price[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/div>/i,
      /<p[^>]*class="[^"]*price[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/p>/i,
      /<span[^>]*class="[^"]*amount[^"]*"[^>]*>.*?(\$[\d,]+\.?\d*).*?<\/span>/i,
      /(\$[\d,]+\.?\d*)/i
    ];

    // First try to find regular price (strikethrough)
    for (const pattern of regularPricePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        regularPrice = match[1].replace(/[^\d.,]/g, ''); // Clean price
        break;
      }
    }

    // Then try to find sale price (highlighted)
    for (const pattern of salePricePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        salePrice = match[1].replace(/[^\d.,]/g, ''); // Clean price
        productPrice = salePrice; // Use sale price as current price
        break;
      }
    }

    // If no sale price found, try to find current price
    if (!productPrice) {
      for (const pattern of currentPricePatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          productPrice = match[1].replace(/[^\d.,]/g, ''); // Clean price
          // Only set regular price if we don't already have one
          if (!regularPrice) {
            regularPrice = productPrice; // Set regular price same as current price
          }
          break;
        }
      }
    }

    // Special handling: If we found a regular price but no sale price,
    // and the regular price is higher than the current price, 
    // then the current price is the sale price
    if (regularPrice && productPrice && !salePrice) {
      const regularNum = parseFloat(regularPrice.replace(',', ''));
      const currentNum = parseFloat(productPrice.replace(',', ''));
      if (regularNum > currentNum) {
        salePrice = productPrice;
        // Keep regularPrice as is
      } else {
        // No sale, just regular price
        regularPrice = productPrice;
        salePrice = '';
      }
    }

    // If no price found, set default
    if (!productPrice) {
      productPrice = '10.00';
      regularPrice = '10.00';
    }

    // Extract focus keyword from product name or meta tags
    let focusKeyword = '';
    
    // Try to extract focus keyword from meta tags
    const metaKeywordMatch = html.match(/<meta[^>]*name="keywords"[^>]*content="([^"]+)"/i);
    if (metaKeywordMatch && metaKeywordMatch[1]) {
      focusKeyword = metaKeywordMatch[1].split(',')[0].trim();
    }
    
    // If no meta keyword, use first few words from product name
    if (!focusKeyword && productName) {
      focusKeyword = productName.split(' ').slice(0, 3).join(' ').toLowerCase();
    }

    if (!productName || !productImage) {
      return null;
    }

    // Download image locally and use local path for WooCommerce
    let downloadedImagePath = productImage;
    if (productImage) {
      // Download image locally and get local path
      downloadedImagePath = await downloadImage(productImage, productName);
    }

    return {
      name: productName,
      image: downloadedImagePath,
      price: productPrice,
      regularPrice: regularPrice,
      salePrice: salePrice,
      focusKeyword: focusKeyword,
      affiliateLink: AFFILIATE_LINK
    };
  } catch (error) {
    console.error(`Axios scraping failed for ${url}:`, error);
    return null;
  }
}

async function scrapeProduct(url: string, sitemapName?: string, sitemapImage?: string): Promise<ScrapingResult> {
  // Use simplified scraping with axios and regex parsing
  const scrapedData = await scrapeProductWithAxios(url, sitemapName, sitemapImage);

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
      regular_price: product.regularPrice || product.price || '10.00',
      price: product.price || '10.00',
      sale_price: product.salePrice || '',
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
          key: 'scraped_regular_price',
          value: product.regularPrice || product.price || '10.00'
        },
        {
          key: 'scraped_sale_price',
          value: product.salePrice || ''
        },
        {
          key: 'focus_keyword',
          value: product.focusKeyword || ''
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
    // First, fetch all product data from source sitemap
    const productData = await fetchAllProductDataFromSitemap();
    
    if (productData.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No product data found in source sitemap'
      }, { status: 400 });
    }

    const scrapingResults: ScrapingResult[] = [];
    const wooCommerceResults: WooCommerceResult[] = [];

    console.log(`🚀 Starting FULL scraping for ALL ${productData.length} products from source...`);
    
    // Scrape ALL products
    for (let i = 0; i < productData.length; i++) {
      const { url, name, image } = productData[i];
      console.log(`📦 [${i + 1}/${productData.length}] Scraping: ${url}`);
      console.log(`📝 Using sitemap name: ${name}`);
      console.log(`🖼️ Using sitemap image: ${image}`);
      
      const result = await scrapeProduct(url, name, image);
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
      if (i < productData.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successfulScrapes = scrapingResults.filter(r => r.success).length;
    const successfulPosts = wooCommerceResults.filter(r => r.success).length;

    console.log(`🎉 Test scraping completed! Successfully scraped: ${successfulScrapes}/${testLimit}, Posted to WooCommerce: ${successfulPosts}/${testLimit}`);

    return NextResponse.json({
      success: true,
      summary: {
        totalUrls: testLimit,
        successfulScrapes,
        successfulPosts,
        failedScrapes: testLimit - successfulScrapes,
        failedPosts: testLimit - successfulPosts
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
    const productData = await fetchAllProductDataFromSitemap();
    
    return NextResponse.json({
      message: 'Product scraping API endpoint',
      instructions: 'Send a POST request to start scraping products',
      sitemapUrl: SOURCE_SITEMAP_URL,
      currentProductCount: productData.length,
      wooCommerceConfigured: !!(WOOCOMMERCE_CONFIG.consumerKey && WOOCOMMERCE_CONFIG.consumerSecret),
      wooCommerceSite: WOOCOMMERCE_CONFIG.siteUrl
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Product scraping API endpoint',
      instructions: 'Send a POST request to start scraping products',
      sitemapUrl: SOURCE_SITEMAP_URL,
      error: 'Could not fetch current product count from sitemap',
      wooCommerceConfigured: !!(WOOCOMMERCE_CONFIG.consumerKey && WOOCOMMERCE_CONFIG.consumerSecret),
      wooCommerceSite: WOOCOMMERCE_CONFIG.siteUrl
    });
  }
}
