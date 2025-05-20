"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems([
        {
          id: "1",
          name: "Classic White Sneakers",
          price: 89.99,
          quantity: 1,
          image: "/sample-product.jpg",
          size: "42",
          color: "White"
        }
      ])
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 flex items-center gap-2"
        >
          <ShoppingBag className="animate-bounce" />
          <span>Loading your style...</span>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          Your Shopping Bag
        </motion.h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <AnimatePresence mode="popLayout">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white rounded-2xl shadow-sm"
                >
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-4">Your shopping bag is empty</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/')}
                    className="text-indigo-600 hover:text-indigo-500 font-medium inline-flex items-center gap-2"
                  >
                    Start Shopping
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                        {item.size && (
                          <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-500">Color: {item.color}</p>
                        )}
                        <div className="flex items-center gap-3 mt-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-gray-100 rounded-full"
                          >
                            <Minus size={16} />
                          </motion.button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 hover:bg-gray-100 rounded-full"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-xl shadow-sm sticky top-8"
            >
              <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/checkout')}
                className="w-full mt-8 bg-black text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

