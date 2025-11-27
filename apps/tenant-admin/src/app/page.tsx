export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-1">Current Plan</h3>
          <p className="text-2xl font-bold text-primary-600">Professional</p>
          <p className="text-sm text-gray-500 mt-2">$79/month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-1">Active Users</h3>
          <p className="text-2xl font-bold">12 / 20</p>
          <p className="text-sm text-gray-500 mt-2">8 seats available</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-1">Next Billing</h3>
          <p className="text-2xl font-bold">Dec 15, 2024</p>
          <p className="text-sm text-gray-500 mt-2">Auto-renewal enabled</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Invoice #INV-2024-011 paid</p>
                <p className="text-sm text-gray-500">Nov 15, 2024</p>
              </div>
              <span className="text-green-600 font-medium">$79.00</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">New user added: john@example.com</p>
                <p className="text-sm text-gray-500">Nov 10, 2024</p>
              </div>
              <span className="text-gray-500">-</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Plan upgraded to Professional</p>
                <p className="text-sm text-gray-500">Oct 20, 2024</p>
              </div>
              <span className="text-primary-600">Upgrade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
