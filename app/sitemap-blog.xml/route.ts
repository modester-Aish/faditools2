import { fetchBlogPosts } from '@/lib/api'

export const dynamic = 'force-static'
export const revalidate = 300 // Revalidate every 5 minutes for faster updates

export async function GET() {
  const baseUrl = 'https://faditools.com'
  
  try {
    const posts = await fetchBlogPosts()
    const blogPages = posts
      ?.filter(post => post.status === 'publish' && post.slug)
      .map(post => ({
        url: `${baseUrl}/${post.slug}`,
        lastModified: new Date(post.modified || post.date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })) || []

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogPages.map(page => `  <url>
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
    console.error('Error generating blog sitemap:', error)
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}
