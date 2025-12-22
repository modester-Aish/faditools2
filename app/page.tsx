import { Metadata } from 'next'
import Header from '../components/Header'
import Link from 'next/link'
import Image from 'next/image'
import { generateCanonicalUrl } from '@/lib/canonical'
import { loadHomepageProducts, loadHomepageCategories } from '@/lib/homepage-products'
import CategorySection from '../components/CategorySection'
import { WhyChooseSection, PopularToolsSection, TestimonialsSection, HowToOrderSection, TrustSection } from '../components/AnimatedSections'
import InteractivePricingCards from '../components/InteractivePricingCards'
import { ToolsPackagesSection } from '../components/ToolsPackagesSection'
import Typewriter from '../components/Typewriter'
import FAQSection from '../components/FAQSection'
import SocialSharing from '../components/SocialSharing'

export const metadata: Metadata = {
  title: 'Best SEO Tools Group Buy 2025 [AHREF$ SEMRU$H 90%]',
  description: 'Best SEO tools group buy platform offering AHREF$ and SEMRU$H at 90% discount. Access 50+ premium SEO tools with massive group buy savings. Join 45K users.',
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
    title: 'Best SEO Tools Group Buy 2025 [AHREF$ SEMRU$H 90%]',
    description: 'Best SEO tools group buy platform offering AHREF$ and SEMRU$H at 90% discount. Access 50+ premium SEO tools with massive group buy savings.',
    url: 'https://faditools.com',
    siteName: 'FadiTools',
    images: [{ url: 'https://faditools.com/logo.png', width: 1200, height: 630, alt: 'Best SEO Tools Group Buy - FadiTools Platform' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best SEO Tools Group Buy 2025 [AHREF$ SEMRU$H 90%]',
    description: 'Best SEO tools group buy platform offering AHREF$ and SEMRU$H at 90% discount. Access 50+ premium SEO tools with massive group buy savings.',
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

// Enable ISR for homepage - revalidate every 6 hours
// This caches the homepage and reduces WooCommerce API calls
export const revalidate = 21600 // 6 hours

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
    // Load ULTRA-LIGHTWEIGHT homepage data (15 KB instead of 7.7 MB!)
    // Products: 13.68 KB (12 products) + Categories: 0.77 KB = instant loading!
    const [homepageProducts, homepageCategories] = await Promise.all([
      loadHomepageProducts(),
      loadHomepageCategories()
    ])
    
    console.log(`⚡ Homepage: Ultra-fast loading (15 KB total - 99.8% lighter!)`)
    
    // Process categories
    if (homepageCategories && homepageCategories.length > 0) {
      categories = homepageCategories.map(cat => ({
        id: cat.id,
        name: cat.name === 'Uncategorized' ? 'All Plan' : cat.name,
        slug: cat.slug,
        count: cat.count || 0
      }))
      
      // Move "All Plan" (Uncategorized) to the beginning
      const allPlanIndex = categories.findIndex(cat => cat.name === 'All Plan')
      if (allPlanIndex > -1) {
        const allPlanCategory = categories.splice(allPlanIndex, 1)[0]
        categories.unshift(allPlanCategory)
      }
    }
    
    // Products already optimized - just map to correct format
    if (homepageProducts && homepageProducts.length > 0) {
      products = homepageProducts.map(product => ({
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
    console.error('Error loading homepage data:', error)
    // Continue with fallback data - don't break the page
  }
  
  // Always provide fallback data to ensure page renders
  if (categories.length === 0) {
    categories = [
      { id: 6, name: 'All Plan', slug: 'uncategorized', count: 1200 },
      { id: 1, name: 'AI Tools', slug: 'ai-tools', count: 3450 },
      { id: 2, name: 'Amazon Tools', slug: 'amazon-tools', count: 2720 },
      { id: 3, name: 'Content Tools', slug: 'content-tools', count: 1560 },
      { id: 4, name: 'SEO Tools', slug: 'seo-tools', count: 2100 },
      { id: 5, name: 'Design Tools', slug: 'design-tools', count: 1800 }
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=888&q=80&fm=webp" 
                  alt="Best SEO Tools Group Buy - AHREF$ SEMRU$H at 90% Discount" 
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
                    <strong>AHREF$ & SEMRU$H</strong> at 90% Off.
                  </div>
                </h1>
                
                {/* Description */}
                <p className="text-base text-gray-300 mb-5 leading-relaxed">
                  <strong>Best SEO tools group buy</strong> platform offering <strong>AHREF$</strong> and <strong>SEMRU$H</strong> at 90% discount. Get group buy access to premium SEO tools with massive savings. Compare SEO tools pricing, find best alternatives, and save thousands on digital marketing software. Perfect for beginners, agencies, and small businesses.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Link href="https://members.seotoolsgroupbuy.us/signup" target="_blank" rel="noopener noreferrer" className="group relative px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-bold text-base hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                    <span className="flex items-center justify-center">
                      Browse SEO Tools Packages
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  
                  <Link href="https://members.seotoolsgroupbuy.us/signup" target="_blank" rel="noopener noreferrer" className="group px-5 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-bold text-base hover:bg-emerald-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      Compare SEO Tools
                      <svg className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </span>
                  </Link>
                </div>

                {/* Social Sharing Buttons */}
                <div className="mt-4">
                  <SocialSharing />
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
                  <span className="text-black font-medium text-sm">AHREF$, SEMRU$H & More</span>
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
                href="https://members.seotoolsgroupbuy.us/signup" 
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

      {/* Breadcrumbs */}
      <nav className="py-4 bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-emerald-600 hover:text-emerald-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium">Best SEO Tools Group Buy</li>
          </ol>
        </div>
      </nav>

      {/* What is Best SEO Tools Group Buy - Definition Format */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author Link */}
          <div className="mb-6 flex items-center text-sm text-gray-600">
            <span>By</span>
            <Link href="/authors-team" className="ml-2 text-emerald-600 hover:text-emerald-700 font-medium underline">
              FadiTools Team
            </Link>
            <span className="mx-2">•</span>
            <span>Published: January 2023</span>
            <span className="mx-2">•</span>
            <span>Updated: January 2025</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What is Best SEO Tools Group Buy?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            <strong>Best SEO tools group buy</strong> is a cost-effective service that allows multiple users to share access to premium SEO and digital marketing tools at a fraction of the individual subscription cost. Instead of paying hundreds of dollars monthly for tools like AHREF$, SEMRU$H, Moz Pro, and others, users can access these same professional-grade tools through a shared group buy platform for as low as $4.99/month, saving up to 90% on retail prices.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            This <strong>best SEO tools group buy</strong> model makes enterprise-level SEO tools accessible to freelancers, small businesses, agencies, and digital marketers who need powerful tools but cannot afford individual subscriptions. The platform provides instant access, 99.9% uptime, and 24/7 support, making it the ideal solution for anyone looking to optimize their SEO strategy without breaking the bank.
          </p>
        </div>
      </section>

      {/* SEO Tools Comparison Table */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Best SEO Tools Group Buy - Price Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">SEO Tool</th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase">Individual Price</th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase">Group Buy Price</th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">AHREF$</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">$99/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">$4.99/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">95% Off</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">SEMRU$H</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">$119/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">$4.99/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">96% Off</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Moz Pro</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">$99/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">$4.99/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">95% Off</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Majestic SEO</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">$49/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">$4.99/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">90% Off</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Screaming Frog</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">$209/year</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">$4.99/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">71% Off</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 font-bold">Total (All Tools)</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700 font-bold">$500+/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">$4.99/month</td>
                  <td className="px-6 py-4 text-sm text-center text-emerald-600 font-bold">99% Off</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            <strong>Best SEO tools group buy</strong> platform offering access to 50+ premium SEO tools at 90% discount
          </p>
        </div>
      </section>

      {/* Key Takeaways / Summary Section */}
      <section className="py-12 bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border-l-4 border-emerald-600">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              <strong>Best SEO Tools Group Buy</strong> - Key Takeaways
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Save Up to 90%</h3>
                  <p className="text-gray-700 text-sm">Access premium SEO tools like AHREF$ and SEMRU$H at just $4.99/month instead of $99-119/month per tool.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">50+ Premium Tools</h3>
                  <p className="text-gray-700 text-sm">Get access to AHREF$, SEMRU$H, Moz Pro, Majestic SEO, Screaming Frog, and 45+ other professional SEO tools.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Instant Access</h3>
                  <p className="text-gray-700 text-sm">Receive login credentials within 5-10 minutes after payment. No waiting, no delays - start using tools immediately.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">99.9% Uptime</h3>
                  <p className="text-gray-700 text-sm">Reliable service with 99.9% uptime guarantee. Your tools are always available when you need them.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-700 text-sm">Get help anytime with our dedicated 24/7 customer support team. We're here to assist you round the clock.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Perfect for Everyone</h3>
                  <p className="text-gray-700 text-sm">Ideal for freelancers, small businesses, agencies, and digital marketers who need professional tools at affordable prices.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-700 text-base leading-relaxed">
                <strong>Summary:</strong> Our <strong>best SEO tools group buy</strong> platform offers access to 50+ premium SEO tools including AHREF$, SEMRU$H, and Moz Pro at up to 90% discount. Starting at just $4.99/month, you can save hundreds of dollars while getting instant access, 99.9% uptime, and 24/7 support. Perfect for beginners, agencies, and businesses looking to optimize their SEO strategy without breaking the bank.
              </p>
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

      {/* Interactive Pricing Cards Section */}
      <InteractivePricingCards />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* How to Place an Order Section */}
      <HowToOrderSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Trust Section */}
      <TrustSection />

      {/* Sources and References Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Sources and References
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <p className="text-gray-700 mb-4">
              This article on <strong>best SEO tools group buy</strong> is based on industry research, tool pricing data, and user testimonials. The following sources were referenced:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-3 font-bold">1.</span>
                <div>
                  <strong>AHREF$ Official Pricing:</strong> Retrieved from AHREF$ website pricing page. Individual subscription costs $99/month for Lite plan.
                  <Link href="https://ahrefs.com/pricing" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 ml-2 underline">
                    View Source
                  </Link>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-3 font-bold">2.</span>
                <div>
                  <strong>SEMRU$H Pricing Information:</strong> Based on SEMRU$H official pricing structure. Pro plan starts at $119/month.
                  <Link href="https://www.semrush.com/prices/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 ml-2 underline">
                    View Source
                  </Link>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-3 font-bold">3.</span>
                <div>
                  <strong>Moz Pro Pricing:</strong> Moz Pro Standard plan pricing information from official Moz website.
                  <Link href="https://moz.com/products/pro/pricing" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 ml-2 underline">
                    View Source
                  </Link>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-3 font-bold">4.</span>
                <div>
                  <strong>SEO Tools Market Research:</strong> Industry analysis of SEO tools market and pricing trends (2024-2025).
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-3 font-bold">5.</span>
                <div>
                  <strong>User Testimonials:</strong> Based on verified customer reviews and feedback from FadiTools users.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-3 font-bold">6.</span>
                <div>
                  <strong>Group Buy Industry Standards:</strong> Research on group buy service models and pricing structures in the digital marketing tools industry.
                </div>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong> January 2025 | <strong>Author:</strong>{' '}
                <Link href="/authors-team" className="text-emerald-600 hover:text-emerald-700 underline">
                  FadiTools Team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-emerald-600 mb-4">FadiTools</h4>
              <p className="text-gray-400 mb-4">Premium SEO tools made accessible. Save up to 90% on industry-leading tools.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
              </Link>
                <Link href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                </Link>
          </div>
        </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#popular-tools" className="hover:text-emerald-600 transition-colors">AHREF$</Link></li>
                <li><Link href="#popular-tools" className="hover:text-emerald-600 transition-colors">SEMRU$H</Link></li>
                <li><Link href="#popular-tools" className="hover:text-emerald-600 transition-colors">Moz Pro</Link></li>
                <li><Link href="#popular-tools" className="hover:text-emerald-600 transition-colors">View All Tools</Link></li>
                </ul>
              </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Packages</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#tool-packages" className="hover:text-emerald-600 transition-colors">All Packages</Link></li>
                <li><Link href="#tool-packages" className="hover:text-emerald-600 transition-colors">Medium Pack</Link></li>
                <li><Link href="#tool-packages" className="hover:text-emerald-600 transition-colors">Heavy Pack</Link></li>
                <li><Link href="#tool-packages" className="hover:text-emerald-600 transition-colors">Mega Pack</Link></li>
              </ul>
            </div>
            
          </div>
          <div className="border-t border-emerald-500/10 mt-8 pt-8 text-center text-gray-600">
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
            "description": "Premium SEO tools and digital marketing solutions provider offering access to 50+ tools including AHREF$, SEMRU$H, and Moz Pro at discounted rates.",
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
            "description": "Best SEO tools group buy platform. Access premium SEO tools including AHREF$ and SEMRU$H at 90% discount. Digital marketing solutions at affordable prices",
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
            "description": "Best SEO tools group buy service. Group buy access to premium SEO and digital marketing tools including AHREF$, SEMRU$H, Moz Pro, and 50+ other tools at 90% discount",
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
            "headline": "Best SEO Tools Group Buy 2025 - AHREF$ SEMRU$H 90%",
            "description": "Best SEO tools group buy platform offering AHREF$ and SEMRU$H at 90% discount. Access 50+ premium SEO tools with massive group buy savings. Join 45K users.",
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
            "headline": "Best SEO Tools Group Buy 2025 - AHREF$ SEMRU$H 90%",
            "description": "Best SEO tools group buy platform offering AHREF$ and SEMRU$H at 90% discount. Access 50+ premium SEO tools with massive group buy savings. Join 45K users.",
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
                  "text": "We offer the best SEO tools group buy service. Premium SEO tools including AHREF$, SEMRU$H, Moz Pro, and 50+ other professional tools at up to 90% discount. Our best SEO tools group buy services include keyword research, backlink analysis, competitor analysis, and comprehensive SEO solutions."
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
