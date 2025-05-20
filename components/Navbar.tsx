"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Shield, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/mens-collection', label: "Men's Collection" },
  { href: '/womens-collection', label: "Women's Collection" },
  { href: '/kids-collection', label: "Kids Collection" },
  { href: '/about', label: "About Us" }
]

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')
    setIsLoggedIn(!!token)
    setIsAdmin(userRole === 'admin')

    // Get cart count from localStorage
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart)
        setCartCount(cart.length)
      } catch (e) {
        console.warn('Failed to parse cart data')
      }
    }
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-white font-bold text-xl tracking-tight hover:text-white/90 transition-colors">
              Lister's Store
            </Link>
            <div className="hidden md:flex space-x-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white/80 hover:text-white transition-colors ${
                    isActive(link.href) ? 'text-white font-medium' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link href="/admin">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 flex items-center gap-2"
                >
                  <Shield className="h-5 w-5" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </Link>
            )}
            
            {isLoggedIn ? (
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  size="icon"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  Login
                </Button>
              </Link>
            )}
            
            <Link href="/cart">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 relative"
                size="icon"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="md:hidden text-white hover:bg-white/20"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-4"
            >
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-white/80 hover:text-white transition-colors ${
                    isActive(link.href) ? 'text-white font-medium' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

