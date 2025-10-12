import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

/**
 * WooCommerce Webhook Endpoint
 * 
 * Jab WooCommerce mein product add/update/delete ho, ye endpoint automatically trigger hoga
 * Aur sirf wo product fetch karke static file mein merge karega
 * 
 * Setup in WooCommerce:
 * 1. WooCommerce → Settings → Advanced → Webhooks
 * 2. Add webhook:
 *    - Name: Product Update Webhook
 *    - Status: Active
 *    - Topic: Product created, Product updated, Product deleted
 *    - Delivery URL: https://your-site.com/api/webhook/woocommerce
 *    - Secret: (set WEBHOOK_SECRET in .env)
 */

const WEBHOOK_SECRET = process.env.WOOCOMMERCE_WEBHOOK_SECRET || 'faditools-webhook-2024'

/**
 * Verify webhook signature
 */
function verifyWebhookSignature(request: NextRequest, body: string): boolean {
  const signature = request.headers.get('x-wc-webhook-signature')
  
  if (!signature) {
    console.warn('⚠️ No webhook signature found')
    return false
  }

  // WooCommerce uses HMAC-SHA256
  const crypto = require('crypto')
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('base64')

  return signature === expectedSignature
}

/**
 * Add/Update product in static file
 */
async function updateProductInFile(product: any, action: 'created' | 'updated' | 'deleted') {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('📦 products.json not found - creating new file')
      const initialData = {
        products: action === 'deleted' ? [] : [product],
        totalProducts: action === 'deleted' ? 0 : 1,
        lastUpdated: new Date().toISOString(),
        fetchedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
      }
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2))
      return { success: true, action: 'created_file' }
    }

    // Read existing file
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    let products = data.products || []
    let message = ''

    if (action === 'deleted') {
      // Remove product
      const beforeCount = products.length
      products = products.filter((p: any) => p.id !== product.id)
      const afterCount = products.length
      message = `Deleted product ID ${product.id} (${beforeCount} → ${afterCount} products)`
    } else {
      // Add or update product
      const existingIndex = products.findIndex((p: any) => p.id === product.id)
      
      if (existingIndex !== -1) {
        // Update existing product
        products[existingIndex] = product
        message = `Updated product ID ${product.id}: ${product.name}`
      } else {
        // Add new product
        products.push(product)
        message = `Added new product ID ${product.id}: ${product.name}`
      }
    }

    // Sort by date (newest first)
    products.sort((a: any, b: any) => 
      new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
    )

    // Update file
    const updatedData = {
      products,
      totalProducts: products.length,
      lastUpdated: new Date().toISOString(),
      fetchedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      lastWebhookUpdate: {
        action,
        productId: product.id,
        productName: product.name,
        timestamp: new Date().toISOString()
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2))
    
    // Update metadata
    await updateMetadata(products)
    
    console.log(`✅ ${message}`)
    return { success: true, message, totalProducts: products.length }

  } catch (error) {
    console.error('❌ Error updating product file:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Update metadata file
 */
async function updateMetadata(products: any[]) {
  try {
    const metaPath = path.join(process.cwd(), 'public', 'data', 'metadata.json')
    
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
      publishedProducts: products.filter((p: any) => p.status === 'publish').length,
      featuredProducts: products.filter((p: any) => p.featured).length,
      onSaleProducts: products.filter((p: any) => p.on_sale).length,
      inStockProducts: products.filter((p: any) => p.stock_status === 'instock').length,
      outOfStockProducts: products.filter((p: any) => p.stock_status === 'outofstock').length,
      lastWebhookUpdate: new Date().toISOString()
    }
    
    fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2))
    console.log('✅ Updated metadata.json')
  } catch (error) {
    console.error('❌ Error updating metadata:', error)
  }
}

/**
 * POST handler for webhook
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text()
    
    // Verify signature (optional but recommended)
    if (process.env.VERIFY_WEBHOOK_SIGNATURE === 'true') {
      if (!verifyWebhookSignature(request, body)) {
        return NextResponse.json(
          { success: false, error: 'Invalid webhook signature' },
          { status: 401 }
        )
      }
    }

    // Parse webhook data
    const webhookData = JSON.parse(body)
    const product = webhookData
    const topic = request.headers.get('x-wc-webhook-topic') || ''
    const webhookId = request.headers.get('x-wc-webhook-id') || ''
    
    console.log('\n════════════════════════════════════════════════════')
    console.log('🔔 WooCommerce Webhook Received!')
    console.log('════════════════════════════════════════════════════')
    console.log(`Topic: ${topic}`)
    console.log(`Webhook ID: ${webhookId}`)
    console.log(`Product ID: ${product.id}`)
    console.log(`Product Name: ${product.name}`)
    console.log(`Status: ${product.status}`)
    console.log('════════════════════════════════════════════════════\n')

    // Determine action
    let action: 'created' | 'updated' | 'deleted' = 'updated'
    
    if (topic.includes('created')) {
      action = 'created'
    } else if (topic.includes('deleted')) {
      action = 'deleted'
    } else if (topic.includes('updated')) {
      action = 'updated'
    }

    // Update product in static file
    const result = await updateProductInFile(product, action)

    if (result.success) {
      console.log(`✅ Product ${action} successfully!`)
      console.log(`📊 Total products: ${result.totalProducts || 'N/A'}`)
      
      return NextResponse.json({
        success: true,
        message: result.message || `Product ${action} successfully`,
        action,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug
        },
        totalProducts: result.totalProducts,
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to update product'
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET handler for testing
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'WooCommerce webhook endpoint is active',
    instructions: {
      setup: [
        '1. Go to WooCommerce → Settings → Advanced → Webhooks',
        '2. Click "Add webhook"',
        '3. Name: Product Update Webhook',
        '4. Status: Active',
        '5. Topic: Product created, Product updated, Product deleted (create 3 webhooks)',
        '6. Delivery URL: https://your-site.com/api/webhook/woocommerce',
        '7. Secret: Set WOOCOMMERCE_WEBHOOK_SECRET in .env file',
        '8. API Version: WP REST API Integration v3',
        '9. Save webhook'
      ],
      topics: [
        'product.created - When new product is created',
        'product.updated - When product is updated',
        'product.deleted - When product is deleted'
      ],
      testing: 'You can test by creating/updating a product in WooCommerce'
    }
  })
}

