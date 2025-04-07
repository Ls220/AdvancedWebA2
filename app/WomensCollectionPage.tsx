"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductViewer3D from "@/components/ProductViewer3D"
import { formatCurrency } from "@/lib/formatCurrency"
import { LoadingSpinner } from "@/components/LoadingSpinner"

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

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products?category=women")
        const data = await response.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-pink-200">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Women's Collection</h1>
          <p className="text-lg text-purple-800 max-w-2xl mx-auto">
            Discover our latest styles for women, featuring elegant designs and comfortable fits for every occasion.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id} passHref>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm border-purple-200 hover:border-pink-300">
                  <CardContent className="p-0">
                    <div className="h-64 relative">
                      {product.model3d ? (
                        <ProductViewer3D modelPath={product.model3d} />
                      ) : (
                        <img
                          src={product.image || "/placeholder.svg?height=400&width=400"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-purple-900 mb-2">{product.name}</h3>
                      <p className="text-purple-700 font-medium mb-4">{formatCurrency(product.price)}</p>
                      <p className="text-purple-600 mb-4 line-clamp-2">{product.description}</p>
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">No products found</h2>
            <p className="text-purple-700">Please check back later for our new collection.</p>
          </div>
        )}
      </div>
    </div>
  )
}

