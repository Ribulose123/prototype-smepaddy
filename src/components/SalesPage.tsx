import { Plus, Search, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { RecordSaleModal } from './RecordSaleModal';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { NetworkGridPattern } from './NetworkGridPattern';

const salesData = [
  { day: 'Mon', amount: 45000 },
  { day: 'Tue', amount: 52000 },
  { day: 'Wed', amount: 38000 },
  { day: 'Thu', amount: 65000 },
  { day: 'Fri', amount: 58000 },
  { day: 'Sat', amount: 72000 },
  { day: 'Sun', amount: 41000 }
];

const recentSales = [
  { id: 1, item: 'Rice 50kg', customer: 'Mama Ngozi', amount: 35000, paid: true, time: '2 hours ago' },
  { id: 2, item: 'Vegetable Oil (2 cartons)', customer: 'Bro Emeka', amount: 18000, paid: true, time: '5 hours ago' },
  { id: 3, item: 'Beans 25kg', customer: 'Sister Ada', amount: 22500, paid: false, time: 'Yesterday' },
  { id: 4, item: 'Garri 10kg', customer: 'Mr. Olu', amount: 8500, paid: true, time: 'Yesterday' },
  { id: 5, item: 'Tomato Paste (12 tins)', customer: 'Aunty Bisi', amount: 15000, paid: false, time: '2 days ago' }
];

export function SalesPage() {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  const filteredSales = recentSales.filter(sale => {
    if (filter === 'paid') return sale.paid;
    if (filter === 'unpaid') return !sale.paid;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 pt-6 pb-6 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <h1 className="relative z-10 text-white mb-6">Sales</h1>
        
        {/* Summary Cards */}
        <div className="relative z-10 grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/95 backdrop-blur rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-1">This Week</p>
            <p className="text-blue-700">₦371,000</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">+12%</span>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-1">Today</p>
            <p className="text-blue-700">₦72,000</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">+8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 mt-6 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 mb-4">This Week</h3>
          <div className="min-h-[180px]" style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={salesData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  contentStyle={{ 
                    background: '#fff', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  formatter={(value: number) => `₦${value.toLocaleString()}`}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            All Sales
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              filter === 'paid' ? 'bg-green-600 text-white' : 'text-gray-600'
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => setFilter('unpaid')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              filter === 'unpaid' ? 'bg-orange-600 text-white' : 'text-gray-600'
            }`}
          >
            Not Paid
          </button>
        </div>
      </div>

      {/* Sales List */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredSales.map((sale, index) => (
            <div
              key={sale.id}
              className={`p-4 ${index !== filteredSales.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-gray-800 mb-1">{sale.item}</p>
                  <p className="text-sm text-gray-500">{sale.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-700 mb-1">₦{sale.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    sale.paid 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {sale.paid ? 'Paid' : 'Not Paid'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400">{sale.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowSaleModal(true)}
        className="fixed bottom-20 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg active:bg-blue-700 z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showSaleModal && <RecordSaleModal onClose={() => setShowSaleModal(false)} />}
    </div>
  );
}