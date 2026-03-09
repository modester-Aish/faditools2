'use client'

import { useState } from 'react'
import { generateBuyUrl, SIGNUP_URL } from '@/data/product-id-mapping'

const TOOL_LOGO_MAP: Record<string, string> = {
  semrush: '/images/tools/semrush-logo.svg',
  ahrefs: '/images/tools/ahrefs-logo.svg',
  moz: '/images/tools/moz-logo.svg',
  majestic: '/images/tools/seo-tools.svg',
  kwfinder: '/images/tools/seo-tools.svg',
  ubersuggest: '/images/tools/seo-tools.svg',
  spyfu: '/images/tools/seo-tools.svg',
  woorank: '/images/tools/seo-tools.svg',
  chatgpt: '/images/tools/chatgpt-logo.svg',
  grammarly: '/images/tools/content-tools.svg',
  quillbot: '/images/tools/content-tools.svg',
  jasper: '/images/tools/ai-tools.svg',
  writesonic: '/images/tools/ai-tools.svg',
  rytr: '/images/tools/ai-tools.svg',
  canva: '/images/tools/canva-logo.svg',
  crello: '/images/tools/design-tools.svg',
  netflix: '/images/tools/netflix-logo.svg',
  claude: '/images/tools/claude-logo.svg',
  leonardo: '/images/tools/ai-tools.svg',
  prezi: '/images/tools/design-tools.svg',
  coursera: '/images/tools/content-tools.svg',
  udemy: '/images/tools/content-tools.svg',
  skillshare: '/images/tools/content-tools.svg',
  turnitin: '/images/tools/content-tools.svg',
}

function getToolLogo(toolName: string): string {
  const key = toolName
    .toLowerCase()
    .replace(/[@$]/g, (m) => (m === '@' ? 'a' : 's'))
    .replace(/\s+/g, ' ')
    .trim()
  const slug = key.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  for (const [name, logo] of Object.entries(TOOL_LOGO_MAP)) {
    if (slug.includes(name) || key.includes(name)) return logo
  }
  return '/images/tools/seo-tools.svg'
}

export const ToolsPackagesSection = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})
  
  // Only the packages data from faditools.com/packages
  const packages = [
    {
      id: 'seo-combo',
      name: 'SEO Combo',
      productId: '7',
      price: '$25.00',
      description: 'Essential SEO tools for professionals',
      allTools: [
        'Ahrefs', 'SEMrush Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 'SerpState', 'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer',
        'ChatGPT 4', 'Bypass GPT', 'Grammarly', 'Quetext premium', 'WordAi', 'Hix ai', 'Quillbot', 'Spin Rewriter', 'WordHero', 'WordTune', 'SmartCopy', 'CloserCopy', 'Copymatic ai', 'Jasper Ai', 'WriteSonic', 'Rytr me', 'Jenni ai',
        'CANVA pro', 'Crello', 'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 'Designs ai', 'CAPCUT Pro', 'PicsArt', 'Fotojet', 'IconScout', 'Renderforest', 'Invideo io',
        'GPL Themes/Plugins',
        'Netflix', 'Prime Video', 'Chaupal tv',
        'Indexification', 'Ecomhunt', 'Sell the trend', 'Niche Scraper', 'Helium 10', 'Semscoop', 'Buzzsumo', 'Picmonkey', 'Word Tracker',
        'Epidemicsound', 'Slidebean', 'Motionarray', 'Prezi', 'Udemy', 'Skill Share', 'Turnitin', 'Coursera', 'Scribd Premium'
      ],
      savings: 'Save $30',
      popular: false,
      icon: 'SEO Combo icon'
    },
    {
      id: 'heavy-pack',
      name: 'Small Pack',
      productId: '6',
      price: '$15.00',
      description: 'Complete digital marketing solution',
      allTools: [
        'SEMrush Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 'SerpState', 'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer',
        'ChatGPT 4', 'Grammarly', 'WordAi', 'Quillbot', 'Spin Rewriter', 'WordHero', 'WordTune', 'SmartCopy', 'CloserCopy', 'Copy ai', 'Copymatic ai', 'Jasper Ai', 'WriteSonic', 'Rytr me', 'Jenni ai',
        'CANVA pro', 'Crello', 'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 'StoryBlocks', 'Designs ai', 'PicsArt', 'Fotojet', 'IconScout', 'Renderforest',
        'GPL Themes/Plugins',
        'Netflix', 'Prime Video', 'Chaupal tv',
        'Indexification', 'Ecomhunt', 'Salehoo', 'Sell the trend', 'Niche Scraper', 'Helium 10', 'Semscoop', 'Buzzsumo', 'Buzzstream', 'Picmonkey', 'Word Tracker',
        'Epidemicsound', 'Slidebean', 'Motionarray', 'Prezi', 'Udemy', 'Skill Share', 'Turnitin', 'Linkedin Learning', 'Coursera', 'Scribd Premium'
      ],
      savings: 'Save $45',
      popular: true,
      icon: 'Small Pack icon'
    },
    {
      id: 'mega-pack',
      name: 'Mega Pack',
      productId: '1',
      price: '$50.00',
      description: 'Advanced tools for agencies',
      allTools: [
        'Ahrefs', 'SEMrush Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 'SerpState', 'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer', 'SEOSITECHECKUP',
        'ChatGPT 4', 'Bypass GPT', 'Grammarly', 'Quetext premium', 'WordAi', 'You Ai', 'Claude Ai', 'Hix Ai', 'Copy Ai', 'Jasper Ai', 'Copymatic Ai', 'Stealthwriter Ai', 'Jenni ai', 'Quillbot', 'Spin Rewriter', 'WordHero', 'WordTune', 'SmartCopy', 'CloserCopy', 'Writerzen', 'WriteSonic', 'Rytr me',
        'CANVA pro', 'Crello', 'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 'StoryBlocks', 'Designs ai', 'CAPCUT Pro', 'PicsArt', 'Fotojet', 'Invideo io', 'IconScout', 'Renderforest',
        'GPL Themes/Plugins',
        'Netflix', 'Prime Video', 'Chaupal tv',
        'Indexification', 'Ecomhunt', 'Sell the trend', 'SaleHoo', 'Niche Scraper', 'Helium 10', 'Jungle Scout', 'Viral Launch', 'Semscoop', 'Buzzsumo', 'Buzzstream', 'Se Ranking', 'Picmonkey', 'Word Tracker',
        'Epidemicsound', 'Slidebean', 'Motionarray', 'Prezi', 'Udemy', 'Skill Share', 'Turnitin', 'Linkedin Learning', 'Coursera', 'Scribd Premium'
      ],
      savings: 'Save $60',
      popular: false,
      icon: 'Mega Pack icon'
    },
    {
      id: 'mega-combo-pack',
      name: 'Writer Pack',
      productId: '8',
      price: '$15.00',
      description: 'All premium tools included',
      allTools: [
        'ChatGPT 4', 'Bypass GPT', 'Grammarly', 'Quetext', 'WordAi', 'You Ai', 'Claude Ai', 'Hix Ai', 'Copymatic AI', 'Jasper Ai', 'Copy AI', 'Stealthwriter Ai', 'Jeeni Ai', 'SpinRewriter', 'Quillbot', 'WordHero', 'SmartCopy', 'WordTune', 'CloserCopy', 'Writerzen', 'Writesonic', 'Rytr me',
        'Canva', 'Crello', 'WordTracker', 'Motionarray', 'Prezi', 'Turnitin', 'Coursera', 'Leonardo.AI'
      ],
      savings: 'Save $100',
      popular: false,
      icon: 'Writer Pack icon'
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
          {packages.map((pkg, index) => {
          const frontTools = pkg.allTools.slice(0, 4)
          const toolCount = pkg.allTools.length
          return (
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
                          src={getToolLogo(pkg.allTools[0] || '')}
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
                      <div className="text-sm text-gray-500">{toolCount} tools</div>
                    </div>
                    
                    {/* Tools List */}
                    <div className="mb-6 flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Includes:</h4>
                      <div className="space-y-2">
                        {frontTools.map((tool, toolIndex) => (
                            <div key={toolIndex} className="flex items-center gap-2">
                              <img
                                src={getToolLogo(tool)}
                                alt={tool}
                                className="w-5 h-5 object-contain flex-shrink-0"
                              />
                              <span className="text-sm text-gray-700">{tool}</span>
                            </div>
                          ))}
                        {/* Click to view all tools - replaces tooltip */}
                        <button
                          onClick={() => setFlippedCards(prev => ({ ...prev, [pkg.id]: true }))}
                          className="text-sm text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors duration-200 underline"
                        >
                          +{toolCount - frontTools.length} more tools
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons - Fixed at bottom */}
                    <div className="pt-4">
                      <a 
                        href={pkg.productId ? generateBuyUrl(pkg.productId) : SIGNUP_URL}
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
                      All {toolCount} Tools
                    </h3>

                    {/* Tools List */}
                    <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '330px' }}>
                      <div className="grid grid-cols-1 gap-2">
                        {pkg.allTools.map((tool, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <img
                              src={getToolLogo(tool)}
                              alt={tool}
                              className="w-5 h-5 object-contain flex-shrink-0"
                            />
                            <span className="text-gray-700">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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