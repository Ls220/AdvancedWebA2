import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Access the same users array from register route
// In a real app, this would be a database
declare global {
  var users: any[]
}

if (!global.users) {
  global.users = []
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = global.users.find(u => u.email === email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate session token (in a real app, use a proper JWT)
    const token = Buffer.from(Date.now().toString()).toString('base64')

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        deliveryAddress: user.deliveryAddress,
        createdAt: user.createdAt
      },
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
} 