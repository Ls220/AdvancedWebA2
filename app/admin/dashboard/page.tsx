"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Users, Package, LogOut } from 'lucide-react'
import { fetchFromAPI } from '@/lib/api'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'users' | 'stock'>('users')
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen">
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="backdrop-blur-md bg-white/10 rounded-lg border border-white/20 p-4">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/20 ${
                    activeTab === 'users' ? 'bg-white/20' : ''
                  }`}
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Users
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/20 ${
                    activeTab === 'stock' ? 'bg-white/20' : ''
                  }`}
                  onClick={() => setActiveTab('stock')}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Stock
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="backdrop-blur-md bg-white/10 rounded-lg border border-white/20 p-6"
            >
              {activeTab === 'users' ? (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">User Management</h2>
                  <p className="text-white/70">User management interface coming soon...</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Stock Management</h2>
                  <p className="text-white/70">Stock management interface coming soon...</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}