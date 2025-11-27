export default function Subscription() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Subscription</h1>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Current Plan</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary-600">Professional</h3>
              <p className="text-gray-500">Up to 20 technicians, advanced scheduling, API access</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">$79<span className="text-lg text-gray-500">/mo</span></p>
              <p className="text-sm text-gray-500">Billed monthly</p>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              Upgrade Plan
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Available Plans</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Starter</h3>
              <p className="text-2xl font-bold mb-4">$29<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>Up to 5 technicians</li>
                <li>Basic scheduling</li>
                <li>Email support</li>
              </ul>
              <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                Downgrade
              </button>
            </div>
            <div className="border-2 border-primary-600 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-2 py-0.5 rounded text-xs">
                Current
              </div>
              <h3 className="font-semibold mb-2">Professional</h3>
              <p className="text-2xl font-bold mb-4">$79<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>Up to 20 technicians</li>
                <li>Advanced scheduling</li>
                <li>API access</li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg cursor-not-allowed">
                Current Plan
              </button>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Enterprise</h3>
              <p className="text-2xl font-bold mb-4">Custom</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>Unlimited technicians</li>
                <li>Custom integrations</li>
                <li>Dedicated support</li>
              </ul>
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
