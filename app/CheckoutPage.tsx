const CheckoutPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Order Summary */}
        <div className="md:w-1/2">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p>Subtotal: $100.00</p>
            <p>Shipping: $10.00</p>
            <p>Tax: $5.00</p>
            <hr className="my-2" />
            <p className="font-semibold">Total: $115.00</p>
          </div>
        </div>

        {/* Payment Information */}
        <div className="md:w-1/2">
          <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <form>
              <div className="mb-4">
                <label htmlFor="cardName" className="block text-gray-700 text-sm font-bold mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="**** **** **** ****"
                />
              </div>
              <div className="flex gap-4 mb-4">
                <div>
                  <label htmlFor="cardExpiry" className="block text-gray-700 text-sm font-bold mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="cardExpiry"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cardCVC" className="block text-gray-700 text-sm font-bold mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cardCVC"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="123"
                  />
                </div>
              </div>
              <button
                className="w-full px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:shadow-outline"
                type="button"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

