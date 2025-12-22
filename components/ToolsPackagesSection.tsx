'use client'

import { useState } from 'react'

export const ToolsPackagesSection = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})
  
  // Only the packages data from faditools.com/packages
  const packages = [
    {
      id: 'seo-combo',
      name: 'SEO Combo',
      price: '$30.00',
      description: 'Essential SEO tools for professionals',
      toolCount: 11,
      tools: ['SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic'],
      allTools: [
        'SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic', 'SpyFu',
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
      price: '$40.00',
      description: 'Complete digital marketing solution',
      toolCount: 15,
      tools: ['SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic'],
      allTools: [
        'SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic', 'SpyFu',
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
      price: '$50.00',
      description: 'Advanced tools for agencies',
      toolCount: 20,
      tools: ['SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic'],
      allTools: [
        'SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic', 'SpyFu',
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
      tools: ['SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic'],
      allTools: [
        'SEMRU$H', 'AHREF$', 'Moz Pro', 'Majestic', 'SpyFu',
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
              <strong>Best SEO Tools Group Buy</strong> Packages
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Get more value with our curated packages. Combine multiple tools and save money while building your complete digital marketing toolkit.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.id}
              className="relative h-[520px]"
              style={{ perspective: '1000px' }}
              onMouseLeave={() => setFlippedCards(prev => ({ ...prev, [pkg.id]: false }))}
            >
              <div
                className={`relative w-full h-full transition-all duration-700`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCards[pkg.id] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front Side - Original Design */}
                <div 
                  className="absolute w-full h-full group bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden flex flex-col"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-full text-sm font-bold z-50 animate-bounce-subtle shadow-lg">
                      Popular
                    </div>
                  )}
                  
                  <div className="relative z-10 flex flex-col h-full">
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
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">{pkg.name}</h3>
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
                    <div className="mb-6 flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Includes:</h4>
                      <div className="space-y-2">
                        {pkg.tools.map((tool, toolIndex) => {
                          // Get the correct logo path for each tool
                          const getToolLogo = (toolName: string) => {
                            const toolNameLower = toolName.toLowerCase().replace(/\$/g, '').replace(' ', '-')
                            switch (toolNameLower) {
                              case 'semru$h':
                              case 'semrush':
                                return '/images/tools/semrush-logo.svg'
                              case 'ahref$':
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
                        {/* Click to view all tools - replaces tooltip */}
                        <button
                          onClick={() => setFlippedCards(prev => ({ ...prev, [pkg.id]: true }))}
                          className="text-sm text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors duration-200 underline"
                        >
                          +{pkg.toolCount - pkg.tools.length} more tools
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons - Fixed at bottom */}
                    <div className="pt-4">
                      <a 
                        href="https://members.seotoolsgroupbuy.us/signup" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-semibold text-center block hover:bg-emerald-700 transition-colors transform group-hover:scale-105 shadow-lg"
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

                {/* Back Side */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/15 shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    pointerEvents: flippedCards[pkg.id] ? 'auto' : 'none'
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Return instruction */}
                    <div className="text-gray-500 text-sm mb-4">
                      ← Hover out to return
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      All {pkg.toolCount} Tools
                    </h3>

                    {/* Tools List */}
                    <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '330px' }}>
                      <div className="grid grid-cols-1 gap-2">
                        {pkg.allTools.map((tool, i) => (
                          <div key={i} className="flex items-start text-sm">
                            <svg className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .backface-hidden {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }

          /* Animation keyframes */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes bounceSubtle {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }

          .animate-float-delay-1 {
            animation: float 3s ease-in-out infinite;
          }

          .animate-bounce-subtle {
            animation: bounceSubtle 2s ease-in-out infinite;
          }

          /* Custom scrollbar for tools list */
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
      </div>
    </section>
  )
}