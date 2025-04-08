"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '../auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminLogin() {
  const router = useRouter()
  const { login } = useAdminAuth()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const success = login(formData.username, formData.password)
    if (success) {
      router.push('/admin')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
} 