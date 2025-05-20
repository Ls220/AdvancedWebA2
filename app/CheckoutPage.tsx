"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CreditCard, Lock, Package, Truck } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Sample Product",
      price: 99.99,
      quantity: 1,
      image: "/sample-product.jpg"
    }
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.2 // 20% VAT
  const total = subtotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    router.push("/checkout/success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Summary
              </h2>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (20% VAT)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="**** **** **** ****"
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/YY"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCVC">CVC</Label>
                    <Input
                      id="cardCVC"
                      placeholder="123"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Pay ${total.toFixed(2)}
                    </span>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Your payment is secured with SSL encryption
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

