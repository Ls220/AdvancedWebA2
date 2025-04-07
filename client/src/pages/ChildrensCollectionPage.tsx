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

export default function ChildrensCollectionPage() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const { addToCart } = useCart()

  const childrensProducts: Product[] = [
    {
      id: "1",
      name: "Kids Colorful Dress",
      description: "Comfortable and colorful dress for children, perfect for everyday wear and special occasions",
      price: 49.99,
      salePrice: 39.99,
      onSale: true,
      isNew: true,
      image: "/placeholder.svg?height=300&width=300&text=Kids+Dress",
      model3d: "/assets/3d/kids_dress.glb",
      category: "children",
      subcategory: "dresses",
      colors: [
        { name: "Pink", hexCode: "#FFC0CB" },
        { name: "Blue", hexCode: "#ADD8E6" },
        { name: "Yellow", hexCode: "#FFFF99" },
      ],
      sizes: ["3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y"],
    },
    {
      id: "2",
      name: "Children's Casual Shoes",
      description: "Comfortable and durable shoes for active children",
      price: 39.99,
      onSale: false,
      isNew: true,
      image: "/placeholder.svg?height=300&width=300&text=Kids+Shoes",
      model3d: "/assets/3d/childs_shoes.glb",
      category: "children",
      subcategory: "shoes",
      colors: [
        { name: "Red", hexCode: "#FF0000" },
        { name: "Blue", hexCode: "#0000FF" },
        { name: "Green", hexCode: "#008000" },
      ],
      sizes: ["5", "6", "7", "8", "9", "10", "11", "12", "13"],
    },
    {
      id: "3",
      name: "Kids Denim Overalls",
      description: "Durable denim overalls for active children",
      price: 39.99,
      onSale: false,
      isNew: false,
      image: "/placeholder.svg?height=300&width=300&text=Overalls",
      model3d: "/assets/3d/kids_dress.glb", // Using the dress model as a placeholder
      category: "children",
      subcategory: "pants",
      sizes: ["3-4Y", "4-5Y", "5-6Y", "6-7Y"],
      colors: [
        { name: "Light Denim", hexCode: "#ADD8E6" },
        { name: "Dark Denim", hexCode: "#00008B" },
      ],
    },
    {
      id: "4",
      name: "Kids T-Shirt",
      description: "Soft cotton t-shirt with fun designs for children",
      price: 19.99,
      salePrice: 14.99,
      onSale: true,
      isNew: false,
      image: "/placeholder.svg?height=300&width=300&text=Kids+T-Shirt",
      model3d: "/assets/3d/kids_dress.glb", // Using the dress model as a placeholder
      category: "children",
      subcategory: "tshirts",
      colors: [
        { name: "White", hexCode: "#FFFFFF" },
        { name: "Blue", hexCode: "#ADD8E6" },
        { name: "Red", hexCode: "#FF0000" },
      ],
      sizes: ["3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-9Y"],
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Children's Collection</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="dresses">Dresses</TabsTrigger>
          <TabsTrigger value="shoes">Shoes</TabsTrigger>
          <TabsTrigger value="pants">Pants</TabsTrigger>
          <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {childrensProducts.map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="dresses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {childrensProducts.filter((p) => p.subcategory === "dresses").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="shoes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {childrensProducts.filter((p) => p.subcategory === "shoes").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="pants">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {childrensProducts.filter((p) => p.subcategory === "pants").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>

        <TabsContent value="tshirts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {childrensProducts.filter((p) => p.subcategory === "tshirts").map((product) => renderProductCard(product))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Experience Our 3D Product Visualization</h2>
        <p className="text-center mb-6">
          Get a better look at our products with our interactive 3D viewer. Hover over any product to see it in 3D!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-white rounded-lg shadow-sm overflow-hidden">
            <ProductViewer3D modelPath="/assets/3d/kids_dress.glb" />
            <div className="p-2 text-center">
              <p className="font-medium">Kids Colorful Dress</p>
            </div>
          </div>
          <div className="h-64 bg-white rounded-lg shadow-sm overflow-hidden">
            <ProductViewer3D modelPath="/assets/3d/childs_shoes.glb" />
            <div className="p-2 text-center">
              <p className="font-medium">Children's Casual Shoes</p>
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

