import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Document, WithId, ObjectId } from 'mongodb'

interface Product {
  _id: string;
  name: string;
  category: string;
  [key: string]: any;
}

export async function GET() {
  try {
    console.log('Testing MongoDB connection...')
    const { db } = await connectToDatabase()
    

    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)
    

    const collectionCounts = await Promise.all(
      collectionNames.map(async (name) => {
        const count = await db.collection(name).countDocuments()
        return { name, count }
      })
    )
    
    // Get sample data 
    let sampleProducts: Product[] = []
    if (collectionNames.includes('products')) {
      const docs = await db.collection('products')
        .find({})
        .limit(2)
        .toArray()
      
      sampleProducts = docs.map(doc => {
        const { _id, ...rest } = doc
        return {
          _id: (_id as ObjectId).toString(),
          ...rest as Omit<Product, '_id'>
        }
      })
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connection successful',
      collections: collectionCounts,
      sampleProducts: sampleProducts.map(p => ({
        _id: p._id,
        name: p.name,
        category: p.category
      }))
    })
  } catch (error) {
    console.error('MongoDB connection test failed:', error)
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
} 