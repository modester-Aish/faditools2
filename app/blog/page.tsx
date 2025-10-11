import { Metadata } from 'next'
import { fetchBlogPosts } from '@/lib/api'
import { WordPressPost } from '@/types'
import Link from 'next/link'
import Header from '../../components/Header'
import Image from 'next/image'
import { generateCanonicalUrl } from '@/lib/canonical'

export const metadata: Metadata = {
  title: 'SEO Tips & Digital Marketing Blog | FadiTools',
  description: 'Read our latest SEO tips and digital marketing blog posts. Learn how to use SEO tools, keyword research tips, backlink analysis guides, and SEO tools tutorials. Best SEO tools for agencies and startups.',
  openGraph: {
    title: 'SEO Tips & Digital Marketing Blog | FadiTools',
    description: 'Read our latest SEO tips and digital marketing blog posts. Learn how to use SEO tools, keyword research tips, backlink analysis guides, and SEO tools tutorials.',
    url: 'https://faditools.com/blog',
    siteName: 'FadiTools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Tips & Digital Marketing Blog | FadiTools',
    description: 'Read our latest SEO tips and digital marketing blog posts. Learn how to use SEO tools, keyword research tips, backlink analysis guides, and SEO tools tutorials.',
  },
  alternates: {
    canonical: generateCanonicalUrl('/blog'),
  },
  robots: { index: true, follow: true },
}

export default async function BlogPage() {
  let posts: WordPressPost[] = []
  let loading = false

  try {
    posts = await fetchBlogPosts()
  } catch (error) {
    console.error('Error fetching posts:', error)
    loading = true
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

  // Function to get featured image URL from embedded data
  const getFeaturedImageUrl = (post: WordPressPost): string | null => {
    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      const media = post._embedded['wp:featuredmedia'][0]
      return media.source_url || media.guid?.rendered || null
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Header />
      
      <div>
        {/* Hero Section */}
        <div className="relative bg-primary-500 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          

          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 text-white">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                {posts.length} Articles Available
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                SEO Tips & Digital Marketing Blog
              </h1>
                             <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
                Read our latest blog posts, tutorials, and insights about digital marketing and SEO tools
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-primary-500/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-primary-500/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full px-4 py-3 border border-primary-500/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  id="searchInput"
                />
              </div>
              <div className="md:w-48">
                <select
                  className="w-full px-4 py-3 border border-primary-500/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  id="categorySelect"
                >
                  <option value="all">All Categories</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Found</h3>
              <p className="text-gray-600">No blog posts are available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[#FFFFFF] backdrop-blur-xl rounded-2xl shadow-xl border border-primary-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Featured Image */}
                  {getFeaturedImageUrl(post) && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getFeaturedImageUrl(post)!}
                        alt={post.title.rendered}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-500">
                        Blog Post
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-black mb-3 line-clamp-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary-500 transition-colors"
                      >
                        {post.title.rendered}
                      </Link>
                    </h2>
                    
                    {post.excerpt?.rendered && (
                      <p className="text-black mb-4 line-clamp-3">
                        {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {getReadingTime(post.content.rendered)} min read
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
