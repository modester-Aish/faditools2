import { Metadata } from 'next'
import Header from '../components/Header'
import Link from 'next/link'
import Image from 'next/image'
import { generateCanonicalUrl } from '@/lib/canonical'
import { wooCommerceService } from '@/lib/woocommerce-service'
import CategorySection from '../components/CategorySection'
import { WhyChooseSection, PopularToolsSection, CustomPackSection, TestimonialsSection, HowToOrderSection, TrustSection } from '../components/AnimatedSections'
import { ToolsPackagesSection } from '../components/ToolsPackagesSection'
import Typewriter from '../components/Typewriter'
import FAQSection from '../components/FAQSection'

export const metadata: Metadata = {
  title: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions | Save 90% on Ahrefs, SEMrush & More',
  description: 'Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro at 90% discount. Trusted by 10,000+ marketers. 24/7 support, 99.9% uptime. Start your SEO journey today!',
  keywords: 'SEO tools, Ahrefs group buy, SEMrush discount, digital marketing tools, keyword research, backlink analysis, competitor analysis, SEO software, marketing automation, content optimization',
  authors: [{ name: 'FadiTools Team' }],
  creator: 'FadiTools',
  publisher: 'FadiTools',
  metadataBase: new URL('https://faditools.com'),
  alternates: { canonical: generateCanonicalUrl('/') },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions',
    description: 'Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro at 90% discount. Trusted by 10,000+ marketers worldwide.',
    url: 'https://faditools.com',
    siteName: 'FadiTools',
    images: [{ url: 'https://faditools.com/logo.png', width: 1200, height: 630, alt: 'FadiTools - Premium SEO Tools Platform' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions',
    description: 'Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro at 90% discount. Trusted by 10,000+ marketers worldwide.',
    images: ['https://faditools.com/logo.png'],
    creator: '@faditools',
    site: '@faditools',
  },
  other: {
    'theme-color': '#dc2626',
    'msapplication-TileColor': '#dc2626',
    'application-name': 'FadiTools',
    'apple-mobile-web-app-title': 'FadiTools',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
}

export default async function Home() {
  // Fetch categories and products for the homepage
  let categories: Array<{ id: number; name: string; slug: string; count: number }> = []
  let products: Array<{
    id: number
    name: string
    slug: string
    price: string
    regular_price: string
    sale_price?: string
    on_sale: boolean
    images: Array<{ src: string; alt: string }>
    categories: Array<{ id: number; name: string; slug: string }>
  }> = []
  
  try {
    const wooCommerceData = await wooCommerceService.getWooCommerceData()
    
    // Process categories
    if (wooCommerceData.categories && wooCommerceData.categories.length > 0) {
      categories = wooCommerceData.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count || 0
      }))
    }
    
    // Process products (limit to 12 for homepage)
    if (wooCommerceData.products && wooCommerceData.products.length > 0) {
      products = wooCommerceData.products.slice(0, 12).map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        regular_price: product.regular_price,
        sale_price: product.sale_price,
        on_sale: product.on_sale,
        images: product.images || [],
        categories: product.categories
      }))
    }
  } catch (error) {
    console.error('Error fetching WooCommerce data:', error)
    // Continue with fallback data - don't break the page
  }
  
  // Always provide fallback data to ensure page renders
  if (categories.length === 0) {
    categories = [
      { id: 1, name: 'AI Tools', slug: 'ai-tools', count: 3450 },
      { id: 2, name: 'Amazon Tools', slug: 'amazon-tools', count: 2720 },
      { id: 3, name: 'Content Tools', slug: 'content-tools', count: 1560 },
      { id: 4, name: 'SEO Tools', slug: 'seo-tools', count: 2100 },
      { id: 5, name: 'Design Tools', slug: 'design-tools', count: 1800 },
      { id: 6, name: 'Uncategorized', slug: 'uncategorized', count: 1200 }
    ]
  }
  
  if (products.length === 0) {
    products = []
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Header />
      
      {/* Hero Section - Original Size */}
      <section className="relative py-6 flex items-center justify-center overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch mx-2">
            
            {/* Left Section - Dark Panel with Background Image */}
            <div className="flex-1 bg-[#1A1A1A] rounded-3xl p-4 md:p-6 text-white relative overflow-hidden min-h-[280px]">
              {/* Background Image - Behind the text content */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="SEO Tools Banner Background" 
                  className="w-full h-full object-cover opacity-40"
                />
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-600 to-primary-700 rounded-full blur-xl"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-center">
                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-full text-primary-500 text-sm font-medium mb-4 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                  Trusted by 10,000+ Marketers Worldwide
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
                  <div className="text-accent-500 mb-1">
                    <span className="bg-gradient-to-r from-primary-400/80 to-primary-600/80 text-white px-2 sm:px-3 py-1 rounded-xl shadow-lg backdrop-blur-sm border border-primary-300/30 inline-block">
                      Premium SEO
                    </span> Tools,
                  </div>
                  <div className="text-white">
                    Made Accessible.
                  </div>
                </h1>
                
                {/* Description */}
                <p className="text-base text-gray-300 mb-5 leading-relaxed">
                  <Typewriter 
                    text="Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro, and more at 90% off retail prices. 24/7 support, 99.9% uptime, instant access." 
                    speed={30} 
                    delay={1000}
                    className="text-gray-300"
                    loop={true}
                    loopDelay={8000}
                  />
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/packages" className="group relative px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold text-base hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25">
                    <span className="flex items-center justify-center">
                      Begin Your Journey
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  
                  <Link href="/tools" className="group px-5 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-bold text-base hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      Discover Tools
                      <svg className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Section - White Pricing Box */}
            <div className="w-full lg:w-80 bg-white rounded-3xl p-4 md:p-6 shadow-2xl border border-gray-100 flex flex-col justify-center">
              {/* Price Header */}
              <div className="text-center mb-4">
                <div className="text-gray-500 text-xs font-medium mb-1">Starting from</div>
                <div className="text-2xl md:text-3xl font-black text-black mb-1">$5.00</div>
                <div className="text-sm text-gray-600">/month</div>
              </div>
              
              {/* Features List */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-black font-medium text-sm">50+ Premium SEO Tools</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <span className="text-black font-medium text-sm">90% Off Retail Prices</span>
                </div>

                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-black font-medium text-sm">24/7 Support Available</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-black font-medium text-sm">99.9% Uptime Guarantee</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/packages" className="w-full bg-accent-500 text-white rounded-lg font-bold text-sm py-2 px-3 text-center block hover:bg-accent-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FadiTools Section */}
      <WhyChooseSection />

      {/* Product Categories Section */}
      {categories.length > 0 && <CategorySection categories={categories} products={products} />}

      {/* Popular Tools Section */}
      <PopularToolsSection />

      {/* Tools Packages Section */}
      <ToolsPackagesSection />

      {/* Custom Pack Section */}
      <CustomPackSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* How to Place an Order Section */}
      <HowToOrderSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Trust Section */}
      <TrustSection />

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
                <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Ahrefs</Link></li>
                <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">SEMrush</Link></li>
                <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">Moz Pro</Link></li>
                <li><Link href="#popular-tools" className="hover:text-primary-500 transition-colors">View All Tools</Link></li>
                </ul>
              </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Packages</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#tool-packages" className="hover:text-primary-500 transition-colors">All Packages</Link></li>
                <li><Link href="#tool-packages" className="hover:text-primary-500 transition-colors">Medium Pack</Link></li>
                <li><Link href="#tool-packages" className="hover:text-primary-500 transition-colors">Heavy Pack</Link></li>
                <li><Link href="#tool-packages" className="hover:text-primary-500 transition-colors">Mega Pack</Link></li>
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

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "FadiTools",
            "url": "https://faditools.com",
            "logo": "https://faditools.com/logo.png",
            "description": "Premium SEO tools and digital marketing solutions provider offering access to 50+ tools including Ahrefs, SEMrush, and Moz Pro at discounted rates.",
            "foundingDate": "2020",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-0123",
              "contactType": "Customer Service",
              "email": "admin@faditools.com",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://twitter.com/faditools",
              "https://linkedin.com/company/faditools"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "FadiTools",
            "url": "https://faditools.com",
            "description": "Access premium SEO tools and digital marketing solutions at affordable prices",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://faditools.com/tools?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Premium SEO Tools Access",
            "description": "Group buy access to premium SEO and digital marketing tools including Ahrefs, SEMrush, Moz Pro, and 50+ other tools",
            "provider": {
              "@type": "Organization",
              "name": "FadiTools"
            },
            "serviceType": "Digital Marketing Tools",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "SEO Tools Packages",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO Combo Pack"
                  },
                  "price": "18.00",
                  "priceCurrency": "USD"
                }
              ]
            }
          })
        }}
      />
    </div>
  )
}
