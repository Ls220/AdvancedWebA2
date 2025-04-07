const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
    min: [0, "Price must be a positive number"],
  },
  image: {
    type: String,
    required: [true, "Please provide a product image"],
  },
  images: [
    {
      type: String,
    },
  ],
  model3d: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, "Please provide a product category"],
    enum: ["men", "women", "children"],
  },
  subcategory: {
    type: String,
    required: [true, "Please provide a product subcategory"],
    enum: [
      "shirts",
      "tshirts",
      "polos",
      "jeans",
      "pants",
      "shorts",
      "dresses",
      "skirts",
      "activewear",
      "sweaters",
      "jackets",
      "coats",
      "underwear",
      "socks",
      "sleepwear",
      "swimwear",
      "accessories",
    ],
  },
  sizes: [
    {
      type: String,
      enum: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "3-6M",
        "6-12M",
        "1-2Y",
        "2-3Y",
        "3-4Y",
        "4-5Y",
        "5-6Y",
        "6-7Y",
        "7-8Y",
        "8-9Y",
        "9-10Y",
        "10-11Y",
        "11-12Y",
        "12-13Y",
        "13-14Y",
      ],
    },
  ],
  colors: [
    {
      name: {
        type: String,
        required: true,
      },
      hexCode: {
        type: String,
        required: true,
      },
      inStock: {
        type: Boolean,
        default: true,
      },
    },
  ],
  material: {
    type: String,
  },
  features: [
    {
      type: String,
    },
  ],
  careInstructions: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, "Please provide product stock"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  salePrice: {
    type: Number,
    min: [0, "Sale price must be a positive number"],
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  collection: {
    type: String,
    enum: ["summer", "fall", "winter", "spring", "basics", "limited"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot be more than 5"],
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create index for search
ProductSchema.index({ name: "text", description: "text" })

module.exports = mongoose.model("Product", ProductSchema)

