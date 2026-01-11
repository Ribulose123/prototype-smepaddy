import { Plus, Minus, TrendingUp, ArrowUpCircle, ArrowDownCircle, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import { RecordSale } from './RecordSale';
import { RecordExpense } from './RecordExpense';
import { TransactionStatementModal } from './TransactionStatementModal';
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

const dailyData = [
  { time: '9am', moneyIn: 12000, moneyOut: 3000 },
  { time: '11am', moneyIn: 8000, moneyOut: 2000 },
  { time: '1pm', moneyIn: 15000, moneyOut: 5000 },
  { time: '3pm', moneyIn: 10000, moneyOut: 1000 },
  { time: '5pm', moneyIn: 18000, moneyOut: 4000 },
  { time: '7pm', moneyIn: 9000, moneyOut: 2000 }
];

const monthlyData = [
  { week: 'Week 1', moneyIn: 280000, moneyOut: 85000 },
  { week: 'Week 2', moneyIn: 310000, moneyOut: 92000 },
  { week: 'Week 3', moneyIn: 295000, moneyOut: 78000 },
  { week: 'Week 4', moneyIn: 325000, moneyOut: 95000 }
];

const yearlyData = [
  { month: 'Jan', moneyIn: 950000, moneyOut: 280000 },
  { month: 'Feb', moneyIn: 880000, moneyOut: 310000 },
  { month: 'Mar', moneyIn: 1020000, moneyOut: 295000 },
  { month: 'Apr', moneyIn: 1100000, moneyOut: 340000 },
  { month: 'May', moneyIn: 980000, moneyOut: 285000 },
  { month: 'Jun', moneyIn: 1150000, moneyOut: 380000 },
  { month: 'Jul', moneyIn: 1080000, moneyOut: 320000 },
  { month: 'Aug', moneyIn: 1200000, moneyOut: 410000 },
  { month: 'Sep', moneyIn: 1050000, moneyOut: 295000 },
  { month: 'Oct', moneyIn: 1180000, moneyOut: 360000 },
  { month: 'Nov', moneyIn: 1250000, moneyOut: 420000 },
  { month: 'Dec', moneyIn: 1320000, moneyOut: 450000 }
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
  const [dateFilter, setDateFilter] = useState<'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'>('weekly');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showTransactionStatement, setShowTransactionStatement] = useState(false);

  const filteredTransactions = recentTransactions.filter(transaction => {
    if (filter === 'in') return transaction.type === 'in';
    if (filter === 'out') return transaction.type === 'out';
    return true;
  });

  // Get current data based on date filter
  let currentData;
  let dataKey = 'day';
  
  if (dateFilter === 'daily') {
    currentData = dailyData;
    dataKey = 'time';
  } else if (dateFilter === 'weekly') {
    currentData = weeklyData;
    dataKey = 'day';
  } else if (dateFilter === 'monthly') {
    currentData = monthlyData;
    dataKey = 'week';
  } else if (dateFilter === 'yearly') {
    currentData = yearlyData;
    dataKey = 'month';
  } else {
    // Custom date - use weekly data as placeholder
    currentData = weeklyData;
    dataKey = 'day';
  }

  const totalMoneyIn = currentData.reduce((sum, item) => sum + item.moneyIn, 0);
  const totalMoneyOut = currentData.reduce((sum, item) => sum + item.moneyOut, 0);
  const netProfit = totalMoneyIn - totalMoneyOut;

  // Get period label
  const getPeriodLabel = () => {
    if (dateFilter === 'daily') return 'Today';
    if (dateFilter === 'weekly') return 'This week';
    if (dateFilter === 'monthly') return 'This month';
    if (dateFilter === 'yearly') return 'This year';
    if (dateFilter === 'custom' && customStartDate && customEndDate) {
      return `${customStartDate} to ${customEndDate}`;
    }
    return 'Custom range';
  };

  const periodLabel = getPeriodLabel();

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
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm"
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
              <button
                onClick={() => setShowTransactionStatement(true)}
                className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur border border-white/20"
              >
                <FileText className="w-5 h-5" />
                <span>Get Statement</span>
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
              <p className="text-xs lg:text-sm text-gray-500 mt-1">{periodLabel}</p>
            </div>
            
            <div className="bg-white/95 backdrop-blur rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownCircle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />
                <p className="text-gray-600 text-sm lg:text-base">Money Out</p>
              </div>
              <p className="text-red-700 text-xl lg:text-3xl font-bold">₦{totalMoneyOut.toLocaleString()}</p>
              <p className="text-xs lg:text-sm text-gray-500 mt-1">{periodLabel}</p>
            </div>

            {/* Net Profit - Full Width on Mobile, Third Column on Desktop */}
            <div className="col-span-2 lg:col-span-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 lg:p-6">
              <p className="text-white/90 text-sm lg:text-base mb-1">Your Profit {periodLabel}</p>
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
            {/* Date Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6 gap-4">
              <h3 className="text-gray-800 text-lg lg:text-xl">Profit Overview</h3>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setDateFilter('daily');
                    setShowCustomDatePicker(false);
                  }}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === 'daily'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => {
                    setDateFilter('weekly');
                    setShowCustomDatePicker(false);
                  }}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === 'weekly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => {
                    setDateFilter('monthly');
                    setShowCustomDatePicker(false);
                  }}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => {
                    setDateFilter('yearly');
                    setShowCustomDatePicker(false);
                  }}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === 'yearly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => {
                    setDateFilter('custom');
                    setShowCustomDatePicker(true);
                  }}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    dateFilter === 'custom'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Custom</span>
                </button>
              </div>
            </div>

            {/* Custom Date Picker */}
            {showCustomDatePicker && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-800 mb-3 font-medium">Select Date Range</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-blue-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-blue-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="w-full" style={{ minHeight: '320px', height: '320px' }}>
              <ResponsiveContainer key={dateFilter} width="100%" height="100%">
                <BarChart data={currentData}>
                  <XAxis dataKey={dataKey} stroke="#9CA3AF" style={{ fontSize: '12px' }} />
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

      {/* Floating Action Buttons - Mobile Only */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40 flex flex-col gap-3">
        <button
          onClick={() => setShowRecordSale(true)}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform hover:shadow-xl"
        >
          <Plus className="w-6 h-6" />
        </button>
        <button
          onClick={() => setShowRecordExpense(true)}
          className="bg-gradient-to-br from-red-500 to-red-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform hover:shadow-xl"
        >
          <Minus className="w-6 h-6" />
        </button>
        <button
          onClick={() => setShowTransactionStatement(true)}
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform hover:shadow-xl"
        >
          <FileText className="w-6 h-6" />
        </button>
      </div>

      {/* Transaction Statement Modal */}
      {showTransactionStatement && (
        <TransactionStatementModal 
          isOpen={showTransactionStatement}
          onClose={() => setShowTransactionStatement(false)}
          userProfile={{
            businessName: 'Mama Ngozi Provisions',
            ownerName: 'Ngozi Okafor'
          }}
        />
      )}
    </div>
  );
}