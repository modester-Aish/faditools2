import { NextResponse } from 'next/server'
import { clearWordPressCache } from '@/lib/wordpress-api'
import { clearNavigationCache } from '@/lib/navigation-api'

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * API endpoint to manually clear all caches
 * GET /api/clear-cache
 */
export async function GET() {
  try {
    // Clear all caches
    clearWordPressCache()
    clearNavigationCache()
    
    return NextResponse.json({
      success: true,
      message: 'All caches cleared successfully',
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      }
    })
  } catch (error) {
    console.error('Error clearing cache:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to clear cache'
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      }
    })
  }
}

