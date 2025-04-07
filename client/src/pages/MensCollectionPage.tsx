"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "../store/CartContext"
import { ShoppingCart, Eye } from "lucide-react"
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
  model3d: string
  category: string
  subcategory: string
  colors: Array<{ name: string; hexCode: string }>
  sizes: string[]
}

export default function MensCollectionPage() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const { addToCart } = useCart()


  const mensProducts: Product[] = [
    {
      id: "1",
      name: "Men's T-Shirt",
      description: "Comfortable cotton t-shirt with a modern fit",
      price: 29.99,
      salePrice: 24.99,
      onSale: true,
      isNew: false,
      image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
      model3d: "/assets/3d/t-shirt.glb",
      category: "men",
      subcategory: "tshirts",
      colors: [
        { name: "Black", hexCode: "#000000" },
        { name: "White", hexCode: "#FFFFFF" },
        { name: "Navy", hexCode: "#000080" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "2",
      name: "Men's Jacket",
      description: "Stylish jacket for casual and formal occasions",
      price: 199.99,
      onSale: false,
      isNew: true,
      image: "/placeholder.svg?height=300&width=300&text=Jacket",
      model3d: "/assets/3d/jacket.glb",
      category: "men",
      subcategory: "jackets",
      colors: [
        { name: "Brown", hexCode: "#8B4513" },
        { name: "Black", hexCode: "#000000" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "3",
      name: "Cowboy Hat",
      description: "Classic western style cowboy hat",
      price: 59.99,
      onSale: false,
      isNew: true,
      image: "/placeholder.svg?height=300&width=300&text=Cowboy+Hat",
      model3d: "/assets/3d/cowboy-hat.glb",
      category: "men",
      subcategory: "accessories",
      colors: [
        { name: "Tan", hexCode: "#D2B48C" },
        { name: "Dark Brown", hexCode: "#654321" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "4",
      name: "Men's Shoes",
      description: "Comfortable and durable shoes for everyday wear",
      price: 89.99,
      salePrice: 69.99,
      onSale: true,
      isNew: false,
      image: "/placeholder.svg?height=300&width=300&text=Shoes",
      model3d: "/assets/3d/shoes.glb",
      category: "men",
      subcategory: "shoes",
      colors: [
        { name: "Gray/Blue", hexCode: "#708090" },
        { name: "Black/Red", hexCode: "#111111" },
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Men's Collection</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
          <TabsTrigger value="jackets">Jackets</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="shoes">Shoes</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mensProducts.map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="tshirts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mensProducts.filter((p) => p.subcategory === "tshirts").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="jackets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mensProducts.filter((p) => p.subcategory === "jackets").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="accessories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mensProducts.filter((p) => p.subcategory === "accessories").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="shoes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mensProducts.filter((p) => p.subcategory === "shoes").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Experience Our 3D Product Visualization</h2>
        <p className="text-center mb-6">
          Get a better look at our products with our interactive 3D viewer. Hover over any product to see it in 3D!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mensProducts.map((product) => (
            <div key={`3d-${product.id}`} className="h-64 bg-white rounded-lg shadow-sm overflow-hidden">
              <ProductViewer3D modelPath={product.model3d} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  function renderProductCard(product: Product) {
    return (
      <Card key={product.id} className="overflow-hidden">
        <div
          className="h-64 relative"
          onMouseEnter={() => setActiveProduct(product.id)}
          onMouseLeave={() => setActiveProduct(null)}
        >
          {activeProduct === product.id ? (
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
              {product.onSale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</span>
              )}
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
              )}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="mt-2">
            {product.onSale ? (
              <div className="flex items-center">
                <span className="font-bold">${product.salePrice?.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through ml-2">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/products/${product.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Details
            </Link>
          </Button>
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
    )
  }
}

