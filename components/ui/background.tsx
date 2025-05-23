"use client"

import { motion } from "framer-motion"

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600">
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]" />
      
      {/* Animated circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </motion.div>
    </div>
  )
} 