"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductViewer3D from "@/components/ProductViewer3D"
import { formatCurrency } from "@/lib/formatCurrency"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { Filter, SortAsc, SortDesc } from "lucide-react"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  model3d?: string
}

type SortOrder = "asc" | "desc"

export default function MensCollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  useEffect(() => {
    let mounted = true
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products?category=men")
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

  const sortedProducts = [...products].sort((a, b) => 
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  )

  const filteredProducts = sortedProducts.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Men's Collection</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Premium streetwear and essentials for the modern man. Quality meets style.
          </p>
        </motion.div>

        <div className="flex justify-end gap-4 mb-8">
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? <SortAsc className="mr-2" /> : <SortDesc className="mr-2" />}
            Price {sortOrder === "asc" ? "Low to High" : "High to Low"}
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={sortOrder}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <Link href={`/product/${product._id}`} key={product._id} passHref>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl bg-white/10 backdrop-blur-sm border-white/20 hover:border-blue-400">
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
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                          <p className="text-blue-300 font-medium mb-4">{formatCurrency(product.price)}</p>
                          <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                            View Details
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

        {!loading && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">No products found</h2>
            <p className="text-blue-200">We're updating our collection. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

