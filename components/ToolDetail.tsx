'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PopularTool } from '@/data/popular-tools'
import { getAllPopularTools } from '@/data/popular-tools'

interface ToolDetailProps {
  tool: PopularTool
  relatedTools?: PopularTool[]
}

export default function ToolDetail({ tool, relatedTools = [] }: ToolDetailProps) {
  const [isTableExpanded, setIsTableExpanded] = useState(false)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [purchaseCount, setPurchaseCount] = useState(0)
  const [soldCounts, setSoldCounts] = useState<number[]>([])

  const handlePurchase = () => {
    // Open buy URL in new tab if available, otherwise fallback to signup
    if (tool.buyUrl) {
      window.open(tool.buyUrl, '_blank')
    } else {
      window.open('https://members.seotoolsgroupbuy.us/signup', '_blank')
    }
  }

  const handleImageZoom = () => {
    setIsImageZoomed(true)
  }

  // Generate random numbers on client-side to avoid hydration errors
  useEffect(() => {
    setPurchaseCount(Math.floor(Math.random() * 70) + 1)
    setSoldCounts(relatedTools.slice(0, 8).map(() => Math.floor(Math.random() * 50) + 1))
  }, [relatedTools])

  const price = parseFloat(tool.price.replace('$', ''))
  const originalPrice = parseFloat(tool.originalPrice.replace('$', ''))
  const savings = (originalPrice - price).toFixed(2)
  const savingsPercent = Math.round(((originalPrice - price) / originalPrice) * 100)

  // Get related tools if not provided
  const displayRelatedTools = relatedTools.length > 0 
    ? relatedTools 
    : getAllPopularTools().filter(t => t.id !== tool.id).slice(0, 8)

  return (
    <div className="bg-white">
      {/* Main Tool Section - Source Style */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Tool Logo */}
          <div className="flex flex-col items-center justify-center pt-8">
            <div className="text-center">
              {/* Tool Logo/Image - Larger size like source - Clickable for zoom */}
              <div 
                className="relative w-64 h-64 bg-gray-50 rounded-xl overflow-hidden mb-6 mx-auto cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleImageZoom}
              >
                <Image
                  src={tool.image}
                  alt={tool.name}
                  fill
                  sizes="256px"
                  className="object-contain p-4"
                  loading="eager"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column - Tool Info & CTA */}
          <div className="flex flex-col justify-center">
            {/* Instant Access Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full mb-4 w-fit mt-4">
              Instant Access!
            </div>

            {/* Tool Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {tool.name}
            </h1>

            {/* Pricing Section */}
            <div className="mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-lg text-gray-400 line-through">
                  {tool.originalPrice}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {tool.price}
                </div>
              </div>
              <div className="text-sm text-red-600 font-semibold mt-2">
                You Save: ${savings} ({savingsPercent}%)
              </div>
            </div>

            {/* Key Features Box - Clean like source */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                {/* 24 Hours Refund Policy */}
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl">💰</div>
                  <div>
                    <h3 className="font-bold text-gray-900">24 Hours Refund Policy</h3>
                    <p className="text-gray-600 text-sm">Full refund within 24 hours. Valid for individual tools only. Check FAQ for details.</p>
                  </div>
                </div>

                {/* Direct Access */}
                <div className="flex items-start space-x-3">
                  <div className="text-orange-500 text-xl">➡️</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Direct Access</h3>
                    <p className="text-gray-600 text-sm">No software installation required. No RDP needed. Some tools may require browser extension.</p>
                  </div>
                </div>

                {/* Instant Access */}
                <div className="flex items-start space-x-3">
                  <div className="text-red-500 text-xl">🔥</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Instant Access</h3>
                    <p className="text-gray-600 text-sm">Immediate access after payment. No waiting time or approval process required.</p>
                  </div>
                </div>

                {/* Data Privacy */}
                <div className="flex items-start space-x-3">
                  <div className="text-blue-500 text-xl">🔒</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Data Privacy</h3>
                    <p className="text-gray-600 text-sm">Your tool usage and data remain confidential and private from other users.</p>
                  </div>
                </div>
              </div>
            </div>
            

            
            {/* BUY NOW Button */}
            <button
              onClick={handlePurchase}
              className="w-32 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg mb-4"
            >
              {tool.buyUrl ? 'BUY NOW' : 'Coming Soon'}
            </button>



          </div>
        </div>
      </div>

      {/* Content Section Below Tool Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Recent Purchases Banner */}
        <div className="bg-emerald-600 text-white text-center py-2 px-6 rounded-lg mb-8">
          <span className="font-semibold">{purchaseCount} people purchased this tool in last 24 hours</span>
        </div>

        {/* Description Separator */}
        <div className="text-center mb-8">
          <div className="w-full h-px bg-gray-300 mb-2"></div>
          <span className="text-gray-600 font-medium text-sm">DESCRIPTION</span>
        </div>

        {/* Content Grid - Table of Contents Left, Main Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition-colors sticky top-8">
              <div 
                className="flex items-center justify-between"
                onClick={() => setIsTableExpanded(!isTableExpanded)}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="font-medium text-gray-800">Table of Contents</span>
                </div>
                <div className="flex space-x-1">
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isTableExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Expandable Table of Contents */}
              {isTableExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="space-y-2 text-sm text-gray-600">
                    <a href="#description" className="block py-1 hover:text-emerald-600">Description</a>
                    {tool.features && tool.features.length > 0 && (
                      <a href="#features" className="block py-1 hover:text-emerald-600">Features</a>
                    )}
                    {tool.useCases && tool.useCases.length > 0 && (
                      <a href="#use-cases" className="block py-1 hover:text-emerald-600">Use Cases</a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-3">
            <div className="text-left">
              {/* Tool Title */}
              <h2 id="description" className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {tool.name} - {tool.description}
              </h2>
              
              {/* Main Description */}
              {tool.longDescription && (
                <div className="prose prose-gray max-w-none text-gray-700 mb-8">
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {tool.longDescription}
                  </p>
                </div>
              )}

              {/* Features Section */}
              {tool.features && tool.features.length > 0 && (
                <div id="features" className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases Section */}
              {tool.useCases && tool.useCases.length > 0 && (
                <div id="use-cases" className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tool.useCases.map((useCase, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-lg">
                        <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Badge */}
              {tool.category && (
                <div className="mt-8">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                    {tool.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      {displayRelatedTools && displayRelatedTools.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <p className="text-gray-600">You might also be interested in these tools</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayRelatedTools.slice(0, 8).map((relatedTool, index) => (
              <Link
                key={relatedTool.id}
                href={`/${relatedTool.slug}`}
                className="group relative bg-white rounded-lg p-6 border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <Image
                      src={relatedTool.image}
                      alt={relatedTool.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{relatedTool.description}</p>
                  <div className="text-center">
                    <span className="text-xl font-bold text-emerald-600">{relatedTool.price}</span>
                    <div className="text-xs text-gray-500 line-through">{relatedTool.originalPrice}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {isImageZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsImageZoomed(false)}>
          <div className="relative max-w-4xl max-h-full p-4">
            <div className="relative w-full h-[80vh]">
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                loading="lazy"
              />
            </div>
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

