'use client'

import Link from 'next/link'

export const ToolsPackagesSection = () => {
  // Only the packages data from faditools.com/packages
  const packages = [
    {
      id: 'seo-combo',
      name: 'SEO Combo',
      price: '$25.00',
      description: 'Essential SEO tools for professionals',
      toolCount: 11,
      tools: ['SEMrush', 'Ahrefs', 'Moz Pro', 'Majestic'],
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
            <span className="text-primary-500">
              Tool Packages
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
              className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold z-20">
                  Popular
                </div>
              )}
              
              <div className="relative z-10">
                {/* Package Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src={pkg.mainLogo}
                      alt={pkg.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
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
                    <div className="text-sm text-gray-500">+{pkg.toolCount - pkg.tools.length} more tools</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <button 
                    className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg font-medium text-center block hover:bg-primary-600 transition-colors"
                  >
                    Buy Now
                  </button>
                  <button className="w-full py-2 px-4 bg-white text-primary-500 border border-primary-500 rounded-lg font-medium text-center block hover:bg-primary-50 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
