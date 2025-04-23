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

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
//ALSO IMPLEMENT PROPER SITE ICONS AND THEME SWITCHING
          //INCORMPRATE NEW FEATURES AND ADD BACKGROUND IMAGE ETC 

          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            Welcome to Our Fashion Store
          </h1>
          <p className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto text-white/90">
            Discover our latest collections with immersive 3D viewing technology.
            Experience fashion like never before.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Link href="/mens-collection" className="block">
              <Button 
                className="w-full py-6 sm:py-8 text-lg sm:text-xl bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Men's Collection
              </Button>
            </Link>

            <Link href="/womens-collection" className="block">
              <Button 
                className="w-full py-6 sm:py-8 text-lg sm:text-xl bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Women's Collection
              </Button>
            </Link>

            <Link href="/kids-collection" className="block">
              <Button 
                className="w-full py-6 sm:py-8 text-lg sm:text-xl bg-white/10 hover:bg-white/20 text-white border border-white/20"
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

