import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import User from '@/models/User'
import { verifyToken } from '@/lib/auth'


declare global {
  var users: any[]
}

if (!global.users) {
  global.users = []
}

export async function GET(request: Request) {
  try {
    
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

  
    const token = authHeader.split(' ')[1]

    
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // LOCAL STORAGE USER DATA REMOVE WHEN YOU FIX
  
    
    const user = global.users[0] 
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Fetch user data withou sens data
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        deliveryAddress: user.deliveryAddress,
        createdAt: user.createdAt
      }
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
} 