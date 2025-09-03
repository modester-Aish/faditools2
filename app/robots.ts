import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/wp-admin/'],
    },
    sitemap: 'https://faditools.com/sitemap.xml',
  }
}
