"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 py-12">
      <LoginForm />
      <p className="text-center mt-4 text-white/70">
        Don't have an account?{' '}
        <Link href="/register" className="text-white hover:underline">
          Register here
        </Link>
      </p>
    </div>
  )
} 