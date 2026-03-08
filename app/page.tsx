import { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { generateCanonicalUrl } from '@/lib/canonical'
import { fetchProducts } from '@/lib/local-wp'
import { PopularToolsSection, TestimonialsSection, TrustSection } from '../components/AnimatedSections'
import { ToolsPackagesSection } from '../components/ToolsPackagesSection'
import FAQSection from '../components/FAQSection'

export const metadata: Metadata = {
  title: 'Best SEO Tools Group Buy 2025 [Ahrefs SEMrush 90%]',
  description: 'Best SEO tools group buy platform offering Ahrefs and SEMrush at 90% discount. Access 50+ premium SEO tools with massive group buy savings. Join 45K users.',
  keywords: 'premium seo tools, marketing tools group buy, affordable seo subscription, shared access tools, seo tools marketplace, digital marketing tools 2025, cheap seo tools, professional marketing software, group buy platform, seo tools discount, seo subscription service, affordable marketing tools, premium tools access, digital marketing subscription, seo tools 2025, marketing tools affordable, group buy seo services, shared seo tools access, premium group buy platform, marketing tools discount',
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
    title: 'Best SEO Tools Group Buy 2025 [Ahrefs SEMrush 90%]',
    description: 'Best SEO tools group buy platform offering Ahrefs and SEMrush at 90% discount. Access 50+ premium SEO tools with massive group buy savings.',
    url: 'https://faditools.com',
    images: [{ url: 'https://faditools.com/logo.png', width: 1200, height: 630, alt: 'Best SEO Tools Group Buy Platform' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best SEO Tools Group Buy 2025 [Ahrefs SEMrush 90%]',
    description: 'Best SEO tools group buy platform offering Ahrefs and SEMrush at 90% discount. Access 50+ premium SEO tools with massive group buy savings.',
    images: ['https://faditools.com/logo.png'],
    creator: '@faditools',
    site: '@faditools',
  },
  other: {
    'theme-color': '#dc2626',
    'msapplication-TileColor': '#dc2626',
    'application-name': 'SEO Tools',
    'apple-mobile-web-app-title': 'SEO Tools',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
}

// Enable ISR for homepage - revalidate every 6 hours
// This caches the homepage and reduces WooCommerce API calls
export const revalidate = 21600 // 6 hours

export default async function Home() {
  let popularProducts: Awaited<ReturnType<typeof fetchProducts>> = []
  let totalProducts = 0
  try {
    const all = await fetchProducts()
    const filtered = all.filter((p: any) => (p.status || 'publish') === 'publish')
    totalProducts = filtered.length
    popularProducts = filtered.slice(0, 20)
  } catch (e) {
    console.error('Home: fetch products for PopularToolsSection failed', e)
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=888&q=80&fm=webp" 
                  alt="Best SEO Tools Group Buy - Ahrefs SEMrush at 90% Discount" 
                  className="w-full h-full object-cover opacity-40"
                  loading="eager"
                  fetchPriority="high"
                  width={888}
                  height={632}
                />
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-600 to-emerald-700 rounded-full blur-xl"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-center">
                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-full text-emerald-500 text-sm font-medium mb-4 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  #1 Group Buy SEO Tools Platform - Save 90% on Premium Tools
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
                  <div className="text-accent-500 mb-1">
                    <span className="relative inline-block px-3 sm:px-4 py-2">
                      <Image 
                        src="/best-seo-tools-group-buy-hero-badge.png"
                        width={128}
                        height={40}
                        priority
                        alt="Best SEO Tools Group Buy - FadiTools Platform" 
                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                        style={{ filter: 'hue-rotate(120deg) saturate(1.2) brightness(0.9)' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <span className="relative z-10 text-white font-bold"><strong>Best SEO Tools</strong></span>
                    </span> <strong>Group Buy</strong>,
                  </div>
                  <div className="text-white">
                    <strong>Ahrefs & SEMrush</strong> at 90% Off.
                  </div>
                </h1>
                
                {/* Description */}
                <p className="text-base text-gray-300 mb-5 leading-relaxed">
                  <strong>Best SEO tools group buy</strong> platform offering <strong>Ahrefs</strong> and <strong>SEMrush</strong> at 90% discount. Get group buy access to premium SEO tools with massive savings. Compare SEO tools pricing, find best alternatives, and save thousands on digital marketing software. Perfect for beginners, agencies, and small businesses.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Link href="https://members.buyseo.org/signup" target="_blank" rel="noopener noreferrer" className="group relative px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-bold text-base hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                    <span className="flex items-center justify-center">
                      Browse SEO Tools Packages
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  
                  <Link href="https://members.buyseo.org/signup" target="_blank" rel="noopener noreferrer" className="group px-5 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-bold text-base hover:bg-emerald-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      Compare SEO Tools
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
                <div className="text-gray-500 text-xs font-medium mb-1">Group Buy Access</div>
                <div className="text-2xl md:text-3xl font-black text-black mb-1">$4.99</div>
                <div className="text-sm text-gray-600">/month • Save $500+</div>
              </div>
              
              {/* Features List */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-black font-medium text-sm">Ahrefs, SEMrush & More</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <span className="text-black font-medium text-sm">Group Buy Discounts</span>
                </div>

                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-black font-medium text-sm">Perfect for Agencies</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-black font-medium text-sm">Beginner Friendly</span>
                </div>
              </div>

              {/* CTA Button */}
              <a 
                href="https://members.buyseo.org/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white rounded-lg font-bold text-sm py-2 px-3 text-center block hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Join Group Buy Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section - same products as /products, 20 per load, See more */}
      <PopularToolsSection initialProducts={popularProducts} totalProducts={totalProducts} />

      {/* Tools Packages Section */}
      <ToolsPackagesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Trust Section */}
      <TrustSection />

      {/* Footer Component with All Social Links and Pages */}
      <Footer />

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
              "telephone": "+447845432224",
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
            "description": "Best SEO tools group buy platform. Access premium SEO tools including Ahrefs and SEMrush at 90% discount. Digital marketing solutions at affordable prices",
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
            "name": "Best SEO Tools Group Buy",
            "description": "Best SEO tools group buy service. Group buy access to premium SEO and digital marketing tools including Ahrefs, SEMrush, Moz Pro, and 50+ other tools at 90% discount",
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

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best SEO Tools Group Buy 2025 - Ahrefs SEMrush 90%",
            "description": "Best SEO tools group buy platform offering Ahrefs and SEMrush at 90% discount. Access 50+ premium SEO tools with massive group buy savings. Join 45K users.",
            "image": "https://faditools.com/logo.png",
            "author": {
              "@type": "Organization",
              "name": "FadiTools",
              "url": "https://faditools.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FadiTools",
              "logo": {
                "@type": "ImageObject",
                "url": "https://faditools.com/logo.png",
                "width": 1200,
                "height": 630
              }
            },
            "datePublished": "2023-01-01",
            "dateModified": "2025-01-01",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://faditools.com"
            },
            "keywords": "best seo tools group buy, premium seo tools, marketing tools group buy, affordable seo subscription, shared access tools, seo tools marketplace",
            "articleSection": "Digital Marketing",
            "inLanguage": "en-US"
          })
        }}
      />

      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Best SEO Tools Group Buy 2025 - Ahrefs SEMrush 90%",
            "description": "Best SEO tools group buy platform offering Ahrefs and SEMrush at 90% discount. Access 50+ premium SEO tools with massive group buy savings. Join 45K users.",
            "image": {
              "@type": "ImageObject",
              "url": "https://faditools.com/logo.png",
              "width": 1200,
              "height": 630
            },
            "author": {
              "@type": "Organization",
              "name": "FadiTools",
              "url": "https://faditools.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FadiTools",
              "logo": {
                "@type": "ImageObject",
                "url": "https://faditools.com/logo.png",
                "width": 1200,
                "height": 630
              }
            },
            "datePublished": "2023-01-01",
            "dateModified": "2025-01-01",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://faditools.com"
            },
            "keywords": "best seo tools group buy, premium seo tools, marketing tools group buy, affordable seo subscription, shared access tools, seo tools marketplace",
            "articleSection": "Digital Marketing",
            "inLanguage": "en-US",
            "wordCount": 1500
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What kind of services do you offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer the best SEO tools group buy service. Premium SEO tools including Ahrefs, SEMrush, Moz Pro, and 50+ other professional tools at up to 90% discount. Our best SEO tools group buy services include keyword research, backlink analysis, competitor analysis, and comprehensive SEO solutions."
                }
              },
              {
                "@type": "Question",
                "name": "Is it safe to use FadiTools services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, absolutely! We are a registered company with thousands of satisfied customers. All our tools are legitimate and we provide 24/7 support with 99.9% uptime guarantee."
                }
              },
              {
                "@type": "Question",
                "name": "What payment methods do you accept?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We accept all major payment methods including credit cards, PayPal, Stripe, and bank transfers. All payments are secure and encrypted for your safety."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer a free trial?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer a 24-hour free trial for new users to test our tools. This allows you to experience the full functionality before making a purchase decision."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the delivery take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Access to tools is granted instantly upon successful payment. You'll receive login credentials within 5-10 minutes of your order confirmation."
                }
              }
            ]
          })
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://faditools.com"
              }
            ]
          })
        }}
      />

      {/* SiteNavigation Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": "Main Navigation",
            "url": "https://faditools.com",
            "hasPart": [
              {
                "@type": "SiteNavigationElement",
                "name": "Home",
                "url": "https://faditools.com"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Tools",
                "url": "https://faditools.com/tools"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Packages",
                "url": "https://faditools.com/packages"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Blog",
                "url": "https://faditools.com/blog"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Products",
                "url": "https://faditools.com/products"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "About Us",
                "url": "https://faditools.com/about-us"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Contact",
                "url": "https://faditools.com/contact"
              }
            ]
          })
        }}
      />
    </div>
  )
}
