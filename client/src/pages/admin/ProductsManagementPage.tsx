"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Plus, Edit, Trash, Eye } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  subcategory: string
  price: number
  stock: number
  status: "in-stock" | "low-stock" | "out-of-stock"
  featured: boolean
  image: string
}

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    // In a real app, fetch this data from your API
    // For now, we'll use mock data
    const mockProducts: Product[] = [
      {
        id: "PROD-001",
        name: "Men's T-Shirt",
        category: "men",
        subcategory: "tshirts",
        price: 29.99,
        stock: 45,
        status: "in-stock",
        featured: true,
        image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
      },
      {
        id: "PROD-002",
        name: "Women's Dress",
        category: "women",
        subcategory: "dresses",
        price: 59.99,
        stock: 28,
        status: "in-stock",
        featured: true,
        image: "/placeholder.svg?height=300&width=300&text=Dress",
      },
      {
        id: "PROD-003",
        name: "Kids Shoes",
        category: "children",
        subcategory: "shoes",
        price: 39.99,
        stock: 5,
        status: "low-stock",
        featured: false,
        image: "/placeholder.svg?height=300&width=300&text=Shoes",
      },
      {
        id: "PROD-004",
        name: "Men's Jacket",
        category: "men",
        subcategory: "jackets",
        price: 89.99,
        stock: 0,
        status: "out-of-stock",
        featured: false,
        image: "/placeholder.svg?height=300&width=300&text=Jacket",
      },
      {
        id: "PROD-005",
        name: "Women's Skirt",
        category: "women",
        subcategory: "skirts",
        price: 49.99,
        stock: 12,
        status: "in-stock",
        featured: true,
        image: "/placeholder.svg?height=300&width=300&text=Skirt",
      },
    ]

    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    let result = products

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter)
    }

    setFilteredProducts(result)
  }, [searchTerm, categoryFilter, products])

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Products Management</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Create a new product to add to your inventory.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Product Name
                  </label>
                  <Input id="name" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price
                  </label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="children">Children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subcategory" className="text-sm font-medium">
                    Subcategory
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tshirts">T-Shirts</SelectItem>
                      <SelectItem value="shirts">Shirts</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="skirts">Skirts</SelectItem>
                      <SelectItem value="jackets">Jackets</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="stock" className="text-sm font-medium">
                    Stock
                  </label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="featured" className="text-sm font-medium">
                    Featured
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea id="description" placeholder="Enter product description" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input id="image" placeholder="Enter image URL" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product inventory and details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="children">Children</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Image</th>
                    <th className="text-left py-3 px-4">Product ID</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-right py-3 px-4">Price</th>
                    <th className="text-center py-3 px-4">Stock</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-center py-3 px-4">Featured</th>
                    <th className="text-center py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-muted/30">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.id}</td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">
                        <span className="capitalize">{product.category}</span>
                        <span className="text-xs text-muted-foreground block">{product.subcategory}</span>
                      </td>
                      <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">{product.stock}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(product.status)}`}>
                          {formatStatus(product.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{product.featured ? "Yes" : "No"}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

