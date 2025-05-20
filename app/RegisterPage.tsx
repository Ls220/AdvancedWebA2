"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    street: '',
    city: '',
    postcode: '',
    country: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError('Password needs to be at least 6 characters')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email')
      return false
    }
    if (formData.phoneNumber && !/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      setError('Please enter a valid phone number')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          deliveryAddress: {
            street: formData.street,
            city: formData.city,
            postcode: formData.postcode,
            country: formData.country
          }
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      router.push('/login')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="px-8 py-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Join Our Fashion Community
          </h2>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="+1 (555) 555-5555"
              />
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Address</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                      Postcode
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage

