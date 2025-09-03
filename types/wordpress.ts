// WordPress API Response Types - UNIFIED AND COMPLETE

export interface WordPressRenderedContent {
  rendered: string
  protected?: boolean
}

export interface WordPressGuid {
  rendered: string
}

export interface WordPressMeta {
  _acf_changed?: boolean
  footnotes?: string
  [key: string]: any
}

export interface WordPressLinks {
  self?: Array<{ href: string }>
  collection?: Array<{ href: string }>
  about?: Array<{ href: string }>
  author?: Array<{ href: string }>
  replies?: Array<{ href: string }>
  'version-history'?: Array<{ href: string }>
  'predecessor-version'?: Array<{ href: string }>
  'wp:attachment'?: Array<{ href: string }>
  'wp:term'?: Array<{ href: string }>
  curies?: Array<{ href: string; name: string }>
}

// SEO Data Interface
export interface WordPressSEO {
  title?: string
  description?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  twitterTitle?: string
  twitterDescription?: string
  focusKeywords?: string
  robots?: { index: boolean; follow: boolean }
}

// RankMath SEO Data
export interface RankMathData {
  title?: string
  description?: string
  canonicalUrl?: string
  facebookTitle?: string
  facebookDescription?: string
  twitterTitle?: string
  twitterDescription?: string
  focusKeywords?: string
  robots?: { index: boolean; follow: boolean }
}

// WordPress Page Type - COMPLETE AND UNIFIED
export interface WordPressPage {
  id: number
  date: string
  date_gmt?: string
  guid?: WordPressGuid
  modified?: string
  modified_gmt?: string
  slug: string
  status?: 'publish' | 'draft' | 'private' | 'trash'
  type?: 'page'
  link?: string
  title: WordPressRenderedContent
  content: WordPressRenderedContent
  excerpt?: WordPressRenderedContent
  author?: number
  featured_media?: number
  parent?: number
  menu_order?: number
  comment_status?: 'open' | 'closed'
  ping_status?: 'open' | 'closed'
  template?: string
  meta?: WordPressMeta
  class_list?: string[]
  acf?: any[]
  _links?: WordPressLinks
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      guid?: { rendered: string }
      alt_text?: string
      media_details?: {
        sizes?: {
          thumbnail?: { source_url: string }
          medium?: { source_url: string }
          large?: { source_url: string }
          full?: { source_url: string }
        }
      }
    }>
  }
  seo?: WordPressSEO
  rankMath?: {
    assessor?: {
      serpData?: RankMathData
    }
  }
  yoast_head?: string
  yoast_head_json?: {
    title?: string
    description?: string
    canonical?: string
    og_title?: string
    og_description?: string
    twitter_title?: string
    twitter_description?: string
  }
}

// WordPress Post Type - COMPLETE AND UNIFIED
export interface WordPressPost {
  id: number
  date: string
  date_gmt?: string
  guid?: WordPressGuid
  modified?: string
  modified_gmt?: string
  slug: string
  status?: 'publish' | 'draft' | 'private' | 'trash'
  type?: 'post'
  link?: string
  title: WordPressRenderedContent
  content: WordPressRenderedContent
  excerpt?: WordPressRenderedContent
  author?: number
  featured_media?: number
  comment_status?: 'open' | 'closed'
  ping_status?: 'open' | 'closed'
  sticky?: boolean
  template?: string
  format?: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio'
  meta?: WordPressMeta
  categories?: number[]
  tags?: number[]
  class_list?: string[]
  acf?: any[]
  _links?: WordPressLinks
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number
      source_url: string
      guid?: { rendered: string }
      alt_text?: string
      media_details?: {
        sizes?: {
          thumbnail?: { source_url: string }
          medium?: { source_url: string }
          large?: { source_url: string }
          full?: { source_url: string }
        }
      }
    }>
  }
  seo?: WordPressSEO
  rankMath?: {
    assessor?: {
      serpData?: RankMathData
    }
  }
  yoast_head?: string
  yoast_head_json?: {
    title?: string
    description?: string
    canonical?: string
    og_title?: string
    og_description?: string
    twitter_title?: string
    twitter_description?: string
  }
}

// WordPress Category Type
export interface WordPressCategory {
  id: number
  name: string
  slug: string
  description?: string
  count?: number
  link?: string
  taxonomy?: string
  _links?: WordPressLinks
}

// WordPress Tag Type
export interface WordPressTag {
  id: number
  name: string
  slug: string
  description?: string
  count?: number
  link?: string
  taxonomy?: string
  _links?: WordPressLinks
}

// API Response wrapper
export interface WordPressApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

// WordPress API Error
export interface WordPressApiError {
  code: string
  message: string
  data?: {
    status: number
  }
}

// WooCommerce Product Image
export interface WooCommerceImage {
  id: number
  src: string
  name: string
  alt: string
}

// WooCommerce Product Attribute
export interface WooCommerceAttribute {
  id: number
  name: string
  position: number
  visible: boolean
  variation: boolean
  options: string[]
}

// Product type (extends WordPressPost with WooCommerce properties)
export interface Product extends WordPressPost {
  // WooCommerce specific fields
  price?: string
  regular_price?: string
  sale_price?: string
  on_sale?: boolean
  stock_status?: 'instock' | 'outofstock' | 'onbackorder'
  stock_quantity?: number
  images?: WooCommerceImage[]
  attributes?: WooCommerceAttribute[]
  // Affiliate link field
  affiliate_link?: string
}

// Safe date utility function
export function getSafeDate(dateString?: string, fallbackDate?: string): Date {
  if (dateString) {
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return date
    }
  }
  if (fallbackDate) {
    const fallback = new Date(fallbackDate)
    if (!isNaN(fallback.getTime())) {
      return fallback
    }
  }
  return new Date()
}

// Safe string utility function
export function getSafeString(value?: string, fallback: string = ''): string {
  return value || fallback
}

// Safe array utility function
export function getSafeArray<T>(value?: T[], fallback: T[] = []): T[] {
  return Array.isArray(value) ? value : fallback
}
