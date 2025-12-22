'use client'

import { useState } from 'react'

interface PricingCard {
  name: string
  price: string
  toolCount: string
  description: string
  icon: string
  iconBgColor: string
  benefits: string[]
  tools: string[]
  isPopular?: boolean
}

const pricingData: PricingCard[] = [
  {
    name: 'SMALL PLAN',
    price: '$15',
    toolCount: '60+ Tools',
    description: 'Perfect for starters',
    icon: '⭐',
    iconBgColor: 'from-blue-500 to-blue-600',
    benefits: [
      'Complete SEO Suite',
      'AI Writing Tools',
      'Design & Graphics'
    ],
    tools: [
      'SEMRU$H Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 'SerpState', 
      'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer', 'ChatGPT 4', 'Grammarly', 'WordAi', 
      'Quillbot', 'Spin Rewriter', 'WordHero', 'WordTune', 'SmartCopy', 'CloserCopy', 'Copy ai', 
      'Copymatic ai', 'Jasper Ai', 'WriteSonic', 'Rytr me', 'Jenni ai', 'CANVA pro', 'Crello', 
      'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 'StoryBlocks', 'Designs ai', 'PicsArt', 
      'Fotojet', 'IconScout', 'Renderforest', 'GPL Themes/Plugins', 'Netflix', 'Prime Video', 
      'Chaupal tv', 'Indexification', 'Ecomhunt', 'Salehoo', 'Sell the trend', 'Niche Scraper', 
      'Helium 10', 'Semscoop', 'Buzzsumo', 'Buzzstream', 'Picmonkey', 'Word Tracker', 'Epidemicsound', 
      'Slidebean', 'Motionarray', 'Prezi', 'Udemy', 'Skill Share', 'Turnitin', 'Linkedin Learning', 
      'Coursera', 'Scribd Premium'
    ]
  },
  {
    name: 'AHREF$ COMBO',
    price: '$25',
    toolCount: '60+ Tools',
    description: 'Best value package',
    icon: '⚡',
    iconBgColor: 'from-orange-500 to-orange-600',
    benefits: [
      'Premium SEO Tools',
      'Advanced Analytics',
      'Content Creation'
    ],
    tools: [
      'AHREF$', 'SEMRU$H Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 
      'SerpState', 'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer', 'ChatGPT 4', 'Bypass GPT', 
      'Grammarly', 'Quetext premium', 'WordAi', 'Hix ai', 'Quillbot', 'Spin Rewriter', 'WordHero', 
      'WordTune', 'SmartCopy', 'CloserCopy', 'Copymatic ai', 'Jasper Ai', 'WriteSonic', 'Rytr me', 
      'Jenni ai', 'CANVA pro', 'Crello', 'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 
      'Designs ai', 'CAPCUT Pro', 'PicsArt', 'Fotojet', 'IconScout', 'Renderforest', 'Invideo io', 
      'GPL Themes/Plugins', 'Netflix', 'Prime Video', 'Chaupal tv', 'Indexification', 'Ecomhunt', 
      'Sell the trend', 'Niche Scraper', 'Helium 10', 'Semscoop', 'Buzzsumo', 'Picmonkey', 
      'Word Tracker', 'Epidemicsound', 'Slidebean', 'Motionarray', 'Prezi', 'Udemy', 'Skill Share', 
      'Turnitin', 'Coursera', 'Scribd Premium'
    ],
    isPopular: true
  },
  {
    name: 'MEGA PLAN',
    price: '$50',
    toolCount: '80+ Tools',
    description: 'Everything you need',
    icon: '👑',
    iconBgColor: 'from-purple-500 to-purple-600',
    benefits: [
      'All Premium Tools',
      'E-commerce Suite',
      'Learning Platform'
    ],
    tools: [
      'AHREF$', 'SEMRU$H Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 
      'SerpState', 'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer', 'SEOSITECHECKUP', 'ChatGPT 4', 
      'Bypass GPT', 'Grammarly', 'Quetext premium', 'WordAi', 'You Ai', 'Claude Ai', 'Hix Ai', 'Copy Ai', 
      'Jasper Ai', 'Copymatic Ai', 'Stealthwriter Ai', 'Jenni ai', 'Quillbot', 'Spin Rewriter', 'WordHero', 
      'WordTune', 'SmartCopy', 'CloserCopy', 'Writerzen', 'WriteSonic', 'Rytr me', 'CANVA pro', 'Crello', 
      'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 'StoryBlocks', 'Designs ai', 'CAPCUT Pro', 
      'PicsArt', 'Fotojet', 'Invideo io', 'IconScout', 'Renderforest', 'GPL Themes/Plugins', 'Netflix', 
      'Prime Video', 'Chaupal tv', 'Indexification', 'Ecomhunt', 'Sell the trend', 'SaleHoo', 
      'Niche Scraper', 'Helium 10', 'Jungle Scout', 'Viral Launch', 'Semscoop', 'Buzzsumo', 'Buzzstream', 
      'Se Ranking', 'Picmonkey', 'Word Tracker', 'Epidemicsound', 'Slidebean', 'Motionarray', 'Prezi', 
      'Udemy', 'Skill Share', 'Turnitin', 'Linkedin Learning', 'Coursera', 'Scribd Premium'
    ]
  },
  {
    name: 'LITE PLAN',
    price: '$10',
    toolCount: 'SEMRU$H Combo, 20+ Tools',
    description: 'Essential tools',
    icon: '⭐',
    iconBgColor: 'from-blue-500 to-blue-600',
    benefits: [
      'Essential SEO',
      'Basic Design',
      'Entertainment'
    ],
    tools: [
      'SEMRU$H Guru', 'MOZ Pro', 'Ubersuggest', 'Woorank', 'Grammarly', 'WordAi', 'Quillbot', 'Canva', 
      'Crello', 'Envato Elements', 'FotoJet', 'Invideo io', 'Netflix', 'Prime Video', 'Buzzsumo', 
      'Picmonkey', 'Motionarray', 'SkillShare', 'Turnitin', 'Linkedin Learning'
    ]
  },
  {
    name: 'WRITER PLAN',
    price: '$15',
    toolCount: '30+ Tools',
    description: 'For content creators',
    icon: '⚡',
    iconBgColor: 'from-orange-500 to-orange-600',
    benefits: [
      'AI Writing Suite',
      'Content Tools',
      'Grammar Check'
    ],
    tools: [
      'ChatGPT 4', 'Bypass GPT', 'Grammarly', 'Quetext', 'WordAi', 'You Ai', 'Claude Ai', 'Hix Ai', 
      'Copymatic AI', 'Jasper Ai', 'Copy AI', 'Stealthwriter Ai', 'Jeeni Ai', 'SpinRewriter', 'Quillbot', 
      'WordHero', 'SmartCopy', 'WordTune', 'CloserCopy', 'Writerzen', 'Writesonic', 'Rytr me', 'Canva', 
      'Crello', 'WordTracker', 'Motionarray', 'Prezi', 'Turnitin', 'Coursera', 'Leonardo.AI'
    ]
  },
  {
    name: 'DESIGNER PLAN',
    price: '$10',
    toolCount: '15+ Tools',
    description: 'For designers',
    icon: '👑',
    iconBgColor: 'from-purple-500 to-purple-600',
    benefits: [
      'Design Software',
      'Stock Assets',
      'Video Tools'
    ],
    tools: [
      'Canva Pro', 'Crello', 'Envato Elements', 'Freepik', 'Vecteezy', 'Storyblocks', 'Videoblocks', 
      'Audioblocks', 'Designs AI', 'CAPCUT Pro', 'FotoJet', 'Invideo io', 'GPL Themes/Plugins', 
      'Leonardo.AI', 'Renderforest', 'IconScout'
    ]
  }
]

export default function InteractivePricingCards() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})

  const handleViewTools = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: true }))
  }

  const handleMouseLeave = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: false }))
  }

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600">
            Get instant access to premium tools at unbeatable prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingData.map((card, index) => (
            <div
              key={index}
              className="relative h-[500px]"
              style={{ perspective: '1000px' }}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d ${
                  flippedCards[index] ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front Side */}
                <div
                  className="absolute w-full h-full backface-hidden group bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl border border-emerald-500/15 hover:border-emerald-500/30 rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  {card.isPopular && (
                    <div className="absolute -top-3 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold z-50 animate-bounce-subtle shadow-lg">
                      Most Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-4 relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${card.iconBgColor} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 animate-float-delay-1`}>
                      {card.icon}
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2 relative z-10 group-hover:text-emerald-600 transition-colors duration-300">
                    {card.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center text-sm mb-4 relative z-10">
                    {card.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-4 relative z-10">
                    <span className="text-4xl font-bold text-red-600">{card.price}</span>
                    <span className="text-gray-600 text-lg">/month</span>
                  </div>

                  {/* Tool Count */}
                  <div className="text-center mb-6 relative z-10">
                    <span className="text-sm font-semibold text-gray-700">{card.toolCount}</span>
                  </div>

                  {/* Benefits */}
                  <div className="flex-1 mb-6 relative z-10">
                    <ul className="space-y-3">
                      {card.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Tools Button */}
                  <button
                    onClick={() => handleViewTools(index)}
                    className="text-red-600 underline text-sm font-medium mb-4 hover:text-red-700 transition-colors relative z-10"
                  >
                    View included tools
                  </button>

                  {/* Get Access Button */}
                  <a
                    href="https://members.seotoolsgroupbuy.us/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 relative z-10 transform group-hover:scale-105 shadow-lg ${
                      card.isPopular
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    Get Instant Access
                  </a>
                  
                  {/* Hover background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute w-full h-full backface-hidden bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl border border-emerald-500/15 rounded-2xl shadow-2xl p-6"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    pointerEvents: flippedCards[index] ? 'auto' : 'none'
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Return instruction */}
                    <div className="text-gray-500 text-sm mb-4">
                      ← Hover out to return
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {card.name} Tools
                    </h3>

                    {/* Tools List */}
                    <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '400px' }}>
                      <div className="grid grid-cols-2 gap-2">
                        {card.tools.map((tool, i) => (
                          <div key={i} className="flex items-start text-sm">
                            <svg className="w-4 h-4 text-red-600 mr-1 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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
      </div>

      <style jsx>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
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
    </section>
  )
}

