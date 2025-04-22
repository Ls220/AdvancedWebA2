import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  email: string
  role: string
}

export async function createJwtToken(payload: JwtPayload): Promise<string | null> {
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT_SECRET is not defined')
    }

    const token = jwt.sign(payload, secret, {
      expiresIn: '7d', // Token expires in 7 days
    })
    return token
  } catch (error) {
    console.error('Error creating JWT:', error)
    return null
  }
}

export async function verifyJwtToken(token: string): Promise<JwtPayload | null> {
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT_SECRET is not defined')
    }

    const decoded = jwt.verify(token, secret) as JwtPayload
    return decoded
  } catch (error) {
    console.error('Error verifying JWT:', error)
    return null
  }
} 