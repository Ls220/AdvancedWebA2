"use client"

import { useEffect, useState } from 'react'
import { useCart } from '@/lib/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatCurrency'
import ProductViewer3D from '@/components/ProductViewer3D'
import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      
      // Create Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const { sessionId, error } = await response.json()
      
      if (error) {
        console.error('Checkout error:', error)
        return
      }

      // Redirect to Stripe checkout
      const stripe = await stripePromise
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError)
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
            <p className="text-gray-600 text-center">Your cart is empty</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
          
          <div className="space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-6">
                    <div className="w-32 h-32">
                      <ProductViewer3D
                        modelPath={item.model3d || ''}
                        fallbackImage={item.fallbackImage}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">{formatCurrency(item.price)}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="text-lg">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-semibold">Total:</span>
              <span className="text-2xl font-bold">{formatCurrency(total)}</span>
            </div>
            
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 text-lg"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 