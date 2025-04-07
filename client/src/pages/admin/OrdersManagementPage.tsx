"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Eye, Truck } from "lucide-react"

interface Order {
  id: string
  customer: {
    name: string
    email: string
  }
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  payment: "paid" | "refunded"
  total: number
  items: number
}

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    // In a real app, fetch this data from your API
    // For now, we'll use mock data
    const mockOrders: Order[] = [
      {
        id: "ORD-001",
        customer: {
          name: "John Doe",
          email: "john@example.com",
        },
        date: "2023-06-01",
        status: "delivered",
        payment: "paid",
        total: 129.99,
        items: 3,
      },
      {
        id: "ORD-002",
        customer: {
          name: "Jane Smith",
          email: "jane@example.com",
        },
        date: "2023-06-02",
        status: "processing",
        payment: "paid",
        total: 89.99,
        items: 2,
      },
      {
        id: "ORD-003",
        customer: {
          name: "Mike Johnson",
          email: "mike@example.com",
        },
        date: "2023-06-03",
        status: "shipped",
        payment: "paid",
        total: 199.99,
        items: 4,
      },
      {
        id: "ORD-004",
        customer: {
          name: "Sarah Williams",
          email: "sarah@example.com",
        },
        date: "2023-06-04",
        status: "pending",
        payment: "paid",
        total: 59.99,
        items: 1,
      },
      {
        id: "ORD-005",
        customer: {
          name: "Robert Brown",
          email: "robert@example.com",
        },
        date: "2023-06-05",
        status: "cancelled",
        payment: "refunded",
        total: 149.99,
        items: 3,
      },
    ]

    setOrders(mockOrders)
    setFilteredOrders(mockOrders)
  }, [])

  useEffect(() => {
    let result = orders

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(result)
  }, [searchTerm, statusFilter, orders])

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentBadgeClass = (payment: string) => {
    switch (payment) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "refunded":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <Button>Export Orders</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage and process customer orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Payment</th>
                    <th className="text-right py-3 px-4">Total</th>
                    <th className="text-center py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPaymentBadgeClass(order.payment)}`}>
                          {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        ${order.total.toFixed(2)}
                        <div className="text-xs text-muted-foreground">{order.items} items</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={order.status === "delivered" || order.status === "cancelled"}
                          >
                            <Truck className="h-4 w-4" />
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

