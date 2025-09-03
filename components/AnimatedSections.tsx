'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

// Why Choose FadiTools Section - Animations removed
export const WhyChooseSection = () => {
  return (
    <section className="py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 mt-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary-500">
              Why Choose FadiTools?
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Experience premium SEO tools at affordable prices with unmatched reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Affordable Price */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2454/2454282.png"
                  alt="Affordable Price"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Affordable Price</h3>
              <p className="text-sm text-gray-600 text-center">
                High quality cheap SEO tools at unbelievable <span className="text-primary-500 font-semibold">affordable monthly fee</span>.
              </p>
            </div>
          </div>

          {/* Unique Access */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/483/483408.png"
                  alt="Unique Access"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Unique Access</h3>
              <p className="text-sm text-gray-600 text-center">
                Access <span className="text-primary-500 font-semibold">shared SEO tools</span> through our unique in-house developed system.
              </p>
            </div>
          </div>

          {/* Highest Uptime */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1055/1055683.png"
                  alt="Highest Uptime"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Highest Uptime</h3>
              <p className="text-sm text-gray-600 text-center">
                With our unique self developed system to access <span className="text-primary-500 font-semibold">group buy seo tools</span> service easily.
              </p>
            </div>
          </div>

          {/* Secure & Safe */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://img.icons8.com/color/96/shield.png"
                  alt="Secure & Safe"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Secure & Safe</h3>
              <p className="text-sm text-gray-600 text-center">
                Nothing to worry about using <span className="text-primary-500 font-semibold">FadiTools</span> - no suspicious software to install, 100% clean.
              </p>
            </div>
          </div>

          {/* Worldwide User */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://img.icons8.com/color/96/globe.png"
                  alt="Worldwide User"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Worldwide User</h3>
              <p className="text-sm text-gray-600 text-center">
                It does not matter where you live, you are welcome to use <span className="text-primary-500 font-semibold">FadiTools</span> services!
              </p>
            </div>
          </div>

          {/* Cloud Based */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://img.icons8.com/color/96/cloud.png"
                  alt="Cloud Based"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Cloud Based</h3>
              <p className="text-sm text-gray-600 text-center">
                Most tools are cloud based other using extension. All <span className="text-primary-500 font-semibold">SEO group buy</span> Works on any platform.
              </p>
            </div>
          </div>

          {/* Instant Access */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-4 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://img.icons8.com/color/96/lightning-bolt.png"
                  alt="Instant Access"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Instant Access</h3>
              <p className="text-sm text-gray-600 text-center">
               Instant and up-to-date results from industry's leading <span className="text-primary-500 font-semibold">group seo tools</span>. Access SEO Tools. Our system connects directly to all <span className="text-primary-500 font-semibold">Shared SEO tools 2025</span>.
              </p>
            </div>
          </div>
          

          {/* User Friendly */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-4 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://img.icons8.com/color/96/user.png"
                  alt="User Friendly"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">User Friendly</h3>
              <p className="text-sm text-gray-600 text-center">
                Clean, user-friendly dashboard, Login and select your favorite tool. Open your desired tool directly using unique <span className="text-primary-500 font-semibold">share seo tools system</span>.
              </p>
            </div>
          </div>

          {/* Premium Support */}
          <div className="group relative bg-background backdrop-blur-xl rounded-3xl p-4 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20">
            <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://img.icons8.com/color/96/headset.png"
                  alt="Premium Support"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Premium Support</h3>
              <p className="text-sm text-gray-600 text-center">
                All your queries will be answered within a few hours via multiple support channels by <span className="text-primary-500 font-semibold">Group buy SEO tools</span>. We are best <span className="text-primary-500 font-semibold">Flikover alternative</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Most Popular Tools Section - Animations removed
export const PopularToolsSection = () => {
  return (
    <section id="popular-tools" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary-500">
              Most Popular Tools
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Explore the same tools trusted by top digital marketing agencies worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {[
            {
              name: 'Ahrefs',
              id: 'ahrefs',
              price: '$18.00',
              originalPrice: '$99.00',
              image: '/images/tools/ahrefs-logo.svg',
              gradient: 'from-orange-500 to-red-500',
              description: 'Comprehensive SEO toolkit for keyword research and backlink analysis'
            },
            {
              name: 'SEMrush',
              id: 'semrush',
              price: '$5.00',
              originalPrice: '$119.95',
              image: '/images/tools/semrush-logo.svg',
              gradient: 'from-blue-500 to-purple-500',
              description: 'All-in-one marketing toolkit for competitive analysis'
            },
            {
              name: 'Moz Pro',
              id: 'moz',
              price: '$6.00',
              originalPrice: '$99.00',
              image: '/images/tools/moz-logo.svg',
              gradient: 'from-green-500 to-blue-500',
              description: 'Professional SEO software for rank tracking and optimization'
            },
            {
              name: 'Canva Pro',
              id: 'canva',
              price: '$3.66',
              originalPrice: '$12.99',
              image: 'https://img.icons8.com/color/96/canva.png',
              gradient: 'from-purple-500 to-pink-500',
              description: 'Professional design platform with premium templates'
            },
            {
              name: 'ChatGPT Plus',
              id: 'chatgpt-plus',
              price: '$5.00',
              originalPrice: '$20.00',
              image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
              gradient: 'from-green-500 to-emerald-500',
              description: 'Best text Based AI Co pilot'
            },
            {
              name: 'RunwayML',
              id: 'runwayml',
              price: '$10.00',
              originalPrice: '$35.00',
              image: 'https://img.icons8.com/color/96/runway.png',
              gradient: 'from-green-500 to-cyan-500',
              description: 'Best AI video Maker'
            },
            {
              name: 'Netflix',
              id: 'netflix',
              price: '$3.66',
              originalPrice: '$15.99',
              image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
              gradient: 'from-red-500 to-pink-500',
              description: 'Entertainment from TV series'
            },
            {
              name: 'Claude',
              id: 'claude',
              price: '$6.00',
              originalPrice: '$20.00',
              image: '/images/tools/claude-logo.svg',
              gradient: 'from-orange-500 to-yellow-500',
              description: 'AI coding vibe'
            }
          ].map((tool, index) => (
            <div 
              key={index} 
              className="group relative bg-background backdrop-blur-xl rounded-3xl p-6 border border-primary-500/15 hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20"
            >
              <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{tool.name}</h3>
                <p className="text-gray-600 text-sm text-center mb-6">{tool.description}</p>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-primary-500">{tool.price}</span>
                  <span className="text-gray-500 line-through ml-2">/month</span>
                  <div className="text-sm text-gray-500">vs {tool.originalPrice}/month</div>
                </div>
                <button className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold text-center block hover:bg-primary-600 transition-all duration-300 transform group-hover:scale-105">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Custom Pack Section - With subscription period buttons
export const CustomPackSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.3 })
  const [selectedPeriod, setSelectedPeriod] = useState('1-month')
  
  const periods = [
    { id: '1-month', label: '1 Month', multiplier: 1, logo: '⚡' },
    { id: '3-month', label: '3 Months', multiplier: 3, logo: '🔥' },
    { id: '6-month', label: '6 Months', multiplier: 6, logo: '💎' },
    { id: '1-year', label: '1 Year', multiplier: 12, logo: '👑' }
  ]

  // Function to get tool name from image path
  const getToolNameFromPath = (toolPath: string): string => {
    const fileName = toolPath.split('/').pop() || ''
    const toolName = fileName.replace('-logo.svg', '').replace('-tools.svg', '')
    
    // Convert to proper case
    if (toolName === 'semrush') return 'SEMrush'
    if (toolName === 'ahrefs') return 'Ahrefs'
    if (toolName === 'moz') return 'Moz Pro'
    if (toolName === 'canva') return 'Canva Pro'
    if (toolName === 'chatgpt') return 'ChatGPT'
    if (toolName === 'claude') return 'Claude'
    if (toolName === 'netflix') return 'Netflix'
    if (toolName === 'runwayml') return 'RunwayML'
    if (toolName === 'amazon') return 'Amazon Tools'
    
    return toolName.charAt(0).toUpperCase() + toolName.slice(1)
  }
  
  const basePrices: Record<string, number> = {
    'Medium Pack': 14.00,
    'Heavy Pack': 16.00,
    'Mega Pack': 18.00,
    'Mega Combo Pack': 28.00
  }
  
  const getPriceForPeriod = (basePrice: number, period: string) => {
    const periodData = periods.find(p => p.id === period)
    if (!periodData) return basePrice
    
    // Add $5 for each period beyond 1 month
    const additionalCost = (periodData.multiplier - 1) * 5
    return basePrice + additionalCost
  }
  
  return (
    <section ref={ref} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-primary-500 text-sm font-semibold mb-4">Custom Pack pricing</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary-500 text-center">
              Make your own pack by selecting tools
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            You can select any tools which you need and make a pack
          </p>
        </div>

        {/* Subscription Period Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {periods.map((period, index) => (
            <motion.button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`group relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                selectedPeriod === period.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white'
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glowing effect for selected button */}
              {selectedPeriod === period.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 animate-pulse"></div>
              )}
              
              {/* Main content */}
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{period.logo}</span>
                <span>{period.label}</span>
              </div>
              
              {/* Selection indicator */}
              {selectedPeriod === period.id && (
                <motion.div 
                  className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {[
            {
              name: 'Medium Pack',
              description: 'Perfect for small businesses and freelancers',
              price: '$14.00',
              tools: ['/images/tools/ahrefs-logo.svg', '/images/tools/semrush-logo.svg', '/images/tools/chatgpt-logo.svg'],
              isPopular: true,
              features: [
                'Choose any 10 tools from our list',
                'Make your own pack with your own chosen tools',
                'Some tools have extra addon fees'
              ],
              mainLogo: '/images/tools/ahrefs-logo.svg'
            },
            {
              name: 'Heavy Pack',
              description: 'Ideal for growing agencies and businesses',
              price: '$16.00',
              tools: ['/images/tools/netflix-logo.svg', '/images/tools/canva-logo.svg', '/images/tools/runwayml-logo.svg'],
              isPopular: false,
              features: [
                'Choose any 15 tools from our list',
                'Make your own pack with your own chosen tools',
                'Some tools have extra addon fees'
              ],
              mainLogo: '/images/tools/canva-logo.svg'
            },
            {
              name: 'Mega Pack',
              description: 'Complete solution for large organizations',
              price: '$18.00',
              tools: ['/images/tools/moz-logo.svg', '/images/tools/claude-logo.svg', '/images/tools/ahrefs-logo.svg'],
              isPopular: false,
              features: [
                'Choose any 20 tools from our list',
                'Make your own pack with your own chosen tools',
                'Some tools have extra addon fees'
              ],
              mainLogo: '/images/tools/chatgpt-logo.svg'
            },
            {
              name: 'Mega Combo Pack',
              description: 'Everything you need to dominate search results',
              price: '$28.00',
              tools: ['/images/tools/semrush-logo.svg', '/images/tools/chatgpt-logo.svg', '/images/tools/netflix-logo.svg', '/images/tools/canva-logo.svg'],
              isPopular: false,
              features: [
                'Get access to All of our tools',
                'Some tools have extra addon fees'
              ],
              mainLogo: '/images/tools/semrush-logo.svg'
            }
          ].map((pack, index) => (
            <motion.div 
              key={index} 
              className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {pack.isPopular && (
                <div className="absolute -top-3 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold z-20">
                  Popular
                </div>
              )}
              
              <div className="relative z-10">
                {/* Package Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src={pack.mainLogo}
                      alt={pack.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{pack.name}</h3>
                    <div className="text-sm text-green-600 font-medium">Custom Pack</div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{pack.description}</p>
                
                {/* Price and Tool Count */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ${getPriceForPeriod(basePrices[pack.name], selectedPeriod).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    /{selectedPeriod === '1-month' ? 'month' : selectedPeriod === '3-month' ? '3 months' : selectedPeriod === '6-month' ? '6 months' : 'year'}
                  </div>
                  {selectedPeriod !== '1-month' && (
                    <div className="text-sm text-green-600 mt-1">
                      Save ${((basePrices[pack.name] * (selectedPeriod === '3-month' ? 3 : selectedPeriod === '6-month' ? 6 : 12)) - getPriceForPeriod(basePrices[pack.name], selectedPeriod)).toFixed(2)} vs monthly
                    </div>
                  )}
                </div>
                
                {/* Tools List */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Sample Tools:</h4>
                  <div className="space-y-2">
                    {pack.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center gap-2">
                        <img 
                          src={tool} 
                          alt="Tool" 
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-sm text-gray-700">
                          {getToolNameFromPath(tool)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Features List */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {pack.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={feature.includes('extra addon fees') ? 'text-purple-600' : ''}>
                          {feature}
                          {feature.includes('extra addon fees') && (
                            <svg className="w-4 h-4 inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <button 
                    className={`w-full py-2 px-4 font-medium text-center block transition-colors rounded-lg ${pack.isPopular ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Trust Section - Only animations added
export const TrustSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.3 })
  
  return (
    <section ref={ref} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary-500">
              Wondering if you can trust us?
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            We partner with industry-leading payment processors to ensure your transactions are secure and protected via an escrow. We use:
          </p>
        </div>

        {/* Payment Processors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mb-16">
          {[
            {
              name: 'PayPal',
              image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg',
              description: 'Trusted by millions worldwide'
            },
            {
              name: 'Visa',
              image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
              description: 'Worldwide acceptance'
            },
            {
              name: 'Mastercard',
              image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
              description: 'Global payment network'
            }
          ].map((processor, index) => (
            <motion.div 
              key={index}
              className="group relative bg-background backdrop-blur-xl rounded-3xl p-8 border border-primary-500/15 hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-500/20"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg p-3 border border-gray-200">
                  <img 
                    src={processor.image} 
                    alt={processor.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{processor.name}</h3>
                <p className="text-gray-600 text-center">{processor.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {[
            {
              title: '100% Fraud Protection',
              description: 'Advanced escrow system (Stripe, PayPal, SSLcommerz) ensures your money is protected until service delivery.',
              icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
            },
            {
              title: 'Service Guarantee',
              description: 'If no service is received, automatic refund is processed within 24 hours via those Payment systems',
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            },
            {
              title: 'Registered Company',
              description: 'We\'re officially (Govt) registered Private limited Company with company number 13660153. We have a lot of reputation',
              icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            }
          ].map((guarantee, index) => (
            <motion.div 
              key={index}
              className="group relative bg-background backdrop-blur-xl rounded-3xl p-8 border border-primary-500/15 hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/20"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -20, scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-[#FFFFFF] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={guarantee.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{guarantee.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{guarantee.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
