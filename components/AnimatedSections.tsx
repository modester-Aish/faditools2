'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Typewriter from './Typewriter'
import ModernReveal from './ModernReveal'

// Why Choose FadiTools Section - Animations removed
export const WhyChooseSection = () => {
  return (
    <section className="py-12 relative contain-layout">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 mt-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <span className="text-emerald-600">
              Why Choose <span className="relative inline-block px-3 sm:px-4 py-2 min-h-[2.5rem] min-w-[8rem]">
                <Image 
                  src="/stroke-removebg-preview.png" 
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  style={{ filter: 'hue-rotate(120deg) saturate(1.2) brightness(0.9)' }}
                  width={128}
                  height={40}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="relative z-10 text-white font-bold">FadiTools</span>
              </span>?
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            <span className="inline-block">
              Get group buy access to premium SEO tools including Ahrefs, SEMrush, and 50+ tools at 90% discount. Perfect for beginners, agencies, and small businesses.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Affordable Price */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2454/2454282.png"
                  alt="Group Buy Discounts - Save 90% on SEO Tools"
                  className="w-full h-full object-contain p-2"
                  width={80}
                  height={80}
                  loading="lazy"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Group Buy Discounts</h3>
              <p className="text-sm text-gray-600 text-center">
                Get premium SEO tools at <span className="text-emerald-600 font-semibold">90% off retail prices</span> with our group buy access.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Unique Access */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float-delay-1">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/483/483408.png"
                  alt="Premium SEO Tools Access - Ahrefs SEMrush Group Buy"
                  className="w-full h-full object-contain p-2"
                  width={80}
                  height={80}
                  loading="lazy"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Premium Tools Access</h3>
              <p className="text-sm text-gray-600 text-center">
                Access <span className="text-emerald-600 font-semibold">shared SEO tools</span> through our unique in-house developed system.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Highest Uptime */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float-delay-2">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1055/1055683.png"
                  alt="Reliable SEO Tools Service - 99.9% Uptime Guarantee"
                  className="w-full h-full object-contain p-2"
                  width={80}
                  height={80}
                  loading="lazy"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Reliable Service</h3>
              <p className="text-sm text-gray-600 text-center">
                <span className="text-emerald-600 font-semibold">99.9% uptime</span> with our unique system for accessing premium SEO tools.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Secure & Safe */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float-delay-3">
                <Image
                  src="https://img.icons8.com/color/96/shield.png"
                  alt="Secure SEO Tools Access - Safe Group Buy Platform"
                  className="w-full h-full object-contain p-2"
                  width={80}
                  height={80}
                  loading="lazy"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Safe & Secure</h3>
              <p className="text-sm text-gray-600 text-center">
                <span className="text-emerald-600 font-semibold">100% secure</span> group buy access - no software installation required, clean and safe.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Worldwide User */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float">
                <Image
                  src="https://img.icons8.com/color/96/globe.png"
                  alt="Global SEO Tools Access - Available Worldwide"
                  className="w-full h-full object-contain p-2"
                  width={80}
                  height={80}
                  loading="lazy"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Global Access</h3>
              <p className="text-sm text-gray-600 text-center">
                Available <span className="text-emerald-600 font-semibold">worldwide</span> - join users from 50+ countries using our SEO tools platform.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Cloud Based */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float-delay-1">
                <img
                  src="https://img.icons8.com/color/96/cloud.png"
                  alt="Cloud Based"
                  className="w-full h-full object-contain p-2"
                  width={64}
                  height={64}
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Cross-Platform</h3>
              <p className="text-sm text-gray-600 text-center">
                <span className="text-emerald-600 font-semibold">Cloud-based</span> SEO tools that work on any device - Windows, Mac, mobile, and tablets.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Instant Access */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-4 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.6s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float-delay-2">
                <img
                  src="https://img.icons8.com/color/96/lightning-bolt.png"
                  alt="Instant Access"
                  className="w-full h-full object-contain p-2"
                  width={64}
                  height={64}
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Instant Access</h3>
              <p className="text-sm text-gray-600 text-center">
                <span className="text-emerald-600 font-semibold">Instant access</span> to premium SEO tools with real-time data and up-to-date results.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
          

          {/* User Friendly */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-4 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.7s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float-delay-3">
                <img
                  src="https://img.icons8.com/color/96/user.png"
                  alt="User Friendly"
                  className="w-full h-full object-contain p-2"
                  width={64}
                  height={64}
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">User Friendly</h3>
              <p className="text-sm text-gray-600 text-center">
                Clean, user-friendly dashboard, Login and select your favorite tool. Open your desired tool directly using unique <span className="text-emerald-600 font-semibold">share seo tools system</span>.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Premium Support */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-4 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.8s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float">
                <img
                  src="https://img.icons8.com/color/96/headset.png"
                  alt="Premium Support"
                  className="w-full h-full object-contain p-2"
                  width={64}
                  height={64}
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">Premium Support</h3>
              <p className="text-sm text-gray-600 text-center">
                All your queries will be answered within a few hours via multiple support channels by <span className="text-emerald-600 font-semibold">Group buy SEO tools</span>. We are best <span className="text-emerald-600 font-semibold">Flikover alternative</span>.
              </p>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Most Popular Tools Section - Animations removed
export const PopularToolsSection = () => {
  return (
    <section id="popular-tools" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-emerald-600">
              <ModernReveal 
                text="Most Popular Tools" 
                delay={2500}
                repeatDelay={3000}
                className="text-emerald-600"
              />
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Explore the same tools trusted by top digital marketing agencies worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto px-4">
          {[
            {
              name: 'AHREF$',
              id: 'ahrefs',
              price: '$30.00',
              originalPrice: '$99.00',
              image: '/images/tools/ahrefs-logo.svg',
              description: 'Comprehensive SEO toolkit for keyword research and backlink analysis'
            },
            {
              name: 'SEMRU$H',
              id: 'semrush',
              price: '$4.99',
              originalPrice: '$119.95',
              image: '/images/tools/semrush-logo.svg',
              description: 'All-in-one marketing toolkit for competitive analysis'
            },
            {
              name: 'Moz Pro',
              id: 'moz',
              price: '$4.99',
              originalPrice: '$99.00',
              image: '/images/tools/moz-logo.svg',
              description: 'Professional SEO software for rank tracking and optimization'
            },
            {
              name: 'Canva Pro',
              id: 'canva',
              price: '$4.99',
              originalPrice: '$12.99',
              image: 'https://img.icons8.com/color/96/canva.png',
              description: 'Professional design platform with premium templates'
            },
            {
              name: 'ChatGPT Plus',
              id: 'chatgpt-plus',
              price: '$4.99',
              originalPrice: '$20.00',
              image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
              description: 'Best text Based AI Co pilot'
            },
            {
              name: 'RunwayML',
              id: 'runwayml',
              price: '$4.99',
              originalPrice: '$35.00',
              image: 'https://img.icons8.com/color/96/runway.png',
              description: 'Best AI video Maker'
            },
            {
              name: 'Netflix',
              id: 'netflix',
              price: '$4.99',
              originalPrice: '$15.99',
              image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
              description: 'Entertainment from TV series'
            },
            {
              name: 'Claude',
              id: 'claude',
              price: '$4.99',
              originalPrice: '$20.00',
              image: '/images/tools/claude-logo.svg',
              description: 'AI coding vibe'
            }
          ].map((tool, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 animate-float-delay-${index % 3}`}>
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center group-hover:text-emerald-600 transition-colors duration-300">{tool.name}</h3>
                <p className="text-gray-600 text-sm text-center mb-6">{tool.description}</p>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-emerald-600">{tool.price}</span>
                  <div className="text-sm text-gray-500">vs {tool.originalPrice}</div>
                </div>
                <a 
                  href="https://members.seotoolsgroupbuy.us/signup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold text-center block hover:bg-emerald-700 transition-all duration-300 transform group-hover:scale-105"
                >
                  Buy Now
                </a>
              </div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Custom Pack Section - With subscription period buttons
export const CustomPackSection = () => {
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
    'Medium Pack': 30.00,
    'Heavy Pack': 40.00,
    'Mega Pack': 50.00,
    'Mega Combo Pack': 60.00
  }
  
  const getPriceForPeriod = (basePrice: number, period: string) => {
    const periodData = periods.find(p => p.id === period)
    if (!periodData) return basePrice
    
    // Add $5 for each period beyond 1 month
    const additionalCost = (periodData.multiplier - 1) * 5
    return basePrice + additionalCost
  }
  
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-emerald-600 text-sm font-semibold mb-4">Custom Pack pricing</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <span className="text-emerald-600">
              Make your own <span className="text-emerald-600 font-bold">pack</span> by <span className="relative inline-block px-3 sm:px-4 py-2">
                <img 
                  src="/stroke-removebg-preview.png" 
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  style={{ filter: 'hue-rotate(120deg) saturate(1.2) brightness(0.9)' }}
                />
                <span className="relative z-10 text-white font-bold">selecting tools</span>
              </span>
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            You can select any tools which you need and make a pack
          </p>
        </div>

        {/* Subscription Period Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {periods.map((period, index) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`group relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                selectedPeriod === period.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              {/* Glowing effect for selected button */}
              {selectedPeriod === period.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-emerald-500/20 to-emerald-600/20 animate-pulse"></div>
              )}
              
              {/* Main content */}
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{period.logo}</span>
                <span>{period.label}</span>
              </div>
              
              {/* Selection indicator */}
              {selectedPeriod === period.id && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto px-4">
          {[
            {
              name: 'Medium Pack',
              description: 'Perfect for small businesses and freelancers',
              price: '$30.00',
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
              price: '$40.00',
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
              price: '$50.00',
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
              price: '$60.00',
              tools: ['/images/tools/semrush-logo.svg', '/images/tools/chatgpt-logo.svg', '/images/tools/netflix-logo.svg', '/images/tools/canva-logo.svg'],
              isPopular: false,
              features: [
                'Get access to All of our tools',
                'Some tools have extra addon fees'
              ],
              mainLogo: '/images/tools/semrush-logo.svg'
            }
          ].map((pack, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden flex flex-col"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {pack.isPopular && (
                <div className="absolute -top-3 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold z-20">
                  Popular
                </div>
              )}
              
              <div className="relative z-10 flex-1 flex flex-col">
                {/* Package Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 animate-float-delay-1">
                    <img
                      src={pack.mainLogo}
                      alt={pack.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">{pack.name}</h3>
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
                        <svg className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                <div className="mt-auto pt-4">
                  <a 
                    href="https://members.seotoolsgroupbuy.us/signup" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-full py-2 px-4 font-medium text-center block transition-colors rounded-lg transform group-hover:scale-105 ${pack.isPopular ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
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

// Testimonials Section - Customer Reviews
export const TestimonialsSection = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <span className="text-emerald-600">
              What Our <span className="relative inline-block px-3 sm:px-4 py-2">
                <img 
                  src="/stroke-removebg-preview.png" 
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  style={{ filter: 'hue-rotate(120deg) saturate(1.2) brightness(0.9)' }}
                />
                <span className="relative z-10 text-white font-bold">Customers</span>
              </span> Say
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Real feedback from real customers who've transformed their business with FadiTools
          </p>
        </div>

        {/* Facebook Reviews */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            Facebook Reviews
          </h3>
          
          <div className="relative">
            <div className="flex gap-2 overflow-hidden">
              <div className="flex gap-2 animate-slide-left-to-right">
                {/* First set of cards */}
                {[
                  {
                    name: 'Sarah Khan',
                    rating: 4,
                    review: 'Good after sale support. Good luck FadiTools!',
                    icon: '👩‍💻'
                  },
                  {
                    name: 'Freelancer Shamim',
                    rating: 5,
                    review: 'SEMrush niyechilam. satisfied (y).',
                    icon: '👷‍♂️'
                  },
                  {
                    name: 'Nasir Ahmed',
                    rating: 4,
                    review: 'They are professional.',
                    icon: '👷‍♂️'
                  },
                  {
                    name: 'Rahim Ali',
                    rating: 5,
                    review: 'Onek val recommend kori.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Aisha Rahman',
                    rating: 5,
                    review: 'Amazing tools at affordable prices!',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Mohammad Ali',
                    rating: 4,
                    review: 'Great customer service and fast delivery.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Fatima Khan',
                    rating: 5,
                    review: 'Best investment for my business!',
                    icon: '👩‍💻'
                  },
                  {
                    name: 'Ahmed Hassan',
                    rating: 4,
                    review: 'Highly recommended for freelancers.',
                    icon: '👨‍🎓'
                  },
                  {
                    name: 'Zara Ahmed',
                    rating: 5,
                    review: 'Excellent service and fast delivery!',
                    icon: '👩‍💼'
                  },
                  {
                    name: 'Omar Khan',
                    rating: 4,
                    review: 'Great tools at affordable prices.',
                    icon: '👨‍💻'
                  },
                  {
                    name: 'Nadia Ali',
                    rating: 5,
                    review: 'Best investment for my startup!',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Hassan Malik',
                    rating: 4,
                    review: 'Professional and reliable service.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Ayesha Khan',
                    rating: 5,
                    review: 'Amazing customer support team!',
                    icon: '👩‍💻'
                  },
                  {
                    name: 'Bilal Ahmed',
                    rating: 4,
                    review: 'Highly satisfied with the tools.',
                    icon: '👨‍🎓'
                  },
                  {
                    name: 'Sana Rahman',
                    rating: 5,
                    review: 'Perfect for digital marketers!',
                    icon: '👩‍💼'
                  },
                  {
                    name: 'Imran Ali',
                    rating: 4,
                    review: 'Great value for money.',
                    icon: '👨‍💻'
                  },
                  {
                    name: 'Fatima Zahra',
                    rating: 5,
                    review: 'Best decision for my business!',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Usman Khan',
                    rating: 4,
                    review: 'Excellent tool selection.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Hira Malik',
                    rating: 5,
                    review: 'Outstanding service quality!',
                    icon: '👩‍💻'
                  }
                ].map((review, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex-shrink-0 hover:shadow-md transition-shadow duration-300"
                    style={{ width: '320px' }}
                  >
                    {/* Facebook-style header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          <span className="text-xs text-gray-500 ml-1">2d</span>
                          </div>
                        </div>
                    </div>
                    
                    {/* Review text */}
                    <p className="text-gray-800 text-sm leading-relaxed mb-3">{review.review}</p>
                    
                    {/* Facebook-style actions */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.994a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                        Like
                      </button>
                      <button className="hover:text-blue-600">Comment</button>
                      <button className="hover:text-blue-600">Share</button>
                    </div>
                  </div>
                ))}

                {/* Duplicated cards for seamless loop - no white space */}
                {[
                  {
                    name: 'Sarah Khan',
                    rating: 4,
                    review: 'Good after sale support. Good luck FadiTools!',
                    icon: '👩‍💻'
                  },
                  {
                    name: 'Freelancer Shamim',
                    rating: 5,
                    review: 'SEMrush niyechilam. satisfied (y).',
                    icon: '👷‍♂️'
                  },
                  {
                    name: 'Nasir Ahmed',
                    rating: 4,
                    review: 'They are professional.',
                    icon: '👷‍♂️'
                  },
                  {
                    name: 'Rahim Ali',
                    rating: 5,
                    review: 'Onek val recommend kori.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Aisha Rahman',
                    rating: 5,
                    review: 'Amazing tools at affordable prices!',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Mohammad Ali',
                    rating: 4,
                    review: 'Great customer service and fast delivery.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Fatima Khan',
                    rating: 5,
                    review: 'Best investment for my business!',
                    icon: '👩‍💻'
                  },
                  {
                    name: 'Ahmed Hassan',
                    rating: 4,
                    review: 'Highly recommended for freelancers.',
                    icon: '👨‍🎓'
                  },
                  {
                    name: 'Zara Ahmed',
                    rating: 5,
                    review: 'Excellent service and fast delivery!',
                    icon: '👩‍💼'
                  },
                  {
                    name: 'Omar Khan',
                    rating: 4,
                    review: 'Great tools at affordable prices.',
                    icon: '👨‍💻'
                  },
                  {
                    name: 'Nadia Ali',
                    rating: 5,
                    review: 'Best investment for my startup!',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Hassan Malik',
                    rating: 4,
                    review: 'Professional and reliable service.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Ayesha Khan',
                    rating: 5,
                    review: 'Amazing customer support team!',
                    icon: '👩‍💻'
                  },
                  {
                    name: 'Bilal Ahmed',
                    rating: 4,
                    review: 'Highly satisfied with the tools.',
                    icon: '👨‍🎓'
                  },
                  {
                    name: 'Sana Rahman',
                    rating: 5,
                    review: 'Perfect for digital marketers!',
                    icon: '👩‍💼'
                  },
                  {
                    name: 'Imran Ali',
                    rating: 4,
                    review: 'Great value for money.',
                    icon: '👨‍💻'
                  },
                  {
                    name: 'Fatima Zahra',
                    rating: 5,
                    review: 'Best decision for my business!',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Usman Khan',
                    rating: 4,
                    review: 'Excellent tool selection.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Hira Malik',
                    rating: 5,
                    review: 'Outstanding service quality!',
                    icon: '👩‍💻'
                  }
                ].map((review, index) => (
                  <div 
                    key={`duplicate-${index}`}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex-shrink-0 hover:shadow-md transition-shadow duration-300"
                    style={{ width: '320px' }}
                  >
                    {/* Facebook-style header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          <span className="text-xs text-gray-500 ml-1">2d</span>
                          </div>
                        </div>
                    </div>
                    
                    {/* Review text */}
                    <p className="text-gray-800 text-sm leading-relaxed mb-3">{review.review}</p>
                    
                    {/* Facebook-style actions */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.994a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                        Like
                      </button>
                      <button className="hover:text-blue-600">Comment</button>
                      <button className="hover:text-blue-600">Share</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trustpilot Reviews */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            Trustpilot Reviews
          </h3>
          
          <div className="relative">
                        <div className="flex gap-2 overflow-hidden">
              <div className="flex gap-2 animate-slide-left-to-right-delayed">
              {[
                {
                  name: 'Rachel Green',
                  rating: 5,
                  review: 'Just got the Jasper AI package - absolutely game-changing! The content generation quality is incredible, and it\'s cut our writing time in half. FadiTools made the whole setup process super smooth.',
                  icon: '🎓'
                },
                {
                  name: 'Tom Anderson',
                  rating: 5,
                  review: 'We use both Canva Pro and Shutterstock through FadiTools. The combined creative tools have elevated our brand\'s visual content. Plus, the cost savings are significant!',
                  icon: '👔'
                },
                {
                  name: 'Lisa Thompson',
                  rating: 5,
                  review: 'I\'m amazed by FadiTools\'s Semrush package! The comprehensive analytics and keyword research tools have completely transformed how we approach SEO. Worth every penny!',
                  icon: '👩‍🦰'
                },
                {
                  name: 'David Wilson',
                  rating: 5,
                  review: 'The Ahrefs package is incredible! I\'ve improved my website\'s ranking significantly. FadiTools makes premium tools accessible.',
                  icon: '👨‍💼'
                },
                {
                  name: 'Emma Davis',
                  rating: 4,
                  review: 'Great selection of tools and excellent support team. Highly recommend for digital marketers!',
                  icon: '👩‍🎨'
                },
                {
                  name: 'Michael Brown',
                  rating: 5,
                  review: 'ChatGPT Plus through FadiTools has revolutionized our content strategy. Amazing value!',
                  icon: '👨‍🎓'
                },
                {
                  name: 'Sophia Martinez',
                  rating: 4,
                  review: 'Professional service and fast delivery. The tools work perfectly as advertised.',
                  icon: '👩‍💻'
                },
                {
                  name: 'James Johnson',
                  rating: 5,
                  review: 'Best decision I made for my business. The ROI on these tools is incredible!',
                  icon: '👨‍💼'
                },
                {
                  name: 'Maria Garcia',
                  rating: 4,
                  review: 'Fantastic selection of premium tools. Highly recommend!',
                  icon: '👩‍💼'
                },
                {
                  name: 'Robert Chen',
                  rating: 5,
                  review: 'The tools have transformed our marketing strategy completely!',
                  icon: '👨‍💻'
                },
                {
                  name: 'Jennifer Lee',
                  rating: 4,
                  review: 'Excellent customer service and fast delivery.',
                  icon: '👩‍🎨'
                },
                {
                  name: 'Christopher Brown',
                  rating: 5,
                  review: 'Best investment for our agency. Tools work perfectly!',
                  icon: '👨‍💼'
                },
                {
                  name: 'Amanda Taylor',
                  rating: 4,
                  review: 'Great value and professional service.',
                  icon: '👩‍💻'
                },
                {
                  name: 'Daniel Martinez',
                  rating: 5,
                  review: 'Outstanding quality tools at affordable prices!',
                  icon: '👨‍🎓'
                },
                {
                  name: 'Jessica Wilson',
                  rating: 4,
                  review: 'Perfect for small businesses and startups.',
                  icon: '👩‍💼'
               },
               {
                 name: 'Kevin Rodriguez',
                 rating: 5,
                 review: 'Amazing ROI on all the tools we purchased.',
                 icon: '👨‍💻'
               },
               {
                 name: 'Nicole Anderson',
                 rating: 4,
                 review: 'Professional team and excellent support.',
                 icon: '👩‍🎨'
               },
               {
                 name: 'Brandon Thompson',
                 rating: 5,
                 review: 'Best decision for our marketing team!',
                 icon: '👨‍💼'
               },
               {
                 name: 'Stephanie White',
                 rating: 4,
                 review: 'Highly satisfied with the service quality.',
                 icon: '👩‍💻'
               },
               {
                 name: 'Alex Turner',
                 rating: 5,
                 review: 'Outstanding service and amazing tools! Highly recommend for any business.',
                 icon: '👨‍💼'
               },
               {
                 name: 'Sarah Johnson',
                 rating: 4,
                 review: 'Great value for money. The tools work perfectly as advertised.',
                 icon: '👩‍💻'
               },
               {
                 name: 'Mike Wilson',
                 rating: 5,
                 review: 'Best investment I\'ve made for my marketing agency!',
                 icon: '👨‍🎓'
               },
               {
                 name: 'Emily Davis',
                 rating: 4,
                 review: 'Professional team and excellent customer support.',
                 icon: '👩‍🎨'
               },
               {
                 name: 'Chris Brown',
                 rating: 5,
                 review: 'Amazing ROI on all the tools. Worth every penny!',
                 icon: '👨‍💼'
               },
               {
                 name: 'Lisa Garcia',
                 rating: 4,
                 review: 'Perfect for small businesses and startups.',
                 icon: '👩‍💻'
               },
               {
                 name: 'David Lee',
                 rating: 5,
                 review: 'Outstanding quality and professional service.',
                 icon: '👨‍💼'
               },
               {
                 name: 'Anna White',
                 rating: 4,
                 review: 'Highly satisfied with the tools and support.',
                 icon: '👩‍🎨'
               },
               {
                 name: 'John Smith',
                 rating: 5,
                 review: 'Best decision for our marketing team!',
                 icon: '👨‍💻'
               },
               {
                 name: 'Maria Rodriguez',
                 rating: 4,
                 review: 'Excellent service and fast delivery.',
                 icon: '👩‍💼'
               },
               {
                 name: 'Carlos Martinez',
                 rating: 5,
                 review: 'Amazing tools that transformed our business!',
                 icon: '👨‍💼'
               },
               {
                 name: 'Isabella Chen',
                 rating: 4,
                 review: 'Professional and reliable service provider.',
                 icon: '👩‍💻'
               },
               {
                 name: 'Ryan Thompson',
                 rating: 5,
                 review: 'Outstanding value and amazing support team!',
                 icon: '👨‍🎓'
               },
               {
                 name: 'Sophie Anderson',
                 rating: 4,
                 review: 'Perfect for digital marketers and agencies.',
                 icon: '👩‍🎨'
               },
               {
                 name: 'Lucas Brown',
                 rating: 5,
                 review: 'Best investment for our startup!',
                 icon: '👨‍💻'
               },
               {
                 name: 'Emma Wilson',
                 rating: 4,
                 review: 'Highly recommend for any business.',
                 icon: '👩‍💼'
               },
               {
                 name: 'Noah Davis',
                 rating: 5,
                 review: 'Amazing tools at affordable prices!',
                 icon: '👨‍💼'
               },
               {
                 name: 'Olivia Garcia',
                 rating: 4,
                 review: 'Professional service and excellent support.',
                 icon: '👩‍💻'
               },
               {
                 name: 'William Lee',
                 rating: 5,
                 review: 'Outstanding quality and fast delivery!',
                 icon: '👨‍🎓'
               },
               {
                 name: 'Ava Johnson',
                 rating: 4,
                 review: 'Perfect for our marketing needs.',
                 icon: '👩‍🎨'
               },
               {
                 name: 'Ethan Brown',
                 rating: 5,
                 review: 'Best decision we made for our business!',
                 icon: '👩‍💻'
               }
             ].map((review, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex-shrink-0 hover:shadow-md transition-shadow duration-300"
                style={{ width: '350px' }}
              >
                {/* Trustpilot-style header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-green-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">3 days ago</div>
                </div>
                
                {/* Review text */}
                <p className="text-gray-800 text-sm leading-relaxed mb-4">{review.review}</p>
                
                {/* Trustpilot-style footer */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>Verified purchase</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>United States</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Helpful?</span>
                    <button className="text-green-600 hover:text-green-700">Yes</button>
                    <span className="text-gray-400">•</span>
                    <button className="text-gray-500 hover:text-gray-600">No</button>
                  </div>
                </div>
              </div>
            ))}

                {/* Duplicated Trustpilot cards for seamless loop - no white space */}
                {[
                  {
                    name: 'Rachel Green',
                    rating: 5,
                    review: 'Just got the Jasper AI package - absolutely game-changing! The content generation quality is incredible, and it\'s cut our writing time in half. FadiTools made the whole setup process super smooth.',
                    icon: '🎓'
                  },
                  {
                    name: 'Tom Anderson',
                    rating: 5,
                    review: 'We use both Canva Pro and Shutterstock through FadiTools. The combined creative tools have elevated our brand\'s visual content. Plus, the cost savings are significant!',
                    icon: '👔'
                  },
                  {
                    name: 'Lisa Thompson',
                    rating: 5,
                    review: 'I\'m amazed by FadiTools\'s Semrush package! The comprehensive analytics and keyword research tools have completely transformed how we approach SEO. Worth every penny!',
                    icon: '👩‍🦰'
                  },
                  {
                    name: 'David Wilson',
                    rating: 5,
                    review: 'The Ahrefs package is incredible! I\'ve improved my website\'s ranking significantly. FadiTools makes premium tools accessible.',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Emma Davis',
                    rating: 4,
                    review: 'Great selection of tools and excellent support team. Highly recommend for digital marketers!',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Michael Brown',
                    rating: 5,
                    review: 'ChatGPT Plus through FadiTools has revolutionized our content strategy. Amazing value!',
                    icon: '👨‍🎓'
                  },
                  {
                    name: 'Sophia Martinez',
                    rating: 4,
                    review: 'Professional service and fast delivery. The tools work perfectly as advertised.',
                    icon: '👩‍💻'
                  },
                  {
                    name: 'James Johnson',
                    rating: 5,
                    review: 'Best decision I made for my business. The ROI on these tools is incredible!',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Maria Garcia',
                    rating: 4,
                    review: 'Fantastic selection of premium tools. Highly recommend!',
                    icon: '👩‍💼'
                  },
                  {
                    name: 'Robert Chen',
                    rating: 5,
                    review: 'The tools have transformed our marketing strategy completely!',
                    icon: '👨‍💻'
                  },
                  {
                    name: 'Jennifer Lee',
                    rating: 4,
                    review: 'Excellent customer service and fast delivery.',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Christopher Brown',
                    rating: 5,
                    review: 'Best investment for our agency. Tools work perfectly!',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Amanda Taylor',
                    rating: 4,
                    review: 'Great value and professional service.',
                    icon: '👩‍💻'
                  },
                  {
                    name: 'Daniel Martinez',
                    rating: 5,
                    review: 'Outstanding quality tools at affordable prices!',
                    icon: '👨‍🎓'
                  },
                  {
                    name: 'Jessica Wilson',
                    rating: 4,
                    review: 'Perfect for small businesses and startups.',
                    icon: '👩‍💼'
                  },
                  {
                    name: 'Kevin Rodriguez',
                    rating: 5,
                    review: 'Amazing ROI on all the tools we purchased.',
                    icon: '👨‍💻'
                  },
                  {
                    name: 'Nicole Anderson',
                    rating: 4,
                    review: 'Professional team and excellent support.',
                    icon: '👩‍🎨'
                  },
                  {
                    name: 'Brandon Thompson',
                    rating: 5,
                    review: 'Best decision for our marketing team!',
                    icon: '👨‍💼'
                  },
                  {
                    name: 'Stephanie White',
                    rating: 4,
                    review: 'Highly satisfied with the service quality.',
                    icon: '👩‍💻'
                  }
                ].map((review, index) => (
                  <div 
                    key={`duplicate-trustpilot-${index}`}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex-shrink-0 hover:shadow-md transition-shadow duration-300"
                    style={{ width: '350px' }}
                  >
                    {/* Trustpilot-style header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-green-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">3 days ago</div>
                    </div>
                    
                    {/* Review text */}
                    <p className="text-gray-800 text-sm leading-relaxed mb-4">{review.review}</p>
                    
                    {/* Trustpilot-style footer */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>Verified purchase</span>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>United States</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Helpful?</span>
                        <button className="text-green-600 hover:text-green-700">Yes</button>
                        <span className="text-gray-400">•</span>
                        <button className="text-gray-500 hover:text-gray-600">No</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Trust Section - Only animations added
export const TrustSection = () => {
  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-emerald-600">
              <Typewriter 
                text="Wondering if you can trust us?" 
                speed={60} 
                delay={5500}
                className="text-emerald-600"
                loop={true}
                loopDelay={6000}
              />
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            We partner with industry-leading payment processors to ensure your transactions are secure and protected via an escrow. We use:
          </p>
        </div>

        {/* Payment Processors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mb-12">
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
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg p-3 border border-gray-200">
                  <img 
                    src={processor.image} 
                    alt={processor.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center group-hover:text-emerald-600 transition-colors duration-300">{processor.name}</h3>
                <p className="text-gray-600 text-center">{processor.description}</p>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
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
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={guarantee.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">{guarantee.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{guarantee.description}</p>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How to Place an Order Section
export const HowToOrderSection = () => {
  return (
    <section className="py-20 relative bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              How to Place an Order?
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Get fast and guaranteed results with just few steps!
          </p>
        </div>

        <div className="w-full space-y-6">
          {/* Step 1: Choose a Package */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg animate-float">
                <span className="text-2xl sm:text-3xl font-bold text-white">1</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                    Choose a Package
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 flex-1 group-hover:text-gray-800 transition-colors duration-300">
                    Start by selecting any package or combination of packages from our services menu that you'd like to proceed with.
                  </p>
                </div>
              </div>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Step 2: Enter Your Details */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg animate-float-delay-1">
                <span className="text-2xl sm:text-3xl font-bold text-white">2</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                    Enter Your Details
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 flex-1 group-hover:text-gray-800 transition-colors duration-300">
                    Provide the link to your social media content where you want our services applied. There's no need to share your account access or private passwords, your privacy is always secure.
                  </p>
                </div>
              </div>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Step 3: Proceed to Payment */}
          <div className="group relative bg-gradient-to-br from-emerald-25 to-emerald-50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg animate-float-delay-2">
                <span className="text-2xl sm:text-3xl font-bold text-white">3</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                    Proceed to Payment
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 flex-1 group-hover:text-gray-800 transition-colors duration-300">
                    Complete your payment easily through credit cards, Apple Pay, Android Pay, or crypto. Once done, sit back and watch as our services enhance your account, all without any extra effort from you!
                  </p>
                </div>
              </div>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
