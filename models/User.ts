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
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  phoneNumber: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function(v: string) {
        // UK phone number format (including optional +44)
        return !v || /^(\+44\s?|0)?[1-9]\d{9}$/.test(v);
      },
      message: 'Please enter a valid UK phone number'
    }
  },
  deliveryAddress: {
    street: {
      type: String,
      required: false,
      trim: true
    },
    city: {
      type: String,
      required: false,
      trim: true
    },
    postcode: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function(v: string) {
          // UK postcode format
          return !v || /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(v);
        },
        message: 'Please enter a valid UK postcode'
      }
    },
    country: {
      type: String,
      required: false,
      trim: true,
      default: 'UK'
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
  try {
    // Need to select password since it's not included by default
    const user = await this.model('User').findById(this._id).select('+password')
    if (!user) return false
    
    return await bcrypt.compare(candidatePassword, user.password)
  } catch (error) {
    return false
  }
}

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema) 