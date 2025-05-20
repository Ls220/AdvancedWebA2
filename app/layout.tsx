import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Fashion Store | 3D Shopping Experience',
    template: '%s | Fashion Store'
  },
  description: 'Discover the future of fashion shopping with our immersive 3D experience. Browse, try, and buy the latest trends in real-time.',
  keywords: ['fashion', '3D shopping', 'virtual try-on', 'online store', 'clothing'],
  authors: [{ name: 'Fashion Store Team' }],
  creator: 'Fashion Store',
  publisher: 'Fashion Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fashion-store.com',
    siteName: 'Fashion Store',
    title: 'Fashion Store | 3D Shopping Experience',
    description: 'Discover the future of fashion shopping with our immersive 3D experience.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fashion Store Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion Store | 3D Shopping Experience',
    description: 'Discover the future of fashion shopping with our immersive 3D experience.',
    images: ['/twitter-image.jpg'],
    creator: '@fashionstore',
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
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
