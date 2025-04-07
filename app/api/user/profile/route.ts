import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import User from '@/models/User'
import { verifyToken } from '@/lib/auth'

// Access the same users array from register route
declare global {
  var users: any[]
}

if (!global.users) {
  global.users = []
}

export async function GET(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    // Extract the token
    const token = authHeader.split(' ')[1]

    // In a real app, you would verify the JWT token
    // For now, we'll do a simple check if the token exists
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user data from localStorage in the client
    // In a real app, you would decode the JWT and get the user ID
    // Then fetch the user from the database
    const user = global.users[0] // For demo, return the first user

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return user data without sensitive information
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