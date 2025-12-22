import { Metadata } from 'next'
import { wooCommerceService } from '@/lib/woocommerce-service'
import ProductDetail from '@/components/ProductDetail'
import { WooCommerceProduct } from '@/lib/woocommerce-api'
import { loadProductBySlug, loadRelatedProducts } from '@/lib/static-product-detail'
import { Product } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'
import Header from '@/components/Header'
import { fetchPostBySlug, fetchPageBySlug, fetchBlogPosts, getToolBySlug, getTools } from '@/lib/api'
import { WordPressPost, WordPressPage } from '@/types'
import { getPopularToolBySlug, getAllPopularTools } from '@/data/popular-tools'
import ToolDetail from '@/components/ToolDetail'
import Image from 'next/image'
import Link from 'next/link'

// Enable ISR for product detail pages - revalidate every 6 hours
export const revalidate = 21600 // 6 hours

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // First try to find a blog post
    const blogPost = await fetchPostBySlug(params.slug)
    
    if (blogPost) {
      const title = blogPost.title.rendered
      const blogUniqueId = blogPost.id || params.slug || ''
      const uniqueDescription = blogPost.excerpt?.rendered 
        ? `${blogPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 155)} | FadiTools Blog`
        : `Read this blog post on FadiTools - ${title}`
      
      return {
        title: `${title} - FadiTools Blog`,
        description: uniqueDescription,
        openGraph: {
          title,
          description: uniqueDescription,
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
          description: uniqueDescription,
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
      const pageUniqueId = page.id || params.slug || ''
      const uniqueDescription = page.excerpt?.rendered 
        ? `${page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 155)} | FadiTools`
        : `Read this page on FadiTools - ${title}`
      
      return {
        title: `${title} - FadiTools`,
        description: uniqueDescription,
        openGraph: {
          title,
          description: uniqueDescription,
          url: `https://faditools.com/${params.slug}`,
          siteName: 'FadiTools',
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description: uniqueDescription,
        },
        alternates: {
          canonical: generateCanonicalUrl(`/${params.slug}`),
        },
        robots: { index: true, follow: true },
      }
    }
    
    // If not a page, try to find a tool (check popular tools first)
    console.log(`🔍 [METADATA] Checking for tool: ${params.slug}`)
    const popularTool = getPopularToolBySlug(params.slug)
    
    if (popularTool) {
      const savingsPercent = Math.round(((parseFloat(popularTool.originalPrice.replace('$', '')) - parseFloat(popularTool.price.replace('$', ''))) / parseFloat(popularTool.originalPrice.replace('$', ''))) * 100)
      const title = `${popularTool.name} Group Buy 2025 - ${popularTool.price} | Save ${savingsPercent}% | FadiTools`
      const uniqueDescription = popularTool.longDescription 
        ? `${popularTool.longDescription.substring(0, 120)} Get instant group buy access at ${popularTool.price}. Premium tool for agencies, marketers & businesses. 99% uptime guaranteed.`
        : `${popularTool.description} Get instant group buy access at ${popularTool.price}. Premium tool at 90% discount. Instant access, 99% uptime. Perfect for agencies, marketers & businesses.`
      
      return {
        title,
        description: uniqueDescription,
        openGraph: {
          title,
          description: uniqueDescription,
          url: `https://faditools.com/${popularTool.slug}`,
          siteName: 'FadiTools',
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description: uniqueDescription,
        },
        alternates: {
          canonical: generateCanonicalUrl(`/${popularTool.slug}`),
        },
        robots: { index: true, follow: true },
        keywords: [popularTool.name, 'digital marketing', 'SEO', 'tools', 'marketing software', popularTool.category || ''],
      }
    }
    
    // Try regular tool API
    const tool = await getToolBySlug(params.slug)
    
    if (tool) {
      const title = `${tool.name} Group Buy 2025 - ${tool.price}/${tool.period} | Save 90% | FadiTools`
      const uniqueDescription = tool.description 
        ? `${tool.description.substring(0, 120)} Get instant group buy access at ${tool.price}/${tool.period}. Premium tool for agencies, marketers & businesses. 99% uptime guaranteed.`
        : `Get ${tool.name} group buy access at ${tool.price}/${tool.period}. Premium SEO tool at 90% discount. Instant access, 99% uptime. Perfect for agencies, marketers & businesses.`
      
      return {
        title,
        description: uniqueDescription,
        openGraph: {
          title,
          description: uniqueDescription,
          url: `https://faditools.com/${tool.slug || tool.id}`,
          siteName: 'FadiTools',
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description: uniqueDescription,
        },
        alternates: {
          canonical: generateCanonicalUrl(`/${tool.slug || tool.id}`),
        },
        robots: { index: true, follow: true },
        keywords: [tool.name, 'digital marketing', 'SEO', 'tools', 'marketing software'],
      }
    }
    
    // If not a tool, try to find a product (ULTRA-FAST static loading!)
    console.log(`🔍 [METADATA] Loading product metadata for: ${params.slug}`)
    const product = await loadProductBySlug(params.slug)
    
    if (!product) {
      console.log(`❌ [METADATA] Product not found: ${params.slug}`)
      return {
        title: 'Page Not Found | FadiTools',
        description: 'The requested page could not be found.',
        robots: {
          index: false,
          follow: false,
        }
      }
    }
    
    console.log(`✅ [METADATA] Product found: ${product.name}`)
    
    // SEO-optimized title with trending keywords - unique per product using ID
    const uniqueIdentifier = product.id || product.slug || ''
    const priceDisplay = product.price || 'affordable'
    const title = `${product.name} 2025 - Group Buy at ${priceDisplay}/mo | Save 90% | FadiTools`
    const uniqueDescription = product.short_description 
      ? `${product.short_description.replace(/<[^>]*>/g, '').substring(0, 120)} Get instant group buy access at ${priceDisplay}/month. Premium tool for agencies, marketers & businesses. 99% uptime guaranteed.`
      : `Get ${product.name} group buy access at ${priceDisplay}/month. Premium SEO tool at 90% discount. Instant access, 99% uptime. Perfect for agencies & businesses.`
    
    return {
      title,
      description: uniqueDescription,
      openGraph: {
        title,
        description: uniqueDescription,
        url: `https://faditools.com/${product.slug}`,
        siteName: 'FadiTools',
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: uniqueDescription,
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

// Helper function to extract affiliate link from meta_data
function getAffiliateLinkFromMeta(meta_data: any[]): string | undefined {
  if (!meta_data || !Array.isArray(meta_data)) return undefined;
  
  const affiliateMeta = meta_data.find(meta => meta.key === 'affiliate_link');
  return affiliateMeta?.value || undefined;
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  try {
    // First try to find a blog post
    const blogPost = await fetchPostBySlug(params.slug)
    
    if (blogPost) {
      // Fetch all blog posts for related posts
      const allPosts = await fetchBlogPosts()
      const relatedPosts = allPosts
        .filter((post: WordPressPost) => post.id !== blogPost.id)
        .slice(0, 6)
      
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
            {/* Hero Section with Featured Image */}
            <div className="relative bg-primary-500 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Title and Details */}
                  <div className="text-left">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 text-white">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      Blog Post
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                      {blogPost.title.rendered}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-white/80 mb-4">
                      <span>{formatDate(blogPost.date)}</span>
                      <span>•</span>
                      <span>{getReadingTime(blogPost.content.rendered)} min read</span>
                    </div>
                    {/* Breadcrumbs */}
                    <div className="text-sm text-white/70">
                      <span>Blog</span>
                      <span className="mx-2">›</span>
                      <span>{blogPost.categories && blogPost.categories.length > 0 ? 'Category' : 'General'}</span>
                      <span className="mx-2">›</span>
                      <span className="text-white/90">{blogPost.title.rendered}</span>
                    </div>
                  </div>
                  
                  {/* Right Side - Featured Image */}
                  {getFeaturedImageUrl(blogPost) && (
                    <div className="relative">
                      <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={getFeaturedImageUrl(blogPost)!}
                          alt={blogPost.title.rendered}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

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

                        if (relatedPosts.length > 0) {
                          return (
                            <div className="space-y-4">
                              {relatedPosts.map((relatedPost: WordPressPost) => (
                                <article key={relatedPost.id} className="group">
                                  <a href={`/${relatedPost.slug}`} className="block">
                                    {/* Featured Image */}
                                    {getFeaturedImageUrl(relatedPost) && (
                                      <div className="relative h-32 mb-3 overflow-hidden rounded-lg">
                                        <Image
                                          src={getFeaturedImageUrl(relatedPost)!}
                                          alt={relatedPost.title.rendered}
                                          fill
                                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                      </div>
                                    )}
                                    
                                    {/* Content */}
                                    <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                                      {relatedPost.title.rendered}
                                    </h4>
                                    
                                    <div className="flex items-center text-xs text-gray-500 space-x-2">
                                      <span>{formatDate(relatedPost.date)}</span>
                                      <span>•</span>
                                      <span>{getReadingTime(relatedPost.content.rendered)} min read</span>
                                    </div>
                                  </a>
                                </article>
                              ))}
                            </div>
                          )
                        } else {
                          return (
                            <div className="text-gray-500 text-sm text-center py-4">
                              No related posts found.
                            </div>
                          )
                        }
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
          
          {/* Footer */}
          <footer className="bg-[#1A1A1A] text-white py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary-500 mb-4">FadiTools</h4>
                  <p className="text-gray-400 mb-4">Premium SEO tools made accessible. Save up to 90% on industry-leading tools.</p>
                  <div className="flex space-x-4">
                    <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </Link>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Tools</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">AHREF$</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">SEMRU$H</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Moz Pro</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">View All Tools</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Packages</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="#tool-packages" className="hover:text-primary-500 transition-colors">All Packages</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Medium Pack</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Heavy Pack</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Mega Pack</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Help Center</Link></li>
                    <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Contact Support</Link></li>
                    <li><Link href="/contact" className="hover:text-primary-500 transition-colors">System Status</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-primary-500/10 mt-8 pt-8 text-center text-gray-600">
                <p>&copy; 2024 FadiTools. All rights reserved.</p>
              </div>
            </div>
          </footer>
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
                          <Link key={product.id} href={`/${product.slug}`} className="block group">
                            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                              {product.images && product.images[0] && (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover group-hover:scale-105 transition-transform"
                                    loading="lazy"
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
                          </Link>
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
          
          {/* Footer */}
          <footer className="bg-[#1A1A1A] text-white py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary-500 mb-4">FadiTools</h4>
                  <p className="text-gray-400 mb-4">Premium SEO tools made accessible. Save up to 90% on industry-leading tools.</p>
                  <div className="flex space-x-4">
                    <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </Link>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Tools</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">AHREF$</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">SEMRU$H</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Moz Pro</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">View All Tools</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Packages</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="#tool-packages" className="hover:text-primary-500 transition-colors">All Packages</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Medium Pack</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Heavy Pack</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Mega Pack</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Help Center</Link></li>
                    <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Contact Support</Link></li>
                    <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">System Status</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-primary-500/10 mt-8 pt-8 text-center text-gray-600">
                <p>&copy; 2024 FadiTools. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )
    }
    
    // If not a page, try to find a tool (check popular tools first)
    console.log(`🔍 [COMPONENT] Checking for tool: ${params.slug}`)
    const popularTool = getPopularToolBySlug(params.slug)
    
    if (popularTool) {
      // Get all popular tools for related tools
      const allPopularTools = getAllPopularTools()
      const relatedTools = allPopularTools
        .filter((tool) => tool.id !== popularTool.id && tool.category === popularTool.category)
        .slice(0, 6)
      
      return (
        <div className="min-h-screen bg-[#FFFFFF]">
          <Header />
          <ToolDetail 
            tool={popularTool}
            relatedTools={relatedTools}
          />
        </div>
      )
    }
    
    // Try regular tool API
    const tool = await getToolBySlug(params.slug)
    
    if (tool) {
      // Convert Tool to PopularTool format for ToolDetail component
      const allTools = await getTools()
      const relatedTools = allTools
        .filter((t) => t.id !== tool.id)
        .slice(0, 6)
      
      // Convert regular tool to PopularTool format
      const popularToolFormat = {
        id: tool.id,
        name: tool.name,
        slug: tool.slug || tool.id,
        price: tool.price,
        originalPrice: `$${(parseFloat(tool.price.replace('$', '')) * 3).toFixed(2)}`,
        image: tool.icon,
        description: tool.description,
        longDescription: tool.description,
        category: 'SEO Tools',
        buyUrl: tool.buyUrl,
      }
      
      const relatedToolsFormatted = relatedTools.map(t => ({
        id: t.id,
        name: t.name,
        slug: t.slug || t.id,
        price: t.price,
        originalPrice: `$${(parseFloat(t.price.replace('$', '')) * 3).toFixed(2)}`,
        image: t.icon,
        description: t.description,
        longDescription: t.description,
        category: 'SEO Tools',
        buyUrl: t.buyUrl,
      }))
      
      return (
        <div className="min-h-screen bg-[#FFFFFF]">
          <Header />
          <ToolDetail tool={popularToolFormat} relatedTools={relatedToolsFormatted} />
        </div>
      )
    }
    
    // If not a tool, try to find a product (ULTRA-FAST static loading!)
    console.log(`🔍 [COMPONENT] Loading product for rendering: ${params.slug}`)
    const product = await loadProductBySlug(params.slug)
    
    if (!product) {
      console.log(`❌ [COMPONENT] Product not found: ${params.slug}`)
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
      // Extract affiliate link from WooCommerce external product URL or meta_data
      affiliate_link: product.external_url || getAffiliateLinkFromMeta(product.meta_data) || undefined,
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

    // Get related products from static data (ULTRA-FAST!)
    const relatedProductsData = await loadRelatedProducts(product.slug, 4)
    const relatedProducts = relatedProductsData.map((relatedProduct: WooCommerceProduct) => ({
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
        <footer className="bg-[#1A1A1A] text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-primary-500 mb-4">FadiTools</h4>
                <p className="text-gray-400 mb-4">Premium SEO tools made accessible. Save up to 90% on industry-leading tools.</p>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Tools</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">AHREF$</Link></li>
                  <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">SEMRU$H</Link></li>
                  <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Moz Pro</Link></li>
                  <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">View All Tools</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Packages</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#tool-packages" className="hover:text-primary-500 transition-colors">All Packages</Link></li>
                  <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Medium Pack</Link></li>
                  <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Heavy Pack</Link></li>
                  <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Mega Pack</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Help Center</Link></li>
                  <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Contact Support</Link></li>
                  <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">System Status</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-primary-500/10 mt-8 pt-8 text-center text-gray-600">
              <p>&copy; 2024 FadiTools. All rights reserved.</p>
            </div>
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
