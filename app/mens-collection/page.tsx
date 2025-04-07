"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductViewer3D from "@/components/ProductViewer3D"
import { formatCurrency } from "@/lib/formatCurrency"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { fetchFromAPI } from "@/lib/api"
import ProductCard from "@/components/ProductCard"
import { motion } from "framer-motion"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: string
  model3d: string
  fallbackImage: string
}

export default function MensCollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFromAPI("products?category=men")
      console.log("Fetched men's products:", data)
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error fetching men's products:", err)
      setError("Failed to load products. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={fetchProducts}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Men's Collection</h1>
        <p className="text-white/70 mb-8">
          Discover our latest men's fashion pieces, designed for style and comfort.
        </p>
      </motion.div>
      
      {products.length === 0 ? (
        <p className="text-center text-white/70">No products available.</p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

