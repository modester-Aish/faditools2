// Use direct WooCommerce API calls without SEO data fetching for faster sitemap generation
const WOOCOMMERCE_BASE_URL = process.env.WOOCOMMERCE_BASE_URL || 'https://app.faditools.com'
const WOO_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || ''
const WOO_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET || ''

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const baseUrl = 'https://faditools.com'
  
  try {
    if (!WOO_CONSUMER_KEY || !WOO_CONSUMER_SECRET) {
      console.error('WooCommerce credentials not configured')
      return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
        headers: {
          'Content-Type': 'application/xml',
        },
      })
    }

    // Fetch products directly from WooCommerce API without SEO data
    let allProducts: any[] = []
    let page = 1
    const perPage = 100
    const maxProducts = 1000 // Increased limit to include all products
    
    while (allProducts.length < maxProducts) {
      try {
        const auth = Buffer.from(`${WOO_CONSUMER_KEY}:${WOO_CONSUMER_SECRET}`).toString('base64')
        const url = `${WOOCOMMERCE_BASE_URL}/wp-json/wc/v3/products?per_page=${perPage}&page=${page}&status=publish&orderby=modified&order=desc`
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          next: { revalidate: 3600 } // Cache for 1 hour
        })
        
        if (!response.ok) {
          console.error(`WooCommerce API error: ${response.status}`)
          break
        }
        
        const products = await response.json()
        
        if (!products || products.length === 0) break
        
        allProducts = [...allProducts, ...products]
        
        // If we got less than perPage, we've reached the end
        if (products.length < perPage) break
        
        page++
        
        // Stop if we've reached the max limit
        if (allProducts.length >= maxProducts) {
          allProducts = allProducts.slice(0, maxProducts)
          break
        }
      } catch (error) {
        console.error(`Error fetching products page ${page}:`, error)
        break
      }
    }
    
    console.log(`Sitemap: Fetched ${allProducts.length} products`)
    
    const productPages = allProducts
      .filter(product => product.status === 'publish' && product.slug)
      .map(product => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: new Date(product.date_modified || product.date_created || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${productPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating products sitemap:', error)
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}
