'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProductViewer3D from '@/components/ProductViewer3D'
import { useCart } from '@/lib/CartContext'
import { formatCurrency } from '@/lib/formatCurrency'
import { motion } from 'framer-motion'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  model3d: string
  fallbackImage: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity: 1
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full overflow-hidden backdrop-blur-md bg-white/10 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="h-64 relative">
            <ProductViewer3D 
              modelPath={product.model3d} 
              fallbackImage={product.fallbackImage}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
            <p className="font-medium mb-2 text-white/90">{formatCurrency(product.price)}</p>
            <p className="text-white/70 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Link href={`/products/${product._id}`} className="flex-1">
                <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
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