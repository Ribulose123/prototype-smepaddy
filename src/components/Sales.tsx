import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { RecordSaleModal } from './RecordSaleModal';

export function Sales() {
  const [showRecordSale, setShowRecordSale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const salesData = [
    { id: 1, date: 'Today, 2:30 PM', customer: 'Adebayo Motors', item: 'Rice (50kg bag)', quantity: 5, amount: 15000, status: 'paid' },
    { id: 2, date: 'Today, 1:15 PM', customer: 'Chioma Beauty Shop', item: 'Palm Oil (25L)', quantity: 2, amount: 8500, status: 'owes' },
    { id: 3, date: 'Today, 11:00 AM', customer: 'Emeka Stores', item: 'Beans (50kg bag)', quantity: 3, amount: 12000, status: 'paid' },
    { id: 4, date: 'Yesterday, 5:45 PM', customer: 'Faith Boutique', item: 'Garri (50kg bag)', quantity: 4, amount: 10000, status: 'paid' },
    { id: 5, date: 'Yesterday, 3:20 PM', customer: 'Tunde Electronics', item: 'Groundnut Oil (25L)', quantity: 1, amount: 5000, status: 'owes' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-gray-800">Sales History</h1>
          <p className="text-gray-600">Track all your sales and payments</p>
        </div>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowRecordSale(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Record New Sale
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
          <p className="text-gray-600 mb-2">Total Money In (This Week)</p>
          <p className="text-green-600 mb-1">₦156,500</p>
          <p className="text-gray-500 text-sm">From 42 sales</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200">
          <p className="text-gray-600 mb-2">Money People Owe You</p>
          <p className="text-orange-600 mb-1">₦28,500</p>
          <p className="text-gray-500 text-sm">5 customers</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <p className="text-gray-600 mb-2">Top Selling Item</p>
          <p className="text-blue-600 mb-1">Rice (50kg bag)</p>
          <p className="text-gray-500 text-sm">28 bags sold</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search customer name or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" size="lg" className="h-12 border-2">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Sales List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-gray-600">Date & Time</th>
                <th className="text-left p-4 text-gray-600">Customer</th>
                <th className="text-left p-4 text-gray-600">Item</th>
                <th className="text-left p-4 text-gray-600">Quantity</th>
                <th className="text-left p-4 text-gray-600">Amount</th>
                <th className="text-left p-4 text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesData.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-600">{sale.date}</td>
                  <td className="p-4 text-gray-800">{sale.customer}</td>
                  <td className="p-4 text-gray-600">{sale.item}</td>
                  <td className="p-4 text-gray-600">{sale.quantity}</td>
                  <td className="p-4">₦{sale.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm ${
                        sale.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {sale.status === 'paid' ? 'Paid' : 'Not paid yet'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <RecordSaleModal open={showRecordSale} onOpenChange={setShowRecordSale} />
    </div>
  );
}
