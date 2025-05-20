"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "../store/CartContext"
import { useAuth } from "../store/AuthContext"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { formatCurrency } from "../utils/formatCurrency"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  // CAL OF CART TOTAL PRICE
  const subtotal = totalPrice
  const shipping = cartItems.length > 0 ? 5.99 : 0
  const tax = subtotal * 0.08 // applying a taxt rate 2 product
  const total = subtotal + shipping + tax

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) return

    setIsApplyingPromo(true)

    setTimeout(() => {
      setIsApplyingPromo(false)
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired",
        variant: "destructive",
      })
    }, 1000)
  }

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login or create an account to proceed to checkout",
      })
      navigate("/login", { state: { from: { pathname: "/cart" } } })
      return
    }

    navigate("/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            <Separator />

            {cartItems.map((item) => (
              <div key={item.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-muted/30">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
                      {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 md:text-center">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-sm text-muted-foreground">Price:</span>
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 md:text-center">
                    <div className="flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-sm text-muted-foreground">Quantity:</span>
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 md:text-center">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-sm text-muted-foreground">Total:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}

            <div className="p-4 flex justify-between">
              <Button variant="outline" onClick={() => navigate("/products")}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => clearCart()}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

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

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                <Button
                  variant="outline"
                  onClick={handleApplyPromoCode}
                  disabled={isApplyingPromo || !promoCode.trim()}
                >
                  {isApplyingPromo ? "Applying..." : "Apply"}
                </Button>
              </div>

              <Button className="w-full" size="lg" onClick={handleProceedToCheckout}>
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

