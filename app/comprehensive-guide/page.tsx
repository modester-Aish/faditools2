'use client'

import { useEffect, useState, useRef } from 'react'
import { fetchProducts } from '@/lib/api'
import { Product } from '@/types'
import Link from 'next/link'
import Header from '../../components/Header'
import RecommendedProductsGridClient from '../../components/RecommendedProductsGridClient'
import Image from 'next/image'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface ProductItem {
  id: number
  name: string
  price: string
  slug: string
}

export default function ComprehensiveGuidePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeSection, setActiveSection] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts()
        console.log('Comprehensive Guide - Products fetched from API:', productsData)
        console.log('Comprehensive Guide - Products length:', productsData?.length)
        
        // Randomize products and take first 6
        const shuffledProducts = productsData
          .sort(() => Math.random() - 0.5)
          .slice(0, 6)
        
        console.log('Comprehensive Guide - Shuffled products:', shuffledProducts)
        setProducts(shuffledProducts)
        
        // Generate TOC from headings
        const headings = contentRef.current?.querySelectorAll('h1, h2, h3, h4')
        if (headings) {
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
        
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  useEffect(() => {
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

    const headings = contentRef.current?.querySelectorAll('h1, h2, h3, h4')
    headings?.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const formatPrice = (price: string) => {
    if (!price || price === '0' || price === '0.00') return 'Free'
    return `$${parseFloat(price).toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Complete Digital Marketing Guide
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Master the art of digital marketing with our comprehensive guide, expert insights, and recommended tools
              </p>
            </div>
          </div>
        </div>

        {/* Main Content with Three-Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar - Product Recommendations */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <RecommendedProductsGridClient 
                  products={products}
                  title="Recommended Products"
                  maxProducts={6}
                />
              </div>
            </div>

            {/* Center Content Area */}
            <div className="lg:col-span-6">
              <article className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
                <div ref={contentRef}>
                  {/* Introduction */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    The Ultimate Digital Marketing Guide
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    In today's digital landscape, mastering digital marketing is essential for business success. This comprehensive guide will walk you through every aspect of digital marketing, from foundational concepts to advanced strategies.
                  </p>

                  {/* What is Digital Marketing */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
                    What is Digital Marketing?
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Digital marketing encompasses all marketing efforts that use electronic devices or the internet. Businesses leverage digital channels such as search engines, social media, email, and websites to connect with current and prospective customers.
                  </p>

                  {/* Key Components */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
                    Key Components of Digital Marketing
                  </h2>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Search Engine Optimization (SEO)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    SEO is the practice of optimizing your website to rank higher in search engine results pages (SERPs). This involves both on-page and off-page optimization techniques.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                    <li>Keyword research and optimization</li>
                    <li>Content creation and optimization</li>
                    <li>Technical SEO improvements</li>
                    <li>Link building strategies</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Content Marketing
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Content marketing focuses on creating and distributing valuable, relevant content to attract and engage a target audience. This includes blog posts, videos, infographics, and more.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Social Media Marketing
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Social media marketing involves using social media platforms to promote your brand, products, or services. It's about building relationships and engaging with your audience.
                  </p>

                  {/* Digital Marketing Strategies */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
                    Effective Digital Marketing Strategies
                  </h2>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Inbound Marketing
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Inbound marketing focuses on attracting customers through relevant and helpful content, rather than interrupting them with unwanted messages. This approach builds trust and credibility.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Email Marketing
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Email marketing remains one of the most effective digital marketing channels. It allows for personalized communication and has an excellent return on investment.
                  </p>

                  {/* Tools and Technologies */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
                    Essential Digital Marketing Tools
                  </h2>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Analytics and Tracking
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Understanding your performance is crucial. Tools like Google Analytics, SEMRU$H, and AHREF$ help you track and analyze your marketing efforts.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Content Creation Tools
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Tools like Canva, Grammarly, and BuzzSumo help you create high-quality content that resonates with your audience.
                  </p>

                  {/* Best Practices */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
                    Digital Marketing Best Practices
                  </h2>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Know Your Audience
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Understanding your target audience is the foundation of successful digital marketing. Create detailed buyer personas and tailor your strategies accordingly.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Consistent Branding
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Maintain consistent branding across all digital channels. This includes your logo, colors, tone of voice, and messaging.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Mobile Optimization
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    With mobile usage continuing to grow, ensure all your digital marketing efforts are mobile-friendly and optimized for mobile devices.
                  </p>

                  {/* Measuring Success */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
                    Measuring Digital Marketing Success
                  </h2>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Key Performance Indicators (KPIs)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Track relevant KPIs such as website traffic, conversion rates, email open rates, social media engagement, and return on investment (ROI).
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    A/B Testing
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Continuously test and optimize your campaigns through A/B testing. This helps you understand what works best for your audience.
                  </p>

                  {/* Future Trends */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
                    Future Trends in Digital Marketing
                  </h2>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Artificial Intelligence
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    AI is revolutionizing digital marketing through personalized experiences, chatbots, and predictive analytics.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Voice Search Optimization
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    With the rise of voice assistants, optimizing for voice search is becoming increasingly important.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">
                    Video Marketing
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Video content continues to dominate social media and search results. Invest in high-quality video marketing strategies.
                  </p>

                  {/* Conclusion */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">
                    Conclusion
                  </h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    Digital marketing is an ever-evolving field that requires continuous learning and adaptation. By implementing the strategies and best practices outlined in this guide, you'll be well-positioned to succeed in the digital landscape.
                  </p>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Get Started?
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Explore our recommended products and tools to accelerate your digital marketing success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/products"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                      >
                        Browse Products
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                      >
                        Get Expert Advice
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Right Sidebar - Table of Contents */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                          activeSection === item.id
                            ? 'bg-blue-100 text-blue-700 font-medium shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
