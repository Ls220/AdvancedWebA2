import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDb } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}

interface User {
  _id: string | ObjectId
  email: string
  password: string
  name: string
  phoneNumber: string
  deliveryAddress: string
  createdAt: string
}

const localUsers: User[] = [
  {
    _id: '1',
    email: 'test@example.com',
    password: '$2a$10$YourTestPassword123', // Password: Test123!
    name: 'Test User',
    phoneNumber: '1234567890',
    deliveryAddress: '123 Test St, Test City',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    email: 'admin@example.com',
    password: '$2a$10$YourAdminPassword456', // Password: Admin456!
    name: 'Admin User',
    phoneNumber: '0987654321',
    deliveryAddress: '456 Admin Ave, Admin City',
    createdAt: new Date().toISOString()
  }
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    let user: User | null = localUsers.find(u => u.email === email) || null

    if (!user) {
      try {
        const db = await getDb()
        const dbUser = await db.collection('users').findOne({ email })
        if (dbUser) {
          user = dbUser as User
        }
      } catch (error) {
        console.error('Database error:', error)
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    if (user._id === '1' || user._id === '2') {
      const isValidPassword = (user._id === '1' && password === 'Test123!') || 
                            (user._id === '2' && password === 'Admin456!')
      
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password)
      
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET as string,
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        deliveryAddress: user.deliveryAddress,
        createdAt: user.createdAt
      },
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 