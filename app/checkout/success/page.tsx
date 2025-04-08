"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Order Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <Button
            onClick={() => router.push('/')}
            className="w-full"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
} 