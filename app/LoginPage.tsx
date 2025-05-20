"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleLogin(ev: React.FormEvent) {
    ev.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to login")
      }

      localStorage.setItem("token", data.token)
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })
      router.push("/")
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || "Please check your credentials and try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-4"
      >
        <form 
          className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/20" 
          onSubmit={handleLogin}
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Welcome Back</h1>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full mt-6 px-4 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all transform hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm text-white/70">
            Don't have an account?{" "}
            <a href="/register" className="text-white hover:text-white/90 transition-colors">
              Create one
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

