'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { fetchFromAPI } from '@/lib/api'

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    street: '',
    city: '',
    postcode: '',
    additionalEmail: ''
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // Construct the full address
      const deliveryAddress = {
        street: formData.street,
        city: formData.city,
        postcode: formData.postcode,
        email: formData.additionalEmail
      }

      const registrationData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        deliveryAddress: JSON.stringify(deliveryAddress)
      }

      const response = await fetchFromAPI('auth/register', {
        method: 'POST',
        body: JSON.stringify(registrationData)
      })

      if (response.message === 'User registered successfully') {
        router.push('/login')
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (error: any) {
      setError(error.message || 'Failed to register user')
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
          <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter your full name"
              />
            </div>

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
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-white mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Street Address"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="City"
                />
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Postcode"
                />
              </div>
              <input
                type="email"
                name="additionalEmail"
                value={formData.additionalEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Additional Email (Optional)"
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
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-center text-white/80">
            Already have an account?{' '}
            <a href="/login" className="text-white hover:text-white/80 underline">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
} 