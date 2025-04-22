import { connectToDatabase } from '@/lib/mongodb'
import Product from '@/models/Product'

const products = [
  {
    name: 'Classic T-Shirt',
    price: 29.99,
    description: 'Premium cotton t-shirt with modern fit',
    category: 'men',
    subcategory: 'tshirts',
    model3d: '/models/T-shirt.glb',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hexCode: '#FFFFFF', inStock: true },
      { name: 'Black', hexCode: '#000000', inStock: true },
      { name: 'Navy', hexCode: '#000080', inStock: true }
    ],
    stock: 100,
    isNew: true,
    isFeatured: true
  },
  {
    name: 'Leather Jacket',
    price: 199.99,
    description: 'Stylish leather jacket for any occasion',
    category: 'men',
    subcategory: 'jackets',
    model3d: '/models/Jacket.glb',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Brown', hexCode: '#8B4513', inStock: true },
      { name: 'Black', hexCode: '#000000', inStock: true }
    ],
    stock: 50,
    material: 'Genuine Leather',
    careInstructions: 'Professional leather cleaning only'
  },
  {
    name: 'Elegant Midi Skirt',
    price: 79.99,
    description: 'Dark blue pleated loose midi skirt',
    category: 'women',
    subcategory: 'skirts',
    model3d: '/models/dark_blue_irregular_pleated_loose_midi_skirt.glb',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=60',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Navy', hexCode: '#000080', inStock: true },
      { name: 'Black', hexCode: '#000000', inStock: true }
    ],
    stock: 75,
    isNew: true
  },
  {
    name: 'Tan Coat',
    price: 249.99,
    description: 'Elegant tan woman\'s coat for all seasons',
    category: 'women',
    subcategory: 'coats',
    model3d: '/models/tan_womans_coat.glb',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&auto=format&fit=crop&q=60',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Tan', hexCode: '#D2B48C', inStock: true }
    ],
    stock: 30,
    material: 'Wool Blend',
    isFeatured: true
  },
  {
    name: 'Kids Party Dress',
    price: 49.99,
    description: 'Adorable party dress for special occasions',
    category: 'kids',
    subcategory: 'dresses',
    model3d: '/models/kids_dress.glb',
    image: 'https://images.unsplash.com/photo-1543060829-a0029874b174?w=800&auto=format&fit=crop&q=60',
    sizes: ['3-4Y', '4-5Y', '5-6Y', '6-7Y'],
    colors: [
      { name: 'Pink', hexCode: '#FFC0CB', inStock: true },
      { name: 'Purple', hexCode: '#800080', inStock: true }
    ],
    stock: 40,
    isNew: true
  }
]

async function seed() {
  try {
    // Connect to database
    await connectToDatabase()
    
    // Clear existing products
    await Product.deleteMany({})
    console.log('Cleared existing products')
    
    // Insert new products
    const createdProducts = await Product.insertMany(products)
    console.log(`Seeded ${createdProducts.length} products`)
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed() 