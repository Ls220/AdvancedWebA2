import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: 'men' | 'women' | 'kids'
}

interface AdminStore {
  users: User[]
  products: Product[]
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void
  updateUser: (id: string, data: Partial<User>) => void
  deleteUser: (id: string) => void
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'customer',
    createdAt: new Date('2024-01-15')
  }
]

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    price: 29.99,
    stock: 100,
    category: 'men'
  },
  {
    id: '2',
    name: 'Summer Dress',
    price: 59.99,
    stock: 50,
    category: 'women'
  }
]

export const useAdminStore = create<AdminStore>((set) => ({
  users: mockUsers,
  products: mockProducts,
  addUser: (userData) => set((state) => ({
    users: [...state.users, {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    }]
  })),
  updateUser: (id, data) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...data } : user
    )
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  addProduct: (productData) => set((state) => ({
    products: [...state.products, {
      ...productData,
      id: Math.random().toString(36).substr(2, 9)
    }]
  })),
  updateProduct: (id, data) => set((state) => ({
    products: state.products.map(product => 
      product.id === id ? { ...product, ...data } : product
    )
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(product => product.id !== id)
  }))
})) 