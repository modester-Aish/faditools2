import { NextResponse } from 'next/server'
import { fetchPages } from '@/lib/api'

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const pages = await fetchPages()
    const simplifiedPages = pages.map((page: { id: number; title?: { rendered?: string }; slug: string; status?: string; menu_order?: number }) => ({
      id: page.id,
      title: typeof page.title === 'object' && page.title?.rendered != null ? page.title.rendered : String(page.title ?? ''),
      slug: page.slug,
      status: page.status ?? 'publish',
      menu_order: page.menu_order ?? 0,
    }))
    
    // Return response with cache control headers to prevent CDN caching
    return NextResponse.json(simplifiedPages, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
  } catch (error) {
    console.error('Error fetching pages for API:', error)
    return NextResponse.json([], { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      }
    })
  }
}
