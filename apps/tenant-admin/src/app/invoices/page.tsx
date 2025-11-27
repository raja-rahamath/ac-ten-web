export default function Invoices() {
  const invoices = [
    { id: 'INV-2024-011', date: 'Nov 15, 2024', amount: 79.00, status: 'Paid' },
    { id: 'INV-2024-010', date: 'Oct 15, 2024', amount: 79.00, status: 'Paid' },
    { id: 'INV-2024-009', date: 'Sep 15, 2024', amount: 79.00, status: 'Paid' },
    { id: 'INV-2024-008', date: 'Aug 15, 2024', amount: 29.00, status: 'Paid' },
    { id: 'INV-2024-007', date: 'Jul 15, 2024', amount: 29.00, status: 'Paid' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Billing History</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Download All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Invoice</th>
                <th className="text-left p-4 font-medium text-gray-600">Date</th>
                <th className="text-left p-4 font-medium text-gray-600">Amount</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{invoice.id}</td>
                  <td className="p-4 text-gray-600">{invoice.date}</td>
                  <td className="p-4">${invoice.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
