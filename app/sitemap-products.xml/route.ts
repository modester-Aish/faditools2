import { fetchWooCommerceProducts } from '@/lib/api'

export async function GET() {
  const baseUrl = 'https://faditools.com'
  
  try {
    // Fetch products with pagination - limit to first 200 for performance
    let allProducts = []
    let page = 1
    const perPage = 50
    const maxPages = 4 // Limit to 200 products for performance
    
    while (page <= maxPages) {
      try {
        const products = await fetchWooCommerceProducts(`per_page=${perPage}&page=${page}&status=publish`)
        if (!products || products.length === 0) break
        
        allProducts = [...allProducts, ...products]
        
        // If we got less than perPage, we've reached the end
        if (products.length < perPage) break
        
        page++
        // Add a small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error)
        break
      }
    }
    
    const productPages = allProducts
      ?.filter(product => product.status === 'publish' && product.slug)
      .map(product => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: new Date(product.date_modified || product.date_created || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })) || []

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
