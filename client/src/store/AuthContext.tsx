"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { jwtDecode } from "jwt-decode"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUserDetails: (name: string, email: string) => Promise<boolean>
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decodedToken = jwtDecode<User & { exp: number }>(token)

        // Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          setUser(null)
        } else {
          setUser({
            id: decodedToken.id,
            name: decodedToken.name,
            email: decodedToken.email,
            role: decodedToken.role,
          })
        }
      } catch (error) {
        localStorage.removeItem("token")
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        })
        return false
      }

      localStorage.setItem("token", data.token)

      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      })

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })

      return true
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Registration Failed",
          description: data.error || "Could not create account",
          variant: "destructive",
        })
        return false
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created",
      })

      return true
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserDetails = async (name: string, email: string) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Update Failed",
          description: "You must be logged in to update your profile",
          variant: "destructive",
        })
        return false
      }

      const response = await fetch("/api/auth/updatedetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Update Failed",
          description: data.error || "Could not update profile",
          variant: "destructive",
        })
        return false
      }

      // Update user state with new details
      setUser((prev) =>
        prev
          ? {
              ...prev,
              name,
              email,
            }
          : null,
      )

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })

      return true
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An error occurred while updating your profile",
        variant: "destructive",
      })
      return false
    }
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Update Failed",
          description: "You must be logged in to update your password",
          variant: "destructive",
        })
        return false
      }

      const response = await fetch("/api/auth/updatepassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Password Update Failed",
          description: data.error || "Could not update password",
          variant: "destructive",
        })
        return false
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully",
      })

      return true
    } catch (error) {
      toast({
        title: "Password Update Failed",
        description: "An error occurred while updating your password",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserDetails,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

