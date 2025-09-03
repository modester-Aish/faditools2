'use client'

import ModernProductCardGrid from '@/components/ModernProductCardGrid'

// Sample WooCommerce products data for demonstration
const sampleProducts = [
  {
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
  },
  {
    id: 2,
    name: "Premium Design Tools,",
    slug: "design-tools-pro",
    permalink: "/products/design-tools-pro",
    date_created: "2024-01-01T00:00:00",
    date_created_gmt: "2024-01-01T00:00:00Z",
    date_modified: "2024-01-01T00:00:00",
    date_modified_gmt: "2024-01-01T00:00:00Z",
    type: "simple",
    status: "publish",
    featured: true,
    catalog_visibility: "visible",
    description: "Professional design tools for creative professionals",
    short_description: "Access to premium design software, templates, and resources for professional creatives.",
    sku: "DESIGN-PRO-002",
    price: "24.99",
    regular_price: "29.99",
    sale_price: "24.99",
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    price_html: "<span class=\"woocommerce-Price-amount amount\"><span class=\"woocommerce-Price-currencySymbol\">$</span>24.99</span>",
    on_sale: true,
    purchasable: true,
    total_sales: 890,
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
    average_rating: "4.9",
    rating_count: 234,
    related_ids: [],
    upsell_ids: [],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [
      {
        id: 2,
        name: "Design Tools",
        slug: "design-tools"
      }
    ],
    tags: [],
    images: [
      {
        id: 2,
        date_created: "2024-01-01T00:00:00",
        date_created_gmt: "2024-01-01T00:00:00Z",
        date_modified: "2024-01-01T00:00:00",
        date_modified_gmt: "2024-01-01T00:00:00Z",
        src: "https://via.placeholder.com/600x400/4A90E2/FFFFFF?text=Design+Tools",
        name: "Design Tools Pro",
        alt: "Design Tools Pro Preview"
      }
    ],
    attributes: [
      {
        id: 2,
        name: "Features",
        position: 0,
        visible: true,
        variation: false,
        options: [
          "Professional design software",
          "Premium templates library",
          "Advanced editing tools",
          "Cloud collaboration features"
        ]
      }
    ],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: [],
    _links: {
      self: [{ href: "/wp-json/wc/v3/products/2" }],
      collection: [{ href: "/wp-json/wc/v3/products" }]
    }
  },
  {
    id: 3,
    name: "Video Production Suite,",
    slug: "video-production-suite",
    permalink: "/products/video-production-suite",
    date_created: "2024-01-01T00:00:00",
    date_created_gmt: "2024-01-01T00:00:00Z",
    date_modified: "2024-01-01T00:00:00",
    date_modified_gmt: "2024-01-01T00:00:00Z",
    type: "simple",
    status: "publish",
    featured: false,
    catalog_visibility: "visible",
    description: "Complete video production and editing solution",
    short_description: "Professional video editing, effects, and production tools for content creators.",
    sku: "VIDEO-SUITE-003",
    price: "32.50",
    regular_price: "39.99",
    sale_price: "32.50",
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    price_html: "<span class=\"woocommerce-Price-amount amount\"><span class=\"woocommerce-Price-currencySymbol\">$</span>32.50</span>",
    on_sale: true,
    purchasable: true,
    total_sales: 567,
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
    average_rating: "4.7",
    rating_count: 189,
    related_ids: [],
    upsell_ids: [],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [
      {
        id: 3,
        name: "Video Tools",
        slug: "video-tools"
      }
    ],
    tags: [],
    images: [
      {
        id: 3,
        date_created: "2024-01-01T00:00:00",
        date_created_gmt: "2024-01-01T00:00:00Z",
        date_modified: "2024-01-01T00:00:00",
        date_modified_gmt: "2024-01-01T00:00:00Z",
        src: "https://via.placeholder.com/600x400/FF6B35/FFFFFF?text=Video+Suite",
        name: "Video Production Suite",
        alt: "Video Production Suite Preview"
      }
    ],
    attributes: [
      {
        id: 3,
        name: "Features",
        position: 0,
        visible: true,
        variation: false,
        options: [
          "4K video editing",
          "Professional effects library",
          "Audio enhancement tools",
          "Export to all formats"
        ]
      }
    ],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: [],
    _links: {
      self: [{ href: "/wp-json/wc/v3/products/3" }],
      collection: [{ href: "/wp-json/wc/v3/products" }]
    }
  },
  {
    id: 4,
    name: "Music Creation Studio,",
    slug: "music-creation-studio",
    permalink: "/products/music-creation-studio",
    date_created: "2024-01-01T00:00:00",
    date_created_gmt: "2024-01-01T00:00:00Z",
    date_modified: "2024-01-01T00:00:00",
    date_modified_gmt: "2024-01-01T00:00:00Z",
    type: "simple",
    status: "publish",
    featured: false,
    catalog_visibility: "visible",
    description: "Professional music production and composition tools",
    short_description: "Create, edit, and produce professional-quality music with our comprehensive studio suite.",
    sku: "MUSIC-STUDIO-004",
    price: "28.75",
    regular_price: "34.99",
    sale_price: "28.75",
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    price_html: "<span class=\"woocommerce-Price-amount amount\"><span class=\"woocommerce-Price-currencySymbol\">$</span>28.75</span>",
    on_sale: true,
    purchasable: true,
    total_sales: 423,
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
    average_rating: "4.6",
    rating_count: 145,
    related_ids: [],
    upsell_ids: [],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [
      {
        id: 4,
        name: "Music Tools",
        slug: "music-tools"
      }
    ],
    tags: [],
    images: [
      {
        id: 4,
        date_created: "2024-01-01T00:00:00",
        date_created_gmt: "2024-01-01T00:00:00Z",
        date_modified: "2024-01-01T00:00:00",
        date_modified_gmt: "2024-01-01T00:00:00Z",
        src: "https://via.placeholder.com/600x400/F5A623/FFFFFF?text=Music+Studio",
        name: "Music Creation Studio",
        alt: "Music Creation Studio Preview"
      }
    ],
    attributes: [
      {
        id: 4,
        name: "Features",
        position: 0,
        visible: true,
        variation: false,
        options: [
          "Professional DAW",
          "Virtual instruments",
          "Audio effects library",
          "Royalty-free samples"
        ]
      }
    ],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: [],
    _links: {
      self: [{ href: "/wp-json/wc/v3/products/4" }],
      collection: [{ href: "/wp-json/wc/v3/products" }]
    }
  }
]

export default function TestModernGridPage() {
  return (
    <ModernProductCardGrid 
      products={sampleProducts}
      title="Creative Tools Collection"
      subtitle="Discover our premium suite of creative tools designed for modern creators and professionals"
    />
  )
}
