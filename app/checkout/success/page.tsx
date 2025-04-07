"use client"

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  
  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-300 to-teal-200 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully processed. You will receive an email confirmation shortly.
        </p>

        <Button asChild className="w-full">
          <Link href="/products">
            Continue Shopping
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
} 