const User = require("../models/User")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse")

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  // Check if email already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return next(new ErrorResponse("Email already in use", 400))
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  sendTokenResponse(user, 201, res)
})
 
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400))
  }

                                      const user = await User.findOne({ email }).select("+password")






  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401))
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401))
  }

  sendTokenResponse(user, 200, res)
})


exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({
    success: true,
    data: user,
  })
})

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  }

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: user,
  })
})

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401))
  }

  user.password = req.body.newPassword
  await user.save()

  sendTokenResponse(user, 200, res)
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken()

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
}

