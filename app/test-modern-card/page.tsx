'use client'

import ModernProductCard from '@/components/ModernProductCard'

// Sample WooCommerce product data for demonstration
const sampleProduct = {
  id: 1,
  name: "Every type of asset,",
  slug: "ai-asset-bundle",
  permalink: "/products/ai-asset-bundle",
  date_created: "2024-01-01T00:00:00",
  date_created_gmt: "2024-01-01T00:00:00Z",
  date_modified: "2024-01-01T00:00:00",
  date_modified_gmt: "2024-01-01T00:00:00Z",
  type: "simple",
  status: "publish",
  featured: false,
  catalog_visibility: "visible",
  description: "Complete AI-powered asset generation suite",
  short_description: "With our full AI stack, generate images, videos, music, and more – all included in your subscription.",
  sku: "AI-ASSET-001",
  price: "16.50",
  regular_price: "19.99",
  sale_price: "16.50",
  date_on_sale_from: null,
  date_on_sale_from_gmt: null,
  date_on_sale_to: null,
  date_on_sale_to_gmt: null,
  price_html: "<span class=\"woocommerce-Price-amount amount\"><span class=\"woocommerce-Price-currencySymbol\">$</span>16.50</span>",
  on_sale: true,
  purchasable: true,
  total_sales: 1250,
  virtual: false,
  downloadable: false,
  downloads: [],
  download_limit: -1,
  download_expiry: -1,
  external_url: "",
  button_text: "",
  tax_status: "taxable",
  tax_class: "",
  manage_stock: false,
  stock_quantity: null,
  stock_status: "instock" as const,
  backorders: "no",
  backorders_allowed: false,
  backordered: false,
  sold_individually: false,
  weight: "",
  dimensions: {
    length: "",
    width: "",
    height: ""
  },
  shipping_required: false,
  shipping_taxable: false,
  shipping_class: "",
  shipping_class_id: 0,
  reviews_allowed: true,
  average_rating: "4.8",
  rating_count: 156,
  related_ids: [],
  upsell_ids: [],
  cross_sell_ids: [],
  parent_id: 0,
  purchase_note: "",
  categories: [
    {
      id: 1,
      name: "AI Tools",
      slug: "ai-tools"
    }
  ],
  tags: [],
  images: [
    {
      id: 1,
      date_created: "2024-01-01T00:00:00",
      date_created_gmt: "2024-01-01T00:00:00Z",
      date_modified: "2024-01-01T00:00:00",
      date_modified_gmt: "2024-01-01T00:00:00Z",
      src: "https://via.placeholder.com/600x400/7ED321/FFFFFF?text=AI+Assets",
      name: "AI Asset Bundle",
      alt: "AI Asset Bundle Preview"
    }
  ],
  attributes: [
    {
      id: 1,
      name: "Features",
      position: 0,
      visible: true,
      variation: false,
      options: [
        "Unlimited downloads on assets",
        "23+ million premium assets",
        "Full stack of AI tools",
        "Lifetime commercial license"
      ]
    }
  ],
  default_attributes: [],
  variations: [],
  grouped_products: [],
  menu_order: 0,
  meta_data: [],
  _links: {
    self: [{ href: "/wp-json/wc/v3/products/1" }],
    collection: [{ href: "/wp-json/wc/v3/products" }]
  }
}

export default function TestModernCardPage() {
  const handleAddToCart = () => {
    console.log('Add to cart clicked!')
    // Add your cart logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Modern Product Card
          </h1>
          <p className="text-xl text-[#A0A0A0] max-w-2xl mx-auto">
            A beautiful, modern product card with dark theme, light mahogany accents, and abstract geometric elements
          </p>
        </div>

        {/* Product Card Demo */}
        <div className="mb-12">
          <ModernProductCard 
            product={sampleProduct} 
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-[#2A2A2A]/50 backdrop-blur-lg rounded-xl p-6 border border-[#D4B896]/20">
          <div className="text-[#D4B896] text-2xl mb-2">🎨</div>
            <h3 className="text-white font-semibold mb-2">Modern Design</h3>
            <p className="text-[#A0A0A0] text-sm">
              Dark theme with light mahogany accents and glass-morphism effects
            </p>
          </div>
          
                  <div className="bg-[#2A2A2A]/50 backdrop-blur-lg rounded-xl p-6 border border-[#D4B896]/20">
          <div className="text-[#D4B896] text-2xl mb-2">📱</div>
            <h3 className="text-white font-semibold mb-2">Responsive</h3>
            <p className="text-[#A0A0A0] text-sm">
              Fully responsive design that works on all devices and screen sizes
            </p>
          </div>
          
                  <div className="bg-[#2A2A2A]/50 backdrop-blur-lg rounded-xl p-6 border border-[#D4B896]/20">
          <div className="text-[#D4B896] text-2xl mb-2">⚡</div>
            <h3 className="text-white font-semibold mb-2">Interactive</h3>
            <p className="text-[#A0A0A0] text-sm">
              Smooth animations and hover effects for enhanced user experience
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 bg-[#2A2A2A]/30 backdrop-blur-lg rounded-2xl p-8 border border-[#D4B896]/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-white">
              <span className="text-[#D4B896] mr-3 text-lg">✓</span>
              <span>Dynamic content from WooCommerce products</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-[#D4B896] mr-3 text-lg">✓</span>
              <span>Abstract geometric visual elements</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-[#D4B896] mr-3 text-lg">✓</span>
              <span>Glass-morphism effects with backdrop blur</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-[#D4B896] mr-3 text-lg">✓</span>
              <span>Smooth hover animations and transitions</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-[#D4B896] mr-3 text-lg">✓</span>
              <span>Mobile-first responsive design</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-[#D4B896] mr-3 text-lg">✓</span>
              <span>Accessible color contrast ratios</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
