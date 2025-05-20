"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../store/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import ProductViewer3D from "../three/ProductViewer3D"

interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice?: number
  onSale: boolean
  isNew: boolean
  image: string
  model3d?: string
  category: string
  subcategory: string
  colors: Array<{ name: string; hexCode: string }>
  sizes: string[]
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Elegant Maid Uniform Dress",
            description: "Stylish and elegant maid uniform dress with delicate details",
            price: 89.99,
            salePrice: 69.99,
            onSale: true,
            isNew: false,
            image: "/placeholder.svg?height=300&width=300&text=Maid+Uniform",
            model3d: "/assets/3d/maid_uniform.glb",
            category: "women",
            subcategory: "dresses",
            colors: [
              { name: "Black", hexCode: "#000000" },
              { name: "Navy", hexCode: "#000080" },
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
          },
          {
            id: "2",
            name: "Tan Women's Coat",
            description: "Elegant tan coat perfect for fall and winter seasons",
            price: 149.99,
            onSale: false,
            isNew: true,
            image: "/placeholder.svg?height=300&width=300&text=Womans+Coat",
            model3d: "/assets/3d/tan_womans_coat.glb",
            category: "women",
            subcategory: "coats",
            colors: [
              { name: "Tan", hexCode: "#D2B48C" },
              { name: "Beige", hexCode: "#F5F5DC" },
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
          },
          {
            id: "3",
            name: "Pleated Mini Skirt",
            description: "Fashionable pleated mini skirt for a stylish casual look",
            price: 49.99,
            onSale: false,
            isNew: true,
            image: "/placeholder.svg?height=300&width=300&text=Mini+Skirt",
            model3d: "/assets/3d/maid_uniform.glb", // using a placeholder model for now   ##TO DO ADD NEW MODEL AND CONFIGURE ROUTING
            category: "women",
            subcategory: "skirts",
            colors: [
              { name: "Black", hexCode: "#000000" },
              { name: "Navy", hexCode: "#000080" },
              { name: "Plaid", hexCode: "#8B4513" },
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
          },
          {
            id: "4",
            name: "Women's Fashion Heels",
            description: "Comfortable and stylish heels for any occasion",
            price: 79.99,
            salePrice: 59.99,
            onSale: true,
            isNew: false,
            image: "/placeholder.svg?height=300&width=300&text=Heels",
            model3d: "/assets/3d/womenshoes.glb", // Updated to use the new model
            category: "women",
            subcategory: "shoes",
            colors: [
              { name: "Black", hexCode: "#000000" },
              { name: "Red", hexCode: "#FF0000" },
              { name: "Nude", hexCode: "#E6BE8A" },
            ],
            sizes: ["5", "6", "7", "8", "9", "10"],
          },
        ]

        setTimeout(() => {
          setProducts(mockProducts)
          setLoading(false)
        }, 800)
      } catch (err) {
        setError("Failed to load products")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div
              className="h-64 relative"
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
            >
              {activeProduct === product.id && product.model3d ? (
                <div className="absolute inset-0">
                  <ProductViewer3D modelPath={product.model3d} />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.onSale && <Badge className="bg-red-500">Sale</Badge>}
                    {product.isNew && <Badge className="bg-green-500">New</Badge>}
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <div className="text-right">
                {product.onSale ? (
                  <div>
                    <span className="text-lg font-bold">${product.salePrice?.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">${product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
            <div className="mt-3 flex items-center">
              <span className="text-sm mr-2">Colors:</span>
              <div className="flex space-x-1">
                {product.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hexCode }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm">Sizes: {product.sizes.join(", ")}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Link to={`/products/${product.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.onSale && product.salePrice ? product.salePrice : product.price,
                  image: product.image,
                })
              }
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

