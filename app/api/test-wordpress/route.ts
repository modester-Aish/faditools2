import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'
    const API_BASE = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`
    
    console.log('🔍 Testing WordPress API Connection...')
    console.log('WORDPRESS_BASE_URL:', WORDPRESS_BASE_URL)
    console.log('API_BASE:', API_BASE)
    
    const tests = {
      baseUrl: WORDPRESS_BASE_URL,
      apiBase: API_BASE,
      timestamp: new Date().toISOString(),
      results: [] as any[]
    }
    
    // Test 1: Check if WordPress REST API is accessible
    try {
      const response = await fetch(`${API_BASE}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (!response.ok) {
        tests.results.push({
          test: 'WordPress REST API Base',
          status: response.status,
          statusText: response.statusText,
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        })
      } else {
        const data = await response.json()
        tests.results.push({
          test: 'WordPress REST API Base',
          status: response.status,
          success: true,
          data: Object.keys(data).slice(0, 10) // First 10 routes
        })
      }
    } catch (error) {
      tests.results.push({
        test: 'WordPress REST API Base',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    
    // Test 2: Fetch Pages
    try {
      const timestamp = Date.now()
      const response = await fetch(`${API_BASE}/pages?per_page=5&_t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      })
      
      if (!response.ok) {
        tests.results.push({
          test: 'Fetch Pages',
          status: response.status,
          statusText: response.statusText,
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        })
      } else {
        const pages = await response.json()
        tests.results.push({
          test: 'Fetch Pages',
          status: response.status,
          success: true,
          count: Array.isArray(pages) ? pages.length : 0,
          sample: Array.isArray(pages) && pages.length > 0 ? {
            id: pages[0].id,
            title: pages[0].title?.rendered,
            slug: pages[0].slug
          } : null
        })
      }
    } catch (error) {
      tests.results.push({
        test: 'Fetch Pages',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    
    // Test 3: Fetch Posts
    try {
      const timestamp = Date.now()
      const response = await fetch(`${API_BASE}/posts?per_page=5&_t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      })
      
      if (!response.ok) {
        tests.results.push({
          test: 'Fetch Posts',
          status: response.status,
          statusText: response.statusText,
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        })
      } else {
        const posts = await response.json()
        tests.results.push({
          test: 'Fetch Posts',
          status: response.status,
          success: true,
          count: Array.isArray(posts) ? posts.length : 0,
          sample: Array.isArray(posts) && posts.length > 0 ? {
            id: posts[0].id,
            title: posts[0].title?.rendered,
            slug: posts[0].slug
          } : null
        })
      }
    } catch (error) {
      tests.results.push({
        test: 'Fetch Posts',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    
    // Test 4: Check CORS headers
    try {
      const response = await fetch(`${API_BASE}/pages?per_page=1`, {
        method: 'OPTIONS',
        cache: 'no-store'
      })
      
      const corsHeaders = {
        'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
        'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
        'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
      }
      
      tests.results.push({
        test: 'CORS Headers',
        success: true,
        headers: corsHeaders
      })
    } catch (error) {
      tests.results.push({
        test: 'CORS Headers',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    
    const successCount = tests.results.filter(r => r.success).length
    const totalTests = tests.results.length
    
    return NextResponse.json({
      success: successCount === totalTests,
      summary: {
        totalTests,
        passed: successCount,
        failed: totalTests - successCount
      },
      ...tests
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    })
    
  } catch (error) {
    console.error('❌ WordPress API Test Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

