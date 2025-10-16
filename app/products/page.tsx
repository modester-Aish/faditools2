import { Metadata } from 'next'
import { loadStaticProducts, loadStaticCategories } from '@/lib/static-products'
import Header from '../../components/Header'
import ProductGrid from '../../components/ProductGrid'
import ProductSearch from '../../components/ProductSearch'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { Product } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'

export const metadata: Metadata = {
  title: 'SEO Tools 2025 - 50+ Premium Group Buy Tools at 90% OFF | FadiTools',
  description: 'Access 50+ premium SEO tools at 90% discount. Group buy subscription for keyword research, backlink analysis & site audits. Affordable pricing.',
  keywords: 'seo tools 2025, group buy seo tools, premium seo tools, digital marketing tools, affordable seo tools, seo tools pricing, seo tools comparison, keyword research tool, backlink checker, site audit tool, rank tracking tool, competitor analysis tools, content optimization tools, cheap seo tools, seo tools discount, professional seo tools, marketing tools 2025',
  openGraph: {
    title: 'SEO Tools 2025 - 50+ Premium Group Buy Tools at 90% OFF | FadiTools',
    description: 'Access 50+ premium SEO tools at 90% discount. Group buy subscription for keyword research, backlink analysis & site audits. Affordable pricing.',
    url: 'https://faditools.com/products',
    siteName: 'FadiTools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Tools 2025 - 50+ Premium Group Buy Tools at 90% OFF | FadiTools',
    description: 'Access 50+ premium SEO tools at 90% discount. Group buy subscription. Affordable pricing for agencies & businesses.',
  },
  alternates: {
    canonical: generateCanonicalUrl('/products'),
  },
}

// Enable ISR (Incremental Static Regeneration) for better performance
// Products will be statically generated and revalidated every 6 hours
// This means the page is built once and served from cache for 6 hours
export const revalidate = 21600 // Revalidate every 6 hours (21600 seconds)
// Removed dynamic = 'force-dynamic' to enable static generation with ISR

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
  
  try {
    // Load products from static JSON file (ultra-fast! 0.01s)
    // No API calls - data loaded from public/data/products.json
    const staticProducts = await loadStaticProducts()
    const staticCategories = await loadStaticCategories()
    
    console.log(`📦 Loaded ${staticProducts.length} products from static file (Solution 3: Static + Webhooks)`)
    
    // Get categories for search component
    categories = staticCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    }))
    
    // Apply filters to products
    let filteredProducts = staticProducts
    
    if (category) {
      filteredProducts = filteredProducts.filter((product: WooCommerceProduct) => 
        product.categories.some(cat => cat.slug === category)
      )
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter((product: WooCommerceProduct) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.short_description.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      )
    }
    
    totalProducts = filteredProducts.length
    
    // Apply pagination - increased to 24 products per page for better UX
    const productsPerPage = 24
    const startIndex = (page - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    
    // Convert WooCommerce products to Product format for compatibility
    products = paginatedProducts.map(wooProduct => ({
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
      // WooCommerce specific fields
      price: wooProduct.price,
      regular_price: wooProduct.regular_price,
      sale_price: wooProduct.sale_price,
      on_sale: wooProduct.on_sale,
      stock_status: wooProduct.stock_status,
      stock_quantity: wooProduct.stock_quantity,
      images: wooProduct.images,
      attributes: wooProduct.attributes,
      // Additional fields
      categories: wooProduct.categories.map(cat => cat.id),
      tags: wooProduct.tags.map(tag => tag.id),
      meta: {
        sku: wooProduct.sku,
        total_sales: wooProduct.total_sales,
        average_rating: wooProduct.average_rating,
        rating_count: wooProduct.rating_count,
        featured: wooProduct.featured,
        virtual: wooProduct.virtual,
        downloadable: wooProduct.downloadable,
        weight: wooProduct.weight,
        dimensions: wooProduct.dimensions,
        manage_stock: wooProduct.manage_stock,
        stock_quantity: wooProduct.stock_quantity,
        backorders: wooProduct.backorders,
        sold_individually: wooProduct.sold_individually,
        purchase_note: wooProduct.purchase_note,
        reviews_allowed: wooProduct.reviews_allowed,
        upsell_ids: wooProduct.upsell_ids,
        cross_sell_ids: wooProduct.cross_sell_ids,
        parent_id: wooProduct.parent_id,
        grouped_products: wooProduct.grouped_products,
        menu_order: wooProduct.menu_order
      }
    })) as any
    
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error)
    products = []
    totalProducts = 0
    categories = []
  }

  const totalPages = Math.ceil(totalProducts / 24)

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
