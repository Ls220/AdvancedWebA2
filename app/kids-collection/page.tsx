"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductViewer3D from "@/components/ProductViewer3D"
import { formatCurrency } from "@/lib/formatCurrency"
import ProductCard from '@/components/ProductCard'

const kidsProducts = [
  {
    _id: "kids-1",
    name: "Kids Denim Jacket",
    price: 39.99,
    description: "A stylish and durable denim jacket perfect for kids. Features comfortable fit and easy-to-use buttons.",
    category: "kids",
    model3d: "/models/jacket.glb",
    fallbackImage: "/images/jacket-fallback.jpg"
  },
  {
    _id: "kids-2",
    name: "Kids Sport Sneakers",
    price: 29.99,
    description: "Comfortable and durable sneakers for active kids. Features non-slip soles.",
    category: "kids",
    model3d: "/models/shoes.glb",
    fallbackImage: "/images/shoes-fallback.jpg"
  }
]

export default function KidsCollectionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Kids Collection</h1>
          <p className="text-muted-foreground text-lg">
            Discover our adorable childrens clothing designed for comfort and style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kidsProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
} 