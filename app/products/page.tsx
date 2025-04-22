'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useInView } from 'react-intersection-observer'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  imageUrl: string
  category: string
}

interface PaginationData {
  total: number
  pages: number
  currentPage: number
  hasMore: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const { ref, inView } = useInView()

  const fetchProducts = async (pageNum: number) => {
    try {
      const res = await fetch(`/api/products?page=${pageNum}`)
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      
      if (pageNum === 1) {
        setProducts(data.products)
      } else {
        setProducts(prev => [...prev, ...data.products])
      }
      setPagination(data.pagination)
    } catch (err) {
      setError('Failed to load products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(1)
  }, [])

  useEffect(() => {
    if (inView && pagination?.hasMore && !loading) {
      setPage(prev => prev + 1)
      fetchProducts(page + 1)
    }
  }, [inView, pagination?.hasMore])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center my-8">
          <LoadingSpinner />
        </div>
      )}

      <div ref={ref} className="h-10" />
    </div>
  )
} 