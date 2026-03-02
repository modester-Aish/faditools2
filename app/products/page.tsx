import { Metadata } from 'next'
import { fetchPageBySlug } from '@/lib/api'
import Header from '../../components/Header'
import ProductGrid from '../../components/ProductGrid'
import ProductSearch from '../../components/ProductSearch'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { Product } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'

const FALLBACK = {
  title: 'SEO Tools 2025 - 50+ Premium Group Buy Tools at 90% OFF',
  description:
    'Access 50+ premium SEO tools at 90% discount. Group buy subscription for keyword research, backlink analysis & site audits. Affordable pricing.',
  keywords:
    'seo tools 2025, group buy seo tools, premium seo tools, digital marketing tools, affordable seo tools, seo tools pricing, seo tools comparison, keyword research tool, backlink checker, site audit tool, rank tracking tool, competitor analysis tools, content optimization tools, cheap seo tools, seo tools discount, professional seo tools, marketing tools 2025',
}

export async function generateMetadata(): Promise<Metadata> {
  const wpPage = await fetchPageBySlug('products')
  const seo = (wpPage as any)?.seo
  const title = seo?.title || FALLBACK.title
  const description = seo?.description || FALLBACK.description

  return {
    title,
    description,
    keywords: FALLBACK.keywords,
    openGraph: {
      title,
      description,
      url: 'https://faditools.com/products',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: generateCanonicalUrl('/products'),
    },
    robots: { index: true, follow: true },
  }
}

// Enable ISR (Incremental Static Regeneration) for better performance
// Live fetch from WooCommerce (no static JSON)
export const dynamic = 'force-dynamic'
export const revalidate = 0

function getWooConfig() {
  const baseUrl = process.env.WOOCOMMERCE_BASE_URL || process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'
  const key = process.env.WC_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || ''
  const secret = process.env.WC_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET || ''
  return { baseUrl, key, secret }
}

function mapWooToProduct(wooProduct: any): Product {
  return {
    id: wooProduct.id,
    date: wooProduct.date_created,
    modified: wooProduct.date_modified,
    slug: wooProduct.slug,
    status: wooProduct.status as any,
    link: wooProduct.permalink,
    title: { rendered: wooProduct.name },
    content: { rendered: wooProduct.description },
    excerpt: { rendered: wooProduct.short_description },
    featured_media: wooProduct.images?.[0]?.id || 0,
    price: wooProduct.price,
    regular_price: wooProduct.regular_price,
    sale_price: wooProduct.sale_price,
    on_sale: wooProduct.on_sale,
    stock_status: wooProduct.stock_status,
    stock_quantity: wooProduct.stock_quantity,
    images: wooProduct.images,
    attributes: wooProduct.attributes,
    categories: wooProduct.categories?.map((cat: any) => cat.id) || [],
    tags: wooProduct.tags?.map((tag: any) => tag.id) || [],
  } as any
}

interface ProductsPageProps {
  searchParams: {
    page?: string
    category?: string
    search?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = parseInt(searchParams.page || '1')
  const category = searchParams.category
  const search = searchParams.search
  
  let products: Product[] = []
  let totalProducts = 0
  let categories: Array<{ id: number; name: string; slug: string }> = []
  let totalPages = 0
  
  try {
    const { baseUrl, key, secret } = getWooConfig()
    if (!key || !secret) {
      throw new Error('WooCommerce credentials missing. Set WC_CONSUMER_KEY/WC_CONSUMER_SECRET in env.')
    }

    // Fetch categories for filter (slug -> id)
    const catsUrl = `${baseUrl}/wp-json/wc/v3/products/categories?consumer_key=${encodeURIComponent(
      key
    )}&consumer_secret=${encodeURIComponent(secret)}&per_page=100`
    const catsRes = await fetch(catsUrl, { cache: 'no-store' })
    const catsJson = await catsRes.json()
    categories = Array.isArray(catsJson)
      ? catsJson.map((cat: any) => ({ id: cat.id, name: cat.name, slug: cat.slug }))
      : []

    const productsPerPage = 24
    const params = new URLSearchParams()
    params.set('consumer_key', key)
    params.set('consumer_secret', secret)
    params.set('status', 'publish')
    params.set('per_page', String(productsPerPage))
    params.set('page', String(page))

    if (search) params.set('search', search)

    if (category) {
      const match = categories.find((c) => c.slug === category)
      if (match?.id) params.set('category', String(match.id))
    }

    const productsUrl = `${baseUrl}/wp-json/wc/v3/products?${params.toString()}`
    const productsRes = await fetch(productsUrl, { cache: 'no-store' })
    if (!productsRes.ok) {
      throw new Error(`WooCommerce API error: ${productsRes.status}`)
    }

    const totalHeader = productsRes.headers.get('x-wp-total') || productsRes.headers.get('X-WP-Total') || '0'
    const totalPagesHeader =
      productsRes.headers.get('x-wp-totalpages') || productsRes.headers.get('X-WP-TotalPages') || '0'

    totalProducts = parseInt(totalHeader, 10) || 0
    totalPages = parseInt(totalPagesHeader, 10) || 0

    const wooProducts = (await productsRes.json()) as WooCommerceProduct[]
    products = Array.isArray(wooProducts) ? wooProducts.map(mapWooToProduct) : []
    
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error)
    products = []
    totalProducts = 0
    categories = []
    totalPages = 0
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white py-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-12 right-12 w-10 h-10 bg-white/10 rounded-full animate-float-delay-1"></div>
          <div className="absolute bottom-6 left-1/4 w-8 h-8 bg-white/10 rounded-full animate-float-delay-2"></div>
          <div className="absolute bottom-12 right-1/3 w-14 h-14 bg-white/10 rounded-full animate-float-delay-3"></div>
        </div>
        <div className="container mx-auto px-8 lg:px-16 xl:px-24 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path d="M2 17L12 22L22 17"/>
                  <path d="M2 12L12 17L22 12"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Best SEO Tools & Digital Marketing Products
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-white/90 leading-relaxed">
              Get AHREF$ group buy, SEMRU$H group buy, and 50+ premium SEO tools at 90% discount. Compare SEO tools pricing, find the best keyword research tools, and save thousands on digital marketing software.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <div className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-base font-semibold">{totalProducts} SEO Tools</span>
              </div>
              <div className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-base font-semibold">90% Discount</span>
              </div>
              <div className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-base font-semibold">Group Buy Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24">
          
          {products && products.length > 0 ? (
            <ProductGrid 
              products={products} 
              currentPage={page}
              totalPages={totalPages}
              totalProducts={totalProducts}
              category={category}
              search={search}
              categories={categories}
            />
          ) : (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="max-w-lg mx-auto">
                <div className="w-32 h-32 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <svg className="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-text mb-4">No SEO Tools Found</h3>
                <p className="text-lg text-secondary-500 mb-8">
                  {search 
                    ? `No SEO tools found matching "${search}". Try searching for "AHREF$", "SEMRU$H", "keyword research", or "backlink checker"`
                    : category 
                    ? `No SEO tools found in this category. Browse our full collection of premium SEO tools and digital marketing software.`
                    : 'Our SEO tools collection is being updated. Please check back soon for the latest premium tools including AHREF$ group buy, SEMRU$H group buy, and more.'
                  }
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-8 text-left shadow-lg">
                  <h4 className="font-bold text-primary-900 mb-4 text-lg">🔍 Popular SEO Tools to Search:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-primary-800">
                    <div className="space-y-2">
                      <p className="font-semibold">Keyword Research Tools:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• AHREF$ Keyword Explorer</li>
                        <li>• SEMRU$H Keyword Magic Tool</li>
                        <li>• Ubersuggest</li>
                        <li>• Answer The Public</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">Backlink Analysis Tools:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• AHREF$ Site Explorer</li>
                        <li>• SEMRU$H Backlink Analytics</li>
                        <li>• Majestic SEO</li>
                        <li>• Moz Link Explorer</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">Site Audit Tools:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• SEMRU$H Site Audit</li>
                        <li>• AHREF$ Site Audit</li>
                        <li>• Screaming Frog</li>
                        <li>• GTmetrix</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">Rank Tracking Tools:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• AccuRanker</li>
                        <li>• SE Ranking</li>
                        <li>• Rank Math</li>
                        <li>• Pro Rank Tracker</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-800 text-white py-12">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24 text-center">
          <h3 className="text-2xl font-bold mb-4 text-primary-500">FadiTools</h3>
          <p className="text-secondary-300 mb-6">
            A clean WooCommerce-powered website with modern design
          </p>
          <div className="flex justify-center space-x-6">
            <a href="/blog" className="text-secondary-300 hover:text-primary-400 transition-colors">
              Blog
            </a>
            <a href="/products" className="text-secondary-300 hover:text-primary-400 transition-colors">
              Products
            </a>
            <a href="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">
              Contact
            </a>
          </div>
          <p className="text-secondary-400 mt-8">
            © 2024 FadiTools. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
