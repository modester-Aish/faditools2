import { Metadata } from 'next'
import { wooCommerceService } from '@/lib/woocommerce-service'
import Header from '../../components/Header'
import ProductGrid from '../../components/ProductGrid'
import ProductSearch from '../../components/ProductSearch'
import ClientOnly from '../../components/ClientOnly'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { Product } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'

export const metadata: Metadata = {
  title: 'Products - FadiTools',
  description: 'Discover our amazing products managed through WooCommerce. Browse through our complete product catalog with clean design and seamless shopping experience.',
  keywords: 'products, WooCommerce products, digital products, online shopping, ecommerce',
  openGraph: {
    title: 'Products - FadiTools',
    description: 'Discover our amazing products managed through WooCommerce.',
    url: 'https://faditools.com/products',
    siteName: 'FadiTools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products - FadiTools',
    description: 'Discover our amazing products managed through WooCommerce.',
  },
  alternates: {
    canonical: generateCanonicalUrl('/products'),
  },
}

// Enable ISR for better performance
export const revalidate = 3600 // Revalidate every hour

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
    // Fetch WooCommerce data
    const wooCommerceData = await wooCommerceService.getWooCommerceData()
    
    // Get categories for search component
    categories = wooCommerceData.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    }))
    
    // Apply filters to products
    let filteredProducts = wooCommerceData.products
    
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
              Our Products
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-white/90 leading-relaxed">
              Discover our amazing products managed through WooCommerce with stunning design and seamless integration
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <div className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-base font-semibold">{totalProducts} Products</span>
              </div>
              <div className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-base font-semibold">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24">
          
          {products && products.length > 0 ? (
            <ClientOnly fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <ProductGrid 
                products={products} 
                currentPage={page}
                totalPages={totalPages}
                totalProducts={totalProducts}
                category={category}
                search={search}
                categories={categories}
              />
            </ClientOnly>
          ) : (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="max-w-lg mx-auto">
                <div className="w-32 h-32 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <svg className="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-text mb-4">No Products Found</h3>
                <p className="text-lg text-secondary-500 mb-8">
                  {search 
                    ? `No products found matching "${search}"`
                    : category 
                    ? `No products found in this category`
                    : 'No products are currently available.'
                  }
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-8 text-left shadow-lg">
                  <h4 className="font-bold text-primary-900 mb-4 text-lg">🚀 How to add products:</h4>
                  <ol className="text-primary-800 space-y-3 text-base">
                    <li className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <span>Go to WordPress Admin → Products → Add New</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <span>Add product name, description, and price</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <span>Upload product images</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                      <span>Set product categories and tags</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                      <span>Publish the product</span>
                    </li>
                  </ol>
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
