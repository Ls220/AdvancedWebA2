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

export default function WomensCollectionPage() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const { addToCart } = useCart()

  const womensProducts: Product[] = [
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
      model3d: "/assets/3d/maid_uniform.glb",
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

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Women's Collection</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="dresses">Dresses</TabsTrigger>
          <TabsTrigger value="coats">Coats</TabsTrigger>
          <TabsTrigger value="skirts">Skirts</TabsTrigger>
          <TabsTrigger value="shoes">Shoes</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {womensProducts.map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="dresses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {womensProducts.filter((p) => p.subcategory === "dresses").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="coats">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {womensProducts.filter((p) => p.subcategory === "coats").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="skirts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {womensProducts.filter((p) => p.subcategory === "skirts").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="shoes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {womensProducts.filter((p) => p.subcategory === "shoes").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Experience Our 3D Product Visualization</h2>
        <p className="text-center mb-6">
          Get a better look at our products with our interactive 3D viewer. Hover over any product to see it in 3D!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-white rounded-lg shadow-sm overflow-hidden">
            <ProductViewer3D modelPath="/assets/3d/maid_uniform.glb" />
            <div className="p-2 text-center">
              <p className="font-medium">Maid Uniform Dress</p>
            </div>
          </div>
          <div className="h-64 bg-white rounded-lg shadow-sm overflow-hidden">
            <ProductViewer3D modelPath="/assets/3d/tan_womans_coat.glb" />
            <div className="p-2 text-center">
              <p className="font-medium">Tan Women's Coat</p>
            </div>
          </div>
          <div className="h-64 bg-white rounded-lg shadow-sm overflow-hidden">
            <ProductViewer3D modelPath="/assets/3d/womenshoes.glb" />
            <div className="p-2 text-center">
              <p className="font-medium">Women's Fashion Heels</p>
            </div>
          </div>
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

