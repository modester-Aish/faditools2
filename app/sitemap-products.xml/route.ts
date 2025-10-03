import { fetchProducts } from '@/lib/api'

export async function GET() {
  const baseUrl = 'https://faditools.com'
  
  try {
    const products = await fetchProducts()
    const productPages = products
      ?.filter(product => product.status === 'publish' && product.slug)
      .map(product => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: new Date(product.modified || product.date || new Date()),
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
