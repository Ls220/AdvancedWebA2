const mongoose = require("mongoose")
const dotenv = require("dotenv")
const colors = require("colors")
const User = require("./models/User")
const Product = require("./models/Product")
const Order = require("./models/Order")

// Load env vars
dotenv.config({ path: "./config/config.env" })

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "123456",
    role: "user",
  },
]

const products = [
  {
    name: "Classic White T-Shirt",
    description: "A comfortable white t-shirt made from 100% organic cotton",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
    category: "men",
    subcategory: "tshirts",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hexCode: "#FFFFFF", inStock: true },
      { name: "Black", hexCode: "#000000", inStock: true },
    ],
    stock: 50,
    material: "100% Organic Cotton",
    isFeatured: true,
  },
  {
    name: "Summer Floral Dress",
    description: "Light and breezy floral dress perfect for summer days",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300&text=Dress",
    category: "women",
    subcategory: "dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Blue Floral", hexCode: "#6495ED", inStock: true },
      { name: "Pink Floral", hexCode: "#FFC0CB", inStock: true },
    ],
    stock: 30,
    material: "Rayon",
    isNew: true,
    isFeatured: true,
  },
  {
    name: "Kids Denim Overalls",
    description: "Durable denim overalls for active children",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300&text=Overalls",
    category: "children",
    subcategory: "pants",
    sizes: ["3-4Y", "4-5Y", "5-6Y", "6-7Y"],
    colors: [
      { name: "Light Denim", hexCode: "#ADD8E6", inStock: true },
      { name: "Dark Denim", hexCode: "#00008B", inStock: true },
    ],
    stock: 25,
    material: "Denim",
    isNew: true,
    isFeatured: true,
  },
]

const importData = async () => {
  try {
    // Clear data
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const createdUsers = await User.create(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.create(sampleProducts)

    console.log("Data Imported!".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log("Data Destroyed!".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}
if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}

