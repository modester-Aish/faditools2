import { Metadata } from 'next'
import { getToolBySlug } from '@/lib/api'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import { Tool } from '@/types'
import { generateCanonicalUrl } from '@/lib/canonical'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug)
  
  if (!tool) {
    return {
      title: 'Tool Not Found | FadiTools',
      description: 'The requested tool could not be found.',
      robots: {
        index: false,
        follow: false,
      }
    }
  }
  
  const title = `${tool.name} group buy - ${tool.price} ${tool.period} | FadiTools`
  const description = tool.description || `Get ${tool.name} group buy access at 90% discount. ${tool.name} alternative with affordable pricing. Join thousands of marketers saving on premium SEO tools.`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://faditools.com/tools/${tool.slug || tool.id}`,
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
      canonical: generateCanonicalUrl(`/tools/${tool.slug || tool.id}`),
    },
    robots: { index: true, follow: true },
    keywords: [tool.name, 'digital marketing', 'SEO', 'tools', 'marketing software'],
  }
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug)

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tool Not Found</h3>
          <p className="text-sm text-gray-500 mb-4">The requested tool could not be found.</p>
          <a
            href="/tools"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse All Tools
          </a>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className={`bg-gradient-to-r ${tool.color} text-white`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="text-6xl mb-4">{tool.icon}</div>
              <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
                {tool.description}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-3xl font-bold">{tool.price}</div>
                <div className="text-lg text-white/80">{tool.period}</div>
                {tool.popular && (
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tool Details */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tool Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {tool.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {tool.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Price:</span>
                    <span className="font-semibold text-lg">{tool.price}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Period:</span>
                    <span className="font-medium">{tool.period}</span>
                  </div>
                  {tool.popular && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-24">Status:</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        Popular Choice
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started Today</h3>
                <p className="text-gray-600 mb-6">
                  Ready to boost your digital marketing efforts? Get access to {tool.name} now.
                </p>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Add to Cart - {tool.price}
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Learn More
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Full access to all features
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      24/7 customer support
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Regular updates and improvements
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
