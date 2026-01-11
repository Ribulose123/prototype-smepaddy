import { useState } from 'react';
import { 
  Coins, 
  Award, 
  TrendingUp, 
  Settings,
  Save,
  Trophy,
  Target,
  Gift,
  Star
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

interface AdminGamificationPageProps {
  role: AdminRole;
}

export function AdminGamificationPage({ role }: AdminGamificationPageProps) {
  // Coin reward settings
  const [coinSettings, setCoinSettings] = useState({
    saleTransaction: 10,
    expenseRecord: 5,
    invoiceCreated: 15,
    productAdded: 3,
    dailyLogin: 5,
    weeklyActive: 50,
    referralBonus: 100,
  });

  // Level thresholds
  const [levelThresholds, setLevelThresholds] = useState({
    bronze: 0,
    silver: 500,
    gold: 1500,
    platinum: 4000,
    diamond: 10000,
  });

  // Loan limits per level
  const [loanLimits, setLoanLimits] = useState({
    bronze: 50000,
    silver: 150000,
    gold: 400000,
    platinum: 1000000,
    diamond: 3000000,
  });

  const handleSaveCoinSettings = () => {
    toast.success('Coin reward settings saved successfully');
  };

  const handleSaveLevelThresholds = () => {
    toast.success('Level thresholds updated successfully');
  };

  const handleSaveLoanLimits = () => {
    toast.success('Loan limits updated successfully');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Stats
  const stats = {
    totalCoinsIssued: 1245680,
    activeParticipants: 8932,
    topEarner: 'Mama Ngozi Provisions',
    topEarnerCoins: 15420,
  };

  const levelDistribution = [
    { level: 'Bronze', count: 3245, percentage: 35, color: 'bg-amber-600' },
    { level: 'Silver', count: 2890, percentage: 31, color: 'bg-gray-400' },
    { level: 'Gold', count: 1756, percentage: 19, color: 'bg-amber-500' },
    { level: 'Platinum', count: 892, percentage: 10, color: 'bg-blue-500' },
    { level: 'Diamond', count: 449, percentage: 5, color: 'bg-purple-500' },
  ];

  const recentAchievements = [
    { user: 'Mama Ngozi', achievement: 'Reached Diamond Level', coins: 500, time: '2 hours ago' },
    { user: 'Chidi Electronics', achievement: 'Completed 100 Transactions', coins: 200, time: '4 hours ago' },
    { user: 'Ada Fashion', achievement: 'Weekly Active Streak', coins: 50, time: '6 hours ago' },
    { user: 'Ibrahim Store', achievement: 'First Invoice Created', coins: 15, time: '1 day ago' },
    { user: 'Blessing Beauty', achievement: 'Added 50 Products', coins: 150, time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div>
          <h1 className="text-gray-900 text-2xl font-bold mb-1">Gamification Management</h1>
          <p className="text-gray-600">Manage Paddy Coins, levels, and rewards system</p>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Coins className="w-6 h-6" />
              </div>
              <span className="font-semibold">Total Coins Issued</span>
            </div>
            <p className="text-3xl font-bold">{stats.totalCoinsIssued.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="font-semibold">Active Participants</span>
            </div>
            <p className="text-3xl font-bold">{stats.activeParticipants.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="font-semibold">Top Earner</span>
            </div>
            <p className="text-lg font-bold">{stats.topEarner}</p>
            <p className="text-white/80 text-sm">{stats.topEarnerCoins.toLocaleString()} coins</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Award className="w-6 h-6" />
              </div>
              <span className="font-semibold">Diamond Users</span>
            </div>
            <p className="text-3xl font-bold">{levelDistribution[4].count}</p>
          </div>
        </div>

        {/* Level Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-lg mb-6">Level Distribution</h3>
          <div className="space-y-4">
            {levelDistribution.map((level) => (
              <div key={level.level}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Star className={`w-5 h-5 text-${level.color.split('-')[1]}-500`} />
                    <span className="text-gray-900 font-semibold">{level.level}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm">{level.count.toLocaleString()} users</span>
                    <span className="text-gray-900 font-semibold">{level.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div 
                    className={`${level.color} h-3 rounded-full transition-all`} 
                    style={{ width: `${level.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coin Reward Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Coin Reward Settings</h3>
              <p className="text-gray-600 text-sm">Configure how many coins users earn for each action</p>
            </div>
            <button
              onClick={handleSaveCoinSettings}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              disabled={role !== 'super_admin'}
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Sale Transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={coinSettings.saleTransaction}
                    onChange={(e) => setCoinSettings({ ...coinSettings, saleTransaction: parseInt(e.target.value) })}
                    className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-semibold"
                    disabled={role !== 'super_admin'}
                  />
                  <Coins className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Target className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Expense Record</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={coinSettings.expenseRecord}
                    onChange={(e) => setCoinSettings({ ...coinSettings, expenseRecord: parseInt(e.target.value) })}
                    className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-semibold"
                    disabled={role !== 'super_admin'}
                  />
                  <Coins className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Gift className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Invoice Created</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={coinSettings.invoiceCreated}
                    onChange={(e) => setCoinSettings({ ...coinSettings, invoiceCreated: parseInt(e.target.value) })}
                    className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-semibold"
                    disabled={role !== 'super_admin'}
                  />
                  <Coins className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Product Added</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={coinSettings.productAdded}
                    onChange={(e) => setCoinSettings({ ...coinSettings, productAdded: parseInt(e.target.value) })}
                    className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-semibold"
                    disabled={role !== 'super_admin'}
                  />
                  <Coins className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Star className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Daily Login</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={coinSettings.dailyLogin}
                    onChange={(e) => setCoinSettings({ ...coinSettings, dailyLogin: parseInt(e.target.value) })}
                    className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-semibold"
                    disabled={role !== 'super_admin'}
                  />
                  <Coins className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Weekly Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={coinSettings.weeklyActive}
                    onChange={(e) => setCoinSettings({ ...coinSettings, weeklyActive: parseInt(e.target.value) })}
                    className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-semibold"
                    disabled={role !== 'super_admin'}
                  />
                  <Coins className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Gift className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Referral Bonus</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={coinSettings.referralBonus}
                    onChange={(e) => setCoinSettings({ ...coinSettings, referralBonus: parseInt(e.target.value) })}
                    className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-semibold"
                    disabled={role !== 'super_admin'}
                  />
                  <Coins className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Thresholds and Loan Limits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Level Thresholds */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900 font-bold text-lg">Level Thresholds</h3>
                <p className="text-gray-600 text-sm">Coins required to reach each level</p>
              </div>
              <button
                onClick={handleSaveLevelThresholds}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
                disabled={role !== 'super_admin'}
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(levelThresholds).map(([level, threshold]) => (
                <div key={level} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-900 font-semibold capitalize">{level}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={threshold}
                      onChange={(e) => setLevelThresholds({ ...levelThresholds, [level]: parseInt(e.target.value) })}
                      className="w-32 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-semibold"
                      disabled={role !== 'super_admin'}
                    />
                    <Coins className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Limits */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900 font-bold text-lg">Loan Limits by Level</h3>
                <p className="text-gray-600 text-sm">Maximum loan amount per level</p>
              </div>
              <button
                onClick={handleSaveLoanLimits}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
                disabled={role !== 'super_admin'}
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(loanLimits).map(([level, limit]) => (
                <div key={level} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-900 font-semibold capitalize">{level}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">₦</span>
                    <input
                      type="number"
                      value={limit}
                      onChange={(e) => setLoanLimits({ ...loanLimits, [level]: parseInt(e.target.value) })}
                      className="w-32 px-3 py-2 bg-white border border-gray-200 rounded-lg text-right font-semibold"
                      disabled={role !== 'super_admin'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-gray-900 font-bold text-lg">Recent Achievements</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentAchievements.map((item, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">{item.user}</p>
                      <p className="text-gray-600 text-sm">{item.achievement}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-purple-600 font-bold">+{item.coins}</span>
                      <Coins className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-gray-500 text-xs">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

