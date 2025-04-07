'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { fetchFromAPI } from '@/lib/api'

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetchFromAPI('auth/login', {
        method: 'POST',
        body: JSON.stringify(formData)
      })

      if (response.token) {
        // Store the token
        localStorage.setItem('token', response.token)
        // Store user data if needed
        localStorage.setItem('user', JSON.stringify(response.user))
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setError('Login failed. Please try again.')
      }
    } catch (error: any) {
      setError(error.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-md bg-white/10 rounded-lg border border-white/20 shadow-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-center text-white/80">
            Don't have an account?{' '}
            <a href="/register" className="text-white hover:text-white/80 underline">
              Create one
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
} 