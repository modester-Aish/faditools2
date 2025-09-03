import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchPostBySlug, fetchBlogPosts } from '@/lib/api'
import { WordPressPost } from '@/types'
import Header from '../../../components/Header'
import Image from 'next/image'
import { generateCanonicalUrl } from '@/lib/canonical'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params
  
  try {
    const post = await fetchPostBySlug(slug)
    if (!post) {
      return {
        title: 'Post Not Found - FadiTools',
        description: 'The requested blog post could not be found.',
      }
    }

    const title = post.title.rendered
    const description = post.excerpt?.rendered 
      ? post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160)
      : 'Read this blog post on FadiTools'

    return {
      title: `${title} - FadiTools Blog`,
      description,
      openGraph: {
        title,
        description,
        url: `https://faditools.com/blog/${slug}`,
        siteName: 'FadiTools',
        locale: 'en_US',
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.modified,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: generateCanonicalUrl(`/blog/${slug}`),
      },
      robots: { index: true, follow: true },
    }
  } catch (error) {
    return {
      title: 'Blog Post - FadiTools',
      description: 'Read our latest blog posts and insights.',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params
  
  try {
    const post = await fetchPostBySlug(slug)
    
    if (!post) {
      notFound()
    }

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
    const headings = extractHeadings(post.content.rendered)
    const contentWithIds = addHeadingIds(post.content.rendered)

    // Get related posts for left sidebar (exclude current post)
    const allPosts = await fetchBlogPosts()
    const relatedPosts = allPosts
      .filter(blogPost => blogPost.id !== post.id)
      .slice(0, 6) // Show 6 related posts

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
                  {post.title.rendered}
                </h1>
                <div className="flex items-center justify-center space-x-4 text-sm text-white/80">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{getReadingTime(post.content.rendered)} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {getFeaturedImageUrl(post) && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getFeaturedImageUrl(post)!}
                  alt={post.title.rendered}
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
                    
                    {headings.length > 0 ? (
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
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No headings found in this post.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Center - Main Content */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <article className="prose prose-lg max-w-none">
                  {/* Excerpt */}
                  {post.excerpt?.rendered && (
                    <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mb-8">
                      <p className="text-lg text-gray-700 italic m-0">
                        {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
                      </p>
                    </div>
                  )}

                  {/* Main Content */}
                  <div 
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: contentWithIds }}
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
                    
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <div key={relatedPost.id} className="group">
                          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            {getFeaturedImageUrl(relatedPost) && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={getFeaturedImageUrl(relatedPost)!}
                                  alt={relatedPost.title.rendered}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-500 transition-colors">
                                <a href={`/blog/${relatedPost.slug}`} className="hover:text-primary-500">
                                  {relatedPost.title.rendered}
                                </a>
                              </h4>
                              <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                                <span>{formatDate(relatedPost.date)}</span>
                                <span>•</span>
                                <span>{getReadingTime(relatedPost.content.rendered)} min read</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
                </div>
              </div>
            </div>
          </div>

          {/* Back to Blog Button */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <a
                href="/blog"
                className="inline-flex items-center px-6 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
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
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}
