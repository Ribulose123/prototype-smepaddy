import { Plus, Minus, TrendingUp, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useState } from 'react';
import { RecordSale } from './RecordSale';
import { RecordExpense } from './RecordExpense';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
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

export function TransactionsPage() {
  const [showRecordSale, setShowRecordSale] = useState(false);
  const [showRecordExpense, setShowRecordExpense] = useState(false);
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
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 lg:px-12 pt-6 lg:pt-8 pb-6 lg:pb-8 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div>
              <h1 className="text-white text-2xl lg:text-3xl">Transactions</h1>
              <p className="text-blue-100 text-sm lg:text-base mt-1 hidden lg:block">Track all your money in and out</p>
            </div>
            {/* Desktop Quick Actions */}
            <div className="hidden lg:flex gap-3">
              <button
                onClick={() => setShowRecordSale(true)}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>Record Sale</span>
              </button>
              <button
                onClick={() => setShowRecordExpense(true)}
                className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur"
              >
                <Minus className="w-5 h-5" />
                <span>Record Expense</span>
              </button>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mb-4">
            <div className="bg-white/95 backdrop-blur rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                <p className="text-gray-600 text-sm lg:text-base">Money In</p>
              </div>
              <p className="text-green-700 text-xl lg:text-3xl font-bold">₦{totalMoneyIn.toLocaleString()}</p>
              <p className="text-xs lg:text-sm text-gray-500 mt-1">This week</p>
            </div>
            
            <div className="bg-white/95 backdrop-blur rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownCircle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />
                <p className="text-gray-600 text-sm lg:text-base">Money Out</p>
              </div>
              <p className="text-red-700 text-xl lg:text-3xl font-bold">₦{totalMoneyOut.toLocaleString()}</p>
              <p className="text-xs lg:text-sm text-gray-500 mt-1">This week</p>
            </div>

            {/* Net Profit - Full Width on Mobile, Third Column on Desktop */}
            <div className="col-span-2 lg:col-span-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 lg:p-6">
              <p className="text-white/90 text-sm lg:text-base mb-1">Your Profit This Week</p>
              <p className="text-white text-xl lg:text-3xl font-bold">₦{netProfit.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-white/90" />
                <span className="text-xs lg:text-sm text-white/90">+12% from last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-4 lg:px-12 mt-6 lg:mt-8 mb-6 lg:mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-800 text-lg lg:text-xl mb-4 lg:mb-6">Weekly Overview</h3>
            <div className="h-64 lg:h-80 min-h-[256px] lg:min-h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    formatter={(value: number) => `₦${value.toLocaleString()}`}
                  />
                  <Bar dataKey="moneyIn" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="moneyOut" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded"></div>
                <span className="text-sm lg:text-base text-gray-600">Money In</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 lg:w-4 lg:h-4 bg-red-500 rounded"></div>
                <span className="text-sm lg:text-base text-gray-600">Money Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Only */}
      <div className="lg:hidden px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowRecordSale(true)}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 active:from-blue-600 active:to-blue-700 shadow-md"
          >
            <Plus className="w-6 h-6" />
            <span className="font-semibold">Record Sale</span>
          </button>
          
          <button
            onClick={() => setShowRecordExpense(true)}
            className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 active:from-red-600 active:to-red-700 shadow-md"
          >
            <Minus className="w-6 h-6" />
            <span className="font-semibold">Record Expense</span>
          </button>
        </div>
      </div>

      {/* Filter and Transactions List */}
      <div className="px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-gray-800 text-lg lg:text-xl">Recent Activity</h3>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-sm lg:text-base font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('in')}
                className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-sm lg:text-base font-medium transition-colors ${
                  filter === 'in' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Money In
              </button>
              <button
                onClick={() => setFilter('out')}
                className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-sm lg:text-base font-medium transition-colors ${
                  filter === 'out' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Money Out
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-6 border-b border-gray-100 bg-gray-50">
              <div className="text-sm font-semibold text-gray-600">Type</div>
              <div className="col-span-2 text-sm font-semibold text-gray-600">Description</div>
              <div className="text-sm font-semibold text-gray-600">Customer</div>
              <div className="text-sm font-semibold text-gray-600 text-right">Amount</div>
              <div className="text-sm font-semibold text-gray-600 text-right">Status</div>
            </div>
            
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-6 gap-4 p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors items-center">
                <div>
                  {transaction.type === 'in' ? (
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                      <ArrowUpCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Money In</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg">
                      <ArrowDownCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Money Out</span>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-gray-800 font-medium">{transaction.item}</p>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
                <div className="text-gray-600">
                  {transaction.customer || '—'}
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${transaction.type === 'in' ? 'text-green-700' : 'text-red-700'}`}>
                    ₦{transaction.amount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  {transaction.paid ? (
                    <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">Paid</span>
                  ) : (
                    <span className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile List View */}
          <div className="lg:hidden space-y-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-1">{transaction.item}</p>
                    {transaction.customer && (
                      <p className="text-sm text-gray-500">{transaction.customer}</p>
                    )}
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    transaction.type === 'in' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {transaction.type === 'in' ? 'Money In' : 'Money Out'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-lg ${transaction.type === 'in' ? 'text-green-700' : 'text-red-700'}`}>
                    ₦{transaction.amount.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{transaction.time}</span>
                    {!transaction.paid && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">Pending</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showRecordSale && <RecordSale onClose={() => setShowRecordSale(false)} />}
      {showRecordExpense && (
        <RecordExpense 
          onBack={() => setShowRecordExpense(false)} 
          onComplete={() => setShowRecordExpense(false)} 
        />
      )}
    </div>
  );
}