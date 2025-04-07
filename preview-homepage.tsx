"use client"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomepagePreview() {
  return (
    <div className="bg-white text-black">
      {/* Hero Section with 3D Scene */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          {/* 3D Scene would render here */}
          <div className="w-full h-full bg-gradient-to-r from-blue-100 to-indigo-100"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Style in 3D</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Explore our latest fashion collections with immersive 3D previews and find your perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Cards would render here */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold">Featured Product {i}</h3>
                  <p className="text-gray-500 text-sm mt-1">Product description here</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-bold">$59.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Men", "Women", "Children"].map((category) => (
              <div key={category} className="relative overflow-hidden rounded-lg group h-64 bg-gray-200">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white text-2xl font-bold mb-2">{category}</h3>
                    <Button variant="secondary">Browse Collection</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

