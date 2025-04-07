"use client"

const CartPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {/* Example Cart Item */}
        <div className="flex items-center border rounded-lg p-4">
          <img
            src="https://via.placeholder.com/100" // Replace with actual image URL
            alt="Product"
            className="w-24 h-24 object-cover rounded-md mr-4"
          />
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">Product Name</h2>
            <p className="text-gray-600">$99.99</p>
            <div className="flex items-center mt-2">
              <label htmlFor="quantity" className="mr-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                className="w-20 border rounded-md px-2 py-1"
                defaultValue={1}
                min={1}
              />
            </div>
          </div>
          <div>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        </div>
        {/* End Example Cart Item */}
        {/* Add more cart items here */}
      </div>

      {/* Cart Summary */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>$99.99</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>$109.99</span>
        </div>
        <button className="w-full px-4 py-2 bg-primary text-white rounded-full mt-4">Checkout</button>
      </div>
    </div>
  )
}

export default CartPage

