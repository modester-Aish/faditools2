import { Metadata } from 'next'
import { fetchPageBySlug, fetchProducts } from '@/lib/local-wp'
import { getAllPopularTools } from '@/data/popular-tools'
import type { PopularTool } from '@/data/popular-tools'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductGrid from '../../components/ProductGrid'
import ProductSearch from '../../components/ProductSearch'
import { Product } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'

/** Top 8 popular tools ko Product shape me convert — products list aur search me dikhne ke liye */
function popularToolsAsProducts(): Product[] {
  const tools = getAllPopularTools()
  return tools.map((t: PopularTool, index: number) => {
    // Same-origin image path rakhna taake next/image bina host config ke kaam kare
    const imageSrc = t.image.startsWith('http') ? t.image : t.image.startsWith('/') ? t.image : `/${t.image}`
    return {
    id: parseInt(t.productId || String(9000 + index), 10) || 9000 + index,
    date: new Date().toISOString(),
    slug: t.slug,
    title: { rendered: t.name },
    content: { rendered: t.longDescription || t.description },
    excerpt: { rendered: t.description },
    images: [{ id: 0, src: imageSrc, name: '', alt: t.name }],
    price: t.price.replace(/[^0-9.]/g, '') || '0',
    regular_price: t.originalPrice.replace(/[^0-9.]/g, '') || t.price.replace(/[^0-9.]/g, ''),
    on_sale: true,
    stock_status: 'instock' as const,
    status: 'publish',
    categories: [],
    ...((t.category && { _local_categories: [{ id: 9000 + index, name: t.category, slug: t.category.toLowerCase().replace(/\s+/g, '-') }] }) as any),
  } as Product
  })
}

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
    const allProducts = await fetchProducts()
    const popularProducts = popularToolsAsProducts()
    const popularSlugs = new Set(popularProducts.map(p => p.slug))
    const restProducts = allProducts.filter(p => !popularSlugs.has(p.slug))
    const combined = [...popularProducts, ...restProducts]

    // Derive categories from combined (local products + popular tool categories)
    const categoryMap = new Map<number, { id: number; name: string; slug: string }>()
    for (const p of combined) {
      const raw = (p as any)
      const cats = raw?._local_categories
      if (Array.isArray(cats)) {
        for (const c of cats) {
          if (c && typeof c.id === 'number') {
            categoryMap.set(c.id, { id: c.id, name: c.name || String(c.id), slug: c.slug || String(c.id) })
          }
        }
      }
    }
    categories = Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name))

    let filtered = combined.filter(p => (p.status as any) === 'publish')

    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(p => {
        const name = p.title?.rendered || ''
        const excerpt = p.excerpt?.rendered || ''
        return (
          name.toLowerCase().includes(q) ||
          excerpt.replace(/<[^>]*>/g, '').toLowerCase().includes(q)
        )
      })
    }

    if (category) {
      const match = categories.find(c => c.slug === category)
      if (match) {
        filtered = filtered.filter(p => Array.isArray(p.categories) && p.categories.includes(match.id))
      }
    }

    const productsPerPage = 24
    totalProducts = filtered.length
    totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage))

    const start = (page - 1) * productsPerPage
    products = filtered.slice(start, start + productsPerPage)
    
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
              Get Ahrefs group buy, SEMrush group buy, and 50+ premium SEO tools at 90% discount. Compare SEO tools pricing, find the best keyword research tools, and save thousands on digital marketing software.
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
                    ? `No SEO tools found matching "${search}". Try searching for "Ahrefs", "SEMrush", "keyword research", or "backlink checker"`
                    : category 
                    ? `No SEO tools found in this category. Browse our full collection of premium SEO tools and digital marketing software.`
                    : 'Our SEO tools collection is being updated. Please check back soon for the latest premium tools including Ahrefs group buy, SEMrush group buy, and more.'
                  }
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-8 text-left shadow-lg">
                  <h4 className="font-bold text-primary-900 mb-4 text-lg">🔍 Popular SEO Tools to Search:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-primary-800">
                    <div className="space-y-2">
                      <p className="font-semibold">Keyword Research Tools:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Ahrefs Keyword Explorer</li>
                        <li>• SEMrush Keyword Magic Tool</li>
                        <li>• Ubersuggest</li>
                        <li>• Answer The Public</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">Backlink Analysis Tools:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Ahrefs Site Explorer</li>
                        <li>• SEMrush Backlink Analytics</li>
                        <li>• Majestic SEO</li>
                        <li>• Moz Link Explorer</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">Site Audit Tools:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• SEMrush Site Audit</li>
                        <li>• Ahrefs Site Audit</li>
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

      <Footer />
    </div>
  )
}
