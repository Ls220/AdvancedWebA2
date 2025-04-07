const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const cors = require("cors")
const helmet = require("helmet")
const xss = require("xss-clean")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const mongoSanitize = require("express-mongo-sanitize")
const connectDB = require("./config/db")
const errorHandler = require("./middleware/error")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Connect to database
connectDB()

// Route files
const auth = require("./routes/auth")
const products = require("./routes/products")
const orders = require("./routes/orders")
const stripe = require("./routes/stripe")

const app = express()

// Body parser
app.use(express.json())

// Special raw body parser for Stripe webhooks
app.use("/api/webhook", express.raw({ type: "application/json" }), (req, res, next) => {
  req.rawBody = req.body
  next()
})

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Security middleware
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(hpp())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})
app.use(limiter)

// Mount routers
app.use("/api/auth", auth)
app.use("/api/products", products)
app.use("/api/orders", orders)
app.use("/api", stripe)

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})

