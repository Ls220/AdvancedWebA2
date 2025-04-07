const ProductDetailPage = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img src="https://via.placeholder.com/400" alt="Product" className="w-full h-auto rounded-lg shadow-md" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">Product Title</h1>
          <p className="text-gray-600 mb-4">
            Product Description goes here. This is a sample description to showcase the product details.
          </p>
          <p className="text-xl font-bold text-primary mb-4">$99.99</p>

          {/* Quantity Selection */}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <select id="quantity" className="border border-gray-300 rounded-md px-2 py-1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* Add to Cart Button */}
          <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-300">
            Add to Cart
          </button>

          {/* Buy Now Button */}
          <button className="ml-4 px-4 py-2 bg-secondary text-white rounded-full hover:bg-secondary-dark transition duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

