"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ProductCard"
import { motion } from "framer-motion"

const womensProducts = [
  {
    _id: "4",
    name: "Elegant Coat",
    price: 199.99,
    description: "Stylish and warm coat perfect for any occasion.",
    category: "women",
    model3d: "/models/tan_womans_coat.glb",
    fallbackImage: "/images/coat-fallback.jpg"
  },
  {
    _id: "5",
    name: "Pleated Midi Skirt",
    price: 89.99,
    description: "Elegant pleated midi skirt with a modern design.",
    category: "women",
    model3d: "/models/dark_blue_irregular_pleated_loose_midi_skirt.glb",
    fallbackImage: "/images/skirt-fallback.jpg"
  },
  {
    _id: "6",
    name: "Classic Maid Uniform",
    price: 129.99,
    description: "Traditional maid uniform with modern touches.",
    category: "women",
    model3d: "/models/maid_uniform.glb",
    fallbackImage: "/images/uniform-fallback.jpg"
  }
]

export default function WomensCollectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Women's Collection</h1>
        <p className="text-white/70 mb-8">
          Explore our  collection of women's clothing, where style meets comfort.
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
        {womensProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>
    </div>
  )
} 