// Script to fetch all product names from WooCommerce
const WOOCOMMERCE_BASE_URL = process.env.WOOCOMMERCE_BASE_URL || 'https://app.faditools.com'
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || ''
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET || ''

async function getAllProductNames() {
  try {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      console.error('❌ WooCommerce credentials missing!')
      console.log('Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET environment variables')
      return
    }

    console.log('🔄 Fetching products from WooCommerce...\n')
    
    let allProducts = []
    let page = 1
    let hasMore = true
    const perPage = 100

    while (hasMore) {
      const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${perPage}&page=${page}`
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const products = await response.json()
      
      if (products.length === 0) {
        hasMore = false
      } else {
        allProducts = [...allProducts, ...products]
        console.log(`📦 Fetched page ${page} - ${products.length} products`)
        page++
        
        if (products.length < perPage) {
          hasMore = false
        }
      }
    }

    console.log(`\n✅ Total Products Fetched: ${allProducts.length}\n`)
    console.log('=' .repeat(80))
    console.log('PRODUCT NAMES:')
    console.log('=' .repeat(80))
    
    // Display all product names with numbering
    allProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`)
    })
    
    console.log('=' .repeat(80))
    console.log(`\nTotal: ${allProducts.length} products`)
    
    // Also save to a file
    const fs = require('fs')
    const productNames = allProducts.map((product, index) => `${index + 1}. ${product.name}`).join('\n')
    fs.writeFileSync('product-names-list.txt', productNames)
    console.log('\n💾 Product names saved to: product-names-list.txt')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

getAllProductNames()

