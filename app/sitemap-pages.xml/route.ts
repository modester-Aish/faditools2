import { fetchPages } from '@/lib/api'

export async function GET() {
  const baseUrl = 'https://faditools.com'
  
  try {
    const pages = await fetchPages()
    const wordPressPages = pages
      ?.filter(page => page.status === 'publish' && page.slug)
      .map(page => ({
        url: `${baseUrl}/pages/${page.slug}`,
        lastModified: new Date(page.modified || page.date || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })) || []

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${wordPressPages.map(page => `  <url>
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
    console.error('Error generating pages sitemap:', error)
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}
