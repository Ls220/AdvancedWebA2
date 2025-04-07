"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ShoppingBag, Users, Package, Settings, LogOut } from "lucide-react"
import { useAuth } from "../store/AuthContext"

export function Sidebar() {
  const { pathname } = useLocation()
  const { logout } = useAuth()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Orders",
      icon: ShoppingBag,
      href: "/admin/orders",
      active: pathname === "/admin/orders",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Products",
      icon: Package,
      href: "/admin/products",
      active: pathname === "/admin/products",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="h-full w-64 border-r bg-white flex flex-col">
      <div className="p-6">
        <Link to="/admin" className="flex items-center gap-2 mb-8">
          <span className="text-xl font-bold">EcoShop Admin</span>
        </Link>
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6">
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}

