import { X, Calculator, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';

interface LoanApplicationModalProps {
  maxAmount: number;
  recommendedAmount: number;
  interestRate: number;
  tierName: string;
  tierBadge: string;
  onClose: () => void;
}

export function LoanApplicationModal({ maxAmount, recommendedAmount, interestRate, tierName, tierBadge, onClose }: LoanApplicationModalProps) {
  const [amount, setAmount] = useState(recommendedAmount.toString());
  const [duration, setDuration] = useState('6');
  const [purpose, setPurpose] = useState('');

  const loanAmount = parseInt(amount) || 0;
  const loanDuration = parseInt(duration) || 6;
  const monthlyInterestRate = interestRate / 100; // Convert to decimal
  
  // Calculate monthly payment using simple interest
  const totalInterest = loanAmount * monthlyInterestRate * loanDuration;
  const totalRepayment = loanAmount + totalInterest;
  const monthlyPayment = totalRepayment / loanDuration;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle loan application submission
    alert(`Loan application submitted! We'll review your application and get back to you within 24 hours.`);
    onClose();
  };

  const isAmountValid = loanAmount > 0 && loanAmount <= maxAmount;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto pb-safe">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white">Apply for Loan</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Tier Display */}
          <div className="bg-white/95 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{tierBadge}</span>
                <div>
                  <p className="text-xs text-gray-600">Your Tier</p>
                  <p className="text-sm text-gray-900 font-semibold">{tierName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Interest Rate</p>
                <p className="text-sm text-green-700 font-semibold">{interestRate}%/month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 pb-24">{/* Added pb-24 */}
          {/* Loan Amount */}
          <div>
            <label className="block text-gray-700 mb-2">How Much Do You Need? (₦)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1000"
              max={maxAmount}
            />
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-500">Recommended: ₦{recommendedAmount.toLocaleString()}</span>
              <span className="text-gray-500">Max: ₦{maxAmount.toLocaleString()}</span>
            </div>
            {!isAmountValid && loanAmount > 0 && (
              <p className="text-sm text-red-600 mt-2">
                Amount cannot exceed ₦{maxAmount.toLocaleString()}
              </p>
            )}
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setAmount((recommendedAmount * 0.5).toString())}
              className="py-3 px-2 rounded-xl border-2 border-gray-200 text-gray-700 active:border-blue-600 active:bg-blue-50 text-sm"
            >
              ₦{(recommendedAmount * 0.5 / 1000).toFixed(0)}k
            </button>
            <button
              type="button"
              onClick={() => setAmount(recommendedAmount.toString())}
              className="py-3 px-2 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 text-sm"
            >
              ₦{(recommendedAmount / 1000).toFixed(0)}k
              <div className="text-xs">Recommended</div>
            </button>
            <button
              type="button"
              onClick={() => setAmount(maxAmount.toString())}
              className="py-3 px-2 rounded-xl border-2 border-gray-200 text-gray-700 active:border-blue-600 active:bg-blue-50 text-sm"
            >
              ₦{(maxAmount / 1000).toFixed(0)}k
            </button>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 mb-2">Payment Period</label>
            <div className="grid grid-cols-3 gap-3">
              {['3', '6', '12'].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setDuration(months)}
                  className={`py-4 rounded-xl border-2 transition-colors ${
                    duration === months
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {months} months
                </button>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-gray-700 mb-2">What Will You Use It For?</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Select purpose</option>
              <option value="stock">Buy More Stock</option>
              <option value="equipment">Buy Equipment</option>
              <option value="expansion">Expand My Business</option>
              <option value="emergency">Emergency/Unexpected Cost</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Loan Calculator Display */}
          {isAmountValid && (
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-5 h-5 text-blue-600" />
                <p className="text-blue-900">Loan Breakdown</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="text-gray-900">₦{loanAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest ({interestRate}%/month)</span>
                  <span className="text-gray-900">₦{totalInterest.toLocaleString()}</span>
                </div>
                
                <div className="h-px bg-blue-200" />
                
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Repayment</span>
                  <span className="text-blue-700">₦{totalRepayment.toLocaleString()}</span>
                </div>
                
                <div className="bg-white rounded-xl p-3 mt-3">
                  <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                  <p className="text-green-700">₦{monthlyPayment.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">for {loanDuration} months</p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-orange-900 mb-1">Important</p>
                <p className="text-sm text-orange-800 leading-relaxed">
                  Make sure you can afford the monthly payments before applying. Your business records help us approve loans faster.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isAmountValid}
            className={`w-full py-4 rounded-xl shadow-md mt-6 ${
              isAmountValid
                ? 'bg-blue-600 text-white active:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Application
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to our loan terms and conditions
          </p>
        </form>
      </div>
    </div>
  );
}

