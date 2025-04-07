"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"

export default function ProductDetailPreview() {
  const [view, setView] = useState<"2d" | "3d">("2d")
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="container py-12 bg-white text-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image/3D Model */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[500px] mb-4">
            <div className="flex justify-end p-4">
              <div className="bg-white rounded-lg shadow-sm">
                <Button
                  variant={view === "2d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("2d")}
                  className="rounded-r-none"
                >
                  2D
                </Button>
                <Button
                  variant={view === "3d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("3d")}
                  className="rounded-l-none"
                >
                  3D
                </Button>
              </div>
            </div>

            {view === "3d" ? (
              <div className="h-[440px] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">3D Model Viewer</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[440px] bg-gray-200">
                <p className="text-gray-500">Product Image</p>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 border-transparent"
              >
                <div className="w-full h-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">Premium Cotton Slim Fit Shirt</h1>
          <div className="flex items-center mt-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl font-bold">$49.99</span>
            <span className="text-lg text-gray-500 line-through ml-2">$59.99</span>
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">17% OFF</span>
          </div>

          <p className="text-gray-600 mb-6">
            This premium cotton shirt features a modern slim fit design, perfect for both casual and formal occasions.
            Made from 100% organic cotton for breathability and comfort throughout the day.
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Color</h3>
            <div className="flex gap-2">
              {["#FFFFFF", "#ADD8E6", "#000080", "#000000"].map((color) => (
                <div
                  key={color}
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Size</h3>
              <Button variant="link" className="p-0 h-auto text-sm">
                Size Guide
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div key={size} className="flex items-center justify-center rounded-md border w-12 h-10 cursor-pointer">
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button size="lg" className="w-full mb-6 bg-indigo-600 hover:bg-indigo-700">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          {/* Product Tabs */}
          <Tabs defaultValue="details" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <p className="mb-4">
                This premium cotton shirt features a modern slim fit design, perfect for both casual and formal
                occasions.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>100% Organic Cotton</li>
                <li>Slim fit design</li>
                <li>Button-down collar</li>
                <li>Single chest pocket</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

