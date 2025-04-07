"use client"

import type React from "react"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"
import { Sidebar } from "./AdminSidebar"
import LoadingSpinner from "./LoadingSpinner"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if not admin
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      navigate("/login", { state: { from: { pathname: "/admin" } } })
    }
  }, [isAuthenticated, isLoading, navigate, user])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}

