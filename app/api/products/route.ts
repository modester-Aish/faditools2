import { NextRequest, NextResponse } from 'next/server'
import { getProducts } from '@/lib/local-content'
import { sortProductsWithToolsFirst } from '@/data/product-id-mapping'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Map SyncedProduct to Product-like shape; images from images[] ya Yoast og_image (live par images aati hain)
function toProductShape(p: import('@/lib/local-content').SyncedProduct) {
  let imgSrc = ''
  if (Array.isArray(p.images) && p.images[0]) {
    const first = p.images[0] as any
    imgSrc = typeof first.src === 'string' ? first.src : typeof first.url === 'string' ? first.url : ''
  }
  if (!imgSrc && (p as any).yoast_head_json?.og_image?.[0]?.url) {
    imgSrc = (p as any).yoast_head_json.og_image[0].url
  }
  const images = imgSrc ? [{ id: 0, src: imgSrc, name: '', alt: p.name || '' }] : []
  return {
    id: p.id,
    slug: p.slug,
    status: p.status || 'publish',
    title: { rendered: p.name || p.slug },
    excerpt: { rendered: p.short_description || '' },
    price: p.price != null ? String(p.price) : undefined,
    regular_price: p.regular_price != null ? String(p.regular_price) : undefined,
    sale_price: p.sale_price != null ? String(p.sale_price) : undefined,
    on_sale: Boolean(p.on_sale || (p.sale_price && String(p.sale_price).length > 0)),
    stock_status: p.stock_status || 'instock',
    images,
    meta: {},
  }
}

export async function GET(request: NextRequest) {
  try {
    const all = getProducts()
    const filtered = all.filter((p: any) => (p.status || 'publish') === 'publish')
    const sorted = sortProductsWithToolsFirst(filtered)
    const total = sorted.length

    const page = Math.max(1, parseInt(request.nextUrl.searchParams.get('page') || '1'))
    const perPage = Math.min(50, Math.max(1, parseInt(request.nextUrl.searchParams.get('per_page') || '20')))
    const start = (page - 1) * perPage
    const slice = sorted.slice(start, start + perPage)
    const products = slice.map(toProductShape)

    return NextResponse.json(
      { products, total, page, per_page: perPage, total_pages: Math.ceil(total / perPage) },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    )
  } catch (error) {
    console.error('Error reading local products JSON:', error)
    return NextResponse.json(
      { products: [], total: 0, page: 1, per_page: 20, total_pages: 0 },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        },
      }
    )
  }
}

