import { NextResponse } from 'next/server'
import { fetchBlogPosts } from '@/lib/api'

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'
const API_BASE = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`

async function getProductsCategoryId(): Promise<number | null> {
  try {
    const timestamp = Date.now()
    const response = await fetch(`${API_BASE}/categories?slug=product&_t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    })
    const categories = await response.json()
    return categories[0]?.id || null
  } catch (error) {
    console.error('Error fetching products category:', error)
    return null
  }
}

export async function GET() {
  try {
    console.log('🔍 Testing fetchBlogPosts function...')
    
    // Test getProductsCategoryId
    const productCategoryId = await getProductsCategoryId()
    console.log('Product Category ID:', productCategoryId)
    
    // Test fetchBlogPosts
    const posts = await fetchBlogPosts()
    console.log('Posts fetched:', posts.length)
    console.log('Posts data:', posts.map(p => ({ id: p.id, title: p.title?.rendered, slug: p.slug, categories: p.categories })))
    
    return NextResponse.json({
      success: true,
      productCategoryId,
      postsCount: posts.length,
      posts: posts.map(p => ({
        id: p.id,
        title: p.title?.rendered,
        slug: p.slug,
        categories: p.categories,
        status: p.status
      }))
    })
  } catch (error) {
    console.error('❌ Error testing blog posts:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

