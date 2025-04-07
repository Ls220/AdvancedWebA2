import { NextResponse } from 'next/server'

const dummyProducts = [
  {
    _id: '1',
    name: 'Classic T-Shirt',
    price: 29.99,
    description: 'Premium cotton t-shirt with modern fit',
    category: 'men',
    model3d: '/models/T-shirt.glb',
    fallbackImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60'
  },
  {
    _id: '2',
    name: 'Leather Jacket',
    price: 199.99,
    description: 'Stylish leather jacket for any occasion',
    category: 'men',
    model3d: '/models/Jacket.glb',
    fallbackImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60'
  },
  {
    _id: '3',
    name: 'Designer Shoes',
    price: 149.99,
    description: 'Comfortable and stylish footwear',
    category: 'men',
    model3d: '/models/Shoes.glb',
    fallbackImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60'
  },
  {
    _id: '4',
    name: 'Elegant Midi Skirt',
    price: 79.99,
    description: 'Dark blue pleated loose midi skirt',
    category: 'women',
    model3d: '/models/dark_blue_irregular_pleated_loose_midi_skirt.glb',
    fallbackImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=60'
  },
  {
    _id: '5',
    name: 'Tan Coat',
    price: 249.99,
    description: 'Elegant tan woman\'s coat for all seasons',
    category: 'women',
    model3d: '/models/tan_womans_coat.glb',
    fallbackImage: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&auto=format&fit=crop&q=60'
  },
  {
    _id: '6',
    name: 'Kids Party Dress',
    price: 49.99,
    description: 'Adorable party dress for special occasions',
    category: 'kids',
    model3d: '/models/kids_dress.glb',
    fallbackImage: 'https://images.unsplash.com/photo-1543060829-a0029874b174?w=800&auto=format&fit=crop&q=60'
  },
  {
    _id: '7',
    name: 'Cowboy Hat',
    price: 89.99,
    description: 'Classic western-style cowboy hat',
    category: 'accessories',
    model3d: '/models/Cowboy hat.glb',
    fallbackImage: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&auto=format&fit=crop&q=60'
  },
  {
    _id: '8',
    name: 'Designer Shoes - Limited Edition',
    price: 179.99,
    description: 'Premium limited edition footwear',
    category: 'women',
    model3d: '/models/shoes (1).glb',
    fallbackImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60'
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')?.toLowerCase()
    
    // Log the request details for debugging
    console.log('Fetching products with category:', category)
    
    let products = dummyProducts
    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category)
      console.log(`Found ${products.length} products for category: ${category}`)
    }
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products. Please try again later.' },
      { status: 500 }
    )
  }
} 