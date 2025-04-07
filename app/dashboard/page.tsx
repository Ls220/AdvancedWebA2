"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Package, CreditCard, Settings, LogOut } from 'lucide-react'
import { fetchFromAPI } from '@/lib/api'

interface Order {
  _id: string
  createdAt: string
  total: number
  status: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

interface UserData {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  deliveryAddress: any
  createdAt: string
}

const DashboardPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState<Order[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        setError('')

        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetchFromAPI('user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setUserData(response.user)
      } catch (error: any) {
        console.error('Failed to fetch user data:', error)
        setError(error.message || 'Failed to load user data')
        
        // If token is invalid, redirect to login
        if (error.message.includes('Invalid token') || error.message.includes('Unauthorized')) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">No user data available</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20">
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="backdrop-blur-md bg-white/10 rounded-lg border border-white/20 shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">My Account</h1>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white/10 border border-white/20">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-white/20 text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-white/20 text-white"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Orders
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
                  {userData ? (
                    <div className="space-y-4 text-white/90">
                      <div>
                        <label className="block text-sm text-white/70">Full Name</label>
                        <p className="text-lg">{userData.fullName}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-white/70">Email Address</label>
                        <p className="text-lg">{userData.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-white/70">Phone Number</label>
                        <p className="text-lg">{userData.phoneNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-white/70">Delivery Address</label>
                        <p className="text-lg">
                          {userData.deliveryAddress.street}<br />
                          {userData.deliveryAddress.city}, {userData.deliveryAddress.postcode}<br />
                          {userData.deliveryAddress.country}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm text-white/70">Member Since</label>
                        <p className="text-lg">
                          {new Date(userData.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/70 text-center py-8">
                      No profile information available
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Order History</h2>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="bg-white/5 border border-white/10 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-white font-medium">
                                Order #{order._id.slice(-8)}
                              </p>
                              <p className="text-white/70 text-sm">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-medium">
                                £{order.total.toFixed(2)}
                              </p>
                              <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm text-white/70"
                              >
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span>£{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70 text-center py-8">
                      You haven't placed any orders yet.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage 