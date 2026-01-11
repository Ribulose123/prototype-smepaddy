import { Plus, TrendingUp, TrendingDown, Users, Package, FileText, Zap, ArrowRight, Sparkles, Clock, AlertCircle, Calendar } from 'lucide-react';
import { useState } from 'react';
import { RecordSale } from './RecordSale';
import { NetworkGridPattern } from './NetworkGridPattern';
import { PaddyCoinBadge } from './PaddyCoinBadge';

interface HomePageProps {
  paddyCoins?: number;
  currentStreak?: number;
  onNavigate?: (page: 'transactions' | 'stock' | 'loans') => void;
}

// Data for different time periods
const dailyData = {
  moneyIn: 72000,
  moneyOut: 17000
};

const weeklyData = {
  moneyIn: 371000,
  moneyOut: 77000
};

const monthlyData = {
  moneyIn: 1210000,
  moneyOut: 350000
};

const yearlyData = {
  moneyIn: 13160000,
  moneyOut: 4145000
};

export function HomePage({ paddyCoins, currentStreak, onNavigate }: HomePageProps = {}) {
  const [showRecordSale, setShowRecordSale] = useState(false);
  const [dateFilter, setDateFilter] = useState<'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'>('monthly');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  // Mock Paddy Coin data (in real app, fetch from state/API)
  const userCoins = paddyCoins ?? 245;
  const totalCoinsEarned = 450;

  // Get current data based on date filter
  let currentData;
  
  if (dateFilter === 'daily') {
    currentData = dailyData;
  } else if (dateFilter === 'weekly') {
    currentData = weeklyData;
  } else if (dateFilter === 'monthly') {
    currentData = monthlyData;
  } else if (dateFilter === 'yearly') {
    currentData = yearlyData;
  } else {
    // Custom date - use monthly data as placeholder
    currentData = monthlyData;
  }

  const totalMoneyIn = currentData.moneyIn;
  const totalMoneyOut = currentData.moneyOut;
  const netBalance = totalMoneyIn - totalMoneyOut;

  // Get period label
  const getPeriodLabel = () => {
    if (dateFilter === 'daily') return 'Today';
    if (dateFilter === 'weekly') return 'This Week';
    if (dateFilter === 'monthly') return 'This Month';
    if (dateFilter === 'yearly') return 'This Year';
    if (dateFilter === 'custom' && customStartDate && customEndDate) {
      return `${customStartDate} to ${customEndDate}`;
    }
    return 'Custom Range';
  };

  const periodLabel = getPeriodLabel();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 lg:px-12 pt-6 lg:pt-8 pb-8 lg:pb-12 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div>
              <h1 className="text-white text-2xl lg:text-3xl">Welcome back, Chidi!</h1>
              <p className="text-blue-100 text-sm lg:text-base mt-1 hidden lg:block">Here's what's happening with your business today</p>
            </div>
            <PaddyCoinBadge coins={userCoins} totalEarned={totalCoinsEarned} />
          </div>
          
          {/* Balance Card - Desktop Grid */}
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-2 bg-white/95 backdrop-blur rounded-2xl p-5 lg:p-6 shadow-lg">
              {/* Date Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => {
                    setDateFilter('daily');
                    setShowCustomDatePicker(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
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
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
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
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
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
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
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
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors flex items-center gap-1 ${
                    dateFilter === 'custom'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>Custom</span>
                </button>
              </div>

              {/* Custom Date Picker */}
              {showCustomDatePicker && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                  <p className="text-xs text-blue-800 mb-2 font-medium">Select Date Range</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-blue-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-blue-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-600 text-sm lg:text-base mb-1">Total Money In My Business - {periodLabel}</p>
              <h2 className="text-blue-700 text-3xl lg:text-4xl mb-4 lg:mb-6">₦{netBalance.toLocaleString()}</h2>
              
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div className="bg-green-50 rounded-xl p-3 lg:p-4">
                  <div className="flex items-center gap-2 mb-1 lg:mb-2">
                    <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                    <span className="text-xs lg:text-sm text-gray-600">Money In</span>
                  </div>
                  <p className="text-green-700 text-xl lg:text-2xl font-bold">₦{totalMoneyIn.toLocaleString()}</p>
                </div>
                
                <div className="bg-red-50 rounded-xl p-3 lg:p-4">
                  <div className="flex items-center gap-2 mb-1 lg:mb-2">
                    <TrendingDown className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />
                    <span className="text-xs lg:text-sm text-gray-600">Money Out</span>
                  </div>
                  <p className="text-red-700 text-xl lg:text-2xl font-bold">₦{totalMoneyOut.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Card - Desktop Only */}
            <div className="hidden lg:block">
              <button
                onClick={() => setShowRecordSale(true)}
                className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:from-blue-600 hover:to-indigo-700 shadow-lg transition-all min-h-[180px]"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Plus className="w-8 h-8" />
                </div>
                <span className="text-lg font-semibold">Record Sale</span>
                <span className="text-blue-100 text-sm">Quick add a transaction</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Only */}
      <div className="lg:hidden px-4 mt-6">
        <h3 className="text-gray-800 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setShowRecordSale(true)}
            className="bg-blue-600 text-white rounded-2xl p-5 flex flex-col items-center justify-center gap-2 active:bg-blue-700 shadow-md min-h-[120px]"
          >
            <Plus className="w-8 h-8" />
            <span>Record Sale</span>
          </button>
          
          <button className="bg-white text-gray-800 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 active:bg-gray-50 shadow-md border border-gray-200 min-h-[120px]">
            <Package className="w-8 h-8 text-blue-600" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-4 lg:px-12 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-gray-800 text-lg lg:text-xl mb-4 lg:mb-6">Business Overview</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-semibold">People Who Owe Me</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-blue-700 text-2xl lg:text-3xl font-bold mb-1">₦45,000</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">3 customers</span>
                  <button 
                    onClick={() => onNavigate?.('loans')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                  </div>
                  <span className="text-gray-700 font-semibold">I Owe</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-orange-700 text-2xl lg:text-3xl font-bold mb-1">₦12,500</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">2 suppliers</span>
                  <button 
                    onClick={() => onNavigate?.('loans')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />
                  </div>
                  <span className="text-gray-700 font-semibold">Low Stock Items</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-red-700 text-2xl lg:text-3xl font-bold mb-1">5 items</p>
                <div className="flex justify-end text-sm">
                  <button 
                    onClick={() => onNavigate?.('stock')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <div>
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h3 className="text-gray-800 text-lg lg:text-xl">Recent Sales</h3>
              <button 
                onClick={() => onNavigate?.('transactions')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden lg:grid lg:grid-cols-4 gap-4 p-4 lg:p-6 border-b border-gray-100 bg-gray-50">
                <div className="text-sm font-semibold text-gray-600">Item & Customer</div>
                <div className="text-sm font-semibold text-gray-600">Time</div>
                <div className="text-sm font-semibold text-gray-600 text-right">Amount</div>
                <div className="text-sm font-semibold text-gray-600 text-right">Action</div>
              </div>

              {/* Sales List */}
              {[
                { item: 'Rice 50kg', amount: '₦35,000', time: '2 hours ago', customer: 'Mama Ngozi' },
                { item: 'Vegetable Oil (2 cartons)', amount: '₦18,000', time: '5 hours ago', customer: 'Bro Emeka' },
                { item: 'Beans 25kg', amount: '₦22,500', time: 'Yesterday', customer: 'Sister Ada' }
              ].map((sale, index) => (
                <div key={index} className={`p-4 lg:p-6 ${index !== 2 ? 'border-b border-gray-100' : ''} lg:grid lg:grid-cols-4 lg:gap-4 lg:items-center hover:bg-gray-50 transition-colors`}>
                  <div className="lg:col-span-1">
                    <p className="text-gray-800 font-medium mb-1 lg:mb-0">{sale.item}</p>
                    <p className="text-sm text-gray-500">{sale.customer}</p>
                  </div>
                  <div className="hidden lg:block text-gray-600">
                    {sale.time}
                  </div>
                  <div className="lg:text-right">
                    <p className="text-green-700 font-bold text-lg lg:text-xl mt-1 lg:mt-0">{sale.amount}</p>
                  </div>
                  <div className="hidden lg:block lg:text-right">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 lg:hidden">{sale.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showRecordSale && <RecordSale onClose={() => setShowRecordSale(false)} />}
    </div>
  );
}