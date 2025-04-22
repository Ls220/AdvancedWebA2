import mongoose from 'mongoose'

export interface IProduct extends mongoose.Document {
  name: string
  description: string
  price: number
  image: string
  images?: string[]
  model3d?: string
  category: string
  subcategory: string
  sizes: string[]
  colors: Array<{
    name: string
    hexCode: string
    inStock: boolean
  }>
  material?: string
  careInstructions?: string
  features?: string[]
  stock: number
  onSale: boolean
  salePrice?: number
  isNew: boolean
  isFeatured: boolean
  rating: number
  numReviews: number
  createdAt: Date
  updatedAt: Date
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  images: [{
    type: String
  }],
  model3d: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['men', 'women', 'kids', 'accessories']
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required'],
    enum: [
      'shirts', 'tshirts', 'polos', 'jeans', 'pants', 'shorts',
      'dresses', 'skirts', 'activewear', 'sweaters', 'jackets',
      'coats', 'underwear', 'socks', 'sleepwear', 'swimwear', 'accessories'
    ]
  },
  sizes: [{
    type: String,
    enum: [
      'XS', 'S', 'M', 'L', 'XL', 'XXL',
      '3-6M', '6-12M', '1-2Y', '2-3Y', '3-4Y',
      '4-5Y', '5-6Y', '6-7Y', '7-8Y', '8-9Y',
      '9-10Y', '10-11Y', '11-12Y', '12-13Y', '13-14Y'
    ]
  }],
  colors: [{
    name: {
      type: String,
      required: true
    },
    hexCode: {
      type: String,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    }
  }],
  material: String,
  careInstructions: String,
  features: [String],
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  onSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    min: [0, 'Sale price must be a positive number']
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Create text index for search functionality
productSchema.index({ name: 'text', description: 'text' })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema) 