'use client'

import { Package } from '../types'
import Link from 'next/link'

interface PricingProps {
  packages: Package[]
  totalPackages?: number
}

export default function Pricing({ packages, totalPackages = 0 }: PricingProps) {

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SEO Tools Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Always know what you'll pay
          </p>
        </div>

        {/* Individual Tools CTA */}
        <div className="mb-20 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Individual Tools
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose from our comprehensive collection of individual tools, each designed to enhance your digital marketing efforts.
          </p>
          <Link
            href="/tools"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Browse All Tools
          </Link>
        </div>

        {/* Combo Packages */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Combo Packages ({packages.length} of {totalPackages})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up ${
                  pkg.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${pkg.color || 'from-green-500 to-green-600'} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl`}>
                    {pkg.icon || '📦'}
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h4>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {pkg.price || '$0.00'}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">/month</span>
                  </div>
                  
                  {pkg.savings && (
                    <div className="text-green-600 font-semibold text-sm mb-3">
                      {pkg.savings}
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {pkg.description || 'No description available'}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-blue-600 font-semibold">
                      {pkg.toolCount || 0} Tools Included
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                                      <Link
                    href={`/packages/${pkg.slug || pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block text-center ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    }`}
                  >
                      View Package
                    </Link>
                    <a 
                      href={pkg.buyUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block text-center bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                    >
                      Add to Cart
                    </a>
                  </div>
                  
                  {/* Tools Preview */}
                  {pkg.tools && pkg.tools.length > 0 && (
                  <div className="text-left">
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Includes:</h5>
                      <div className="space-y-1">
                        {pkg.tools.slice(0, 3).map((tool, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center">
                            <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                          {tool}
                          </div>
                        ))}
                        {pkg.tools.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{pkg.tools.length - 3} more tools
                          </div>
                        )}
                  </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Packages Button */}
          {totalPackages > packages.length && (
            <div className="text-center mt-12">
              <Link
                href="/packages"
                className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All {totalPackages} Packages →
              </Link>
            </div>
          )}
        </div>

        {/* Value Proposition */}
        <div className="bg-white py-16 mt-20 rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Packages?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get the most value for your investment with our carefully designed packages
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Money</h3>
                <p className="text-gray-600">Get multiple tools at a discounted price compared to buying individually.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Selection</h3>
                <p className="text-gray-600">Carefully selected tools that work together to achieve your goals.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Maximum Value</h3>
                <p className="text-gray-600">Get the most out of your investment with comprehensive tool coverage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
