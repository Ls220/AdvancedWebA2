"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { CartProvider } from '@/lib/CartContext'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from "next-themes"

// Dynamically import the Background component with no SSR
const Background = dynamic(
  () => import('@/components/ui/background').then(mod => mod.Background),
  { ssr: false }
)

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show a loading state that matches the theme configuration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-blue-500 dark:via-purple-500 dark:to-violet-600">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <CartProvider>
        <Background />
        <div className="min-h-screen">
          <Navbar />
          <main className="text-foreground">{children}</main>
        </div>
      </CartProvider>
    </ThemeProvider>
  )
} 