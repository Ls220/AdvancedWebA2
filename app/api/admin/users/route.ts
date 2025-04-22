import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { verifyJwtToken } from '@/lib/jwt'
import { UserModel } from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify token and check admin role
    const decoded = await verifyJwtToken(token)
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Fetch all users except current admin, excluding passwords
    const users = await UserModel.find({ _id: { $ne: decoded.userId } })
      .select('-password')
      .lean()

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error in users GET route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 