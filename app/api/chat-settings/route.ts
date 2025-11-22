import { NextResponse } from 'next/server'

// Server-side API route - backend URL is hidden from client
export async function GET() {
  try {
    const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'
    
    const response = await fetch(`${WORDPRESS_BASE_URL}/wp-json/faditools/v1/chat-settings`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      }
    })
  } catch (error) {
    console.error('Failed to fetch chat settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat settings' },
      { status: 500 }
    )
  }
}

