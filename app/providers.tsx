"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { CartProvider } from '@/lib/CartContext'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from "next-themes"
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/components/Analytics'

const Background = dynamic(
  () => import('@/components/ui/background').then(mod => mod.Background),
  { ssr: false }
)

const LoadingSpinner = dynamic(
  () => import('@/components/LoadingSpinner').then(mod => mod.LoadingSpinner),
  { ssr: false }
)

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-blue-500 dark:via-purple-500 dark:to-violet-600">
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
      themes={['light', 'dark', 'system']}
    >
      <CartProvider>
        <Background />
        <div className="min-h-screen relative">
          <Navbar />
          <main className="text-foreground relative z-10">
            {children}
          </main>
          <Toaster />
          <Analytics />
        </div>
      </CartProvider>
    </ThemeProvider>
  )
} 