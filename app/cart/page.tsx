"use client"

import { useEffect, useState } from 'react'
import { useCart } from '@/lib/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatCurrency'
import ProductViewer3D from '@/components/ProductViewer3D'
import { loadStripe } from '@stripe/stripe-js'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import type { CartItem } from '@/lib/CartContext'
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
console.log('Stripe Public Key available:', !!stripePublicKey)
const stripePromise = loadStripe(stripePublicKey!)

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  
  



  
  const subtotal = total
  const shipping = items.length > 0 ? 5.99 : 0
  const orderTotal = subtotal + shipping

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      console.log('Starting checkout process...')
      
      // FOR STRIPE CHECKPOUT (WILL OPEN MAKE SURE TO ADD STRIPE API KEY TO PRODJCET VARIABLES)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item: CartItem) => ({
            ...item,
            price: Math.round(item.price * 100) 
            // CONVERSION FOR CASH VALUE
          }))
        }),
      })

      console.log('API Response status:', response.status)
      const data = await response.json()
      console.log('API Response data:', data)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const { sessionId, error } = data
      console.log('Session ID:', sessionId)
      
      if (error) {
        toast({
          title: "Checkout Error",
          description: error,
          variant: "destructive",
        })
        return
      }

  
      console.log('Initializing Stripe...')
  
  
  
  
      const stripe = await stripePromise
      console.log('Stripe initialized:', !!stripe)
      
      if (!stripe) {
        toast({
          title: "Stripe Error",
          description: "Failed to initialize payment system.",
          variant: "destructive",
        })
        return
      }

      console.log('Redirecting to checkout...')
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        toast({
          title: "Checkout Error",
          description: stripeError.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Checkout Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet</p>
          <Button asChild className="mt-4">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted">
                      <ProductViewer3D
                        modelPath={item.model3d || ''}
                        fallbackImage={item.fallbackImage}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-muted-foreground">{formatCurrency(item.price)}</p>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(orderTotal)}</span>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 