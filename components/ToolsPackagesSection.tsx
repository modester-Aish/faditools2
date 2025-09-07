'use client'

import Link from 'next/link'
import Typewriter from './Typewriter'
import { useState } from 'react'

export const ToolsPackagesSection = () => {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)
  // Only the packages data from faditools.com/packages
  const packages = [
    {
      id: 'seo-combo',
      name: 'SEO Combo',
      price: '$25.00',
      description: 'Essential SEO tools for professionals',
      toolCount: 11,
      tools: ['SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic'],
      allTools: [
        'SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic', 'SpyFu',
        'Screaming Frog', 'GTmetrix', 'Pingdom', 'Yoast SEO',
        'Rank Math', 'SEO PowerSuite'
      ],
      savings: 'Save $30',
      popular: false,
      mainLogo: '/images/tools/semrush-logo.svg',
      icon: 'SEO Combo icon'
    },
    {
      id: 'heavy-pack',
      name: 'Heavy Pack',
      price: '$35.00',
      description: 'Complete digital marketing solution',
      toolCount: 15,
      tools: ['SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic'],
      allTools: [
        'SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic', 'SpyFu',
        'Canva Pro', 'Grammarly', 'BuzzSumo', 'Hootsuite',
        'Buffer', 'Mailchimp', 'ConvertKit', 'Hotjar',
        'Google Analytics', 'Search Console'
      ],
      savings: 'Save $45',
      popular: true,
      mainLogo: '/images/tools/canva-logo.svg',
      icon: 'Heavy Pack icon'
    },
    {
      id: 'mega-pack',
      name: 'Mega Pack',
      price: '$45.00',
      description: 'Advanced tools for agencies',
      toolCount: 20,
      tools: ['SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic'],
      allTools: [
        'SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic', 'SpyFu',
        'Canva Pro', 'Grammarly', 'BuzzSumo', 'Hootsuite',
        'Buffer', 'Mailchimp', 'ConvertKit', 'Hotjar',
        'Google Analytics', 'Search Console', 'Ubersuggest',
        'KWFinder', 'SurferSEO', 'ContentKing', 'DeepCrawl'
      ],
      savings: 'Save $60',
      popular: false,
      mainLogo: '/images/tools/chatgpt-logo.svg',
      icon: 'Mega Pack icon'
    },
    {
      id: 'mega-combo-pack',
      name: 'Mega Combo Pack',
      price: '$65.00',
      description: 'All premium tools included',
      toolCount: 42,
      tools: ['SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic'],
      allTools: [
        'SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic', 'SpyFu',
        'Canva Pro', 'Grammarly', 'BuzzSumo', 'Hootsuite',
        'Buffer', 'Mailchimp', 'ConvertKit', 'Hotjar',
        'Google Analytics', 'Search Console', 'Ubersuggest',
        'KWFinder', 'SurferSEO', 'ContentKing', 'DeepCrawl',
        'ChatGPT Plus', 'Claude Pro', 'Jasper AI', 'Copy.ai',
        'RunwayML', 'Midjourney', 'DALL-E', 'Stable Diffusion',
        'Netflix', 'Spotify', 'Adobe Creative Suite', 'Figma',
        'Notion', 'Slack', 'Zoom', 'Loom', 'Calendly',
        'HubSpot', 'Salesforce', 'Zapier', 'Airtable', 'Monday.com'
      ],
      savings: 'Save $100',
      popular: false,
      mainLogo: '/images/tools/ahrefs-logo.svg',
      icon: 'Mega Combo Pack icon'
    }
  ]

  return (
    <section id="tool-packages" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 mt-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-emerald-600">
              Tool Packages
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Get more value with our curated packages. Combine multiple tools and save money while building your complete digital marketing toolkit.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 relative">
          {/* Tooltip for additional tools - positioned above cards */}
          {hoveredPackage && (
            <div className="absolute -top-32 left-0 right-0 z-50 flex justify-center">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-fade-in">
                <div className="text-sm font-medium text-gray-900 mb-3 text-center">
                  All {packages.find(p => p.id === hoveredPackage)?.toolCount} tools included:
                </div>
                <div className="w-full max-w-4xl">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {packages.find(p => p.id === hoveredPackage)?.allTools.map((tool, toolIndex) => (
                      <button
                        key={toolIndex}
                        className="px-3 py-2 text-sm bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                        title={tool}
                      >
                        <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0"></div>
                        <span>{tool}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </div>
            </div>
          )}
          
          {packages.map((pkg, index) => (
            <div 
              key={pkg.id} 
              className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden flex flex-col"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {pkg.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-full text-sm font-bold z-50 animate-bounce-subtle shadow-lg">
                  Popular
                </div>
              )}
              
              <div className="relative z-10 flex-1 flex flex-col">
                {/* Package Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 animate-float-delay-1">
                    <img
                      src={pkg.mainLogo}
                      alt={pkg.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{pkg.name}</h3>
                    <div className="text-sm text-green-600 font-medium">{pkg.savings}</div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                
                {/* Price and Tool Count */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{pkg.price}</div>
                  <div className="text-sm text-gray-500">{pkg.toolCount} tools</div>
                </div>
                
                {/* Tools List */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Includes:</h4>
                  <div className="space-y-2">
                    {pkg.tools.map((tool, toolIndex) => {
                      // Get the correct logo path for each tool
                      const getToolLogo = (toolName: string) => {
                        const toolNameLower = toolName.toLowerCase().replace(' ', '-')
                        switch (toolNameLower) {
                          case 'semrush':
                            return '/images/tools/semrush-logo.svg'
                          case 'ahrefs':
                            return '/images/tools/ahrefs-logo.svg'
                          case 'moz-pro':
                            return '/images/tools/moz-logo.svg'
                          case 'majestic':
                            return '/images/tools/seo-tools.svg'
                          default:
                            return '/images/tools/seo-tools.svg'
                        }
                      }
                      
                      return (
                        <div key={toolIndex} className="flex items-center gap-2">
                          <img 
                            src={getToolLogo(tool)}
                            alt={tool}
                            className="w-5 h-5 object-contain"
                          />
                          <span className="text-sm text-gray-700">{tool}</span>
                        </div>
                      )
                    })}
                    {/* Hover tooltip for additional tools */}
                    <div className="relative">
                      <div 
                        className="text-sm text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors duration-200"
                        onMouseEnter={() => setHoveredPackage(pkg.id)}
                        onMouseLeave={() => setHoveredPackage(null)}
                      >
                        +{pkg.toolCount - pkg.tools.length} more tools
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-auto pt-4">
                  <a 
                    href="https://members.seotoolsgroupbuy.us/signup" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg font-medium text-center block hover:bg-emerald-700 transition-colors transform group-hover:scale-105"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
              
              {/* Hover background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
