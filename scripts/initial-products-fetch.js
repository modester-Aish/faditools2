/**
 * Initial Products Fetch - Sirf pehli baar chalao!
 * 
 * Ye script sirf EK BAAR run karni hai pehli setup ke waqt
 * Iske baad WooCommerce webhooks automatically products update karenge
 * 
 * Usage:
 * node scripts/initial-products-fetch.js
 * 
 * ═══════════════════════════════════════════════════════════════
 * IMPORTANT: Sirf pehli baar run karo!
 * Iske baad automatic webhooks se update hoga
 * ═══════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

// WooCommerce Configuration
const WOOCOMMERCE_BASE_URL = process.env.WOOCOMMERCE_BASE_URL || 'https://app.faditools.com';
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET || '';

// Check credentials
if (!CONSUMER_KEY || !CONSUMER_SECRET) {
  console.error('❌ Error: WooCommerce credentials missing!');
  console.error('Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in .env file');
  process.exit(1);
}

/**
 * Fetch all products from WooCommerce
 */
async function fetchAllProducts() {
  console.log('🔄 Fetching all products from WooCommerce...');
  console.log(`   API: ${WOOCOMMERCE_BASE_URL}`);
  console.log(`   ⚠️  Ye INITIAL fetch hai - sirf pehli baar!\n`);
  
  let allProducts = [];
  let page = 1;
  let hasMore = true;
  const perPage = 100;

  try {
    while (hasMore) {
      const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${perPage}&page=${page}`;
      
      console.log(`   📦 Fetching page ${page}...`);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products = await response.json();
      
      if (products.length === 0) {
        hasMore = false;
      } else {
        allProducts = [...allProducts, ...products];
        console.log(`   ✅ Fetched ${products.length} products (Total: ${allProducts.length})`);
        page++;
        
        if (products.length < perPage) {
          hasMore = false;
        }
      }
    }

    console.log(`\n✅ Successfully fetched ${allProducts.length} total products!`);
    return allProducts;

  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    throw error;
  }
}

/**
 * Fetch product categories
 */
async function fetchCategories() {
  console.log('\n🔄 Fetching categories...');
  
  try {
    const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products/categories?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=100`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories = await response.json();
    console.log(`✅ Fetched ${categories.length} categories`);
    
    return categories;

  } catch (error) {
    console.error('❌ Error fetching categories:', error.message);
    return [];
  }
}

/**
 * Save products to JSON file
 */
function saveToFile(products, categories) {
  console.log('\n💾 Saving data to files...');
  
  // Create data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('   ✅ Created public/data directory');
  }

  // Save products
  const productsFile = path.join(dataDir, 'products.json');
  const productsData = {
    products: products,
    totalProducts: products.length,
    lastUpdated: new Date().toISOString(),
    fetchedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updateMethod: 'initial-fetch',
    note: 'This is initial data. Future updates will be via webhooks.'
  };
  
  fs.writeFileSync(productsFile, JSON.stringify(productsData, null, 2));
  console.log(`   ✅ Saved ${products.length} products to public/data/products.json`);
  console.log(`   📁 File size: ${(fs.statSync(productsFile).size / 1024 / 1024).toFixed(2)} MB`);

  // Save categories
  const categoriesFile = path.join(dataDir, 'categories.json');
  const categoriesData = {
    categories: categories,
    totalCategories: categories.length,
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(categoriesFile, JSON.stringify(categoriesData, null, 2));
  console.log(`   ✅ Saved ${categories.length} categories to public/data/categories.json`);

  // Save metadata
  const metaFile = path.join(dataDir, 'metadata.json');
  const metadata = {
    lastUpdated: new Date().toISOString(),
    lastUpdatedFormatted: new Date().toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    totalProducts: products.length,
    totalCategories: categories.length,
    publishedProducts: products.filter(p => p.status === 'publish').length,
    featuredProducts: products.filter(p => p.featured).length,
    onSaleProducts: products.filter(p => p.on_sale).length,
    inStockProducts: products.filter(p => p.stock_status === 'instock').length,
    outOfStockProducts: products.filter(p => p.stock_status === 'outofstock').length,
    updateMethod: 'initial-fetch'
  };
  
  fs.writeFileSync(metaFile, JSON.stringify(metadata, null, 2));
  console.log('   ✅ Saved metadata to public/data/metadata.json');

  return { productsFile, categoriesFile, metaFile };
}

/**
 * Main function
 */
async function main() {
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('🚀 Initial Products Fetch - Pehli Baar Setup');
  console.log('════════════════════════════════════════════════════════════════\n');
  console.log('⚠️  IMPORTANT:');
  console.log('   • Ye script SIRF pehli baar run karo!');
  console.log('   • Iske baad WooCommerce webhooks automatically update karenge');
  console.log('   • Dobara run karne ki zaroorat NAHI hai!');
  console.log('\n════════════════════════════════════════════════════════════════\n');
  
  const startTime = Date.now();
  
  try {
    // Fetch products and categories in parallel
    const [products, categories] = await Promise.all([
      fetchAllProducts(),
      fetchCategories()
    ]);

    // Save to files
    const files = saveToFile(products, categories);

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('\n════════════════════════════════════════════════════════════════');
    console.log('✅ SUCCESS! Initial setup complete!');
    console.log('════════════════════════════════════════════════════════════════');
    console.log(`\n📊 Summary:`);
    console.log(`   • Total Products: ${products.length}`);
    console.log(`   • Total Categories: ${categories.length}`);
    console.log(`   • Published Products: ${products.filter(p => p.status === 'publish').length}`);
    console.log(`   • Featured Products: ${products.filter(p => p.featured).length}`);
    console.log(`   • On Sale Products: ${products.filter(p => p.on_sale).length}`);
    console.log(`   • In Stock: ${products.filter(p => p.stock_status === 'instock').length}`);
    console.log(`   • Out of Stock: ${products.filter(p => p.stock_status === 'outofstock').length}`);
    console.log(`\n⏱️  Time taken: ${duration} seconds`);
    console.log(`\n📁 Files created:`);
    console.log(`   • public/data/products.json (${products.length} products)`);
    console.log(`   • public/data/categories.json (${categories.length} categories)`);
    console.log(`   • public/data/metadata.json (statistics)`);
    
    console.log('\n════════════════════════════════════════════════════════════════');
    console.log('📝 NEXT STEPS:');
    console.log('════════════════════════════════════════════════════════════════');
    console.log('\n1️⃣  WooCommerce Webhooks Setup Karo:');
    console.log('   • WooCommerce → Settings → Advanced → Webhooks');
    console.log('   • Add 3 webhooks:');
    console.log('     - Product created');
    console.log('     - Product updated');
    console.log('     - Product deleted');
    console.log('   • Delivery URL: https://your-site.com/api/webhook/woocommerce');
    console.log('   • Secret: (set in .env file)');
    console.log('\n2️⃣  Test Karo:');
    console.log('   • WooCommerce mein new product add karo');
    console.log('   • Automatically products.json update hoga!');
    console.log('\n3️⃣  Site Deploy Karo:');
    console.log('   • npm run build');
    console.log('   • npm run start');
    console.log('\n🎉 Ab aapko is script ko dobara run karne ki zaroorat NAHI!');
    console.log('   Webhooks automatically sab kuch handle karenge!');
    console.log('\n════════════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

