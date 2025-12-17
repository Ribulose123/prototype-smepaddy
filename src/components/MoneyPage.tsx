import { TrendingUp, TrendingDown, Plus, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { useState } from 'react';
import { RecordMoneyFlow } from './RecordMoneyFlow';
import { NetworkGridPattern } from './NetworkGridPattern';

const weeklyData = [
  { day: 'Mon', moneyIn: 45000, moneyOut: 12000 },
  { day: 'Tue', moneyIn: 52000, moneyOut: 8000 },
  { day: 'Wed', moneyIn: 38000, moneyOut: 15000 },
  { day: 'Thu', moneyIn: 65000, moneyOut: 10000 },
  { day: 'Fri', moneyIn: 58000, moneyOut: 18000 },
  { day: 'Sat', moneyIn: 72000, moneyOut: 9000 },
  { day: 'Sun', moneyIn: 41000, moneyOut: 5000 }
];

const recentTransactions = [
  { id: 1, type: 'in', item: 'Rice (10 cups)', customer: 'Mama Ngozi', amount: 3500, paid: true, time: '2 hours ago' },
  { id: 2, type: 'out', item: 'Transport', customer: '', amount: 2000, paid: true, time: '3 hours ago' },
  { id: 3, type: 'in', item: 'Tailoring Service', customer: 'Bro Emeka', amount: 8000, paid: true, time: '5 hours ago' },
  { id: 4, type: 'out', item: 'Shop Rent', customer: '', amount: 25000, paid: true, time: 'Yesterday' },
  { id: 5, type: 'in', item: 'Beans (5kg)', customer: 'Sister Ada', amount: 4500, paid: false, time: 'Yesterday' },
  { id: 6, type: 'out', item: 'NEPA Bill', customer: '', amount: 8500, paid: true, time: '2 days ago' }
];

export function MoneyPage() {
  const [showRecordFlow, setShowRecordFlow] = useState(false);
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all');

  const filteredTransactions = recentTransactions.filter(transaction => {
    if (filter === 'in') return transaction.type === 'in';
    if (filter === 'out') return transaction.type === 'out';
    return true;
  });

  const totalMoneyIn = weeklyData.reduce((sum, day) => sum + day.moneyIn, 0);
  const totalMoneyOut = weeklyData.reduce((sum, day) => sum + day.moneyOut, 0);
  const netProfit = totalMoneyIn - totalMoneyOut;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 pt-6 pb-6 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <h1 className="relative z-10 text-white mb-6">Money</h1>
        
        {/* Summary Cards */}
        <div className="relative z-10 grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/95 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <p className="text-gray-600 text-sm">Money In</p>
            </div>
            <p className="text-green-700">₦{totalMoneyIn.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">This week</p>
          </div>
          
          <div className="bg-white/95 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownRight className="w-4 h-4 text-red-600" />
              <p className="text-gray-600 text-sm">Money Out</p>
            </div>
            <p className="text-red-700">₦{totalMoneyOut.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">This week</p>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4">
          <p className="text-white/90 text-sm mb-1">Your Profit This Week</p>
          <p className="text-white">₦{netProfit.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-white/90" />
            <span className="text-xs text-white/90">+12% from last week</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-4 mt-6 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 mb-4">This Week</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
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
              <Bar dataKey="moneyIn" fill="#10B981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="moneyOut" fill="#EF4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Money In</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Money Out</span>
            </div>
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
            All
          </button>
          <button
            onClick={() => setFilter('in')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              filter === 'in' ? 'bg-green-600 text-white' : 'text-gray-600'
            }`}
          >
            Money In
          </button>
          <button
            onClick={() => setFilter('out')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              filter === 'out' ? 'bg-red-600 text-white' : 'text-gray-600'
            }`}
          >
            Money Out
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`p-4 ${index !== filteredTransactions.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'in' ? (
                    <ArrowUpCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-800 mb-1">{transaction.item}</p>
                  {transaction.customer && (
                    <p className="text-sm text-gray-500">{transaction.customer}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{transaction.time}</p>
                </div>
                
                <div className="text-right">
                  <p className={`mb-1 ${
                    transaction.type === 'in' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {transaction.type === 'in' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                  </p>
                  {transaction.type === 'in' && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.paid 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {transaction.paid ? 'Paid' : 'Not Paid'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowRecordFlow(true)}
        className="fixed bottom-20 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-5 shadow-xl active:scale-95 transition-transform z-40"
      >
        <Plus className="w-7 h-7" />
      </button>

      {showRecordFlow && <RecordMoneyFlow onClose={() => setShowRecordFlow(false)} />}
    </div>
  );
}