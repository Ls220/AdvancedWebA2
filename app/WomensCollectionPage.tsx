"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductViewer3D from "@/components/ProductViewer3D"
import { formatCurrency } from "@/lib/formatCurrency"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { Heart, ShoppingBag } from "lucide-react"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  model3d?: string
}

export default function WomensCollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    let mounted = true
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products?category=women")
        const data = await response.json()
        if (mounted) {
          setProducts(data)
          setLoading(false)
        }
      } catch (error) {
        console.error("Failed to load products:", error)
        if (mounted) setLoading(false)
      }
    }

    fetchProducts()
    return () => { mounted = false }
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-rose-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Women's Collection</h1>
          <p className="text-lg text-rose-200 max-w-2xl mx-auto">
            Curated pieces that blend timeless elegance with contemporary style.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product) => (
                <Link href={`/product/${product._id}`} key={product._id} passHref>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl bg-white/10 backdrop-blur-sm border-white/20 hover:border-rose-400">
                      <CardContent className="p-0">
                        <div className="h-64 relative group">
                          {product.model3d ? (
                            <ProductViewer3D 
                              modelPath={product.model3d} 
                              fallbackImage={product.image || "/placeholder.svg?height=400&width=400"}
                            />
                          ) : (
                            <img
                              src={product.image || "/placeholder.svg?height=400&width=400"}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          )}
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              toggleFavorite(product._id)
                            }}
                            className="absolute top-2 right-2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                          >
                            <Heart 
                              size={20} 
                              className={favorites.includes(product._id) ? "fill-rose-500 text-rose-500" : "text-white"}
                            />
                          </button>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                          <p className="text-rose-300 font-medium mb-4">{formatCurrency(product.price)}</p>
                          <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                          <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag size={18} />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && products.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">No products found</h2>
            <p className="text-rose-200">New styles coming soon. Stay tuned!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

