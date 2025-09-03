import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { NavigationProvider } from '@/context/NavigationContext'
import { AuthProvider } from '@/context/AuthContext'
import { generateCanonicalUrl } from '@/lib/canonical'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://faditools.com'),
  title: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions',
  description: 'Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro at 90% discount. Trusted by 10,000+ marketers. 24/7 support, 99.9% uptime.',
  keywords: 'SEO tools, Ahrefs group buy, SEMrush discount, digital marketing tools, keyword research, backlink analysis, competitor analysis, SEO software, marketing automation, content optimization',
  authors: [{ name: 'FadiTools Team' }],
  creator: 'FadiTools',
  publisher: 'FadiTools',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  openGraph: {
    title: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions',
    description: 'Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro at 90% discount. Trusted by 10,000+ marketers worldwide.',
    type: 'website',
    locale: 'en_US',
    url: 'https://faditools.com',
    siteName: 'FadiTools',
    images: [
      {
        url: '/seo-tools-illustration.svg',
        width: 1200,
        height: 630,
        alt: 'FadiTools - Premium SEO Tools Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions',
    description: 'Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro at 90% discount. Trusted by 10,000+ marketers worldwide.',
    images: ['/seo-tools-illustration.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'theme-color': '#D4B896',
    'msapplication-TileColor': '#D4B896',
    'application-name': 'FadiTools',
    'apple-mobile-web-app-title': 'FadiTools',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavigationProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
