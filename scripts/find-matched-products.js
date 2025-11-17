const fs = require('fs');
const path = require('path');

// Read products.json
const productsPath = path.join(__dirname, '../public/data/products.json');
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Import mapping (simplified version for Node.js)
const mappingKeywords = {
  'ahrefs': '53', 'semrush': '8', 'moz': '19', 'canva': '65', 
  'chatgpt': '29', 'runway': '127', 'netflix': '52', 'claude': '113',
  'kwfinder': '9', 'majestic': '10', 'helium': '36', 'jungle': '33',
  'jasper': '48', 'quetext': '57', 'grammarly': '21', 'envato': '18',
  'storyblocks': '24', 'spamzilla': '31', 'keywordtool': '32', 'unbounce': '61',
  'ecomhunt': '34', 'freepik': '63', 'screaming': '73', 'buzzsumo': '41',
  'bypass': '47', 'adspy': '58', 'adobe': '64', 'udemy': '66',
  'neuron': '67', 'capcut': '72', 'quillbot': '103', 'surfer': '108',
  'copy': '117', 'writesonic': '120', 'wordai': '77', 'wordtune': '78',
  'wordhero': '79', 'vyond': '80', 'amztrackers': '81', 'linkedin': '82',
  'ispionage': '83', 'frase': '84', 'spin': '85', 'indexification': '86',
  'keywords': '87', 'answer': '88', 'spyfu': '89', 'salehoo': '90',
  'coursera': '91', 'exploding': '92', 'sell': '93', 'woorank': '94',
  'videoblocks': '95', 'ubersuggest': '96', 'skillshare': '97', 'serpstat': '98',
  'seo': '99', 'pillbanana': '100', 'pexda': '101', 'cbengine': '102',
  'article': '104', 'buzzstream': '106', 'copymatic': '107', 'prime': '109',
  'seoptimer': '110', 'you': '112', 'hix': '114', 'smartcopy': '115',
  'closerscopy': '116', 'stealthwriter': '118', 'writerzen': '119', 'rytr': '121',
  'jenni': '122', 'vecteezy': '123', 'designs': '124', 'picsart': '125',
  'fotojet': '126', 'gpl': '128', 'chaupal': '129', 'viral': '130',
  'niche': '131', 'semscoop': '132', 'picmonkey': '133', 'epidemicsound': '134',
  'slidebean': '135', 'ranking': '136', 'wordtracker': '137', 'motionarray': '138',
  'prezi': '139', 'turnitin': '140', 'leonardo': '141', 'renderforest': '142',
  'icon': '143', 'scribd': '144', 'sider': '145', 'similarweb': '146',
  'writehuman': '147', 'heygen': '151', 'premium': '153', 'grok': '155',
  'google': '156', 'bigspy': '158', 'spyhero': '159', 'gamma': '160',
  'midjourney': '161', 'team': '163', 'elevenlabs': '166'
};

function getProductIdBySlug(slug) {
  if (!slug) return null;
  const slugLower = slug.toLowerCase();
  
  // Try direct match
  if (mappingKeywords[slugLower]) {
    return mappingKeywords[slugLower];
  }
  
  // Try without "group-buy" suffix
  const slugWithoutSuffix = slugLower
    .replace(/-group-buy$/, '')
    .replace(/-group$/, '')
    .replace(/-buy$/, '');
  
  if (mappingKeywords[slugWithoutSuffix]) {
    return mappingKeywords[slugWithoutSuffix];
  }
  
  return null;
}

function getProductIdByName(productName) {
  if (!productName) return null;
  
  const nameLower = productName.toLowerCase();
  
  // Remove common words that don't help with matching
  const commonWords = ['group', 'buy', 'tool', 'tools', 'premium', 'pro', 'subscription', 'account', 'access', 'plan', 'pack'];
  const cleanedName = nameLower
    .replace(/[^a-z0-9\s]/g, ' ') // Remove special characters
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word)) // Filter out common words and short words
    .join(' ');
  
  // Extract keywords from cleaned product name
  const keywords = cleanedName.split(/\s+/).filter(word => word.length > 2);
  
  // Check each mapping entry for partial matches
  for (const [slug, productId] of Object.entries(mappingKeywords)) {
    const slugWords = slug.split('-');
    
    // Check if any keyword matches with slug
    for (const keyword of keywords) {
      // Direct match in slug
      if (slug === keyword || slug.includes(keyword) || keyword.includes(slug)) {
        return productId;
      }
      
      // Match in slug words
      if (slugWords.some(word => word === keyword || word.includes(keyword) || keyword.includes(word))) {
        return productId;
      }
    }
  }
  
  return null;
}

function findMatchingProductId(productName, slug) {
  // First try slug matching
  let mappedProductId = getProductIdBySlug(slug);
  
  // If not found by slug, try name matching
  if (!mappedProductId && productName) {
    mappedProductId = getProductIdByName(productName);
  }
  
  return mappedProductId;
}

const matchedProducts = [];
const unmatchedProducts = [];

console.log('🔍 Checking WooCommerce products for matches...\n');

productsData.products.forEach(product => {
  const matchedId = findMatchingProductId(product.name, product.slug);
  
  if (matchedId) {
    matchedProducts.push({
      name: product.name,
      slug: product.slug,
      wcId: product.id,
      mappedProductId: matchedId,
      url: `https://members.seotoolsgroupbuy.us/cart/index/product/id/${matchedId}/c/`
    });
  } else {
    unmatchedProducts.push({
      name: product.name,
      slug: product.slug,
      wcId: product.id
    });
  }
});

console.log(`📊 RESULTS:\n`);
console.log(`✅ Total Products: ${productsData.products.length}`);
console.log(`✅ Matched Products: ${matchedProducts.length}`);
console.log(`❌ Unmatched Products: ${unmatchedProducts.length}\n`);

console.log('\n📋 MATCHED PRODUCTS (Detailed):\n');
console.log('='.repeat(80));
matchedProducts.forEach((p, index) => {
  console.log(`\n${index + 1}. ${p.name}`);
  console.log(`   Slug: ${p.slug}`);
  console.log(`   WooCommerce ID: ${p.wcId}`);
  console.log(`   Mapped Product ID: ${p.mappedProductId}`);
  console.log(`   Buy URL: ${p.url}`);
});

console.log('\n' + '='.repeat(80));
console.log('\n📊 SUMMARY BY PRODUCT ID:\n');
const byProductId = {};
matchedProducts.forEach(p => {
  if (!byProductId[p.mappedProductId]) {
    byProductId[p.mappedProductId] = [];
  }
  byProductId[p.mappedProductId].push(p.name);
});

Object.entries(byProductId)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([productId, products]) => {
    console.log(`\nProduct ID ${productId} (${products.length} products):`);
    products.forEach(name => console.log(`  - ${name}`));
  });

// Save results to file
const resultsPath = path.join(__dirname, '../matched-products-results.json');
fs.writeFileSync(resultsPath, JSON.stringify({
  total: productsData.products.length,
  matched: matchedProducts.length,
  unmatched: unmatchedProducts.length,
  matchedProducts: matchedProducts,
  unmatchedProducts: unmatchedProducts.slice(0, 50) // First 50 unmatched
}, null, 2));

console.log(`\n💾 Results saved to: matched-products-results.json`);

