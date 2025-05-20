"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ProductViewer3D from '@/components/ProductViewer3D'

// TODO: Add loading states for better user experience
// TODO: Implement error handling for failed data fetches
// TODO: Add pagination for product listings
// TODO: Add search functionality for products
// TODO: Add filters for product categories

// FIXME: Need to optimize 3D model loading for mobile devices
// FIXME: Background image causing performance issues on some devices
// FIXME: Theme switching not working properly in Safari

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setMounted(true)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white text-2xl animate-pulse">Getting things ready...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Welcome to Our Fashion Store
          </h1>
          <p className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto text-white/90 leading-relaxed">
            Discover our latest collections with immersive 3D viewing technology.
            Experience fashion like never before.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Link href="/mens-collection" className="block transform hover:scale-105 transition-transform">
              <Button 
                className="w-full py-6 sm:py-8 text-lg sm:text-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-white border border-white/20 rounded-xl"
              >
                Men's Collection
              </Button>
            </Link>

            <Link href="/womens-collection" className="block transform hover:scale-105 transition-transform">
              <Button 
                className="w-full py-6 sm:py-8 text-lg sm:text-xl bg-gradient-to-r from-pink-500/20 to-pink-600/20 hover:from-pink-500/30 hover:to-pink-600/30 text-white border border-white/20 rounded-xl"
              >
                Women's Collection
              </Button>
            </Link>

            <Link href="/kids-collection" className="block transform hover:scale-105 transition-transform">
              <Button 
                className="w-full py-6 sm:py-8 text-lg sm:text-xl bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 text-white border border-white/20 rounded-xl"
              >
                Kids Collection
              </Button>
            </Link>
          </div>

          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-12 text-white">Featured 3D Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="h-64 mb-4">
                  <ProductViewer3D 
                    modelPath="/models/T-shirt.glb" 
                    fallbackImage="/images/products/tshirt-fallback.jpg"
                  />
                </div>
                <h3 className="text-white font-semibold">Classic T-Shirt</h3>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="h-64 mb-4">
                  <ProductViewer3D 
                    modelPath="/models/Jacket.glb" 
                    fallbackImage="/images/products/jacket-fallback.jpg"
                  />
                </div>
                <h3 className="text-white font-semibold">Leather Jacket</h3>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <div className="h-64 mb-4">
                  <ProductViewer3D 
                    modelPath="/models/dark_blue_irregular_pleated_loose_midi_skirt.glb" 
                    fallbackImage="/images/products/skirt-fallback.jpg"
                  />
                </div>
                <h3 className="text-white font-semibold">Elegant Midi Skirt</h3>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <div className="h-64 mb-4">
                  <ProductViewer3D 
                    modelPath="/models/tan_womans_coat.glb" 
                    fallbackImage="/images/products/coat-fallback.jpg"
                  />
                </div>
                <h3 className="text-white font-semibold">Tan Coat</h3>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

