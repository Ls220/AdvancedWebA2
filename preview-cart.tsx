"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react"

export default function CartPreview() {
  const cartItems = [
    {
      id: "1",
      name: "Premium Cotton Shirt",
      price: 49.99,
      quantity: 1,
      image: "/placeholder.svg",
      color: "White",
      size: "M",
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      price: 59.99,
      quantity: 2,
      image: "/placeholder.svg",
      color: "Blue",
      size: "32",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="container py-12 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            <Separator />

            {cartItems.map((item) => (
              <div key={item.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-200"></div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Color: {item.color}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 md:text-center">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-sm text-gray-500">Price:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 md:text-center">
                    <div className="flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-sm text-gray-500">Quantity:</span>
                      <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 md:text-center">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-sm text-gray-500">Total:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}

            <div className="p-4 flex justify-between">
              <Button variant="outline">Continue Shopping</Button>
              <Button variant="outline">Clear Cart</Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Promo code" />
                <Button variant="outline">Apply</Button>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

