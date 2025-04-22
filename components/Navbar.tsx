"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')
    setIsLoggedIn(!!token)
    setIsAdmin(userRole === 'admin')
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
            <Link href="/" className="text-white font-bold text-xl">
              Lister's Store
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/mens-collection"
                className={`text-white/80 hover:text-white transition-colors ${
                  isActive('/mens-collection') ? 'text-white font-medium' : ''
                }`}
              >
                Men's Collection
              </Link>
              <Link
                href="/womens-collection"
                className={`text-white/80 hover:text-white transition-colors ${
                  isActive('/womens-collection') ? 'text-white font-medium' : ''
                }`}
              >
                Women's Collection
              </Link>
              <Link
                href="/kids-collection"
                className={`text-white/80 hover:text-white transition-colors ${
                  isActive('/kids-collection') ? 'text-white font-medium' : ''
                }`}
              >
                Kids Collection
              </Link>
              <Link
                href="/about"
                className={`text-white/80 hover:text-white transition-colors ${
                  isActive('/about') ? 'text-white font-medium' : ''
                }`}
              >
                About Us
              </Link>
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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

