"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProductViewer3D from "@/components/ProductViewer3D"
import { formatCurrency } from "@/lib/formatCurrency"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { Heart, ShoppingBag, Share2, Truck, Shield, RefreshCw, Star, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  model3d?: string
  sizes?: string[]
  colors?: string[]
  rating?: number
  reviews?: number
  stock?: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    let mounted = true
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const data = await response.json()
        if (mounted) {
          setProduct(data)
          if (data.sizes?.length) setSelectedSize(data.sizes[0])
          if (data.colors?.length) setSelectedColor(data.colors[0])
          setLoading(false)
        }
      } catch (error) {
        console.error("Failed to load product:", error)
        if (mounted) setLoading(false)
      }
    }

    fetchProduct()
    return () => { mounted = false }
  }, [params.id])

  const handleAddToCart = async () => {
    if (!selectedSize && product?.sizes?.length) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      })
      return
    }

    setIsAddingToCart(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Added to cart",
        description: `${product?.name} has been added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        variant: "destructive"
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <LoadingSpinner />
          <p className="text-gray-500">Loading your style...</p>
        </motion.div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-gray-500 text-lg mb-4">Oops! This product seems to have walked off the runway</p>
          <Button onClick={() => router.push('/')}>Back to Shopping</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => router.push('/')} className="hover:text-gray-900">Home</button>
            <ChevronRight size={16} />
            <button onClick={() => router.push(`/${product.category}`)} className="hover:text-gray-900 capitalize">
              {product.category}
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <Card className="overflow-hidden bg-white group">
              {product.model3d ? (
                <ProductViewer3D 
                  modelPath={product.model3d}
                  fallbackImage={product.image}
                />
              ) : (
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
              >
                <Heart 
                  size={24} 
                  className={isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-600"}
                />
              </motion.button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(product.price)}</p>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600">{product.rating}</span>
                    {product.reviews && (
                      <span className="text-gray-500">({product.reviews} reviews)</span>
                    )}
                  </div>
                )}
              </div>
              {product.stock !== undefined && (
                <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>

            {product.sizes && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition-colors ${
                        selectedSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Choose Color</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-transform ${
                        selectedColor === color
                          ? "border-gray-900 scale-110"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-md">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                >
                  -
                </motion.button>
                <span className="px-4 py-2 text-gray-900 font-medium">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                >
                  +
                </motion.button>
              </div>
              <Button 
                className="flex-1 bg-gray-900 hover:bg-gray-800 h-12"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingBag className="mr-2" size={20} />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <Share2 size={20} />
              </motion.button>
            </div>

            <div className="space-y-4 pt-8 border-t">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5" />
                <span>2 year warranty</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <RefreshCw className="w-5 h-5" />
                <span>30 day returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

