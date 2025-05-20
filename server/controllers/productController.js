const Product = require("../models/Product")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse")

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {

  const reqQuery = { ...req.query }
  const removeFields = ["select", "sort", "page", "limit"]
  removeFields.forEach((param) => delete reqQuery[param])
  let queryStr = JSON.stringify(reqQuery)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
  let query = Product.find(JSON.parse(queryStr))






  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ")
    query = query.select(fields)
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ")
    query = query.sort(sortBy)
  } else {
    query = query.sort("-createdAt")
  }


  const page = Number.parseInt(req.query.page, 10) || 1
  const limit = Number.parseInt(req.query.limit, 10) || 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Product.countDocuments()

  query = query.skip(startIndex).limit(limit)

  // Executing query
  const products = await query

  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res.status(200).json({
    success: true,
    count: products.length,
    pagination,
    data: products,
  })
})


exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: product,
  })
})


exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id

  // Check for admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to create a product`, 403))
  }

  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    data: product,
  })
})
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
  }

  // Check for admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this product`, 403))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: product,
  })
})
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
  }
  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this product`, 403))
  }

  await product.deleteOne()

  res.status(200).json({
    success: true,
    data: {},
  })
})

