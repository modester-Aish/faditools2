import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/wp-admin/', '/wp-content/', '/wp-includes/'],
      },
    ],
    sitemap: 'https://faditools.com/sitemap-index.xml',
  }
}
