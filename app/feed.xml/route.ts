import { NextResponse } from 'next/server'
import { fetchBlogPosts } from '@/lib/api'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    const baseUrl = 'https://faditools.com'
    const posts = await fetchBlogPosts()
    
    const rssItems = posts
      .filter(post => post.status === 'publish' && post.slug)
      .slice(0, 20) // Latest 20 posts
      .map(post => {
        const pubDate = new Date(post.date || post.modified || new Date()).toUTCString()
        const description = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 200) || ''
        const content = post.content?.rendered?.replace(/<[^>]*>/g, '').substring(0, 500) || description
        
        return `    <item>
      <title><![CDATA[${post.title.rendered}]]></title>
      <link>${baseUrl}/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${post.slug}</guid>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[FadiTools Team]]></dc:creator>
    </item>`
      })
      .join('\n')

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FadiTools Blog</title>
    <link>${baseUrl}</link>
    <description>Latest blog posts and SEO tools guides from FadiTools</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/faditools-favicon.svg</url>
      <title>FadiTools</title>
      <link>${baseUrl}</link>
    </image>
${rssItems}
  </channel>
</rss>`

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>FadiTools Blog</title></channel></rss>', {
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    })
  }
}

