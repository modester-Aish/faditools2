import { NextResponse } from 'next/server'
import { fetchPages } from '@/lib/api'

export async function GET() {
  try {
    const pages = await fetchPages()
    const simplifiedPages = pages.map(page => ({
      id: page.id,
      title: page.title,
      slug: page.slug
    }))
    return NextResponse.json(simplifiedPages)
  } catch (error) {
    console.error('Error fetching pages for API:', error)
    return NextResponse.json([], { status: 500 })
  }
}
