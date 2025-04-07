"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Minus, Plus, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "../store/CartContext"
import ProductViewer3D from "../three/ProductViewer3D"

interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice?: number
  onSale: boolean
  image: string
  images?: string[]
  model3d?: string
  category: string
  subcategory: string
  sizes: string[]
  colors: Array<{
    name: string
    hexCode: string
    inStock: boolean
  }>
  material?: string
  careInstructions?: string
  features?: string[]
  reviews?: {
    id: string
    user: string
    rating: number
    comment: string
    date: string
  }[]
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [view, setView] = useState<"2d" | "3d">("2d")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [currentImage, setCurrentImage] = useState<string>("")
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const mockProduct: Product = {
          id: id || "1",
          name: "Premium Cotton Slim Fit Shirt",
          description:
            "This premium cotton shirt features a modern slim fit design, perfect for both casual and formal occasions. Made from 100% organic cotton for breathability and comfort throughout the day.",
          price: 59.99,
          salePrice: 49.99,
          onSale: true,
          image: "/placeholder.svg?height=500&width=500&text=Shirt+Front",
          images: [
            "/placeholder.svg?height=500&width=500&text=Shirt+Front",
            "/placeholder.svg?height=500&width=500&text=Shirt+Back",
            "/placeholder.svg?height=500&width=500&text=Shirt+Detail",
          ],
          model3d: "/assets/3d/shirt.glb",
          category: "men",
          subcategory: "shirts",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: [
            {
              name: "White",
              hexCode: "#FFFFFF",
              inStock: true,
            },
            {
              name: "Light Blue",
              hexCode: "#ADD8E6",
              inStock: true,
            },
            {
              name: "Navy",
              hexCode: "#000080",
              inStock: true,
            },
            {
              name: "Black",
              hexCode: "#000000",
              inStock: false,
            },
          ],
          material: "100% Organic Cotton",
          careInstructions: "Machine wash cold with similar colors. Tumble dry low. Iron on low heat if needed.",
          features: [
            "Slim fit design",
            "Button-down collar",
            "Single chest pocket",
            "Reinforced stitching",
            "Eco-friendly materials",
            "Wrinkle-resistant fabric",
            "Wrinkle-resistant fabric",
          ],
          reviews: [
            {
              id: "1",
              user: "Michael T.",
              rating: 5,
              comment:
                "Perfect fit and very comfortable. The material feels premium and it looks great with both jeans and dress pants.",
              date: "2023-05-15",
            },
            {
              id: "2",
              user: "Sarah L.",
              rating: 4,
              comment:
                "Love the quality and fit. Ordered in white and it's slightly see-through, but otherwise excellent.",
              date: "2023-04-22",
            },
            {
              id: "3",
              user: "James R.",
              rating: 5,
              comment: "This has become my go-to shirt for work. Looks professional and stays wrinkle-free all day.",
              date: "2023-03-10",
            },
          ],
        }

        // Set the first image as current
        setCurrentImage(mockProduct.images?.[0] || mockProduct.image)

        setTimeout(() => {
          setProduct(mockProduct)
          setLoading(false)
        }, 800)
      } catch (err) {
        setError("Failed to load product details")
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.onSale && product.salePrice ? product.salePrice : product.price,
          image: product.image,
          size: selectedSize,
          color: selectedColor,
        },
        quantity,
      )
    } else {
      // Show error that size and color must be selected
      alert("Please select a size and color before adding to cart")
    }
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-12">
        <div className="text-center py-12">
          <p className="text-red-500">{error || "Product not found"}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image/3D Model */}
        <div>
          <div className="bg-muted/30 rounded-lg overflow-hidden h-[500px] mb-4">
            <div className="flex justify-end p-4">
              <div className="bg-background rounded-lg shadow-sm">
                <Button
                  variant={view === "2d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("2d")}
                  className="rounded-r-none"
                >
                  2D
                </Button>
                <Button
                  variant={view === "3d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("3d")}
                  className="rounded-l-none"
                >
                  3D
                </Button>
              </div>
            </div>

            {view === "3d" && product.model3d ? (
              <div className="h-[440px]">
                <ProductViewer3D
                  modelPath={product.model3d}
                  color={selectedColor ? product.colors.find((c) => c.name === selectedColor)?.hexCode : undefined}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-[440px]">
                <img
                  src={currentImage || product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 0 && view === "2d" && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${currentImage === img ? "border-primary" : "border-transparent"}`}
                  onClick={() => setCurrentImage(img)}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center mt-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= 4.5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">({product.reviews?.length || 0} reviews)</span>
          </div>

          {/* Price */}
          {product.onSale ? (
            <div className="mb-4">
              <span className="text-2xl font-bold">${product.salePrice?.toFixed(2)}</span>
              <span className="text-lg text-muted-foreground line-through ml-2">${product.price.toFixed(2)}</span>
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                {Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}% OFF
              </span>
            </div>
          ) : (
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          )}

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Color</h3>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <div key={color.name} className="flex items-center">
                  <RadioGroupItem
                    value={color.name}
                    id={`color-${color.name}`}
                    disabled={!color.inStock}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`color-${color.name}`}
                    className={`
                      flex items-center justify-center rounded-full w-10 h-10 cursor-pointer
                      ${selectedColor === color.name ? "ring-2 ring-primary ring-offset-2" : ""}
                      ${!color.inStock ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <span
                      className="rounded-full w-8 h-8 border border-gray-200"
                      style={{ backgroundColor: color.hexCode }}
                    />
                    <span className="sr-only">{color.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {selectedColor && <p className="text-sm mt-1">{selectedColor}</p>}
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Size</h3>
              <Button variant="link" className="p-0 h-auto text-sm">
                Size Guide
              </Button>
            </div>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <div key={size} className="flex items-center">
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`
                      flex items-center justify-center rounded-md border w-12 h-10 cursor-pointer
                      ${selectedSize === size ? "bg-primary text-primary-foreground" : "bg-background"}
                    `}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button size="lg" className="w-full mb-6" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="flex items-center p-4">
                <Truck className="h-5 w-5 mr-2 text-primary" />
                <div className="text-sm">Free Shipping</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                <div className="text-sm">Quality Guarantee</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <RotateCcw className="h-5 w-5 mr-2 text-primary" />
                <div className="text-sm">30-Day Returns</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="sizing">Sizing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="p-4">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <p className="mb-4">{product.description}</p>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Material:</h4>
              <p>{product.material}</p>
            </div>
          </TabsContent>

          <TabsContent value="care" className="p-4">
            <h3 className="text-xl font-semibold mb-4">Care Instructions</h3>
            <p className="mb-4">{product.careInstructions}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <p className="text-sm">Machine Wash Cold</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <p className="text-sm">Do Not Bleach</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <p className="text-sm">Tumble Dry Low</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2H3v10h18V2zM3 18a2 2 0 002 2h14a2 2 0 002-2v-2H3v2z" />
                  </svg>
                </div>
                <p className="text-sm">Iron on Low</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sizing" className="p-4">
            <h3 className="text-xl font-semibold mb-4">Size Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">Size</th>
                    <th className="border p-2 text-left">Chest (inches)</th>
                    <th className="border p-2 text-left">Waist (inches)</th>
                    <th className="border p-2 text-left">Sleeve (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">S</td>
                    <td className="border p-2">36-38</td>
                    <td className="border p-2">30-32</td>
                    <td className="border p-2">32.5</td>
                  </tr>
                  <tr>
                    <td className="border p-2">M</td>
                    <td className="border p-2">38-40</td>
                    <td className="border p-2">32-34</td>
                    <td className="border p-2">33</td>
                  </tr>
                  <tr>
                    <td className="border p-2">L</td>
                    <td className="border p-2">40-42</td>
                    <td className="border p-2">34-36</td>
                    <td className="border p-2">33.5</td>
                  </tr>
                  <tr>
                    <td className="border p-2">XL</td>
                    <td className="border p-2">42-44</td>
                    <td className="border p-2">36-38</td>
                    <td className="border p-2">34</td>
                  </tr>
                  <tr>
                    <td className="border p-2">XXL</td>
                    <td className="border p-2">44-46</td>
                    <td className="border p-2">38-40</td>
                    <td className="border p-2">34.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Measurements are approximate. For the best fit, we recommend taking your own measurements and comparing
              them to the size chart.
            </p>
          </TabsContent>

          <TabsContent value="reviews" className="p-4">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-6">
              {product.reviews?.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{review.user}</span>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

