import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/CartContext'
import { Background } from '@/components/ui/background'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Platform',
  description: 'Modern E-Commerce Platform with 3D Product Viewing',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <Background />
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
