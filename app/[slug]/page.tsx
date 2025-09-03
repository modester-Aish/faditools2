import { Metadata } from 'next'
import { wooCommerceService } from '@/lib/woocommerce-service'
import ProductDetail from '@/components/ProductDetail'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { Product } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'
import Header from '@/components/Header'
import { fetchPostBySlug, fetchPageBySlug } from '@/lib/api'
import { WordPressPost, WordPressPage } from '@/types'
import Image from 'next/image'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // First try to find a blog post
    const blogPost = await fetchPostBySlug(params.slug)
    
    if (blogPost) {
      const title = blogPost.title.rendered
      const description = blogPost.excerpt?.rendered 
        ? blogPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160)
        : 'Read this blog post on FadiTools'
      
      return {
        title: `${title} - FadiTools Blog`,
        description,
        openGraph: {
          title,
          description,
          url: `https://faditools.com/${params.slug}`,
          siteName: 'FadiTools',
          locale: 'en_US',
          type: 'article',
          publishedTime: blogPost.date,
          modifiedTime: blogPost.modified,
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
        },
        alternates: {
          canonical: generateCanonicalUrl(`/${params.slug}`),
        },
        robots: { index: true, follow: true },
      }
    }
    
    // If not a blog post, try to find a page
    const page = await fetchPageBySlug(params.slug)
    
    if (page) {
      const title = page.title.rendered
      const description = page.excerpt?.rendered 
        ? page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160)
        : 'Read this page on FadiTools'
      
      return {
        title: `${title} - FadiTools`,
        description,
        openGraph: {
          title,
          description,
          url: `https://faditools.com/${params.slug}`,
          siteName: 'FadiTools',
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
        },
        alternates: {
          canonical: generateCanonicalUrl(`/${params.slug}`),
        },
        robots: { index: true, follow: true },
      }
    }
    
    // If not a page, try to find a product
    const wooCommerceData = await wooCommerceService.getWooCommerceData()
    const product = wooCommerceData.products.find((p: WooCommerceProduct) => p.slug === params.slug)
    
    if (!product) {
      return {
        title: 'Page Not Found | FadiTools',
        description: 'The requested page could not be found.',
        robots: {
          index: false,
          follow: false,
        }
      }
    }
    
    const title = `${product.name} - ${product.price} | FadiTools`
    const description = product.short_description || product.description
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://faditools.com/${product.slug}`,
        siteName: 'FadiTools',
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: generateCanonicalUrl(`/${product.slug}`),
      },
      robots: { index: true, follow: true },
      keywords: [product.name, 'digital products', 'online shopping', 'ecommerce'],
    }
  } catch (error) {
    return {
      title: 'Page | FadiTools',
      description: 'Page details',
    }
  }
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  try {
    // First try to find a blog post
    const blogPost = await fetchPostBySlug(params.slug)
    
    if (blogPost) {
      // Render blog post
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }

      const getReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.replace(/<[^>]*>/g, '').split(' ').length
        return Math.ceil(words / wordsPerMinute)
      }

      const getFeaturedImageUrl = (post: WordPressPost): string | null => {
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
          const media = post._embedded['wp:featuredmedia'][0]
          return media.source_url || media.guid?.rendered || null
        }
        return null
      }

      return (
        <div className="min-h-screen bg-[#FFFFFF]">
          <Header />
          
          <div className="pt-16">
            {/* Hero Section */}
            <div className="relative bg-primary-500 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 text-white">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Blog Post
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {blogPost.title.rendered}
                  </h1>
                  <div className="flex items-center justify-center space-x-4 text-sm text-white/80">
                    <span>{formatDate(blogPost.date)}</span>
                    <span>•</span>
                    <span>{getReadingTime(blogPost.content.rendered)} min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {getFeaturedImageUrl(blogPost) && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={getFeaturedImageUrl(blogPost)!}
                    alt={blogPost.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Three Column Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Sidebar - Table of Contents */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Table of Contents
                      </h3>
                      
                      {(() => {
                        // Function to extract headings from content
                        const extractHeadings = (content: string) => {
                          const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/g
                          const headings: Array<{ level: number; text: string; id: string }> = []
                          let match

                          while ((match = headingRegex.exec(content)) !== null) {
                            const level = parseInt(match[1])
                            const text = match[2].replace(/<[^>]*>/g, '') // Remove HTML tags
                            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                            
                            headings.push({ level, text, id })
                          }

                          return headings
                        }

                        const headings = extractHeadings(blogPost.content.rendered)

                        if (headings.length > 0) {
                          return (
                            <nav className="space-y-2">
                              {headings.map((heading, index) => (
                                <a
                                  key={index}
                                  href={`#${heading.id}`}
                                  className={`block text-sm hover:text-primary-500 transition-colors ${
                                    heading.level === 1 ? 'font-semibold text-gray-900' :
                                    heading.level === 2 ? 'font-medium text-gray-800 ml-2' :
                                    heading.level === 3 ? 'text-gray-700 ml-4' :
                                    heading.level === 4 ? 'text-gray-600 ml-6' :
                                    heading.level === 5 ? 'text-gray-500 ml-8' :
                                    'text-gray-400 ml-10'
                                  }`}
                                >
                                  {heading.text}
                                </a>
                              ))}
                            </nav>
                          )
                        } else {
                          return (
                            <div className="text-gray-500 text-sm">
                              No headings found in this post.
                            </div>
                          )
                        }
                      })()}
                    </div>
                  </div>
                </div>

                {/* Center - Main Content */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <article className="prose prose-lg max-w-none">
                    {/* Excerpt */}
                    {blogPost.excerpt?.rendered && (
                      <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mb-8">
                        <p className="text-lg text-gray-700 italic m-0">
                          {blogPost.excerpt.rendered.replace(/<[^>]*>/g, '')}
                        </p>
                      </div>
                    )}

                    {/* Main Content */}
                    <div 
                      className="text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: (() => {
                          // Function to add IDs to headings in content
                          const addHeadingIds = (content: string) => {
                            return content.replace(
                              /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/g,
                              (match, level, attrs, text) => {
                                const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                                return `<h${level}${attrs} id="${id}">${text}</h${level}>`
                              }
                            )
                          }
                          
                          return addHeadingIds(blogPost.content.rendered)
                        })()
                      }}
                    />
                  </article>
                </div>

                {/* Right Sidebar - Related Posts */}
                <div className="lg:col-span-3 order-3">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Related Posts
                      </h3>
                      
                      {(() => {
                        // Function to get featured image URL
                        const getFeaturedImageUrl = (post: any): string | null => {
                          if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                            const media = post._embedded['wp:featuredmedia'][0]
                            return media.source_url || media.guid?.rendered || null
                          }
                          return null
                        }

                        // Function to format date
                        const formatDate = (dateString: string) => {
                          return new Date(dateString).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        }

                        // Function to get reading time
                        const getReadingTime = (content: string) => {
                          const wordsPerMinute = 200
                          const words = content.replace(/<[^>]*>/g, '').split(' ').length
                          return Math.ceil(words / wordsPerMinute)
                        }

                        // For now, show a message that related posts will be loaded
                        // In a real implementation, you would fetch posts here
                        return (
                          <div className="space-y-4">
                            <div className="text-gray-500 text-sm text-center py-4">
                              Related posts will be loaded here.
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-200">
                              <a
                                href="/blog"
                                className="block w-full text-center px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                              >
                                View All Posts
                              </a>
                            </div>
                          </div>
                        )

                                                // This section will be populated with real related posts
                        // For now, showing a placeholder
                        return null
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <article className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogPost.content.rendered }}
                />
              </article>
            </div>

            {/* Back to Blog Button */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <a
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blog
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    // If not a blog post, try to find a page
    const page = await fetchPageBySlug(params.slug)
    
    if (page) {
      // Render page with beautiful 3-column layout
      const getFeaturedImageUrl = (page: WordPressPage): string | null => {
        if (page._embedded && page._embedded['wp:featuredmedia'] && page._embedded['wp:featuredmedia'][0]) {
          const media = page._embedded['wp:featuredmedia'][0]
          return media.source_url || media.guid?.rendered || null
        }
        return null
      }

      // Function to extract headings for table of contents
      const extractHeadings = (content: string) => {
        const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/g
        const headings: Array<{ level: number; text: string; id: string }> = []
        let match

        while ((match = headingRegex.exec(content)) !== null) {
          const level = parseInt(match[1])
          const text = match[2].replace(/<[^>]*>/g, '') // Remove HTML tags
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
          
          headings.push({ level, text, id })
        }

        return headings
      }

      // Function to add IDs to headings in content
      const addHeadingIds = (content: string) => {
        return content.replace(
          /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/g,
          (match, level, attrs, text) => {
            const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
            return `<h${level}${attrs} id="${id}">${text}</h${level}>`
          }
        )
      }

      // Extract headings and add IDs to content
      const headings = extractHeadings(page.content.rendered)
      const contentWithIds = addHeadingIds(page.content.rendered)

      // Debug: Log page data and headings
      console.log('Page Data:', {
        title: page.title.rendered,
        content: page.content.rendered.substring(0, 200) + '...',
        headings: headings,
        headingsCount: headings.length
      })

      // Get recommended products for left sidebar
      const wooCommerceData = await wooCommerceService.getWooCommerceData()
      const recommendedProducts = wooCommerceData.products.slice(0, 6) // Show 6 products

      return (
        <div className="min-h-screen bg-[#FFFFFF]">
          <Header />
          
          <div className="pt-16">
            {/* Hero Section */}
            <div className="relative bg-primary-500 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 text-white">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Page
                  </div>
                  <h1 className="text-4xl md:text-4xl font-bold mb-4 leading-tight">
                    {page.title.rendered}
                  </h1>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {getFeaturedImageUrl(page) && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={getFeaturedImageUrl(page)!}
                    alt={page.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Three Column Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Sidebar - Recommended Products */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Recommended Products
                      </h3>
                      
                      <div className="space-y-4">
                        {recommendedProducts.map((product: any) => (
                          <div key={product.id} className="group">
                            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              {product.images && product.images[0] && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={product.images[0].src}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-500 transition-colors">
                                  {product.name}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  {product.on_sale && product.sale_price ? (
                                    <>
                                      <span className="text-sm font-bold text-primary-500">
                                        ${product.sale_price}
                                      </span>
                                      <span className="text-xs text-gray-500 line-through">
                                        ${product.regular_price}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-sm font-bold text-primary-500">
                                      ${product.price || product.regular_price}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <a
                          href="/products"
                          className="block w-full text-center px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          View All Products
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center - Main Content */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <article className="prose prose-lg max-w-none">
                    {/* Excerpt */}
                    {page.excerpt?.rendered && (
                      <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mb-8">
                        <p className="text-lg text-gray-700 italic m-0">
                          {page.excerpt.rendered.replace(/<[^>]*>/g, '')}
                        </p>
                      </div>
                    )}

                    {/* Main Content */}
                    <div 
                      className="text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: (() => {
                          // Function to add IDs to headings in content
                          const addHeadingIds = (content: string) => {
                            return content.replace(
                              /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/g,
                              (match, level, attrs, text) => {
                                const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                                return `<h${level}${attrs} id="${id}">${text}</h${level}>`
                              }
                            )
                          }
                          
                          // Add IDs to content and log for debugging
                          const processedContent = addHeadingIds(page.content.rendered)
                          console.log('Processed Content with IDs:', processedContent.substring(0, 300) + '...')
                          
                          return processedContent
                        })()
                      }}
                    />
                  </article>
                </div>

                {/* Right Sidebar - Table of Contents */}
                <div className="lg:col-span-3 order-3">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Table of Contents
                      </h3>
                      
                      {(() => {
                        // Debug: Show headings info
                        console.log('Table of Contents Debug:', {
                          headings: headings,
                          headingsLength: headings.length,
                          hasHeadings: headings.length > 0
                        })

                        if (headings.length > 0) {
                          return (
                            <nav className="space-y-2">
                              {headings.map((heading, index) => (
                                <a
                                  key={index}
                                  href={`#${heading.id}`}
                                  className={`block text-sm hover:text-primary-500 transition-colors ${
                                    heading.level === 1 ? 'font-semibold text-gray-900' :
                                    heading.level === 2 ? 'font-medium text-gray-800 ml-2' :
                                    heading.level === 3 ? 'text-gray-700 ml-4' :
                                    heading.level === 4 ? 'text-gray-600 ml-6' :
                                    heading.level === 5 ? 'text-gray-500 ml-8' :
                                    'text-gray-400 ml-10'
                                  }`}
                                >
                                  {heading.text}
                                </a>
                              ))}
                            </nav>
                          )
                        } else {
                          return (
                            <div className="space-y-2">
                              <div className="text-gray-500 text-sm">
                                No headings found in this page.
                              </div>
                              <div className="text-xs text-gray-400">
                                Debug: {headings.length} headings detected
                              </div>
                              <div className="text-xs text-gray-400">
                                Content preview: {page.content.rendered.substring(0, 100)}...
                              </div>
                            </div>
                          )
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    // If not a page, try to find a product
    const wooCommerceData = await wooCommerceService.getWooCommerceData()
    const product = wooCommerceData.products.find((p: WooCommerceProduct) => p.slug === params.slug)
    
    if (!product) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Page Not Found</h3>
            <p className="text-sm text-gray-500 mb-4">The requested page could not be found.</p>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go Home
            </a>
          </div>
        </div>
      )
    }

    // Convert WooCommerce product to Product format
    const productData: Product = {
      id: product.id,
      date: product.date_created,
      modified: product.date_modified,
      slug: product.slug,
      status: product.status as any,
      link: product.permalink,
      title: { rendered: product.name },
      content: { rendered: product.description },
      excerpt: { rendered: product.short_description },
      featured_media: product.images?.[0]?.id || 0,
      // WooCommerce specific fields
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      stock_status: product.stock_status,
      stock_quantity: product.stock_quantity,
      images: product.images,
      attributes: product.attributes,
      // Extract affiliate link from WooCommerce external product URL
      affiliate_link: product.external_url || undefined,
      // Additional fields
      categories: product.categories.map(cat => cat.id),
      tags: product.tags.map(tag => tag.id),
      meta: {
        sku: product.sku,
        total_sales: product.total_sales,
        average_rating: product.average_rating,
        rating_count: product.rating_count,
        featured: product.featured,
        virtual: product.virtual,
        downloadable: product.downloadable,
        weight: product.weight,
        dimensions: product.dimensions,
        manage_stock: product.manage_stock,
        stock_quantity: product.stock_quantity,
        backorders: product.backorders,
        sold_individually: product.sold_individually,
        purchase_note: product.purchase_note,
        reviews_allowed: product.reviews_allowed,
        upsell_ids: product.upsell_ids,
        cross_sell_ids: product.cross_sell_ids,
        parent_id: product.parent_id,
        grouped_products: product.grouped_products,
        menu_order: product.menu_order
      }
    } as any

    // Get related products (products in same category)
    const relatedProducts = wooCommerceData.products
      .filter((p: WooCommerceProduct) => 
        p.id !== product.id && 
        p.categories.some(cat => 
          product.categories.some(prodCat => prodCat.id === cat.id)
        )
      )
      .slice(0, 4)
      .map((relatedProduct: WooCommerceProduct) => ({
        id: relatedProduct.id,
        date: relatedProduct.date_created,
        modified: relatedProduct.date_modified,
        slug: relatedProduct.slug,
        status: relatedProduct.status as any,
        link: relatedProduct.permalink,
        title: { rendered: relatedProduct.name },
        content: { rendered: relatedProduct.description },
        excerpt: { rendered: relatedProduct.short_description },
        featured_media: relatedProduct.images?.[0]?.id || 0,
        price: relatedProduct.price,
        regular_price: relatedProduct.regular_price,
        sale_price: relatedProduct.sale_price,
        on_sale: relatedProduct.on_sale,
        stock_status: relatedProduct.stock_status,
        stock_quantity: relatedProduct.stock_quantity,
        images: relatedProduct.images,
        attributes: relatedProduct.attributes,
        // Extract affiliate link from WooCommerce external product URL
        affiliate_link: relatedProduct.external_url || undefined,
        categories: relatedProduct.categories.map(cat => cat.id),
        tags: relatedProduct.tags.map(tag => tag.id),
        meta: {
          sku: relatedProduct.sku,
          total_sales: relatedProduct.total_sales,
          average_rating: relatedProduct.average_rating,
          rating_count: relatedProduct.rating_count,
          featured: relatedProduct.featured,
          virtual: relatedProduct.virtual,
          downloadable: relatedProduct.downloadable,
          weight: relatedProduct.weight,
          dimensions: relatedProduct.dimensions,
          manage_stock: relatedProduct.manage_stock,
          stock_quantity: relatedProduct.stock_quantity,
          backorders: relatedProduct.backorders,
          sold_individually: relatedProduct.sold_individually,
          purchase_note: relatedProduct.purchase_note,
          reviews_allowed: relatedProduct.reviews_allowed,
          upsell_ids: relatedProduct.upsell_ids,
          cross_sell_ids: relatedProduct.cross_sell_ids,
          parent_id: relatedProduct.parent_id,
          grouped_products: relatedProduct.grouped_products,
          menu_order: relatedProduct.menu_order
        }
      })) as any[]

    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Product Detail Section */}
        <div>
          <ProductDetail 
            product={productData} 
            relatedProducts={relatedProducts}
          />
        </div>
        
        {/* Footer */}
        <footer className="bg-secondary-800 text-white py-12">
          <div className="container mx-auto px-4 text-center">
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
    
  } catch (error) {
    console.error('Error fetching product:', error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Product</h3>
          <p className="text-sm text-gray-500 mb-4">There was an error loading the product. Please try again.</p>
          <a
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Products
          </a>
        </div>
      </div>
    )
  }
}
