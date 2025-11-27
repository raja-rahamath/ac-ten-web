export default function Payment() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>

      {/* Current Payment Method */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Current Payment Method</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2025</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Payment Method */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Add New Payment Method</h2>
        </div>
        <div className="p-6">
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
            >
              Add Payment Method
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
