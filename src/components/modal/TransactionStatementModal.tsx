import React, { useState } from 'react';
import { X, Download, Mail, Calendar, Filter, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TransactionStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: {
    businessName: string;
    ownerName: string;
  };
}

type StatementPeriod = 'last_7_days' | 'last_30_days' | 'last_90_days' | 'custom';
type StatementFormat = 'pdf' | 'csv' | 'excel';
type DeliveryMethod = 'download' | 'email';

export function TransactionStatementModal({ isOpen, onClose, userProfile }: TransactionStatementModalProps) {
  const [period, setPeriod] = useState<StatementPeriod>('last_30_days');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [includeMoneyIn, setIncludeMoneyIn] = useState(true);
  const [includeMoneyOut, setIncludeMoneyOut] = useState(true);
  const [format, setFormat] = useState<StatementFormat>('pdf');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('download');
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock transaction data for preview
  const getTransactionCount = () => {
    if (period === 'last_7_days') return 23;
    if (period === 'last_30_days') return 87;
    if (period === 'last_90_days') return 234;
    return 50; // custom
  };

  const getTotalMoneyIn = () => {
    if (period === 'last_7_days') return 125000;
    if (period === 'last_30_days') return 487500;
    if (period === 'last_90_days') return 1245000;
    return 300000;
  };

  const getTotalMoneyOut = () => {
    if (period === 'last_7_days') return 78000;
    if (period === 'last_30_days') return 312000;
    if (period === 'last_90_days') return 876000;
    return 180000;
  };

  const handleGenerate = () => {
    // Validation
    if (period === 'custom' && (!customStartDate || !customEndDate)) {
      toast.error('Please select both start and end dates');
      return;
    }

    if (!includeMoneyIn && !includeMoneyOut) {
      toast.error('Please select at least one transaction type');
      return;
    }

    if (deliveryMethod === 'email' && !email) {
      toast.error('Please enter an email address');
      return;
    }

    setIsGenerating(true);

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      
      if (deliveryMethod === 'download') {
        toast.success(`Statement downloaded successfully as ${format.toUpperCase()}!`);
      } else {
        toast.success(`Statement sent to ${email}!`);
      }
      
      // Reset and close
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 2000);
  };

  const getPeriodLabel = () => {
    const labels = {
      last_7_days: 'Last 7 Days',
      last_30_days: 'Last 30 Days',
      last_90_days: 'Last 90 Days',
      custom: 'Custom Date Range'
    };
    return labels[period];
  };

  const getDateRange = () => {
    const today = new Date();
    let startDate = new Date();

    if (period === 'last_7_days') {
      startDate.setDate(today.getDate() - 7);
    } else if (period === 'last_30_days') {
      startDate.setDate(today.getDate() - 30);
    } else if (period === 'last_90_days') {
      startDate.setDate(today.getDate() - 90);
    } else if (period === 'custom' && customStartDate && customEndDate) {
      return `${new Date(customStartDate).toLocaleDateString('en-NG')} - ${new Date(customEndDate).toLocaleDateString('en-NG')}`;
    }

    return `${startDate.toLocaleDateString('en-NG')} - ${today.toLocaleDateString('en-NG')}`;
  };

  if (!isOpen) return null;

  const transactionCount = getTransactionCount();
  const totalMoneyIn = getTotalMoneyIn();
  const totalMoneyOut = getTotalMoneyOut();
  const netAmount = totalMoneyIn - totalMoneyOut;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-bold">Transaction Statement</h2>
              <p className="text-blue-100 text-sm mt-1">Download or email your transaction history</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Business Info */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 text-sm mb-2">Statement for:</p>
            <p className="text-gray-900 font-semibold">{userProfile.businessName}</p>
            <p className="text-gray-600 text-sm">{userProfile.ownerName}</p>
          </div>

          {/* Period Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Period
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPeriod('last_7_days')}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  period === 'last_7_days'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setPeriod('last_30_days')}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  period === 'last_30_days'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Last 30 Days
              </button>
              <button
                onClick={() => setPeriod('last_90_days')}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  period === 'last_90_days'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Last 90 Days
              </button>
              <button
                onClick={() => setPeriod('custom')}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  period === 'custom'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Custom Range
              </button>
            </div>
          </div>

          {/* Custom Date Range */}
          {period === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  max={customEndDate || undefined}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  End Date
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  min={customStartDate || undefined}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Transaction Type Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Include Transactions
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMoneyIn}
                  onChange={(e) => setIncludeMoneyIn(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="text-gray-900 font-medium">Money In (Sales & Income)</span>
                  <p className="text-gray-500 text-sm">Product sales, service income, money received</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMoneyOut}
                  onChange={(e) => setIncludeMoneyOut(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="text-gray-900 font-medium">Money Out (Expenses)</span>
                  <p className="text-gray-500 text-sm">Business expenses, purchases, payments</p>
                </div>
              </label>
            </div>
          </div>

          {/* Statement Preview */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <h3 className="text-blue-900 font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Statement Preview
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Period:</span>
                <span className="text-blue-900 font-semibold">{getPeriodLabel()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Date Range:</span>
                <span className="text-blue-900 font-semibold">{getDateRange()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Total Transactions:</span>
                <span className="text-blue-900 font-semibold">{transactionCount}</span>
              </div>
              <div className="border-t border-blue-200 pt-2 mt-2">
                {includeMoneyIn && (
                  <div className="flex justify-between">
                    <span className="text-green-700">Total Money In:</span>
                    <span className="text-green-900 font-semibold">₦{totalMoneyIn.toLocaleString()}</span>
                  </div>
                )}
                {includeMoneyOut && (
                  <div className="flex justify-between">
                    <span className="text-red-700">Total Money Out:</span>
                    <span className="text-red-900 font-semibold">₦{totalMoneyOut.toLocaleString()}</span>
                  </div>
                )}
                {includeMoneyIn && includeMoneyOut && (
                  <div className="flex justify-between border-t border-blue-200 pt-2 mt-2">
                    <span className="text-blue-700 font-semibold">Net Amount:</span>
                    <span className={`font-bold ${netAmount >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                      ₦{netAmount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormat('pdf')}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  format === 'pdf'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                PDF
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  format === 'csv'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                CSV
              </button>
              <button
                onClick={() => setFormat('excel')}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  format === 'excel'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Excel
              </button>
            </div>
          </div>

          {/* Delivery Method */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Delivery Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeliveryMethod('download')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  deliveryMethod === 'download'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={() => setDeliveryMethod('email')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  deliveryMethod === 'email'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Mail className="w-5 h-5" />
                Email
              </button>
            </div>
          </div>

          {/* Email Input */}
          {deliveryMethod === 'email' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-gray-500 text-sm mt-1">We'll send your statement to this email</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  {deliveryMethod === 'download' ? (
                    <>
                      <Download className="w-5 h-5" />
                      Generate Statement
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send to Email
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

