const Order = require("../models/Order")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse")


exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorResponse("No order items", 400))
  }

 
  const order = await Order.create({
    orderItems,
    user: req.user.id,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
  })

  res.status(201).json({
    success: true,
    data: order,
  })
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404))
  }

  // CHECK USER PERMS (ADMIN OR USER)
  if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this order`, 401))
  }

  res.status(200).json({
    success: true,
    data: order,
  })
})

exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  })
})

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404))
  }

  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  }

  const updatedOrder = await order.save()

  res.status(200).json({
    success: true,
    data: updatedOrder,
  })
})
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404))
  }
  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this order`, 403))
  }

  order.isDelivered = true
  order.deliveredAt = Date.now()

  const updatedOrder = await order.save()

  res.status(200).json({
    success: true,
    data: updatedOrder,
  })
})

