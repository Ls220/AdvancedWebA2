"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/formatCurrency'

interface Order {
  id: string
  date: string
  status: 'pending' | 'shipped' | 'delivered'
  total: number
  items: {
    name: string
    quantity: number
    price: number
  }[]
}

interface UserProfile {
  name: string
  email: string
  orders: Order[]
}

// Mock user data - replace with actual API call in production
const mockUserProfile: UserProfile = {
  name: "John Doe",
  email: "john@example.com",
  orders: [
    {
      id: "ord_1",
      date: "2024-03-15",
      status: "delivered",
      total: 159.98,
      items: [
        {
          name: "Classic T-Shirt",
          quantity: 2,
          price: 29.99
        },
        {
          name: "Summer Dress",
          quantity: 1,
          price: 99.99
        }
      ]
    },
    {
      id: "ord_2",
      date: "2024-03-20",
      status: "pending",
      total: 89.97,
      items: [
        {
          name: "Denim Jeans",
          quantity: 1,
          price: 89.97
        }
      ]
    }
  ]
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - replace with actual API call in production
    const fetchProfile = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProfile(mockUserProfile)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Not Logged In</h1>
          <Button onClick={() => router.push('/login')}>
            Log In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Profile</h1>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Personal Details</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground">{profile.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{profile.email}</p>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {profile.orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Order #{order.id}</span>
                    <span className="text-sm font-normal">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`capitalize ${
                        order.status === 'delivered' ? 'text-green-500' :
                        order.status === 'shipped' ? 'text-blue-500' :
                        'text-yellow-500'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="border-t pt-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="text-foreground">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 