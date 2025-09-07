import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// WooCommerce configuration
const WOOCOMMERCE_CONFIG = {
  siteUrl: 'https://app.faditools.com',
  consumerKey: 'ck_6f94477acb6864e94e9f206fa4853c251928c638',
  consumerSecret: 'cs_770cfcaa05a4732d3774a4e91f42e285f9140683'
};

// Function to get all products from WooCommerce
async function getAllProducts(): Promise<any[]> {
  try {
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    let allProducts: any[] = [];
    let page = 1;
    const perPage = 100;
    
    while (true) {
      const response = await axios.get(
        `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products`,
        {
          headers: { 'Authorization': `Basic ${auth}` },
          params: { page, per_page: perPage }
        }
      );
      
      const products = response.data;
      if (products.length === 0) break;
      
      allProducts = allProducts.concat(products);
      page++;
    }
    
    return allProducts;
  } catch (error: any) {
    console.error('❌ Failed to fetch products:', error.message);
    return [];
  }
}

// Function to upload image to WooCommerce media library
async function uploadImageToWooCommerce(imagePath: string, productName: string): Promise<string> {
  try {
    console.log(`📤 Uploading image to WooCommerce: ${imagePath}`);
    
    // Read the local image file
    const fullImagePath = path.join(process.cwd(), 'public', imagePath);
    const imageBuffer = fs.readFileSync(fullImagePath);
    
    // Generate filename
    const sanitizedName = productName
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50);
    
    const fileExtension = path.extname(imagePath);
    const filename = `${sanitizedName}-uploaded-${Date.now()}${fileExtension}`;
    const contentType = fileExtension === '.png' ? 'image/png' : 'image/jpeg';
    
    // Upload to WordPress media library using direct image data
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    const uploadResponse = await axios.post(
      `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wp/v2/media`,
      imageBuffer,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Type': contentType
        },
        timeout: 30000
      }
    );
    
    const uploadedImageUrl = uploadResponse.data.source_url;
    console.log(`✅ Image uploaded successfully: ${uploadedImageUrl}`);
    return uploadedImageUrl;
    
  } catch (error: any) {
    console.error(`❌ Failed to upload image ${imagePath}:`, error.response?.data || error.message);
    return '';
  }
}

// Function to update product image
async function updateProductImage(productId: number, imageUrl: string): Promise<boolean> {
  try {
    const auth = Buffer.from(`${WOOCOMMERCE_CONFIG.consumerKey}:${WOOCOMMERCE_CONFIG.consumerSecret}`).toString('base64');
    
    const productData = {
      images: [{ src: imageUrl }]
    };
    
    await axios.put(
      `${WOOCOMMERCE_CONFIG.siteUrl}/wp-json/wc/v3/products/${productId}`,
      productData,
      {
        headers: { 'Authorization': `Basic ${auth}` }
      }
    );
    
    console.log(`✅ Product ${productId} image updated with: ${imageUrl}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting product image update process...');
    
    // Get all products from WooCommerce
    const products = await getAllProducts();
    console.log(`📦 Found ${products.length} products to update`);
    
    const results = [];
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');
    
    // Check if images directory exists
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({
        success: false,
        error: 'Images directory not found. Please run scraping first to download images.'
      }, { status: 400 });
    }
    
    const imageFiles = fs.readdirSync(imagesDir);
    console.log(`📷 Found ${imageFiles.length} downloaded images`);
    
    for (const product of products) {
      const productName = product.name;
      const productId = product.id;
      
      console.log(`🔄 Processing product: ${productName} (ID: ${productId})`);
      
      // Look for matching downloaded image
      const matchingImage = imageFiles.find(file => {
        const fileName = file.toLowerCase();
        const productNameLower = productName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
        return fileName.includes(productNameLower) || 
               productNameLower.includes(fileName.split('-')[0]);
      });
      
      if (matchingImage) {
        const imagePath = `/images/products/${matchingImage}`;
        console.log(`📷 Found matching image: ${matchingImage}`);
        
        // Upload image to WooCommerce media library first
        const uploadedImageUrl = await uploadImageToWooCommerce(imagePath, productName);
        
        if (uploadedImageUrl) {
          // Update product with uploaded image URL
          const success = await updateProductImage(productId, uploadedImageUrl);
        
          results.push({
            productId,
            productName,
            success,
            imagePath: success ? uploadedImageUrl : null,
            error: success ? null : 'Failed to update product'
          });
        } else {
          results.push({
            productId,
            productName,
            success: false,
            imagePath: null,
            error: 'Failed to upload image to WooCommerce'
          });
        }
        
        if (uploadedImageUrl) {
          console.log(`✅ Updated product ${productId} with uploaded image`);
        }
      } else {
        console.log(`❌ No matching image found for: ${productName}`);
        results.push({
          productId,
          productName,
          success: false,
          imagePath: null,
          error: 'No matching image found'
        });
      }
      
      // Add delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    const successfulUpdates = results.filter(r => r.success).length;
    
    return NextResponse.json({
      success: true,
      message: 'Product image update process completed',
      summary: {
        totalProducts: products.length,
        successfulUpdates,
        failedUpdates: products.length - successfulUpdates,
        totalImages: imageFiles.length
      },
      results
    });
    
  } catch (error: any) {
    console.error('❌ Product image update process failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
