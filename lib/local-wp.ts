import 'server-only'

import {
  getPages,
  getPosts,
  getProducts,
  findPageBySlug,
  findPostBySlug,
  findProductBySlug,
  SyncedPage,
  SyncedPost,
  SyncedProduct,
} from '@/lib/local-content'

import { Product, WordPressPage, WordPressPost, WordPressSEO } from '@/types'

/** Decode common HTML entities in titles (e.g. &#038; → &) so they display correctly */
function decodeHtmlEntities(s: string): string {
  if (!s || typeof s !== 'string') return s
  return s
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
}

function toEmbeddedFeatured(url?: string | null) {
  if (!url) return undefined
  return {
    'wp:featuredmedia': [
      {
        id: 0,
        source_url: url,
        guid: { rendered: url },
      },
    ],
  }
}

function seoFromYoast(yoast: any, fallbackTitle: string, fallbackDesc: string): WordPressSEO {
  const title = yoast?.title || yoast?.og_title || fallbackTitle
  const description =
    yoast?.description || yoast?.og_description || fallbackDesc || ''
  return {
    title,
    description,
    canonical: yoast?.canonical,
    ogTitle: yoast?.og_title || title,
    ogDescription: yoast?.og_description || description,
    twitterTitle: yoast?.twitter_title || title,
    twitterDescription: yoast?.twitter_description || description,
    robots: { index: true, follow: true },
  }
}

export async function fetchPages(): Promise<WordPressPage[]> {
  return getPages().map(toWpPage)
}

export async function fetchPageBySlug(slug: string): Promise<WordPressPage | null> {
  const page = findPageBySlug(slug)
  return page ? toWpPage(page) : null
}

export async function fetchBlogPosts(): Promise<WordPressPost[]> {
  return getPosts().map(toWpPost)
}

export async function fetchPostBySlug(slug: string): Promise<WordPressPost | null> {
  const post = findPostBySlug(slug)
  return post ? toWpPost(post) : null
}

export async function fetchProducts(): Promise<Product[]> {
  return getProducts().map(toProduct)
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const product = findProductBySlug(slug)
  return product ? toProduct(product) : null
}

export async function fetchSEOBySlug(slug: string): Promise<WordPressSEO | null> {
  const post = findPostBySlug(slug)
  if (post) return toWpPost(post).seo || null

  const page = findPageBySlug(slug)
  if (page) return toWpPage(page).seo || null

  const product = findProductBySlug(slug)
  if (product) return toProduct(product).seo || null

  return null
}

function toWpPost(post: SyncedPost): WordPressPost {
  const yoast = post.yoast_head_json || null
  const fallbackDesc = (post.excerpt || '').replace(/<[^>]*>/g, '').slice(0, 155)
  const title = decodeHtmlEntities(post.title || '')

  return {
    id: post.id,
    date: post.date || '',
    modified: (post as any).modified || post.date || '',
    slug: post.slug,
    status: (post.status as any) || 'publish',
    type: 'post',
    title: { rendered: title },
    content: { rendered: post.content },
    excerpt: { rendered: post.excerpt || '' },
    yoast_head_json: yoast || undefined,
    _embedded: toEmbeddedFeatured(post.featured_image),
    seo: seoFromYoast(yoast, title, fallbackDesc),
  }
}

function toWpPage(page: SyncedPage): WordPressPage {
  const yoast = page.yoast_head_json || null
  const fallbackDesc = (page.excerpt || '').replace(/<[^>]*>/g, '').slice(0, 155)
  const title = decodeHtmlEntities(page.title || '')

  return {
    id: page.id,
    date: (page.date as string) || '',
    modified: (page.modified as string) || (page.date as string) || '',
    slug: page.slug,
    status: (page.status as any) || 'publish',
    type: 'page',
    menu_order: (page.menu_order as number) ?? 0,
    title: { rendered: title },
    content: { rendered: page.content },
    excerpt: { rendered: page.excerpt || '' },
    yoast_head_json: yoast || undefined,
    _embedded: toEmbeddedFeatured(page.featured_image),
    seo: seoFromYoast(yoast, title, fallbackDesc),
  }
}

function normalizeImages(images: any[], fallbackImageUrl?: string | null, fallbackAlt?: string): any[] {
  if (!Array.isArray(images)) images = []
  const out = images
    .map(img => {
      if (!img) return null
      const src = typeof (img as any).src === 'string' ? (img as any).src : typeof (img as any).url === 'string' ? (img as any).url : null
      if (src) {
        return {
          id: typeof img.id === 'number' ? img.id : 0,
          src,
          name: (img as any).name || '',
          alt: (img as any).alt || '',
        }
      }
      return null
    })
    .filter(Boolean) as { id: number; src: string; name: string; alt: string }[]
  // Live par images aati hain - agar images khali ho to Yoast og_image use karo
  if (out.length === 0 && fallbackImageUrl) {
    return [{ id: 0, src: fallbackImageUrl, name: '', alt: fallbackAlt || '' }]
  }
  return out
}

function extractAffiliateLink(meta_data: any[] | undefined): string | undefined {
  if (!Array.isArray(meta_data)) return undefined
  const match = meta_data.find(m => m && m.key === 'affiliate_link')
  return match?.value || undefined
}

function toProduct(prod: SyncedProduct): Product {
  const yoast = prod.yoast_head_json || null
  const fallbackDesc = (prod.short_description || '')
    .replace(/<[^>]*>/g, '')
    .slice(0, 155)

  const onSale = Boolean(prod.on_sale || (prod.sale_price && String(prod.sale_price).length > 0))

  const categories = Array.isArray(prod.categories) ? prod.categories.map(c => c.id) : []
  const tags = Array.isArray(prod.tags) ? prod.tags.map(t => t.id) : []

  const title = decodeHtmlEntities(prod.name || prod.slug)
  const ogImageUrl = (yoast as any)?.og_image?.[0]?.url || null
  const images = normalizeImages(prod.images, ogImageUrl, title)

  return {
    id: prod.id,
    date: '',
    modified: '',
    slug: prod.slug,
    status: (prod.status as any) || 'publish',
    type: 'post',
    title: { rendered: title },
    content: { rendered: prod.description || '' },
    excerpt: { rendered: prod.short_description || '' },
    categories,
    tags,
    // Non-typed helper for server pages to derive category list without refetch
    _local_categories: Array.isArray(prod.categories) ? prod.categories : [],
    images,
    attributes: Array.isArray(prod.attributes) ? (prod.attributes as any) : [],
    price: prod.price != null ? String(prod.price) : undefined,
    regular_price: prod.regular_price != null ? String(prod.regular_price) : undefined,
    sale_price: prod.sale_price != null ? String(prod.sale_price) : undefined,
    on_sale: onSale,
    stock_status: (prod.stock_status as any) || undefined,
    stock_quantity: typeof prod.stock_quantity === 'number' ? prod.stock_quantity : undefined,
    affiliate_link: prod.external_url || extractAffiliateLink(prod.meta_data),
    yoast_head_json: yoast || undefined,
    seo: seoFromYoast(yoast, title, fallbackDesc),
  } as any
}

