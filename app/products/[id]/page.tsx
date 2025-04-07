'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fetchFromAPI } from '@/lib/api'
import ProductViewer3D from '@/components/ProductViewer3D'
import { useCart } from '@/lib/CartContext'

interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  model3d: string
  fallbackImage: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) {
        setError('Product ID is missing')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')
        
        console.log('Fetching product with ID:', params.id)
        const response = await fetchFromAPI(`products/${params.id}`)
        console.log('API Response:', response)

        if (!response || !response.product) {
          throw new Error('Product data not found')
        }
        
        setProduct(response.product)
      } catch (error: any) {
        console.error('Failed to fetch product:', error)
        setError(error.message || 'Failed to load product')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addItem({
        ...product,
        quantity: 1
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="backdrop-blur-md bg-white/10 rounded-lg border border-white/20 shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <ProductViewer3D
                  modelPath={product.model3d}
                  fallbackImage={product.fallbackImage}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                  <p className="text-2xl text-white/90">£{product.price.toFixed(2)}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-medium text-white mb-2">Description</h2>
                    <p className="text-white/80">{product.description}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-white mb-2">Category</h2>
                    <p className="text-white/80 capitalize">{product.category}</p>
                  </div>

                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 