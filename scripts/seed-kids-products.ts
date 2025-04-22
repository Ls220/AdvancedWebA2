import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const kidsProducts = [
  {
    name: "Kids Denim Jacket",
    price: 39.99,
    description: "A stylish and durable denim jacket perfect for kids. Features comfortable fit and easy-to-use buttons.",
    category: "kids",
    model3d: "/models/jacket.glb",
    fallbackImage: "/images/jacket-fallback.jpg"
  },
  {
    name: "Children's Cotton T-Shirt",
    price: 14.99,
    description: "Soft and breathable cotton t-shirt for children. Available in various colors.",
    category: "kids",
    model3d: "/models/shirt.glb",
    fallbackImage: "/images/shirt-fallback.jpg"
  },
  {
    name: "Kids Sport Sneakers",
    price: 29.99,
    description: "Comfortable and durable sneakers for active kids. Features non-slip soles.",
    category: "kids",
    model3d: "/models/shoes.glb",
    fallbackImage: "/images/shoes-fallback.jpg"
  },
  {
    name: "Children's Hoodie",
    price: 24.99,
    description: "Warm and cozy hoodie perfect for cooler weather. Made from soft, high-quality materials.",
    category: "kids",
    model3d: "/models/hoodie.glb",
    fallbackImage: "/images/hoodie-fallback.jpg"
  },
  {
    name: "Kids Cargo Pants",
    price: 34.99,
    description: "Durable cargo pants with multiple pockets. Perfect for active kids who love adventures.",
    category: "kids",
    model3d: "/models/pants.glb",
    fallbackImage: "/images/pants-fallback.jpg"
  },
  {
    name: "Children's Winter Coat",
    price: 49.99,
    description: "Warm winter coat with water-resistant outer layer. Keeps kids cozy in cold weather.",
    category: "kids",
    model3d: "/models/coat.glb",
    fallbackImage: "/images/coat-fallback.jpg"
  }
]

async function seedKidsProducts() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    console.log('Connecting to MongoDB...')
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()

    console.log('Connected to MongoDB. Seeding kids products...')
    
    // Insert the products
    const result = await db.collection('products').insertMany(kidsProducts)
    
    console.log(`Successfully seeded ${result.insertedCount} kids products`)
    console.log('Inserted IDs:', result.insertedIds)

    await client.close()
    console.log('Database connection closed')
  } catch (error) {
    console.error('Error seeding kids products:', error)
    process.exit(1)
  }
}

seedKidsProducts() 