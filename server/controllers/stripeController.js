const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse")

// @desc    Create payment intent
// @route   POST /api/create-payment-intent
// @access  Public
exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { amount, currency = "usd" } = req.body

  if (!amount) {
    return next(new ErrorResponse("Please provide an amount", 400))
  }


  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  })
})
exports.webhook = asyncHandler(async (req, res, next) => {
  const sig = req.headers["stripe-signature"]
  let event

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return next(new ErrorResponse(`Webhook Error: ${err.message}`, 400))
  }
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object
      console.log("PaymentIntent was successful!", paymentIntent.id)
    // CHECK ORDER STATUS IN DB & UPDATE ORDER STATUS
      break
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object
      console.log("Payment failed:", failedPaymentIntent.id)
    
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
  res.status(200).json({ received: true })
})

