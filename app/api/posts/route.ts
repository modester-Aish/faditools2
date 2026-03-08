import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/local-content'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const posts = getPosts()
    const simplified = posts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || '',
      date: p.date || '',
      featured_image: p.featured_image || null,
    }))

    return NextResponse.json(simplified, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Error reading local posts JSON:', error)
    return NextResponse.json([], {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      },
    })
  }
}

