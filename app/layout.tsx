import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { NavigationProvider } from '@/context/NavigationContext'
import { AuthProvider } from '@/context/AuthContext'
import { generateCanonicalUrl } from '@/lib/canonical'
import FloatingChatButtons from '@/components/FloatingChatButtons'

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
      { url: '/faditools-favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/faditools-favicon.svg',
    apple: [
      { url: '/faditools-favicon.svg', sizes: '180x180' }
    ],
    other: [
      {
        rel: 'icon',
        url: '/faditools-favicon.svg',
        sizes: '32x32',
        type: 'image/svg+xml'
      }
    ]
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
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="google-site-verification" content="12RUQGTb4pDfBnos0FueAq6seC22wJl6Bvs8JyihvVM" />
        {/* Favicon links */}
        <link rel="icon" type="image/svg+xml" href="/faditools-favicon.svg" />
        <link rel="shortcut icon" href="/faditools-favicon.svg" />
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.faditools.com" />
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .bg-white { background-color: #ffffff; }
            .text-emerald-600 { color: #059669; }
            .text-gray-700 { color: #374151; }
            .font-bold { font-weight: 700; }
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .hidden { display: none; }
            @media (min-width: 768px) { .md\\:flex { display: flex; } }
          `
        }} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NavigationProvider>
            <CartProvider>
              {children}
              <FloatingChatButtons />
            </CartProvider>
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
