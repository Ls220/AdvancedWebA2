import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('P')
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please ')
}

const uri = process.env.MONGODB_URI
const options = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 5,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function getDb() {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DB)
}

export default clientPromise 