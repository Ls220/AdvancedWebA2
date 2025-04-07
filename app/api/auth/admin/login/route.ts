import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Admin credentials (in a real app, these would be stored securely)
const ADMIN_USERNAME = 'LS04'
const ADMIN_PASSWORD = 'P455WORD'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate admin token with special claims
      const token = jwt.sign(
        { 
          username,
          isAdmin: true 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      )

      return NextResponse.json({ token, success: true })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid admin credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 