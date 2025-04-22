import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

interface RegisterRequest {
  email: string
  password: string
  name: string
}

interface User {
  _id?: ObjectId
  email: string
  password: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json() as RegisterRequest

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const usersCollection = db.collection('users')

    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: User = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const { _id, ...userWithoutId } = newUser
    const result = await usersCollection.insertOne(userWithoutId)
    newUser._id = result.insertedId

    const token = jwt.sign(
      { userId: result.insertedId.toString() },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully',
        user: userWithoutPassword,
        token 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 