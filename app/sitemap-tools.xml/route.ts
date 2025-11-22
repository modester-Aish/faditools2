import { getTools } from '@/lib/api'
import { getAllPopularTools } from '@/data/popular-tools'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const baseUrl = 'https://faditools.com'
  
  try {
    // Get tools from API
    const tools = await getTools()
    
    // Get popular tools from data file
    const popularTools = getAllPopularTools()
    
    // Combine both: API tools and popular tools (use slug if available, otherwise id)
    const apiToolPages = tools.map(tool => ({
      url: `${baseUrl}/${tool.slug || tool.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
    
    // Popular tools pages (these are at /[slug] - direct slug, not /tools/[slug])
    const popularToolPages = popularTools.map(tool => ({
      url: `${baseUrl}/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Higher priority for popular tools
    }))
    
    const toolPages = [...apiToolPages, ...popularToolPages]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${toolPages.map(page => `  <url>
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
    console.error('Error generating tools sitemap:', error)
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}
