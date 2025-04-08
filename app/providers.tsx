"use client"

import { CartProvider } from '@/lib/CartContext'
import { Background } from '@/components/ui/background'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from "next-themes"

export function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        <Background />
        <div className="min-h-screen">
          <Navbar />
          <main>{children}</main>
        </div>
      </CartProvider>
    </ThemeProvider>
  )
} 