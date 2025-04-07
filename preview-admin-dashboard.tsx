"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, ShoppingBag, Package, TrendingUp } from "lucide-react"

export default function AdminDashboardPreview() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <h3 className="text-2xl font-bold">$15,789.99</h3>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">124</h3>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+5% from last month</span>
                </div>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">543</h3>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <h3 className="text-2xl font-bold">89</h3>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+3% from last month</span>
                </div>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Recent Orders and Low Stock */}
        <Tabs defaultValue="recent-orders">
          <TabsList>
            <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock Products</TabsTrigger>
          </TabsList>

          <TabsContent value="recent-orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "ord-001", customer: "John Doe", date: "2023-06-01", status: "Delivered", total: 129.99 },
                        {
                          id: "ord-002",
                          customer: "Jane Smith",
                          date: "2023-06-02",
                          status: "Processing",
                          total: 89.99,
                        },
                        {
                          id: "ord-003",
                          customer: "Mike Johnson",
                          date: "2023-06-03",
                          status: "Shipped",
                          total: 199.99,
                        },
                      ].map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">${order.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

