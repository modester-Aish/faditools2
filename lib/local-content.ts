import fs from 'fs'
import path from 'path'

type YoastJson = {
  title?: string
  description?: string
  og_title?: string
  og_description?: string
  [key: string]: any
}

export type HomepageContent = {
  fetchedAt: string
  contentSectionHtml?: string
  metaTitle?: string
  metaDescription?: string
  rawYoast?: YoastJson | null
}

export type SyncedPage = {
  id: number
  slug: string
  title: string
  content: string
  excerpt?: string
  date?: string
  modified?: string
  status: string
  type: string
  menu_order?: number
  featured_image?: string | null
  meta_title: string | null
  meta_description: string | null
  yoast_head_json: YoastJson | null
}

export type SyncedPost = {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  modified?: string
  status: string
  type: string
  categories?: Array<{ id?: number; name?: string }>
  featured_image?: string | null
  meta_title: string | null
  meta_description: string | null
  yoast_head_json: YoastJson | null
}

export type SyncedProduct = {
  id: number
  slug: string
  name: string
  short_description: string
  description: string
  price: string | number | null
  regular_price: string | number | null
  sale_price: string | number | null
  on_sale?: boolean
  stock_status?: string | null
  stock_quantity?: number | null
  status: string
  type: string
  sku: string
  currency: string | null
  permalink?: string | null
  external_url?: string | null
  categories?: Array<{ id: number; name: string; slug: string }>
  tags?: Array<{ id: number; name: string; slug: string }>
  attributes?: any[]
  meta_data?: any[]
  images: any[]
  meta_title: string | null
  meta_description: string | null
  yoast_head_json: YoastJson | null
}

function readJsonFile<T>(fileName: string, fallback: T): T {
  try {
    const filePath = path.join(process.cwd(), 'data', fileName)
    if (!fs.existsSync(filePath)) return fallback
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function getHomepageContent(): HomepageContent | null {
  return readJsonFile<HomepageContent | null>('homepageContent.json', null)
}

export function getPages(): SyncedPage[] {
  return readJsonFile<SyncedPage[]>('pages.json', [])
}

export function getPosts(): SyncedPost[] {
  return readJsonFile<SyncedPost[]>('posts.json', [])
}

export function getProducts(): SyncedProduct[] {
  return readJsonFile<SyncedProduct[]>('products.json', [])
}

export function findPageBySlug(slug: string): SyncedPage | undefined {
  return getPages().find(page => page.slug === slug)
}

export function findPostBySlug(slug: string): SyncedPost | undefined {
  return getPosts().find(post => post.slug === slug)
}

export function findProductBySlug(slug: string): SyncedProduct | undefined {
  return getProducts().find(product => product.slug === slug)
}

