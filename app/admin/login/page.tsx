"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { fetchFromAPI } from '@/lib/api'
import { Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const response = await fetchFromAPI('auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })

      if (response.token) {
        localStorage.setItem('adminToken', response.token)
        router.push('/admin/dashboard')
      }
    } catch (err) {
      setError('Invalid admin credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-lg border border-white/20 shadow-xl">
          <div className="flex flex-col items-center mb-6">
            <Shield className="w-12 h-12 text-white mb-2" />
            <h2 className="text-2xl font-bold text-white text-center">Admin Login</h2>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login to Admin Panel'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
} 