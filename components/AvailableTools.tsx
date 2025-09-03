'use client'

import { Check } from 'lucide-react'
import { Tool } from '@/types'
import Link from 'next/link'

interface AvailableToolsProps {
  tools: Tool[]
  totalTools?: number
}

export default function AvailableTools({ tools, totalTools = 0 }: AvailableToolsProps) {
  const benefits = [
    'Access to Premium SEO Tools',
    'Keyword Research & Analysis',
    'Competitor Analysis Tools',
    'Backlink Monitoring & Building',
    'Rank Tracking & SERP Analysis',
    'Content Optimization Tools',
    'Technical SEO Auditing',
    'Social Media Management',
    'PPC Campaign Management',
    'Email Marketing Automation',
    'Website Speed Optimization',
    'Local SEO & Google My Business',
    'Link Building Opportunities',
    'Content Writing AI Tools',
    'Graphic Design Resources',
    'Video Editing Software',
    'Analytics & Reporting Tools',
    '24/7 Customer Support'
  ]

  return (
    <section id="tools" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Available Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We are giving you more than <span className="font-bold text-blue-600">{totalTools || 42}+ Premium tools</span> within a very cheap rate
          </p>
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-sm uppercase tracking-wide">
            THE BEST SOLUTION FOR YOUR BUSINESS
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {benefit}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Tools Preview */}
        {tools.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Featured Tools ({tools.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tools.slice(0, 6).map((tool) => {
                const slug = tool.slug || tool.name.toLowerCase().replace(/\s+/g, '-')
                return (
                  <div
                    key={tool.id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className={`bg-gradient-to-r ${tool.color || 'from-blue-500 to-blue-600'} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
                      {tool.icon || '🔧'}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tool.description}</p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">{tool.price}</span>
                        <Link
                          href={`/tools/${slug}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Learn More →
                        </Link>
                      </div>
                      <a 
                        href={tool.buyUrl || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Add to Cart
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* View All Tools Button */}
            <div className="text-center">
              <Link
                href="/tools"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All {totalTools || 42}+ Tools →
              </Link>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {totalTools || 42}+
              </div>
              <div className="text-gray-600 font-medium">Premium Tools</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">Uptime</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">5000+</div>
              <div className="text-gray-600 font-medium">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
