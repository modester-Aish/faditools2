'use client'

import Link from 'next/link'
import { Tool } from '@/types'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const slug = tool.slug || tool.name.toLowerCase().replace(/\s+/g, '-')
  
  // Default color if none provided
  const cardColor = tool.color || 'from-blue-500 to-blue-600'
  
  // Default icon if none provided
  const toolIcon = tool.icon || '🔧'

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Header with gradient background */}
      <div className={`bg-gradient-to-r ${cardColor} p-6 text-white text-center relative`}>
        {/* Popular badge */}
        {tool.popular && (
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              Popular
            </span>
          </div>
        )}
        
        {/* Tool Icon */}
        <div className="text-5xl mb-3 flex justify-center">
          <span className="drop-shadow-lg">{toolIcon}</span>
        </div>
        
        {/* Tool Name */}
        <h3 className="text-xl font-bold mb-2 drop-shadow-sm">
          {tool.name || 'Tool Name'}
        </h3>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {tool.description || 'No description available'}
        </p>
        
        {/* Price and Period */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {tool.price || '$0.00'}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {tool.period || 'per month'}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/${slug}`}
            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            View Details
          </Link>
          <a 
            href={tool.buyUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  )
}
