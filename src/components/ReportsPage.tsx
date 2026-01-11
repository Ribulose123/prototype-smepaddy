import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { NetworkGridPattern } from './NetworkGridPattern';

const salesTrend = [
  { month: 'Jan', sales: 320000 },
  { month: 'Feb', sales: 380000 },
  { month: 'Mar', sales: 420000 },
  { month: 'Apr', sales: 390000 },
  { month: 'May', sales: 480000 },
  { month: 'Jun', sales: 520000 }
];

const topItems = [
  { name: 'Rice 50kg', sales: 450000 },
  { name: 'Vegetable Oil', sales: 320000 },
  { name: 'Beans 25kg', sales: 280000 },
  { name: 'Garri 10kg', sales: 220000 },
  { name: 'Sugar', sales: 150000 }
];

const categoryData = [
  { name: 'Grains', value: 45 },
  { name: 'Oils', value: 25 },
  { name: 'Canned', value: 15 },
  { name: 'Others', value: 15 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

export function ReportsPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 pt-6 pb-6 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <h1 className="relative z-10 text-white mb-6">Reports</h1>
        
        {/* Summary Cards */}
        <div className="relative z-10 grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/95 backdrop-blur rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-1">Total Sales</p>
            <p className="text-blue-700 mb-1">₦2.51M</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">+15% from last month</span>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-1">Net Profit</p>
            <p className="text-blue-700 mb-1">₦487K</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">+12% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="px-4 mt-6 mb-4">
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100 grid grid-cols-3 gap-1">
          <button
            onClick={() => setPeriod('week')}
            className={`py-3 rounded-xl transition-colors ${
              period === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`py-3 rounded-xl transition-colors ${
              period === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`py-3 rounded-xl transition-colors ${
              period === 'year' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            This Year
          </button>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 mb-4">Money In (Last 6 Months)</h3>
          <div className="min-h-[200px]" style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesTrend}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 11 }}
                />
                <YAxis 
                  hide
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                  formatter={(value: number) => `₦${value.toLocaleString()}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 mb-4">Top Selling Items</h3>
          <div className="min-h-[220px]">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topItems} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  formatter={(value: number) => `₦${(value / 1000).toFixed(0)}k`}
                />
                <Bar dataKey="sales" fill="#10B981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 mb-4">Sales by Category</h3>
          <div className="min-h-[200px]">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 mb-6">
        <h3 className="text-gray-800 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm mb-1">Total Customers</p>
            <p className="text-blue-700">127</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">+23 this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm mb-1">Items Sold</p>
            <p className="text-blue-700">1,842</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">+318 this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm mb-1">Average Sale</p>
            <p className="text-blue-700">₦27,450</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">+8% increase</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm mb-1">Best Day</p>
            <p className="text-blue-700">Saturday</p>
            <p className="text-xs text-gray-500 mt-1">₦95,000 avg</p>
          </div>
        </div>
      </div>
    </div>
  );
}