import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Use the same global users array as the login route
declare global {
  var users: any[]
}

if (!global.users) {
  global.users = []
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, fullName, phoneNumber, deliveryAddress } = body

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    // Parse delivery address if it's a string
    let parsedAddress = deliveryAddress
    if (typeof deliveryAddress === 'string') {
      try {
        parsedAddress = JSON.parse(deliveryAddress)
      } catch (e) {
        console.error('Failed to parse delivery address:', e)
        parsedAddress = { raw: deliveryAddress }
      }
    }

    // Check if user already exists
    if (global.users.some(user => user.email === email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      fullName,
      phoneNumber: phoneNumber || '',
      deliveryAddress: parsedAddress,
      createdAt: new Date().toISOString()
    }

    // Store user in global array
    global.users.push(newUser)

    // Log the registered user (for debugging)
    console.log('Registered new user:', { email, fullName })
    console.log('Total users:', global.users.length)

    // Return success response
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          phoneNumber: newUser.phoneNumber,
          deliveryAddress: newUser.deliveryAddress,
          createdAt: newUser.createdAt
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
} 