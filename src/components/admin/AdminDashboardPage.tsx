import { 
  Users, 
  TrendingUp, 
  Receipt, 
  AlertCircle, 
  DollarSign,
  UserPlus,
  ShoppingCart,
  Package,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

interface AdminDashboardPageProps {
  role: AdminRole;
}

export function AdminDashboardPage({ role }: AdminDashboardPageProps) {
  // Mock data - In production, fetch from API
  const stats = {
    totalUsers: 12847,
    activeUsers: 8932,
    newUsersToday: 142,
    totalTransactions: 45632,
    transactionsToday: 1243,
    totalVolume: 1254876000,
    volumeToday: 45320000,
    pendingSupport: 23,
    pendingLoans: 67,
    systemHealth: 99.8,
  };

  const recentActivity = [
    { id: 1, type: 'user_signup', user: 'Chidi Okonkwo', business: 'Chidi Electronics', time: '2 mins ago' },
    { id: 2, type: 'transaction', user: 'Mama Ngozi', amount: 45000, time: '5 mins ago' },
    { id: 3, type: 'loan_request', user: 'Ibrahim Store', amount: 500000, time: '12 mins ago' },
    { id: 4, type: 'support_ticket', user: 'Ada Fashion', issue: 'Invoice generation issue', time: '18 mins ago' },
    { id: 5, type: 'transaction', user: 'Ayo Repairs', amount: 125000, time: '25 mins ago' },
  ];

  const topBusinesses = [
    { id: 1, name: 'Mama Ngozi Provisions', owner: 'Ngozi Okafor', volume: 4500000, transactions: 234, level: 'Diamond' },
    { id: 2, name: 'Chidi Electronics', owner: 'Chidi Okonkwo', volume: 3200000, transactions: 189, level: 'Platinum' },
    { id: 3, name: 'Ada Fashion Boutique', owner: 'Ada Uche', volume: 2800000, transactions: 167, level: 'Platinum' },
    { id: 4, name: 'Ibrahim General Store', owner: 'Ibrahim Musa', volume: 2400000, transactions: 145, level: 'Gold' },
    { id: 5, name: 'Blessing Beauty Palace', owner: 'Blessing James', volume: 1900000, transactions: 98, level: 'Gold' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-NG').format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with SME Paddy</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Last updated</p>
            <p className="text-gray-900 font-semibold">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4" />
                <span>12.5%</span>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total Users</h3>
            <p className="text-gray-900 text-2xl font-bold mb-1">{formatNumber(stats.totalUsers)}</p>
            <p className="text-gray-500 text-xs">
              <span className="text-green-600 font-semibold">+{stats.newUsersToday}</span> new today
            </p>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4" />
                <span>8.3%</span>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Active Users</h3>
            <p className="text-gray-900 text-2xl font-bold mb-1">{formatNumber(stats.activeUsers)}</p>
            <p className="text-gray-500 text-xs">
              {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total
            </p>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Receipt className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4" />
                <span>15.2%</span>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total Transactions</h3>
            <p className="text-gray-900 text-2xl font-bold mb-1">{formatNumber(stats.totalTransactions)}</p>
            <p className="text-gray-500 text-xs">
              <span className="text-green-600 font-semibold">+{stats.transactionsToday}</span> today
            </p>
          </div>

          {/* Transaction Volume */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4" />
                <span>22.8%</span>
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Transaction Volume</h3>
            <p className="text-gray-900 text-2xl font-bold mb-1">{formatCurrency(stats.totalVolume)}</p>
            <p className="text-gray-500 text-xs">
              <span className="text-green-600 font-semibold">{formatCurrency(stats.volumeToday)}</span> today
            </p>
          </div>
        </div>

        {/* Alerts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Pending Items */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-gray-900 font-semibold">Needs Attention</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Pending Support Tickets</span>
                <span className="px-3 py-1 bg-amber-600 text-white rounded-lg font-semibold text-sm">
                  {stats.pendingSupport}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Pending Loan Requests</span>
                <span className="px-3 py-1 bg-amber-600 text-white rounded-lg font-semibold text-sm">
                  {stats.pendingLoans}
                </span>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-900 font-semibold">System Health</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{stats.systemHealth}</span>
                  <span className="text-gray-600 font-semibold mb-1">%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${stats.systemHealth}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-green-700 text-sm mt-4">All systems operational</p>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700 text-sm">Avg. Daily Signups</span>
                </div>
                <span className="text-gray-900 font-semibold">128</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700 text-sm">Avg. Transaction</span>
                </div>
                <span className="text-gray-900 font-semibold">₦27,500</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 text-sm">Total Products</span>
                </div>
                <span className="text-gray-900 font-semibold">8,432</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and Top Businesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-gray-900 font-semibold">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      {activity.type === 'user_signup' && (
                        <>
                          <p className="text-gray-900 font-medium">{activity.user}</p>
                          <p className="text-gray-600 text-sm">New user signed up - {activity.business}</p>
                        </>
                      )}
                      {activity.type === 'transaction' && (
                        <>
                          <p className="text-gray-900 font-medium">{activity.user}</p>
                          <p className="text-gray-600 text-sm">Recorded transaction - {formatCurrency(activity.amount!)}</p>
                        </>
                      )}
                      {activity.type === 'loan_request' && (
                        <>
                          <p className="text-gray-900 font-medium">{activity.user}</p>
                          <p className="text-gray-600 text-sm">Loan request - {formatCurrency(activity.amount!)}</p>
                        </>
                      )}
                      {activity.type === 'support_ticket' && (
                        <>
                          <p className="text-gray-900 font-medium">{activity.user}</p>
                          <p className="text-gray-600 text-sm">{activity.issue}</p>
                        </>
                      )}
                    </div>
                    <span className="text-gray-400 text-xs whitespace-nowrap ml-4">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Businesses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-gray-900 font-semibold">Top Performing Businesses</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {topBusinesses.map((business, index) => (
                <div key={business.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-900 font-medium truncate">{business.name}</p>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          business.level === 'Diamond' ? 'bg-purple-100 text-purple-700' :
                          business.level === 'Platinum' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {business.level}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{business.owner}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-gray-900 text-sm font-semibold">{formatCurrency(business.volume)}</span>
                        <span className="text-gray-500 text-xs">{business.transactions} transactions</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

