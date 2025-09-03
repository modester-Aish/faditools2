'use client'

import Link from 'next/link'
import { Package } from '@/types'

interface PackageCardProps {
  package: Package
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const slug = pkg.slug || pkg.name.toLowerCase().replace(/\s+/g, '-')
  
  // Default color if none provided
  const cardColor = pkg.color || 'from-green-500 to-green-600'
  
  // Default icon if none provided
  const packageIcon = pkg.icon || '📦'

  // Function to get tool logo based on tool name
  const getToolLogo = (toolName: string): string | null => {
    const toolNameLower = toolName.toLowerCase()
    
    if (toolNameLower.includes('semrush')) return '/images/tools/semrush-logo.svg'
    if (toolNameLower.includes('ahrefs')) return '/images/tools/ahrefs-logo.svg'
    if (toolNameLower.includes('moz')) return '/images/tools/moz-logo.svg'
    if (toolNameLower.includes('canva')) return '/images/tools/canva-logo.svg'
    if (toolNameLower.includes('grammarly')) return '/images/tools/claude-logo.svg' // Using claude logo as placeholder
    if (toolNameLower.includes('chatgpt')) return '/images/tools/chatgpt-logo.svg'
    if (toolNameLower.includes('claude')) return '/images/tools/claude-logo.svg'
    if (toolNameLower.includes('netflix')) return '/images/tools/netflix-logo.svg'
    if (toolNameLower.includes('runway')) return '/images/tools/runwayml-logo.svg'
    if (toolNameLower.includes('amazon')) return '/images/tools/amazon-tools.svg'
    
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Header with gradient background */}
      <div className={`bg-gradient-to-r ${cardColor} p-6 text-white text-center relative`}>
        {/* Popular badge */}
        {pkg.popular && (
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              Popular
            </span>
          </div>
        )}
        
        {/* Package Icon */}
        <div className="mb-3 flex justify-center">
          {packageIcon.startsWith('/') ? (
            <img 
              src={packageIcon} 
              alt={`${pkg.name} icon`}
              className="w-16 h-16 object-contain drop-shadow-lg"
            />
          ) : (
            <span className="text-5xl drop-shadow-lg">{packageIcon}</span>
          )}
        </div>
        
        {/* Package Name */}
        <h3 className="text-xl font-bold mb-2 drop-shadow-sm">
          {pkg.name || 'Package Name'}
        </h3>
        
        {/* Savings badge */}
        {pkg.savings && (
          <div className="mt-2">
            <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {pkg.savings}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {pkg.description || 'No description available'}
        </p>
        
        {/* Price and Tool Count */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {pkg.price || '$0.00'}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {pkg.toolCount || 0} tools
          </div>
        </div>
        
        {/* Tools Preview */}
        {pkg.tools && pkg.tools.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Includes:</h4>
            <div className="space-y-2">
              {/* Main Tools with Logos */}
              <div className="flex flex-wrap gap-2">
                {pkg.tools.slice(0, 4).map((tool, index) => {
                  const toolLogo = getToolLogo(tool)
                  return (
                    <div key={index} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                      {toolLogo && (
                        <img 
                          src={toolLogo} 
                          alt={`${tool} logo`}
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      <span className="text-xs font-medium text-gray-700">{tool}</span>
                    </div>
                  )
                })}
              </div>
              {pkg.tools.length > 4 && (
                <div className="text-center">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    +{pkg.tools.length - 4} more tools
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/packages/${slug}`}
            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            View Package
          </Link>
          <a 
            href={pkg.buyUrl || '#'} 
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
