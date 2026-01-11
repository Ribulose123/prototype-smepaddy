import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

interface AdminTransactionsPageProps {
  role: AdminRole;
}

interface Transaction {
  id: string;
  businessName: string;
  ownerName: string;
  type: 'sale' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  time: string;
  paymentMethod: string;
  status: 'completed' | 'pending';
}

export function AdminTransactionsPage({ role }: AdminTransactionsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'expense'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      businessName: 'Mama Ngozi Provisions',
      ownerName: 'Ngozi Okafor',
      type: 'sale',
      category: 'Product Sale',
      amount: 45000,
      description: 'Rice and Beans bulk sale',
      date: '2025-01-07',
      time: '14:30',
      paymentMethod: 'Cash',
      status: 'completed',
    },
    {
      id: 'TXN002',
      businessName: 'Chidi Electronics',
      ownerName: 'Chidi Okonkwo',
      type: 'sale',
      category: 'Product Sale',
      amount: 125000,
      description: 'Samsung TV sale',
      date: '2025-01-07',
      time: '13:15',
      paymentMethod: 'Transfer',
      status: 'completed',
    },
    {
      id: 'TXN003',
      businessName: 'Ada Fashion Boutique',
      ownerName: 'Ada Uche',
      type: 'expense',
      category: 'Inventory Purchase',
      amount: 85000,
      description: 'Fabric wholesale purchase',
      date: '2025-01-07',
      time: '11:45',
      paymentMethod: 'Cash',
      status: 'completed',
    },
    {
      id: 'TXN004',
      businessName: 'Ibrahim General Store',
      ownerName: 'Ibrahim Musa',
      type: 'sale',
      category: 'Product Sale',
      amount: 32000,
      description: 'Grocery items',
      date: '2025-01-06',
      time: '16:20',
      paymentMethod: 'POS',
      status: 'completed',
    },
    {
      id: 'TXN005',
      businessName: 'Blessing Beauty Palace',
      ownerName: 'Blessing James',
      type: 'sale',
      category: 'Service',
      amount: 15000,
      description: 'Hair styling service',
      date: '2025-01-06',
      time: '10:30',
      paymentMethod: 'Transfer',
      status: 'completed',
    },
    {
      id: 'TXN006',
      businessName: 'Tech Repairs Hub',
      ownerName: 'Ayo Johnson',
      type: 'expense',
      category: 'Operating Expense',
      amount: 12000,
      description: 'Shop rent payment',
      date: '2025-01-05',
      time: '09:00',
      paymentMethod: 'Cash',
      status: 'completed',
    },
  ];

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || txn.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalSales = transactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netFlow = totalSales - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleExportData = () => {
    toast.success('Transaction data exported successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold mb-1">Transaction Monitoring</h1>
            <p className="text-gray-600">Monitor all platform transactions in real-time</p>
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
              placeholder="Search by business, transaction ID, or description..."
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
                <label className="block text-gray-700 text-sm font-semibold mb-2">Transaction Type</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'sale', 'expense'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {type === 'all' ? 'All Transactions' : type === 'sale' ? 'Money In' : 'Money Out'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Date Range</label>
                <div className="flex flex-wrap gap-2">
                  {['today', 'week', 'month', 'all'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setDateRange(range as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        dateRange === range
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Financial Overview */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-gray-700 font-semibold">Total Money In</span>
            </div>
            <p className="text-gray-900 text-3xl font-bold">{formatCurrency(totalSales)}</p>
            <p className="text-green-700 text-sm mt-2">
              {transactions.filter(t => t.type === 'sale').length} transactions
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg">
                <ArrowDownRight className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-gray-700 font-semibold">Total Money Out</span>
            </div>
            <p className="text-gray-900 text-3xl font-bold">{formatCurrency(totalExpenses)}</p>
            <p className="text-red-700 text-sm mt-2">
              {transactions.filter(t => t.type === 'expense').length} transactions
            </p>
          </div>

          <div className={`${netFlow >= 0 ? 'bg-blue-50' : 'bg-amber-50'} rounded-xl p-6`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg">
                {netFlow >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <span className="text-gray-700 font-semibold">Net Flow</span>
            </div>
            <p className={`text-3xl font-bold ${netFlow >= 0 ? 'text-gray-900' : 'text-amber-700'}`}>
              {formatCurrency(Math.abs(netFlow))}
            </p>
            <p className={`text-sm mt-2 ${netFlow >= 0 ? 'text-blue-700' : 'text-amber-700'}`}>
              {netFlow >= 0 ? 'Positive cash flow' : 'Negative cash flow'}
            </p>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-mono text-sm font-semibold">{txn.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 font-semibold">{txn.businessName}</p>
                        <p className="text-gray-600 text-sm">{txn.ownerName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {txn.type === 'sale' ? (
                          <>
                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                            <span className="text-green-700 font-semibold">Money In</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="w-4 h-4 text-red-600" />
                            <span className="text-red-700 font-semibold">Money Out</span>
                          </>
                        )}
                      </div>
                      <p className="text-gray-600 text-xs mt-1">{txn.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{txn.description}</p>
                      <p className="text-gray-500 text-xs mt-1">via {txn.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-bold ${txn.type === 'sale' ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(txn.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm">{new Date(txn.date).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">{txn.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedTransaction(txn)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found matching your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Transaction Details</h2>
                <p className="text-blue-100 text-sm">{selectedTransaction.id}</p>
              </div>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Amount Display */}
              <div className={`text-center p-6 rounded-2xl ${
                selectedTransaction.type === 'sale' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className="text-gray-600 mb-2">Transaction Amount</p>
                <p className={`text-4xl font-bold ${
                  selectedTransaction.type === 'sale' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(selectedTransaction.amount)}
                </p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  {selectedTransaction.type === 'sale' ? (
                    <>
                      <ArrowUpRight className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-semibold">Money In</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 font-semibold">Money Out</span>
                    </>
                  )}
                </div>
              </div>

              {/* Transaction Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-1">Business</p>
                  <p className="text-gray-900 font-semibold">{selectedTransaction.businessName}</p>
                  <p className="text-gray-600 text-sm">{selectedTransaction.ownerName}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-1">Category</p>
                  <p className="text-gray-900 font-semibold">{selectedTransaction.category}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-1">Payment Method</p>
                  <p className="text-gray-900 font-semibold">{selectedTransaction.paymentMethod}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-1">Status</p>
                  <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </span>
                </div>

                <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-1">Description</p>
                  <p className="text-gray-900 font-semibold">{selectedTransaction.description}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-1">Date</p>
                  <p className="text-gray-900 font-semibold">{new Date(selectedTransaction.date).toLocaleDateString()}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-1">Time</p>
                  <p className="text-gray-900 font-semibold">{selectedTransaction.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

