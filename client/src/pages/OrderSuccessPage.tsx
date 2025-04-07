"use client"

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface Order {
  _id: string
  orderItems: Array<{
    name: string
    quantity: number
    image: string
    price: number
  }>
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  totalPrice: number
  isPaid: boolean
  paidAt: string
  createdAt: string
}

export default function OrderSuccessPage() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch order details")
        }

        const data = await response.json()
        setOrder(data.data)
      } catch (error) {
        console.error("Error fetching order:", error)
        setError("Could not load order details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">{error || "Order not found"}</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-left">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-left">
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/profile">View Order History</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

