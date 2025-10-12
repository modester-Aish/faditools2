/**
 * Optimize Homepage Data
 * 
 * Homepage ke liye lightweight JSON files banayi hai:
 * 1. Products: Sirf 12 products, only essential fields
 * 2. Categories: Only essential fields, no SEO bloat
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔧 Optimizing Homepage Data...\n');

try {
  // ============================================
  // 1. OPTIMIZE PRODUCTS
  // ============================================
  const productsPath = path.join(process.cwd(), 'public', 'data', 'products.json');
  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  
  console.log(`📦 Total products: ${productsData.totalProducts}`);
  
  // Get first 12 products with only essential fields
  const homepageProducts = productsData.products.slice(0, 12).map(product => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    regular_price: product.regular_price,
    sale_price: product.sale_price,
    on_sale: product.on_sale,
    images: product.images ? product.images.slice(0, 1) : [], // Only first image
    categories: product.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    }))
  }));
  
  // Create lightweight homepage products data
  const homepageData = {
    products: homepageProducts,
    totalProducts: 12,
    lastUpdated: new Date().toISOString(),
    note: 'Lightweight data for homepage - only 12 products with essential fields'
  };
  
  // Save products
  const homepagePath = path.join(process.cwd(), 'public', 'data', 'homepage-products.json');
  fs.writeFileSync(homepagePath, JSON.stringify(homepageData, null, 2));
  
  const originalProductsSize = (fs.statSync(productsPath).size / 1024 / 1024).toFixed(2);
  const optimizedProductsSize = (fs.statSync(homepagePath).size / 1024).toFixed(2);
  
  console.log(`\n✅ Products optimized!`);
  console.log(`   Original: ${originalProductsSize} MB (624 products)`);
  console.log(`   Optimized: ${optimizedProductsSize} KB (12 products)`);
  console.log(`   Saved: ${(originalProductsSize * 1024 - optimizedProductsSize).toFixed(2)} KB!`);
  
  // ============================================
  // 2. OPTIMIZE CATEGORIES & CREATE CATEGORY-SPECIFIC PRODUCTS
  // ============================================
  const categoriesPath = path.join(process.cwd(), 'public', 'data', 'categories.json');
  const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
  
  console.log(`\n📂 Total categories: ${categoriesData.totalCategories}`);
  
  // Get only essential category fields (no SEO bloat!)
  const optimizedCategories = categoriesData.categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    count: cat.count || 0
  }));
  
  // Create lightweight categories data
  const lightweightCategoriesData = {
    categories: optimizedCategories,
    totalCategories: optimizedCategories.length,
    lastUpdated: new Date().toISOString(),
    note: 'Lightweight categories - only essential fields, no SEO bloat'
  };
  
  // Save optimized categories
  const optimizedCategoriesPath = path.join(process.cwd(), 'public', 'data', 'homepage-categories.json');
  fs.writeFileSync(optimizedCategoriesPath, JSON.stringify(lightweightCategoriesData, null, 2));
  
  const originalCategoriesSize = (fs.statSync(categoriesPath).size / 1024).toFixed(2);
  const optimizedCategoriesSize = (fs.statSync(optimizedCategoriesPath).size / 1024).toFixed(2);
  
  console.log(`\n✅ Categories optimized!`);
  console.log(`   Original: ${originalCategoriesSize} KB (with SEO data)`);
  console.log(`   Optimized: ${optimizedCategoriesSize} KB (clean)`);
  console.log(`   Saved: ${(originalCategoriesSize - optimizedCategoriesSize).toFixed(2)} KB!`);
  
  // ============================================
  // 3. CREATE CATEGORY-SPECIFIC PRODUCT FILES
  // ============================================
  console.log(`\n🎯 Creating category-specific product files...`);
  
  // Group products by category
  const productsByCategory = {};
  productsData.products.forEach(product => {
    product.categories.forEach(cat => {
      if (!productsByCategory[cat.slug]) {
        productsByCategory[cat.slug] = [];
      }
      productsByCategory[cat.slug].push(product);
    });
  });
  
  // Create files for each category (minimum 12 products)
  const dataDir = path.join(process.cwd(), 'public', 'data');
  let totalCategoryFiles = 0;
  
  Object.keys(productsByCategory).forEach(categorySlug => {
    const categoryProducts = productsByCategory[categorySlug];
    const minProducts = Math.max(12, categoryProducts.length); // At least 12 products
    
    // Take first 12 products, or all if less than 12
    const selectedProducts = categoryProducts.slice(0, minProducts).map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      images: product.images ? product.images.slice(0, 1) : [], // Only first image
      categories: product.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug
      }))
    }));
    
    // Create category-specific data
    const categoryData = {
      products: selectedProducts,
      totalProducts: selectedProducts.length,
      category: categorySlug,
      lastUpdated: new Date().toISOString(),
      note: `Products for ${categorySlug} category - ${selectedProducts.length} products`
    };
    
    // Save category file
    const categoryFilePath = path.join(dataDir, `category-${categorySlug}.json`);
    fs.writeFileSync(categoryFilePath, JSON.stringify(categoryData, null, 2));
    
    const fileSize = (fs.statSync(categoryFilePath).size / 1024).toFixed(2);
    console.log(`   📁 ${categorySlug}: ${selectedProducts.length} products (${fileSize} KB)`);
    totalCategoryFiles++;
  });
  
  console.log(`\n✅ Created ${totalCategoryFiles} category-specific files!`);
  
  // ============================================
  // SUMMARY
  // ============================================
  console.log(`\n════════════════════════════════════════`);
  console.log(`✅ Homepage Optimization Complete!`);
  console.log(`════════════════════════════════════════`);
  console.log(`\n📁 Files created:`);
  console.log(`   • public/data/homepage-products.json (${optimizedProductsSize} KB)`);
  console.log(`   • public/data/homepage-categories.json (${optimizedCategoriesSize} KB)`);
  console.log(`\n💾 Total saved: ${((originalProductsSize * 1024 - optimizedProductsSize) + (originalCategoriesSize - optimizedCategoriesSize)).toFixed(2)} KB`);
  console.log(`\n🚀 Homepage ab ultra-fast load hoga! ⚡\n`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

