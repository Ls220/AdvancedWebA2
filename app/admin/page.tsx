"use client"

import { useState } from 'react'
import { useAdminStore, User, Product } from './store'
import { useAdminAuth } from './auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency } from '@/lib/formatCurrency'
import { ThemeToggle } from './ThemeToggle'
import { Plus } from 'lucide-react'

export default function AdminDashboard() {
  const { logout } = useAdminAuth()
  const { users, products, addUser, updateUser, deleteUser, addProduct, updateProduct, deleteProduct } = useAdminStore()
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [userForm, setUserForm] = useState<Partial<User>>({})
  const [productForm, setProductForm] = useState<Partial<Product>>({})
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const handleUserEdit = (user: User) => {
    setEditingUser(user.id)
    setUserForm(user)
  }

  const handleUserSave = (id: string) => {
    updateUser(id, userForm)
    setEditingUser(null)
    setUserForm({})
  }

  const handleAddUser = () => {
    if (!userForm.name || !userForm.email) return
    addUser({
      name: userForm.name,
      email: userForm.email,
      role: 'customer'
    })
    setIsAddingUser(false)
    setUserForm({})
  }

  const handleProductEdit = (product: Product) => {
    setEditingProduct(product.id)
    setProductForm(product)
  }

  const handleProductSave = (id: string) => {
    updateProduct(id, productForm)
    setEditingProduct(null)
    setProductForm({})
  }

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.stock || !productForm.category) return
    addProduct({
      name: productForm.name,
      price: productForm.price,
      stock: productForm.stock,
      category: productForm.category
    })
    setIsAddingProduct(false)
    setProductForm({})
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="secondary"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="users" className="bg-card rounded-lg shadow-lg p-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="users">Users Management</TabsTrigger>
            <TabsTrigger value="stock">Stock Management</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setIsAddingUser(true)
                  setUserForm({})
                }}
                className="mb-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>

            {isAddingUser && (
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        value={userForm.name || ''}
                        onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Name"
                      />
                      <Input
                        value={userForm.email || ''}
                        onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsAddingUser(false)
                          setUserForm({})
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddUser}>
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {users.map(user => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  {editingUser === user.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          value={userForm.name || ''}
                          onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Name"
                        />
                        <Input
                          value={userForm.email || ''}
                          onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Email"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingUser(null)
                            setUserForm({})
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => handleUserSave(user.id)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleUserEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stock" className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setIsAddingProduct(true)
                  setProductForm({})
                }}
                className="mb-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </div>

            {isAddingProduct && (
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        value={productForm.name || ''}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Product Name"
                      />
                      <Input
                        type="number"
                        value={productForm.price || ''}
                        onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        placeholder="Price"
                      />
                      <Input
                        type="number"
                        value={productForm.stock || ''}
                        onChange={(e) => setProductForm(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                        placeholder="Stock"
                      />
                      <select
                        className="border rounded p-2 bg-background text-foreground"
                        value={productForm.category || ''}
                        onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value as 'men' | 'women' | 'kids' }))}
                      >
                        <option value="">Select Category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsAddingProduct(false)
                          setProductForm({})
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddProduct}>
                        Add Product
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {products.map(product => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  {editingProduct === product.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          value={productForm.name || ''}
                          onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Product Name"
                        />
                        <Input
                          type="number"
                          value={productForm.price || ''}
                          onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                          placeholder="Price"
                        />
                        <Input
                          type="number"
                          value={productForm.stock || ''}
                          onChange={(e) => setProductForm(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                          placeholder="Stock"
                        />
                        <select
                          className="border rounded p-2 bg-background text-foreground"
                          value={productForm.category || product.category}
                          onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value as 'men' | 'women' | 'kids' }))}
                        >
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                          <option value="kids">Kids</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(null)
                            setProductForm({})
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => handleProductSave(product.id)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Price: {formatCurrency(product.price)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Stock: {product.stock} | Category: {product.category}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleProductEdit(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 