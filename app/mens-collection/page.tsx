"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ProductCard"
import { motion } from "framer-motion"

const mensProducts = [
  {
    _id: "1",
    name: "Classic Sneakers",
    price: 129.99,
    description: "Versatile and comfortable sneakers perfect for any casual outfit.",
    category: "men",
    model3d: "/models/Shoes.glb",
    fallbackImage: "/images/sneakers-fallback.jpg"
  },
  {
    _id: "2",
    name: "Casual T-Shirt",
    price: 39.99,
    description: "Comfortable and stylish t-shirt for everyday wear.",
    category: "men",
    model3d: "/models/T-shirt.glb",
    fallbackImage: "/images/tshirt-fallback.jpg"
  },
  {
    _id: "3",
    name: "Stylish Jacket",
    price: 149.99,
    description: "Modern jacket that combines style with functionality.",
    category: "men",
    model3d: "/models/Jacket.glb",
    fallbackImage: "/images/jacket-fallback.jpg"
  }
]

export default function MensCollectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Men's Collection</h1>
        <p className="text-white/70 mb-8">
          Discover our latest men's fashion pieces, designed for style and comfort.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {mensProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>
    </div>
  )
}

