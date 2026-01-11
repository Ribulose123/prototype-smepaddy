import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  UserX, 
  UserCheck,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Package,
  Receipt,
  Coins,
  X,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

interface AdminUsersPageProps {
  role: AdminRole;
}

interface User {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  category: string;
  joinDate: string;
  status: 'active' | 'suspended' | 'inactive';
  level: string;
  paddyCoins: number;
  transactions: number;
  totalVolume: number;
  lastActive: string;
}

export function AdminUsersPage({ role }: AdminUsersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'inactive'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock user data
  const users: User[] = [
    {
      id: '1',
      businessName: 'Mama Ngozi Provisions',
      ownerName: 'Ngozi Okafor',
      email: 'ngozi@gmail.com',
      phone: '+234 801 234 5678',
      location: 'Lagos, Nigeria',
      category: 'Retail Store',
      joinDate: '2024-01-15',
      status: 'active',
      level: 'Diamond',
      paddyCoins: 15420,
      transactions: 234,
      totalVolume: 4500000,
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      businessName: 'Chidi Electronics',
      ownerName: 'Chidi Okonkwo',
      email: 'chidi@yahoo.com',
      phone: '+234 802 345 6789',
      location: 'Abuja, Nigeria',
      category: 'Electronics',
      joinDate: '2024-02-20',
      status: 'active',
      level: 'Platinum',
      paddyCoins: 12300,
      transactions: 189,
      totalVolume: 3200000,
      lastActive: '1 hour ago',
    },
    {
      id: '3',
      businessName: 'Ada Fashion Boutique',
      ownerName: 'Ada Uche',
      email: 'ada.fashion@gmail.com',
      phone: '+234 803 456 7890',
      location: 'Port Harcourt, Nigeria',
      category: 'Fashion',
      joinDate: '2024-03-10',
      status: 'active',
      level: 'Platinum',
      paddyCoins: 11800,
      transactions: 167,
      totalVolume: 2800000,
      lastActive: '30 mins ago',
    },
    {
      id: '4',
      businessName: 'Ibrahim General Store',
      ownerName: 'Ibrahim Musa',
      email: 'ibrahim@hotmail.com',
      phone: '+234 804 567 8901',
      location: 'Kano, Nigeria',
      category: 'Retail Store',
      joinDate: '2024-04-05',
      status: 'inactive',
      level: 'Gold',
      paddyCoins: 8400,
      transactions: 145,
      totalVolume: 2400000,
      lastActive: '2 days ago',
    },
    {
      id: '5',
      businessName: 'Blessing Beauty Palace',
      ownerName: 'Blessing James',
      email: 'blessing@gmail.com',
      phone: '+234 805 678 9012',
      location: 'Enugu, Nigeria',
      category: 'Beauty & Cosmetics',
      joinDate: '2024-05-12',
      status: 'active',
      level: 'Gold',
      paddyCoins: 7200,
      transactions: 98,
      totalVolume: 1900000,
      lastActive: '5 hours ago',
    },
    {
      id: '6',
      businessName: 'Tech Repairs Hub',
      ownerName: 'Ayo Johnson',
      email: 'ayo.tech@gmail.com',
      phone: '+234 806 789 0123',
      location: 'Ibadan, Nigeria',
      category: 'Services',
      joinDate: '2024-06-18',
      status: 'suspended',
      level: 'Silver',
      paddyCoins: 4500,
      transactions: 67,
      totalVolume: 1200000,
      lastActive: '1 week ago',
    },
  ];

  const categories = ['all', 'Retail Store', 'Electronics', 'Fashion', 'Beauty & Cosmetics', 'Services', 'Food & Beverage', 'Construction'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || user.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSuspendUser = (userId: string, userName: string) => {
    toast.success(`User ${userName} has been suspended`);
  };

  const handleActivateUser = (userId: string, userName: string) => {
    toast.success(`User ${userName} has been activated`);
  };

  const handleExportData = () => {
    toast.success('User data exported successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Diamond':
        return 'bg-purple-100 text-purple-700';
      case 'Platinum':
        return 'bg-blue-100 text-blue-700';
      case 'Gold':
        return 'bg-amber-100 text-amber-700';
      case 'Silver':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold mb-1">Users & Businesses</h1>
            <p className="text-gray-600">Manage all registered users and their businesses</p>
          </div>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by business name, owner, or email..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Filters</span>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'active', 'suspended', 'inactive'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterStatus === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-sm mb-1">Total Users</p>
            <p className="text-gray-900 text-2xl font-bold">{users.length}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Active</p>
            <p className="text-green-600 text-2xl font-bold">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Suspended</p>
            <p className="text-red-600 text-2xl font-bold">
              {users.filter(u => u.status === 'suspended').length}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Inactive</p>
            <p className="text-gray-600 text-2xl font-bold">
              {users.filter(u => u.status === 'inactive').length}
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Business / Owner
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transactions
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 font-semibold">{user.businessName}</p>
                        <p className="text-gray-600 text-sm">{user.ownerName}</p>
                        <p className="text-gray-500 text-xs">{user.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${getLevelColor(user.level)}`}>
                          {user.level}
                        </span>
                        <p className="text-gray-600 text-xs mt-1">{user.paddyCoins.toLocaleString()} coins</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 font-semibold">{user.transactions}</p>
                        <p className="text-gray-600 text-sm">{formatCurrency(user.totalVolume)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm">{user.lastActive}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {role === 'super_admin' && (
                          <>
                            {user.status === 'active' ? (
                              <button
                                onClick={() => handleSuspendUser(user.id, user.businessName)}
                                className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                                title="Suspend User"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleActivateUser(user.id, user.businessName)}
                                className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                                title="Activate User"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found matching your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 text-xl font-bold">{selectedUser.businessName}</h2>
                <p className="text-gray-600">{selectedUser.ownerName}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status and Level */}
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(selectedUser.status)}`}>
                  {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                </span>
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getLevelColor(selectedUser.level)}`}>
                  {selectedUser.level} Level
                </span>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-gray-900 font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{selectedUser.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">Joined {new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Business Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg">
                      <Receipt className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Transactions</span>
                  </div>
                  <p className="text-gray-900 text-2xl font-bold">{selectedUser.transactions}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Total Volume</span>
                  </div>
                  <p className="text-gray-900 text-2xl font-bold">{formatCurrency(selectedUser.totalVolume)}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg">
                      <Coins className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Paddy Coins</span>
                  </div>
                  <p className="text-gray-900 text-2xl font-bold">{selectedUser.paddyCoins.toLocaleString()}</p>
                </div>

                <div className="bg-amber-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg">
                      <Package className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Category</span>
                  </div>
                  <p className="text-gray-900 text-lg font-bold">{selectedUser.category}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {role === 'super_admin' && (
                <div className="flex gap-3 pt-4">
                  {selectedUser.status === 'active' ? (
                    <button
                      onClick={() => {
                        handleSuspendUser(selectedUser.id, selectedUser.businessName);
                        setSelectedUser(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                    >
                      <UserX className="w-4 h-4" />
                      <span>Suspend User</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleActivateUser(selectedUser.id, selectedUser.businessName);
                        setSelectedUser(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Activate User</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

