import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

interface Product {
  _id: ObjectId
  name: string
  price: number
  description: string
  category: string
  model3d: string
  fallbackImage: string
}

const ITEMS_PER_PAGE = 12

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    console.log('Fetching products with category:', category)
    
    const client = await clientPromise
    const db = client.db()
    
    // Use case-insensitive regex match for category
    const query = category 
      ? { 
          category: { 
            $regex: new RegExp(`^${category}$`, 'i') 
          } 
        } 
      : {}
    
    console.log('MongoDB query:', JSON.stringify(query))
    
    // First check if we can connect and if there are any products
    const count = await db.collection<Product>('products').countDocuments(query)
    console.log(`Total matching products: ${count}`)

    if (count === 0) {
      console.log('No products found matching the criteria')
      return NextResponse.json([])
    }
    
    const products = await db.collection<Product>('products')
      .find(query)
      .limit(ITEMS_PER_PAGE)
      .toArray()

    console.log(`Found ${products.length} products`)

    const formattedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      price: parseFloat(product.price.toString())
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db()
    
    const body = await request.json()
    
    const result = await db.collection('products').insertOne(body)
    
    return NextResponse.json(
      { message: 'Product created successfully', productId: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 