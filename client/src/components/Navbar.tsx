"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, User, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "../store/AuthContext"
import { useCart } from "../store/CartContext"
import { ThemeToggle } from "./ThemeToggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { cartItems } = useCart()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold mr-6">
            EcoShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
            <Link to="/mens" className="text-sm font-medium transition-colors hover:text-primary">
              Men's Collection
            </Link>
            <Link to="/womens" className="text-sm font-medium transition-colors hover:text-primary">
              Women's Collection
            </Link>
            <Link to="/childrens" className="text-sm font-medium transition-colors hover:text-primary">
              Children's Collection
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link to="/admin" className="text-sm font-medium transition-colors hover:text-primary">
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-[200px] lg:w-[300px] pl-8" />
          </div>

          <ThemeToggle />

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Link to="/cart" className="relative mr-2">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container md:hidden py-4">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium" onClick={toggleMenu}>
              Products
            </Link>
            <Link to="/mens" className="text-sm font-medium" onClick={toggleMenu}>
              Men's Collection
            </Link>
            <Link to="/womens" className="text-sm font-medium" onClick={toggleMenu}>
              Women's Collection
            </Link>
            <Link to="/childrens" className="text-sm font-medium" onClick={toggleMenu}>
              Children's Collection
            </Link>
            <Link to="/about" className="text-sm font-medium" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium" onClick={toggleMenu}>
              Contact
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link to="/admin" className="text-sm font-medium" onClick={toggleMenu}>
                Admin
              </Link>
            )}
            <div className="relative my-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full pl-8" />
            </div>
            <div className="flex items-center my-2">
              <ThemeToggle />
            </div>
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link to="/profile" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">
                    My Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logout()
                    toggleMenu()
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

