import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import Order from '@/models/Order'

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = await verifyToken(token)
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    await connectToDatabase()
    
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .select('createdAt total status items')
    
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
} 