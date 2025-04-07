import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends mongoose.Document {
  email: string
  password: string
  name: string
  phoneNumber: string
  deliveryAddress: {
    street: string
    city: string
    postcode: string
    country: string
  }
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number']
  },
  deliveryAddress: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    postcode: {
      type: String,
      required: [true, 'Postcode is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    }
  }
}, {
  timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema) 