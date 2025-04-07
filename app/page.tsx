"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-3xl"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-6xl font-bold mb-6">
            Welcome to Our Fashion Store
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Discover our latest collections with immersive 3D viewing technology.
            Experience fashion like never before.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/mens-collection">
                <Button className="w-full h-32 text-xl bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/50">
                  Men's Collection
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/womens-collection">
                <Button className="w-full h-32 text-xl bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/50">
                  Women's Collection
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/kids-collection">
                <Button className="w-full h-32 text-xl bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/50">
                  Kids Collection
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-semibold mb-6">
              Experience 3D Fashion Viewing
            </h2>
            <p className="text-lg mb-8">
              Rotate, zoom, and examine our products in stunning 3D detail before you buy.
            </p>
          </motion.div>
        </motion.div>

        <div className="text-center mt-20">
          <p className="text-gray-500">Our store is now live! Browse our collections and enjoy shopping.</p>
        </div>
      </div>
    </div>
  )
}

