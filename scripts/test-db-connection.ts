import { connectToDatabase } from '../lib/mongodb'
import mongoose from 'mongoose'

async function testConnection() {
  try {
    await connectToDatabase()
    if (!mongoose.connection) {
      throw new Error('No mongoose connection available')
    }
    console.log('Successfully connected to MongoDB Atlas!')
    console.log('Connection details:', {
      host: mongoose.connection.host,
      database: mongoose.connection.name
    })
    process.exit(0)
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error)
    process.exit(1)
  }
}

testConnection() 