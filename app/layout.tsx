import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

// TODO: Add meta tags for SEO optimization
// TODO: Implement proper error boundary handling
// TODO: Add analytics tracking
// TODO: Add proper favicon and site icons
// TODO: Implement proper theme switching

export const metadata: Metadata = {
  title: 'Fashion Store',
  description: 'Experience fashion in 3D',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
