import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { NavigationProvider } from '@/context/NavigationContext'
import { AuthProvider } from '@/context/AuthContext'
import { generateCanonicalUrl } from '@/lib/canonical'
import dynamic from 'next/dynamic'

// Lazy load non-critical components
const FloatingChatButtons = dynamic(() => import('@/components/FloatingChatButtons'), {
  ssr: false,
  loading: () => null
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
})

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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/faditools-favicon.svg" />
        <meta name="msapplication-TileImage" content="/faditools-favicon.svg" />
        {/* Optimized resource hints - only essential domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.faditools.com" />
        {/* Critical CSS - minimal and optimized */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent layout shifts */
            img{max-width:100%;height:auto}
            /* Critical above-the-fold */
            .hero-section{min-height:100vh}
            .container{max-width:1200px;margin:0 auto;padding:0 1rem}
            /* Performance */
            .contain-layout{contain:layout}
            .contain-paint{contain:paint}
          `
        }} />
        
        {/* Service Worker Registration */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('SW registered: ', registration);
                  })
                  .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
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
