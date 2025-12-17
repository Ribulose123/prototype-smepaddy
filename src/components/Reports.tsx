import { Download, TrendingUp, Users, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

export function Reports() {
  // Sample data for charts
  const moneyInData = [
    { day: 'Mon', amount: 25000 },
    { day: 'Tue', amount: 32000 },
    { day: 'Wed', amount: 28000 },
    { day: 'Thu', amount: 45000 },
    { day: 'Fri', amount: 38000 },
    { day: 'Sat', amount: 52000 },
    { day: 'Sun', amount: 18000 },
  ];

  const topItemsData = [
    { item: 'Rice', sold: 28 },
    { item: 'Beans', sold: 18 },
    { item: 'Garri', sold: 15 },
    { item: 'Palm Oil', sold: 12 },
    { item: 'G.nut Oil', sold: 8 },
  ];

  const handleDownload = () => {
    toast.success('Downloading report...', {
      description: 'Your business summary is being prepared',
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-gray-800">Business Summary</h1>
          <p className="text-gray-600">See how your business is performing</p>
        </div>
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          onClick={handleDownload}
        >
          <Download className="w-5 h-5 mr-2" />
          Download Summary
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Total Sales This Week</p>
          <p className="text-green-600">₦238,000</p>
          <p className="text-gray-500 text-sm mt-2">↑ 15% from last week</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">People Owe Me</p>
          <p className="text-blue-600">₦28,500</p>
          <p className="text-gray-500 text-sm mt-2">5 customers</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Items Sold This Week</p>
          <p className="text-purple-600">81 items</p>
          <p className="text-gray-500 text-sm mt-2">Across 6 product types</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Average Sale</p>
          <p className="text-orange-600">₦5,643</p>
          <p className="text-gray-500 text-sm mt-2">Per transaction</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Money In Chart */}
        <Card className="p-6">
          <h3 className="mb-6 text-gray-800">Money In (This Week)</h3>
          <div className="min-h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moneyInData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Amount']}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Total: ₦238,000 from sales this week
          </p>
        </Card>

        {/* Top Items Chart */}
        <Card className="p-6">
          <h3 className="mb-6 text-gray-800">Your Top Items</h3>
          <div className="min-h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topItemsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="item" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value} sold`, 'Quantity']}
                />
                <Bar dataKey="sold" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Best selling items this week
          </p>
        </Card>
      </div>

      {/* Customer Info */}
      <Card className="p-6">
        <h3 className="mb-6 text-gray-800">Customers Who Owe You</h3>
        <div className="space-y-4">
          {[
            { name: 'Chioma Beauty Shop', amount: 8500, days: 2 },
            { name: 'Faith Boutique', amount: 10000, days: 1 },
            { name: 'Tunde Electronics', amount: 5000, days: 0 },
            { name: 'Blessing Stores', amount: 3500, days: 4 },
            { name: 'Kola Mart', amount: 1500, days: 5 },
          ].map((customer, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-800">{customer.name}</p>
                <p className="text-gray-500 text-sm">
                  {customer.days === 0 ? 'Today' : `${customer.days} day${customer.days > 1 ? 's' : ''} ago`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-orange-600">₦{customer.amount.toLocaleString()}</p>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 h-8 mt-1">
                  Send reminder
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}