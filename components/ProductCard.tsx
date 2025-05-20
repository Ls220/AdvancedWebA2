'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProductViewer3D from '@/components/ProductViewer3D'
import { useCart } from '@/lib/CartContext'
import { formatCurrency } from '@/lib/formatCurrency'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye } from 'lucide-react'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  model3d: string
  fallbackImage: string
  category?: string
  inStock?: boolean
}

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const { _id, ...rest } = product
    addItem({
      ...rest,
      id: _id,
      quantity: 1
    })
  }

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'mens':
        return 'from-blue-500/20 to-blue-600/20'
      case 'womens':
        return 'from-pink-500/20 to-pink-600/20'
      case 'kids':
        return 'from-purple-500/20 to-purple-600/20'
      default:
        return 'from-gray-500/20 to-gray-600/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1
      }}
    >
      <Card className={`h-full overflow-hidden backdrop-blur-md bg-gradient-to-br ${getCategoryColor(product.category)} border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300`}>
        <CardContent className="p-0">
          <div className="h-64 relative group">
            <ProductViewer3D 
              modelPath={product.model3d} 
              fallbackImage={product.fallbackImage}
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium">Out of Stock</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-white">{product.name}</h3>
              <p className="font-medium text-white/90">{formatCurrency(product.price)}</p>
            </div>
            <p className="text-white/70 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center gap-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Link href={`/products/${product._id}`} className="flex-1">
                <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 