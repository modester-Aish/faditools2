import { Metadata } from 'next'
import { fetchPages } from '@/lib/api'
import { WordPressPage } from '@/types'
import Header from '@/components/Header'
import { generateCanonicalUrl } from '@/lib/canonical'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Resources & Guides 2025 - SEO Tools Learning Center | FadiTools',
  description: 'Explore SEO tools guides, tutorials & pricing info. Learn how to use group buy tools effectively. Resources for beginners & agencies.',
  openGraph: {
    title: 'Resources & Guides 2025 - SEO Tools Learning Center | FadiTools',
    description: 'Explore SEO tools guides, tutorials & pricing info. Learn how to use group buy tools effectively. Resources for beginners & agencies.',
    url: 'https://faditools.com/pages',
    siteName: 'FadiTools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources & Guides 2025 - SEO Tools Learning Center | FadiTools',
    description: 'Explore SEO tools guides, tutorials & pricing info. Learn how to use group buy tools effectively. Resources for beginners & agencies.',
  },
  alternates: {
    canonical: generateCanonicalUrl('/pages'),
  },
  robots: { index: true, follow: true },
}

export default async function PagesPage() {
  let pages: WordPressPage[] = []
  let loading = false

  try {
    pages = await fetchPages()
  } catch (error) {
    console.error('Error fetching pages:', error)
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
  const getFeaturedImageUrl = (page: WordPressPage): string | null => {
    if (page._embedded && page._embedded['wp:featuredmedia'] && page._embedded['wp:featuredmedia'][0]) {
      const media = page._embedded['wp:featuredmedia'][0]
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
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-secondary-500 text-lg">Loading pages...</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {pages.length} Pages Available
              </div>
                             <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                All Pages & Resources
              </h1>
                             <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
                Browse through all our available pages and find the information you need
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
                  placeholder="Search pages..."
                  className="w-full px-4 py-3 border border-primary-500/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  id="searchInput"
                />
              </div>
              <div className="md:w-48">
                <select
                  className="w-full px-4 py-3 border border-primary-500/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  id="categorySelect"
                >
                  <option value="all">All Pages</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pages Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {pages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-text mb-2">No Pages Found</h3>
              <p className="text-secondary-500">No pages are available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pages.map((page) => (
                <article
                  key={page.id}
                  className="bg-white backdrop-blur-xl rounded-2xl shadow-xl border border-primary-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Featured Image */}
                  {getFeaturedImageUrl(page) && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getFeaturedImageUrl(page)!}
                        alt={page.title.rendered}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-500">
                        Page
                      </span>
                      <span className="text-sm text-secondary-500">
                        {formatDate(page.date)}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-text mb-3 line-clamp-2">
                      <Link
                        href={`/${page.slug}`}
                        className="hover:text-primary-500 transition-colors"
                      >
                        {page.title.rendered}
                      </Link>
                    </h2>
                    
                    {page.excerpt?.rendered && (
                      <p className="text-text mb-4 line-clamp-3">
                        {page.excerpt.rendered.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-500">
                        {getReadingTime(page.content.rendered)} min read
                      </span>
                      <Link
                        href={`/${page.slug}`}
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
