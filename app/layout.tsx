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

// Ensure consistent rendering
const SEOMonitor = dynamic(() => import('@/components/SEOMonitor'), {
  ssr: false,
  loading: () => null
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://faditools.com'),
  title: 'FadiTools - Premium SEO Tools & Digital Marketing Solutions',
  description: 'Access 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro at 90% discount. Trusted by 10,000+ marketers. 24/7 support, 99.9% uptime.',
  keywords: 'SEO tools, Ahrefs group buy, SEMrush discount, digital marketing tools, keyword research, backlink analysis, competitor analysis, SEO software, marketing automation, content optimization',
  authors: [{ name: 'FadiTools Team' }],
  creator: 'FadiTools',
  publisher: 'FadiTools',
  alternates: {
    canonical: 'https://faditools.com',
  },
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
    'apple-mobile-web-app-orientations': 'portrait',
    'format-detection': 'telephone=no',
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
    'mobile-web-app-capable': 'yes',
    'HandheldFriendly': 'true',
    'MobileOptimized': '320',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="google-site-verification" content="FLAscQ24VbDi1GaSCy0mIVHSFr6L8GOTXEK4yBN1tVk" />
        <meta name="msvalidate.01" content="CA9C80743C5C403924230A48CF321E7C" />
        <meta name="baidu-site-verification" content="YOUR_BAIDU_VERIFICATION_CODE" />
        <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
        {/* Favicon links */}
        <link rel="icon" type="image/svg+xml" href="/faditools-favicon.svg" />
        <link rel="shortcut icon" href="/faditools-favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/faditools-favicon.svg" />
        <meta name="msapplication-TileImage" content="/faditools-favicon.svg" />
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.faditools.com" />
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://img.icons8.com" />
        <link rel="preconnect" href="https://cdn-icons-png.flaticon.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://img.icons8.com" />
        <link rel="dns-prefetch" href="https://cdn-icons-png.flaticon.com" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {/* Performance hints */}
        <link rel="preload" href="/faditools-favicon.svg" as="image" type="image/svg+xml" />
        <link rel="modulepreload" href="/_next/static/chunks/pages/_app.js" />
        {/* Critical resource hints */}
        <link rel="prefetch" href="/tools" />
        <link rel="prefetch" href="/packages" />
        <link rel="prefetch" href="/blog" />
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
            /* Prevent layout shifts */
            img { max-width: 100%; height: auto; }
            .aspect-ratio { aspect-ratio: attr(width) / attr(height); }
            /* Reserve space for dynamic content */
            .reserve-space { min-height: 200px; }
            /* Smooth loading transitions */
            .fade-in { opacity: 0; animation: fadeIn 0.3s ease-in-out forwards; }
            @keyframes fadeIn { to { opacity: 1; } }
            /* Performance optimizations */
            .will-change-transform { will-change: transform; }
            .will-change-opacity { will-change: opacity; }
            .contain-layout { contain: layout; }
            .contain-paint { contain: paint; }
            /* Critical above-the-fold styles */
            .hero-section { min-height: 100vh; }
            .text-emerald-600 { color: #059669; }
            .bg-emerald-25 { background-color: #f0fdf4; }
            .bg-emerald-50 { background-color: #ecfdf5; }
          `
        }} />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LZWMMJVGJD"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LZWMMJVGJD', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `
        }} />
        
        {/* Performance monitoring */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Web Vitals monitoring
            if ('web-vital' in window) {
              import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
              });
            }
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
        <SEOMonitor />
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
