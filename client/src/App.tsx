import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import { ThemeProvider } from "./hooks/use-theme" // Fix this import path
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LoadingSpinner from "./components/LoadingSpinner"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "./store/CartContext"
import { AuthProvider } from "./store/AuthContext"
import ErrorBoundary from "./components/ErrorBoundary"

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"))
const ProductsPage = lazy(() => import("./pages/ProductsPage"))
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"))
const CartPage = lazy(() => import("./pages/CartPage"))
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const AboutPage = lazy(() => import("./pages/AboutPage"))
const ContactPage = lazy(() => import("./pages/ContactPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"))
const MensCollectionPage = lazy(() => import("./pages/MensCollectionPage"))
const WomensCollectionPage = lazy(() => import("./pages/WomensCollectionPage"))
const ChildrensCollectionPage = lazy(() => import("./pages/ChildrensCollectionPage"))

// Admin pages
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"))
const OrdersManagementPage = lazy(() => import("./pages/admin/OrdersManagementPage"))
const UsersManagementPage = lazy(() => import("./pages/admin/UsersManagementPage"))
const ProductsManagementPage = lazy(() => import("./pages/admin/ProductsManagementPage"))

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="ecommerce-theme">
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/products/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/order-success/:id" element={<OrderSuccessPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/mens" element={<MensCollectionPage />} />
                      <Route path="/womens" element={<WomensCollectionPage />} />
                      <Route path="/childrens" element={<ChildrensCollectionPage />} />

                      {/* Admin Routes */}
                      <Route path="/admin" element={<AdminDashboardPage />} />
                      <Route path="/admin/orders" element={<OrdersManagementPage />} />
                      <Route path="/admin/users" element={<UsersManagementPage />} />
                      <Route path="/admin/products" element={<ProductsManagementPage />} />

                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </Router>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

