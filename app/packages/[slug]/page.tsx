import { Metadata } from 'next'
import { getPackageBySlug } from '@/lib/api'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import { Package } from '@/types'
import Link from 'next/link'
import { generateCanonicalUrl } from '@/lib/canonical'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pkg = await getPackageBySlug(params.slug)
  
  if (!pkg) {
    return {
      title: 'Package Not Found | FadiTools',
      description: 'The requested package could not be found.',
      robots: {
        index: false,
        follow: false,
      }
    }
  }
  
  const title = `${pkg.name} - SEO Tools Bundle | FadiTools`
  const description = pkg.description || `Get ${pkg.name} - premium SEO tools bundle at 90% discount. Affordable SEO packages for agencies and marketers. Save thousands on multiple tools.`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://faditools.com/packages/${pkg.slug || pkg.id}`,
      siteName: 'FadiTools',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: generateCanonicalUrl(`/packages/${pkg.slug || pkg.id}`),
    },
    robots: { index: true, follow: true },
    keywords: [pkg.name, 'SEO package', 'digital marketing', 'tools bundle', 'marketing software'],
  }
}

export default async function PackagePage({ params }: { params: { slug: string } }) {
  const pkg = await getPackageBySlug(params.slug)

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 text-center border border-white/20">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Package Not Found</h3>
          <p className="text-gray-600 mb-6">The requested package could not be found.</p>
          <Link
            href="/packages"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Browse All Packages
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
        {/* Hero Section */}
        <div className={`bg-gradient-to-r ${pkg.color} text-white relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-36 -translate-y-36"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center">
              <div className="text-8xl mb-6 animate-bounce">{pkg.icon}</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">{pkg.name}</h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
                {pkg.description}
              </p>
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="text-4xl md:text-5xl font-bold">{pkg.price}</div>
                <div className="text-xl text-white/80">{pkg.toolCount} tools included</div>
                {pkg.popular && (
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                    ⭐ Popular Choice
                  </span>
                )}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://members.seotoolsgroupbuy.us/signup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
                >
                  Get Started Now
                </a>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What's Included</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to supercharge your digital marketing efforts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pkg.features?.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Included Section */}
        {pkg.tools && pkg.tools.length > 0 && (
          <div className="bg-white/50 backdrop-blur-xl py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Tools Included</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Professional-grade tools to elevate your marketing game
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pkg.tools.map((tool, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">🛠️</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{tool}</h3>
                        <p className="text-sm text-gray-600">Professional marketing tool</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Comparison */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose This Package?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get more value than buying tools individually
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Individual Tool Prices</h3>
                <div className="space-y-3">
                  {pkg.tools?.map((tool, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{tool}</span>
                      <span className="font-bold text-gray-900">$99</span>
                    </div>
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Individual Cost</span>
                      <span className="text-red-600">${pkg.tools.length * 99}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Package Price</h3>
                <div className="text-6xl font-bold text-green-600 mb-4">{pkg.price}</div>
                <div className="text-2xl font-bold text-green-600 mb-6">
                  Save ${pkg.savings}!
                </div>
                <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Get Package Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/50 backdrop-blur-xl py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What's included in this package?</h3>
                <p className="text-gray-600">This package includes {pkg.toolCount} professional marketing tools to help you grow your business.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How do I get access to the tools?</h3>
                <p className="text-gray-600">After purchase, you'll receive immediate access to all tools included in the package.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Is there a money-back guarantee?</h3>
                <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee on all our packages.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of marketers who have already transformed their business with our tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Get {pkg.name} Now
              </button>
              <Link
                href="/packages"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                View All Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
