"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "../store/CartContext"
import { useAuth } from "../store/AuthContext"
import { formatCurrency } from "../utils/formatCurrency"
import { Loader2 } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

function CheckoutForm() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState("")

  // Calculate cart summary
  const subtotal = totalPrice
  const shipping = cartItems.length > 0 ? 5.99 : 0
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
    },
  })

  // Create payment intent when component mounts
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart")
      return
    }

    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Math.round(total * 100), // Convert to cents
            currency: "usd",
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create payment intent")
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (error) {
        console.error("Error creating payment intent:", error)
        toast({
          title: "Error",
          description: "There was a problem setting up the payment. Please try again.",
          variant: "destructive",
        })
      }
    }

    createPaymentIntent()
  }, [cartItems, total, navigate, toast])

  // Handle form submission
  const onSubmit = async (values: CheckoutFormValues) => {
    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            address: {
              line1: values.address,
              city: values.city,
              state: values.state,
              postal_code: values.postalCode,
              country: values.country,
            },
          },
        },
      })

      if (error) {
        setPaymentError(error.message || "Payment failed")
      } else if (paymentIntent.status === "succeeded") {
        // Create order in database
        const orderResponse = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            orderItems: cartItems.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              image: item.image,
              price: item.price,
              product: item.id,
            })),
            shippingAddress: {
              address: values.address,
              city: values.city,
              postalCode: values.postalCode,
              country: values.country,
            },
            paymentMethod: "Stripe",
            paymentResult: {
              id: paymentIntent.id,
              status: paymentIntent.status,
              update_time: new Date().toISOString(),
              email_address: values.email,
            },
            taxPrice: tax,
            shippingPrice: shipping,
            totalPrice: total,
            isPaid: true,
            paidAt: new Date().toISOString(),
          }),
        })

        if (!orderResponse.ok) {
          throw new Error("Failed to create order")
        }

        const orderData = await orderResponse.json()

        // Clear cart and redirect to success page
        clearCart()
        navigate(`/order-success/${orderData.data._id}`)

        toast({
          title: "Payment successful",
          description: "Your order has been placed successfully!",
        })
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      setPaymentError("An unexpected error occurred. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your state or province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your postal code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Card Details</label>
                  <div className="border rounded-md p-3">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </div>
                  {paymentError && <p className="text-sm text-red-500 mt-2">{paymentError}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isProcessing || !stripe}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${formatCurrency(total)}`
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-muted/30">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const { cartItems } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart")
      return
    }

    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } })
    }
  }, [cartItems.length, isAuthenticated, navigate])

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

