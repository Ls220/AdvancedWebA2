"use client"

import Link from 'next/link'
import RegisterForm from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Create Account</h1>
        <div className="backdrop-blur-md bg-white/10 rounded-lg border border-white/20 shadow-xl p-6">
          <RegisterForm />
          <div className="mt-4 text-center text-white/70">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 