import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "../components/FeaturedProducts"
import HeroScene from "../three/HeroScene"
import ProductViewer3D from "../components/ProductViewer3D"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with 3D Scene */}
      <section className="relative h-[70vh] overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Style in 3D</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Explore our latest fashion collections with immersive 3D previews and find your perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>
          <FeaturedProducts />
        </div>
      </section>

      {/* 3D Models Showcase */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Experience Fashion in 3D</h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
            Explore our products in immersive 3D. Rotate, zoom, and see every detail before you buy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <ProductViewer3D modelPath="/assets/3d/maid_uniform.glb" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold">Elegant Maid Uniform</h3>
                <Link to="/womens?tab=dresses">
                  <Button variant="link">View Collection</Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <ProductViewer3D modelPath="/assets/3d/tan_womans_coat.glb" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold">Tan Women's Coat</h3>
                <Link to="/womens?tab=coats">
                  <Button variant="link">View Collection</Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <ProductViewer3D modelPath="/assets/3d/kids_dress.glb" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold">Kids Colorful Dress</h3>
                <Link to="/childrens?tab=dresses">
                  <Button variant="link">View Collection</Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <ProductViewer3D modelPath="/assets/3d/childs_shoes.glb" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold">Children's Casual Shoes</h3>
                <Link to="/childrens?tab=shoes">
                  <Button variant="link">View Collection</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/womens">
              <Button size="lg">
                Explore All 3D Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Men", "Women", "Children"].map((category) => (
              <div key={category} className="relative overflow-hidden rounded-lg group">
                <img
                  src={`/placeholder.svg?height=300&width=400&text=${category}`}
                  alt={category}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white text-2xl font-bold mb-2">{category}</h3>
                    <Link to={`/products?category=${category.toLowerCase()}`}>
                      <Button variant="secondary">Browse Collection</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Fabrics</h3>
              <p className="text-muted-foreground">
                We use premium materials for comfort and durability in all our clothing.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Perfect Fit</h3>
              <p className="text-muted-foreground">
                Try clothes virtually with our 3D models to find your perfect size before buying.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">
                Not satisfied? Return within 30 days for a full refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Seasonal Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-lg group h-80">
              <img
                src="/placeholder.svg?height=400&width=600&text=Summer+Collection"
                alt="Summer Collection"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-3xl font-bold mb-4">Summer Collection</h3>
                  <Link to="/products?collection=summer">
                    <Button>Shop Now</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg group h-80">
              <img
                src="/placeholder.svg?height=400&width=600&text=Fall+Essentials"
                alt="Fall Essentials"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-3xl font-bold mb-4">Fall Essentials</h3>
                  <Link to="/products?collection=fall">
                    <Button>Shop Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container">
          <div className="bg-primary/5 rounded-lg p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Style Community</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to get updates on new collections, exclusive offers, and fashion tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="sm:w-auto">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

