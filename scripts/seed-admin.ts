import { connectToDatabase } from '../lib/mongodb'
import bcrypt from 'bcryptjs'

// Hosting failed on VPS remove

async function seedAdmin() {
  try {
    console.log('Connecting to database...')
    const { db } = await connectToDatabase()
  
    const adminData = {
      email: 'admin@listers.com',
      password: await bcrypt.hash('Ls04_2024', 10),
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const existingAdmin = await db.collection('users').findOne({ email: adminData.email })
    
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    // Insert admin user
    const result = await db.collection('users').insertOne(adminData)
    console.log('Admin user created successfully:', result.insertedId)

  } catch (error) {
    console.error('Error seeding admin user:', error)
  } finally {
    process.exit()
  }
}

seedAdmin() 