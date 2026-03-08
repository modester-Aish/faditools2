import { fetchProducts } from '@/lib/local-wp'

export const dynamic = 'force-static'
export const revalidate = 300 // Revalidate every 5 minutes for faster updates

export async function GET() {
  const baseUrl = 'https://faditools.com'
  
  try {
    const allProducts = await fetchProducts()
    const productPages = allProducts
      .filter(product => product.status === 'publish' && product.slug)
      .map(product => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: new Date(product.modified || product.date || new Date()),
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
