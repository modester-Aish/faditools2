import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import { Product } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fetchPostBySlug, fetchPageBySlug, fetchBlogPosts, fetchSEOBySlug, fetchProductBySlug, fetchProducts } from '@/lib/local-wp'
import { getToolBySlug, getTools } from '@/lib/api'
import { WordPressPost, WordPressPage } from '@/types'
import { getPopularToolBySlug, getAllPopularTools } from '@/data/popular-tools'
import ToolDetail from '@/components/ToolDetail'
import Image from 'next/image'
import Link from 'next/link'
import { generateSchemaGraph, getOrganizationEntity, getWebSiteEntity, getBreadcrumbEntity, getProductEntity, generateOrganizationSchema, generateWebSiteSchema, generateBreadcrumbSchema } from '@/components/StructuredData'
import { SEO_CONFIG } from '@/lib/seo-config'

// Runtime reads local JSON (synced by script)
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // First try to find a blog post
    const blogPost = await fetchPostBySlug(params.slug)
    
    if (blogPost) {
      const seo = (blogPost as any).seo
      const title = seo?.title || blogPost.title.rendered
      const uniqueDescription =
        seo?.description ||
        (blogPost.excerpt?.rendered
          ? `${blogPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 155)}`
          : `Read this blog post - ${title}`)
      
      return {
        title: seo?.title ? title : `${title} | Blog`,
        description: uniqueDescription,
        openGraph: {
          title,
          description: uniqueDescription,
          url: `https://faditools.com/${params.slug}`,
          locale: 'en_US',
          type: 'article',
          publishedTime: blogPost.date,
          modifiedTime: (blogPost as any).modified,
          images: [SEO_CONFIG.defaultOgImage],
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
      const seo = (page as any).seo
      const title = seo?.title || page.title.rendered
      const uniqueDescription =
        seo?.description ||
        (page.excerpt?.rendered
          ? `${page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 155)}`
          : `Read this page - ${title}`)
      
      return {
        title,
        description: uniqueDescription,
        openGraph: {
          title,
          description: uniqueDescription,
          url: `https://faditools.com/${params.slug}`,
          locale: 'en_US',
          type: 'website',
          images: [SEO_CONFIG.defaultOgImage],
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
      const title = `${popularTool.name} Group Buy 2025 - ${popularTool.price} | Save ${savingsPercent}%`
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
          locale: 'en_US',
          type: 'website',
          images: [SEO_CONFIG.defaultOgImage],
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
      const title = `${tool.name} Group Buy 2025 - ${tool.price}/${tool.period} | Save 90%`
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
          locale: 'en_US',
          type: 'website',
          images: [SEO_CONFIG.defaultOgImage],
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
    
    // If not a tool, try to find a product (local JSON)
    console.log(`🔍 [METADATA] Loading product metadata for: ${params.slug}`)
    const product = await fetchProductBySlug(params.slug)
    
    if (!product) {
      console.log(`❌ [METADATA] Product not found: ${params.slug}`)
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.',
        robots: {
          index: false,
          follow: false,
        }
      }
    }
    
    console.log(`✅ [METADATA] Product found: ${product.title?.rendered}`)
    
    const wpSeo = await fetchSEOBySlug(params.slug)
    const priceDisplay = product.price || 'affordable'
    const title =
      wpSeo?.title || `${product.title?.rendered || 'Product'} 2025 - Group Buy at ${priceDisplay}/mo | Save 90%`
    const uniqueDescription =
      wpSeo?.description ||
      (product.excerpt?.rendered
        ? `${product.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 155)}`
        : `Get ${product.title?.rendered || 'Product'} group buy access at ${priceDisplay}/month. Premium tool at 90% discount. Instant access.`)
    
    return {
      title,
      description: uniqueDescription,
      openGraph: {
        title,
        description: uniqueDescription,
        url: `https://faditools.com/${product.slug}`,
        locale: 'en_US',
        type: 'website',
        images: [SEO_CONFIG.defaultOgImage],
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
      keywords: [product.title?.rendered || 'Product', 'digital products', 'online shopping', 'ecommerce'],
    }
  } catch (error) {
    return {
      title: 'Page',
      description: 'Page details',
      openGraph: {
        title: 'Page',
        description: 'Page details',
        url: SEO_CONFIG.siteUrl,
        images: [SEO_CONFIG.defaultOgImage],
      },
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
                  <article className="max-w-none">
                    <div 
                      className="wordpress-content"
                      dangerouslySetInnerHTML={{ 
                        __html: (() => {
                          const downgradeContentH1ToH2 = (html: string) =>
                            html.replace(/<h1/gi, '<h2').replace(/<\/h1>/gi, '</h2>')
                          const addHeadingIds = (content: string) => {
                            return content.replace(
                              /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/g,
                              (match, level, attrs, text) => {
                                const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                                return `<h${level}${attrs} id="${id}">${text}</h${level}>`
                              }
                            )
                          }
                          return addHeadingIds(downgradeContentH1ToH2(blogPost.content.rendered))
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
          
          <Footer />
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

      const downgradeContentH1ToH2 = (html: string) =>
        html.replace(/<h1/gi, '<h2').replace(/<\/h1>/gi, '</h2>')
      /** Remove duplicate title (first h2 matching page title) and "Last updated" paragraph from start of content */
      const stripLeadingTitleAndDate = (html: string, pageTitle: string) => {
        const titleClean = pageTitle.replace(/<[^>]*>/g, '').trim()
        if (!titleClean) return html
        let out = html
        const h2TitleRegex = new RegExp(`<h2[^>]*>\\s*${titleClean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</h2>\\s*`, 'i')
        out = out.replace(h2TitleRegex, '')
        out = out.replace(/^\s*<p[^>]*>\s*Last updated:\s*[^<]*<\/p>\s*/i, '')
        return out.trim()
      }
      const addHeadingIds = (content: string) => {
        return content.replace(
          /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/g,
          (match, level, attrs, text) => {
            const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
            return `<h${level}${attrs} id="${id}">${text}</h${level}>`
          }
        )
      }

      const pageContentNoH1 = downgradeContentH1ToH2(page.content.rendered)
      const pageContentStripped = stripLeadingTitleAndDate(pageContentNoH1, page.title?.rendered || '')
      const headings = extractHeadings(pageContentStripped)
      const contentWithIds = addHeadingIds(pageContentStripped)

      // Debug: Log page data and headings
      console.log('Page Data:', {
        title: page.title.rendered,
        content: page.content.rendered.substring(0, 200) + '...',
        headings: headings,
        headingsCount: headings.length
      })

      // Get recommended products for left sidebar (local JSON)
      const allProducts = await fetchProducts()
      const recommendedProducts = allProducts.slice(0, 6).map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.title?.rendered || '',
        images: p.images || [],
        on_sale: p.on_sale,
        sale_price: p.sale_price,
        regular_price: p.regular_price,
        price: p.price,
      }))

      // Generate schema markup for page
      const pageSchema = [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateBreadcrumbSchema([
          { name: 'Home', url: 'https://faditools.com' },
          { name: page.title.rendered, url: `https://faditools.com/${params.slug}` }
        ]),
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": page.title.rendered,
          "description": page.excerpt?.rendered?.replace(/<[^>]*>/g, '') || page.title.rendered,
          "url": `https://faditools.com/${params.slug}`,
          "inLanguage": "en-US",
          "isPartOf": {
            "@type": "WebSite",
            "name": "FadiTools",
            "url": "https://faditools.com"
          }
        }
      ]

      return (
        <div className="min-h-screen bg-[#FFFFFF]">
          {/* Schema Markup */}
          {pageSchema.map((schema, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema, null, 0)
              }}
            />
          ))}
          <Header />
          
          <div className="pt-16">
            {/* Hero Section - sirf page name (title), baaki sab niche content me */}
            <div className="relative bg-primary-500 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Page
                </div>
                <h1 className="text-4xl md:text-4xl font-bold leading-tight">
                  {page.title.rendered}
                </h1>
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
                  <article className="max-w-none">
                    {/* Main Content only (no separate excerpt box to avoid duplicate text) */}
                    <div 
                      className="wordpress-content"
                      dangerouslySetInnerHTML={{ __html: contentWithIds }}
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
          
          <Footer />
        </div>
      )
    }
    
    // If not a page, try to find a tool (check popular tools first)
    console.log(`🔍 [COMPONENT] Checking for tool: ${params.slug}`)
    const popularTool = getPopularToolBySlug(params.slug)
    
    if (popularTool) {
      // Related tools: hamesha 8 dikhane ke liye (pehle same category, phir baaki se fill)
      const allPopularTools = getAllPopularTools()
      const others = allPopularTools.filter((tool) => tool.id !== popularTool.id)
      const sameCategory = others.filter((t) => t.category === popularTool.category)
      const rest = others.filter((t) => t.category !== popularTool.category)
      const relatedTools = [...sameCategory, ...rest].slice(0, 8)

      // Single @graph: Organization, WebSite, Breadcrumb, Product (no duplicate, full description)
      const toolGraph = generateSchemaGraph([
        getOrganizationEntity(),
        getWebSiteEntity(),
        getBreadcrumbEntity([
          { name: 'Home', url: 'https://faditools.com' },
          { name: popularTool.name, url: `https://faditools.com/${popularTool.slug}` }
        ]),
        getProductEntity({
          name: popularTool.name,
          description: (popularTool.longDescription || popularTool.description || '').replace(/\s+/g, ' ').trim() || popularTool.name,
          slug: popularTool.slug,
          price: popularTool.price.replace(/[^0-9.]/g, '') || popularTool.price,
          originalPrice: popularTool.originalPrice,
          image: popularTool.image?.startsWith('http') ? popularTool.image : (popularTool.image ? `https://faditools.com${popularTool.image.startsWith('/') ? '' : '/'}${popularTool.image}` : undefined),
          category: 'SEO Tools',
        }),
      ])
      
      return (
        <div className="min-h-screen bg-[#FFFFFF]">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolGraph, null, 0) }} />
          <Header />
          <ToolDetail 
            tool={popularTool}
            relatedTools={relatedTools}
          />
          <Footer />
        </div>
      )
    }
    
    // Try regular tool API
    const tool = await getToolBySlug(params.slug)
    
    if (tool) {
      // Related tools: hamesha 8 dikhane ke liye
      const allTools = await getTools()
      const relatedTools = allTools
        .filter((t) => t.id !== tool.id)
        .slice(0, 8)
      
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

      // Single @graph for API tool page
      const apiToolGraph = generateSchemaGraph([
        getOrganizationEntity(),
        getWebSiteEntity(),
        getBreadcrumbEntity([
          { name: 'Home', url: 'https://faditools.com' },
          { name: popularToolFormat.name, url: `https://faditools.com/${popularToolFormat.slug}` }
        ]),
        getProductEntity({
          name: popularToolFormat.name,
          description: (popularToolFormat.longDescription || popularToolFormat.description || '').replace(/\s+/g, ' ').trim() || popularToolFormat.name,
          slug: popularToolFormat.slug,
          price: popularToolFormat.price.replace(/[^0-9.]/g, '') || popularToolFormat.price,
          originalPrice: popularToolFormat.originalPrice,
          image: popularToolFormat.image?.startsWith('http') ? popularToolFormat.image : (popularToolFormat.image ? `https://faditools.com${popularToolFormat.image.startsWith('/') ? '' : '/'}${popularToolFormat.image}` : undefined),
          category: 'SEO Tools',
        }),
      ])
      
      return (
        <div className="min-h-screen bg-[#FFFFFF]">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apiToolGraph, null, 0) }} />
          <Header />
          <ToolDetail tool={popularToolFormat} relatedTools={relatedToolsFormatted} />
          <Footer />
        </div>
      )
    }
    
    // If not a tool, try to find a product (local JSON)
    console.log(`🔍 [COMPONENT] Loading product for rendering: ${params.slug}`)
    const productData = await fetchProductBySlug(params.slug)
    
    if (!productData) {
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

    // Related products: hamesha 8 dikhane ke liye (pehle same category, phir baaki se fill)
    const allProducts = await fetchProducts()
    const others = allProducts.filter(p => p.slug !== productData.slug)
    const firstCategoryId = Array.isArray(productData.categories) ? productData.categories[0] : undefined
    const sameCategory = firstCategoryId
      ? others.filter(p => Array.isArray(p.categories) && p.categories.includes(firstCategoryId))
      : []
    const rest = others.filter(p => !sameCategory.includes(p))
    const relatedProducts = [...sameCategory, ...rest].slice(0, 8)

    // Single @graph: Organization, WebSite, Breadcrumb, Product (full description, image required)
    const productDesc = (productData.excerpt?.rendered || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const productGraph = generateSchemaGraph([
      getOrganizationEntity(),
      getWebSiteEntity(),
      getBreadcrumbEntity([
        { name: 'Home', url: 'https://faditools.com' },
        { name: 'Products', url: 'https://faditools.com/products' },
        { name: productData.title?.rendered || 'Product', url: `https://faditools.com/${productData.slug}` }
      ]),
      getProductEntity({
        name: productData.title?.rendered || 'Product',
        description: productDesc || (productData.title?.rendered || 'Product'),
        slug: productData.slug,
        price: productData.price,
        image: productData.images?.[0]?.src,
        availability: productData.stock_status === 'outofstock' ? 'outofstock' : undefined,
        category: 'SEO Tools',
      }),
    ])

    return (
      <div className="min-h-screen bg-background">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productGraph, null, 0) }} />
        <Header />
        
        {/* Product Detail Section */}
        <div>
          <ProductDetail 
            product={productData} 
            relatedProducts={relatedProducts}
          />
        </div>
        
        <Footer />
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
