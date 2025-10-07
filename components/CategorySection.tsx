'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Category {
  id: number
  name: string
  slug: string
  count: number
  image?: string
}

interface Product {
  id: number
  name: string
  slug: string
  price: string
  regular_price: string
  sale_price?: string
  on_sale: boolean
  images: Array<{ src: string; alt: string }>
  categories: Array<{ id: number; name: string; slug: string }>
}

interface CategorySectionProps {
  categories: Category[]
  products?: Product[]
}

export default function CategorySection({ categories, products = [] }: CategorySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories.length > 0 ? categories[0].slug : '')
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch products for selected category
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!selectedCategory) return
      
      setLoading(true)
      try {
        const category = categories.find(cat => cat.slug === selectedCategory)
        if (!category) return

        const response = await fetch(`/api/woocommerce?action=products&category=${category.id}&limit=12`)
        const data = await response.json()
        
        if (data.success) {
          setCategoryProducts(data.data.products.map((product: any) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            regular_price: product.regular_price,
            sale_price: product.sale_price,
            on_sale: product.on_sale,
            images: product.images || [],
            categories: product.categories || []
          })))
        }
      } catch (error) {
        console.error('Error fetching category products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [selectedCategory, categories])

  // Get products for display
  const displayProducts = categoryProducts

  // Get category icon based on name - Using CDN.jsdelivr.net (most reliable)
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    if (name.includes('ai')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg'
    if (name.includes('amazon')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazon.svg'
    if (name.includes('content')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googledocs.svg'
    if (name.includes('seo')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg'
    if (name.includes('design')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg'
    if (name.includes('instagram')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg'
    if (name.includes('youtube')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/youtube.svg'
    if (name.includes('tiktok')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tiktok.svg'
    if (name.includes('facebook')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/facebook.svg'
    if (name.includes('twitter')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/x.svg'
    if (name.includes('linkedin')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg'
    if (name.includes('writing')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googledocs.svg'
    if (name.includes('video')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/youtube.svg'
    if (name.includes('audio')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/spotify.svg'
    if (name.includes('social')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/facebook.svg'
    return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlechrome.svg'
  }

  // Get emoji fallback for categories
  const getCategoryEmoji = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    if (name.includes('ai')) return '🤖'
    if (name.includes('amazon')) return '📦'
    if (name.includes('content')) return '📝'
    if (name.includes('seo')) return '🔍'
    if (name.includes('design')) return '🎨'
    if (name.includes('instagram')) return '📸'
    if (name.includes('youtube')) return '▶️'
    if (name.includes('tiktok')) return '🎵'
    if (name.includes('facebook')) return '👥'
    if (name.includes('twitter')) return '🐦'
    if (name.includes('linkedin')) return '💼'
    if (name.includes('writing')) return '✍️'
    if (name.includes('video')) return '🎬'
    if (name.includes('audio')) return '🎧'
    if (name.includes('social')) return '🌐'
    return '⚙️'
  }

  // Get short category name for display
  const getShortCategoryName = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    if (name.includes('seo')) return 'SEO'
    if (name.includes('ai')) return 'AI'
    if (name.includes('amazon')) return 'Amazon'
    if (name.includes('content')) return 'Content'
    if (name.includes('design')) return 'Design'
    if (name.includes('social')) return 'Social'
    if (name.includes('instagram')) return 'Instagram'
    if (name.includes('youtube')) return 'YouTube'
    if (name.includes('tiktok')) return 'TikTok'
    if (name.includes('facebook')) return 'Facebook'
    if (name.includes('twitter')) return 'Twitter'
    if (name.includes('linkedin')) return 'LinkedIn'
    if (name.includes('writing')) return 'Writing'
    if (name.includes('video')) return 'Video'
    if (name.includes('audio')) return 'Audio'
    return categoryName.length > 8 ? categoryName.substring(0, 8) + '...' : categoryName
  }

  // Check if category should show NEW badge
  const shouldShowNewBadge = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    return name.includes('youtube') || name.includes('tiktok') || name.includes('reels')
  }

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-emerald-600">
              Explore Our Products
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Discover amazing products across various categories. Find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Section - All 6 in one line */}
        <div className="mb-16">
          {/* All categories in single line with existing design */}
          <div className="mx-auto flex max-w-[1200px] flex-col overflow-hidden rounded-2xl bg-background shadow-lg border border-emerald-200">
            <div role="tablist" className="relative grid h-16 grid-cols-6 sm:h-20">
              {categories.slice(0, 6).map((category, index) => (
                <div
                  key={category.id}
                  role="tab"
                  aria-selected={selectedCategory === category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`group/tab relative cursor-pointer ${
                    selectedCategory === category.slug ? 'active' : ''
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.slug)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  aria-label={`${category.name} Services`}
                >
                  <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-x-1 gap-y-1 pl-2 pr-4 md:flex-row md:justify-start md:pl-3 lg:gap-x-2 lg:pr-6">
                    <div className="shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-lg p-1 shadow-sm">
                      <img 
                        src={getCategoryIcon(category.name)} 
                        alt={category.name}
                        className="w-full h-full object-contain"
                        style={{ filter: 'brightness(0) saturate(100%) invert(36%) sepia(90%) saturate(1000%) hue-rotate(140deg) brightness(95%) contrast(101%)' }}
                        loading="eager"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='70' font-size='70'>${getCategoryEmoji(category.name)}</text></svg>`;
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <div className="whitespace-nowrap text-xs font-medium text-gray-700 group-[.active]/tab:font-semibold">
                        {getShortCategoryName(category.name)}
                      </div>
                      <div className="hidden md:block">
                        <div className="inline-flex items-center text-xs font-semibold">
                          <div className="shrink-0 inline-flex items-center gap-1 rounded-bl-full rounded-br-md rounded-tl-full rounded-tr-md border border-gray-400/50 bg-white px-1.5 py-0.5 shadow-sm">
                            <span className="text-green-500 text-xs">⭐</span>
                            <span className="text-xs">5.0</span>
                          </div>
                          <div className="items-center rounded-br-full rounded-tr-full bg-gray-400 bg-opacity-20 px-1.5 py-0.5 text-gray-500">
                            <span className="text-xs">{category.count}+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Left curve for Amazon tools */}
                  {(hoveredCategory === category.slug || selectedCategory === category.slug) && category.name.toLowerCase().includes('amazon') && (
                    <div aria-hidden="true" className="absolute top-0 h-full left-0">
                      <svg width="200" height="80" viewBox="0 0 200 80" preserveAspectRatio="none" fill="none" className="h-full transform scale-x-[-1]">
                        <path d="M0 0C0 0 100 0 150 0C200 0 180 80 200 80C180 80 0 80 0 80V0Z" fill="white"></path>
                      </svg>
                    </div>
                  )}
                  
                  {/* Right curve for other categories */}
                  {(hoveredCategory === category.slug || selectedCategory === category.slug) && !category.name.toLowerCase().includes('amazon') && (
                    <div aria-hidden="true" className={`absolute top-0 h-full ${index === categories.length - 1 ? 'left-0' : 'right-0'}`}>
                      <svg width="200" height="80" viewBox="0 0 200 80" preserveAspectRatio="none" fill="none" className={`h-full ${index === categories.length - 1 ? 'transform scale-x-[-1]' : ''}`}>
                        <path d="M0 0C0 0 100 0 150 0C200 0 180 80 200 80C180 80 0 80 0 80V0Z" fill="white"></path>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Products Grid */}
        <div className="mb-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-background backdrop-blur-xl rounded-3xl p-6 border border-emerald-200 h-[400px] flex flex-col animate-pulse">
                  <div className="mb-4">
                    <div className="w-full h-20 bg-gray-300 rounded-2xl"></div>
                  </div>
                  <div className="flex-grow flex flex-col">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="flex-grow"></div>
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
              {displayProducts.map((product) => (
                <div key={product.id} className="group relative bg-background backdrop-blur-xl rounded-3xl p-6 border border-emerald-200 hover:border-emerald-300 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 h-[400px] flex flex-col">
                  <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Image Section */}
                    <div className="mb-4">
                      {product.images && product.images.length > 0 ? (
                        <div className="relative overflow-hidden rounded-2xl">
                          <img
                            src={product.images[0].src}
                            alt={product.images[0].alt || product.name}
                            className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Sale Badge */}
                          {product.on_sale && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                              SALE!
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-emerald-500/30">
                          <div className="text-center">
                            <svg className="w-8 h-8 text-emerald-500/50 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                            </svg>
                            <span className="text-emerald-500/50 text-xs font-medium">No Image</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section - Flexible */}
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center line-clamp-2">{product.name}</h3>
                      
                      {/* Rating Stars */}
                      <div className="flex justify-center items-center mb-4 flex-grow">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                          <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                        </div>
                      </div>
                      
                      {/* Price Section */}
                      <div className="text-center mb-4">
                        {product.on_sale ? (
                          <>
                            <span className="text-2xl font-bold text-emerald-600">${product.sale_price}</span>
                            <span className="text-gray-500 line-through ml-2">/month</span>
                            <div className="text-sm text-gray-500">vs ${product.regular_price}/month</div>
                          </>
                        ) : (
                          <>
                            <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
                            <span className="text-gray-500 line-through ml-2">/month</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Button Section - Always at bottom */}
                    <div className="mt-auto">
                      <Link href={`/${product.slug}`} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold text-center block hover:bg-emerald-700 transition-all duration-300 transform group-hover:scale-105">
                        Explore Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Products Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No products found in this category. Please try selecting a different category.
              </p>
            </div>
          )}
        </div>

        {/* Empty State */}
        {!loading && displayProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              No products available in this category at the moment.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300"
            >
              Browse All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}

        {/* View All Products Button */}
        {!loading && displayProducts.length > 0 && (
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
