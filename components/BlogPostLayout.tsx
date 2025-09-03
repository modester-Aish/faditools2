'use client'

import { useEffect, useState, useRef } from 'react'
import { WordPressPost } from '@/types'
import { fetchBlogPosts } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPostLayoutProps {
  post: WordPressPost
}

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function BlogPostLayout({ post }: BlogPostLayoutProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeSection, setActiveSection] = useState<string>('')
  const [relatedPosts, setRelatedPosts] = useState<WordPressPost[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const allPosts = await fetchBlogPosts()
        // Get related posts (excluding current post)
        const filteredPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 4)
        setRelatedPosts(filteredPosts)
      } catch (error) {
        console.error('Error fetching related posts:', error)
      }
    }

    fetchRelatedPosts()
  }, [post.slug])

  useEffect(() => {
    // Generate TOC from headings
    if (post?.content?.rendered && contentRef.current) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(post.content.rendered, 'text/html')
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
      
      const toc: TOCItem[] = []
      headings.forEach((heading, index) => {
        const id = `heading-${index}`
        heading.id = id
        toc.push({
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        })
      })
      setTocItems(toc)
    }
  }, [post])

  useEffect(() => {
    if (!post || !contentRef.current) return

    // Set up intersection observer for TOC highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-20% 0px -35% 0px' }
    )

    // Find all headings in the content and observe them
    const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading, index) => {
      // Ensure each heading has an ID
      if (!heading.id) {
        heading.id = `heading-${index}`
      }
      observer.observe(heading)
    })

    return () => observer.disconnect()
  }, [post])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for header height
      const elementPosition = element.offsetTop - offset
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const getIndentClass = (level: number) => {
    switch (level) {
      case 1: return 'pl-0'
      case 2: return 'pl-4'
      case 3: return 'pl-8'
      case 4: return 'pl-12'
      case 5: return 'pl-16'
      case 6: return 'pl-20'
      default: return 'pl-0'
    }
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

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="pt-0">
        {/* Hero Section */}
        <div className="bg-primary-500 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Blog Post
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title.rendered}
              </h1>
              {post.excerpt?.rendered && (
                <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
                  {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
                </p>
              )}
              
              {/* Post Meta */}
              <div className="flex items-center justify-center space-x-6 mt-6 text-white">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.date)}
                </div>
                {post.content?.rendered && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {getReadingTime(post.content.rendered)} min read
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Table of Contents */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="bg-[#FFFFFF] backdrop-blur-xl rounded-2xl shadow-xl border border-primary-500/20 p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Table of Contents
                </h3>
                
                {tocItems.length > 0 ? (
                  <div className="space-y-1">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left p-2 rounded-lg transition-all duration-300 group ${
                          activeSection === item.id
                            ? 'bg-primary-500/10 border border-primary-500/30 text-primary-500'
                            : 'hover:bg-gray-50 border border-transparent hover:border-primary-500/20 text-gray-700 hover:text-gray-900'
                        } ${getIndentClass(item.level)}`}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                            activeSection === item.id
                              ? 'bg-primary-500'
                              : 'bg-gray-300 group-hover:bg-primary-500/50'
                          }`}></div>
                          <span className={`text-sm font-medium line-clamp-2 leading-tight text-black ${
                            item.level === 1 ? 'font-semibold' : 'font-normal'
                          }`}>
                            {item.text}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-black text-sm">No headings found</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Center Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="bg-[#FFFFFF] backdrop-blur-xl rounded-2xl shadow-xl border border-primary-500/20 p-8">
                {/* Featured Image */}
                {getFeaturedImageUrl(post) && (
                  <div className="mb-8">
                    <Image
                      src={getFeaturedImageUrl(post)!}
                      alt={post.title?.rendered || ''}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                )}
                
                {/* Post Content */}
                <article>
                  <div 
                    ref={contentRef}
                    className="prose prose-lg max-w-none wordpress-content"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  />
                </article>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-primary-500/5 border-t border-primary-500/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-black mb-4">Related Posts</h2>
                <p className="text-lg text-black max-w-2xl mx-auto">
                  Discover more insights and articles that might interest you
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                      {/* Featured Image */}
                      {getFeaturedImageUrl(relatedPost) && (
                        <div className="h-48 overflow-hidden">
                          <Image
                            src={getFeaturedImageUrl(relatedPost)!}
                            alt={relatedPost.title?.rendered || ''}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-black mb-3">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(relatedPost.date)}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-black group-hover:text-primary-500 transition-colors duration-300 line-clamp-2 leading-tight mb-3">
                          {relatedPost.title.rendered}
                        </h3>
                        
                        {relatedPost.excerpt?.rendered && (
                          <p className="text-black text-sm line-clamp-3 leading-relaxed">
                            {relatedPost.excerpt.rendered.replace(/<[^>]*>/g, '')}
                          </p>
                        )}
                        
                        <div className="mt-4 flex items-center text-primary-500 font-medium text-sm group-hover:text-primary-600 transition-colors duration-300">
                          Read More
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View All Posts
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
