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

// Function to upload image to WooCommerce
async function uploadImageToWooCommerce(imagePath: string, productName: string): Promise<string> {
  try {
    console.log(`📤 Uploading image to WooCommerce: ${imagePath}`);
    
    // Read the local image file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Generate filename
    const sanitizedName = productName
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50);
    
    const fileExtension = path.extname(imagePath);
    const filename = `${sanitizedName}-uploaded-${Date.now()}${fileExtension}`;

    // Create FormData for upload
    const formData = new FormData();
    const blob = new Blob([imageBuffer], { type: `image/${fileExtension.slice(1)}` });
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
    console.error(`❌ Failed to upload image ${imagePath}:`, error.response?.data || error.message);
    return ''; // Return empty string on failure
  }
}

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
    
    console.log(`✅ Product ${productId} image updated`);
    return true;
  } catch (error: any) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting image upload process...');
    
    // Get all products from WooCommerce
    const products = await getAllProducts();
    console.log(`📦 Found ${products.length} products`);
    
    const results = [];
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');
    
    for (const product of products) {
      const productName = product.name;
      const productId = product.id;
      
      console.log(`🔄 Processing product: ${productName} (ID: ${productId})`);
      
      // Look for downloaded image
      const imageFiles = fs.readdirSync(imagesDir);
      const matchingImage = imageFiles.find(file => 
        file.toLowerCase().includes(productName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-'))
      );
      
      if (matchingImage) {
        const imagePath = path.join(imagesDir, matchingImage);
        console.log(`📷 Found image: ${matchingImage}`);
        
        // Upload image to WooCommerce
        const uploadedImageUrl = await uploadImageToWooCommerce(imagePath, productName);
        
        if (uploadedImageUrl) {
          // Update product with new image
          const success = await updateProductImage(productId, uploadedImageUrl);
          
          results.push({
            productId,
            productName,
            success,
            imageUrl: uploadedImageUrl
          });
          
          // Delete local image after successful upload
          if (success) {
            fs.unlinkSync(imagePath);
            console.log(`🗑️ Deleted local image: ${matchingImage}`);
          }
        } else {
          results.push({
            productId,
            productName,
            success: false,
            error: 'Image upload failed'
          });
        }
      } else {
        console.log(`❌ No image found for: ${productName}`);
        results.push({
          productId,
          productName,
          success: false,
          error: 'No matching image found'
        });
      }
      
      // Add delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const successfulUploads = results.filter(r => r.success).length;
    
    return NextResponse.json({
      success: true,
      message: 'Image upload process completed',
      summary: {
        totalProducts: products.length,
        successfulUploads,
        failedUploads: products.length - successfulUploads
      },
      results
    });
    
  } catch (error: any) {
    console.error('❌ Image upload process failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
