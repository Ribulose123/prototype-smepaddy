import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { awardCoins } from '../utils/paddyCoinSystem';

interface QuickServiceSaleProps {
  onBack: () => void;
  onComplete: () => void;
}

type PaymentType = 'paid' | 'partial' | 'later';

export function QuickServiceSale({ onBack, onComplete }: QuickServiceSaleProps) {
  const [serviceName, setServiceName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState<PaymentType>('paid');
  const [partialAmount, setPartialAmount] = useState('');

  const totalAmount = parseFloat(amount) || 0;
  const paidAmount = paymentType === 'paid' ? totalAmount : 
                     paymentType === 'partial' ? (parseFloat(partialAmount) || 0) :
                     0;
  const balance = totalAmount - paidAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceName.trim()) {
      toast.error('Please enter service name');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter amount');
      return;
    }

    if (paymentType === 'partial' && (!partialAmount || parseFloat(partialAmount) <= 0)) {
      toast.error('Please enter partial payment amount');
      return;
    }

    if (paymentType === 'partial' && parseFloat(partialAmount) >= totalAmount) {
      toast.error('Partial payment must be less than total amount');
      return;
    }

    const reward = awardCoins('sale_recorded');
    toast.success('Service sale recorded successfully! 🎉');
    
    // Show coin reward notification after a short delay
    setTimeout(() => {
      toast.success(reward.message, {
        duration: 3000,
        icon: '🪙'
      });
    }, 500);
    
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 px-4 pt-6 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-white flex-1 text-center">Service Sale</h2>
          <div className="w-10"></div>
        </div>
        <p className="text-white/90 text-sm text-center">Record a service you provided</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-4 py-6 flex flex-col overflow-y-auto">
        <div className="flex-1">
          {/* Service Name */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm">
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="e.g. Tailoring, Hair braiding, Repairs"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Customer Name (Optional) */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm">Customer Name (optional)</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Mama Ngozi, Bro Emeka"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm">
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">₦</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>

          {/* Payment Status */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm">Payment Status</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentType('paid')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentType === 'paid'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p className="text-gray-900">Paid Now</p>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('partial')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentType === 'partial'
                    ? 'border-orange-600 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p className="text-gray-900">Partial Payment</p>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('later')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentType === 'later'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p className="text-gray-900">Pay Later</p>
              </button>
            </div>
          </div>

          {/* Partial Payment Amount */}
          {paymentType === 'partial' && (
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 text-sm">
                Partial Payment Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">₦</span>
                <input
                  type="number"
                  value={partialAmount}
                  onChange={(e) => setPartialAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>
          )}

          {/* Summary */}
          {amount && parseFloat(amount) > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 border-2 border-purple-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Total Amount:</span>
                <span className="text-purple-700">₦{parseFloat(amount).toLocaleString()}</span>
              </div>
              {paymentType === 'partial' && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600 text-sm">Partial Payment:</span>
                  <span className="text-purple-700">₦{parseFloat(partialAmount).toLocaleString()}</span>
                </div>
              )}
              {paymentType !== 'paid' && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600 text-sm">Balance:</span>
                  <span className="text-purple-700">₦{balance.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={!serviceName.trim() || !amount || parseFloat(amount) <= 0}
            className={`w-full py-5 rounded-2xl shadow-lg transition-all ${
              serviceName.trim() && amount && parseFloat(amount) > 0
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white active:scale-98'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Record Service Sale
          </button>
        </div>
      </form>
    </div>
  );
}