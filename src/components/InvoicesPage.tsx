import { Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { CreateInvoiceModal } from './modal/CreateInvoiceModal';
import { NetworkGridPattern } from './NetworkGridPattern';

const invoices = [
  { id: 1, customer: 'Mama Ngozi', amount: 45000, status: 'paid', dueDate: '2 days ago', items: 3 },
  { id: 2, customer: 'Bro Emeka', amount: 28000, status: 'pending', dueDate: 'Today', items: 2 },
  { id: 3, customer: 'Sister Ada', amount: 67500, status: 'pending', dueDate: 'In 3 days', items: 5 },
  { id: 4, customer: 'Mr. Olu', amount: 15000, status: 'overdue', dueDate: '5 days ago', items: 1 },
  { id: 5, customer: 'Aunty Bisi', amount: 32000, status: 'paid', dueDate: '1 week ago', items: 4 },
  { id: 6, customer: 'Uncle Tunde', amount: 52000, status: 'pending', dueDate: 'In 1 week', items: 6 }
];

export function InvoicesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'all') return true;
    return invoice.status === filter;
  });

  const paidTotal = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingTotal = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const overdueTotal = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />;
      case 'overdue':
        return <XCircle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 lg:px-12 pt-6 lg:pt-8 pb-6 lg:pb-8 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div>
              <h1 className="text-white text-2xl lg:text-3xl">Invoices</h1>
              <p className="text-blue-100 text-sm lg:text-base mt-1 hidden lg:block">Manage your customer invoices</p>
            </div>
            {/* Desktop Create Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="hidden lg:flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Invoice</span>
            </button>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-2 lg:gap-6 mb-4">
            <div className="bg-white/95 backdrop-blur rounded-xl p-3 lg:p-6">
              <p className="text-gray-600 text-xs lg:text-base mb-1">Paid</p>
              <p className="text-green-700 text-sm lg:text-3xl font-bold">₦{(paidTotal / 1000).toFixed(0)}k</p>
            </div>
            
            <div className="bg-white/95 backdrop-blur rounded-xl p-3 lg:p-6">
              <p className="text-gray-600 text-xs lg:text-base mb-1">Pending</p>
              <p className="text-orange-700 text-sm lg:text-3xl font-bold">₦{(pendingTotal / 1000).toFixed(0)}k</p>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-xl p-3 lg:p-6">
              <p className="text-gray-600 text-xs lg:text-base mb-1">Overdue</p>
              <p className="text-red-700 text-sm lg:text-3xl font-bold">₦{(overdueTotal / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 lg:px-12 mt-6 lg:mt-8 mb-4 lg:mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100 grid grid-cols-4 gap-1 lg:inline-grid lg:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`py-3 px-6 lg:px-8 rounded-xl text-sm lg:text-base font-medium transition-colors ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`py-3 px-6 lg:px-8 rounded-xl text-sm lg:text-base font-medium transition-colors ${
                filter === 'paid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Paid
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`py-3 px-6 lg:px-8 rounded-xl text-sm lg:text-base font-medium transition-colors ${
                filter === 'pending' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('overdue')}
              className={`py-3 px-6 lg:px-8 rounded-xl text-sm lg:text-base font-medium transition-colors ${
                filter === 'overdue' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Overdue
            </button>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="px-4 lg:px-12 mb-6 lg:mb-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-6 border-b border-gray-100 bg-gray-50">
              <div className="col-span-2 text-sm font-semibold text-gray-600">Customer</div>
              <div className="text-sm font-semibold text-gray-600 text-right">Amount</div>
              <div className="text-sm font-semibold text-gray-600">Status</div>
              <div className="text-sm font-semibold text-gray-600">Due Date</div>
              <div className="text-sm font-semibold text-gray-600 text-right">Items</div>
            </div>
            
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="grid grid-cols-6 gap-4 p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors items-center">
                <div className="col-span-2">
                  <p className="text-gray-800 font-medium text-lg">{invoice.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-700 font-bold text-xl">₦{invoice.amount.toLocaleString()}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(invoice.status)}
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
                <div className="text-gray-600">{invoice.dueDate}</div>
                <div className="text-right text-gray-600">{invoice.items} items</div>
              </div>
            ))}
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-gray-800 mb-1">{invoice.customer}</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <p className="text-sm text-gray-500">
                        {invoice.status === 'paid' ? 'Paid' : 
                         invoice.status === 'pending' ? 'Waiting for payment' : 
                         'Payment overdue'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-700 mb-2">₦{invoice.amount.toLocaleString()}</p>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">{invoice.items} items</p>
                  <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile Only */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="lg:hidden fixed bottom-20 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg active:bg-blue-700 z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showCreateModal && <CreateInvoiceModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}