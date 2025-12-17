import { X, FileText, DollarSign, CheckCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { awardCoins } from '../utils/paddyCoinSystem';
import { NetworkGridPattern } from './NetworkGridPattern';

interface RecordExpenseProps {
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'expense-name' | 'amount' | 'confirm';

const commonExpenses = [
  { name: 'Shop Rent', emoji: '🏠' },
  { name: 'Transport', emoji: '🚕' },
  { name: 'NEPA Bill', emoji: '⚡' },
  { name: 'Water Bill', emoji: '💧' },
  { name: 'Restock Items', emoji: '📦' },
  { name: 'Staff Salary', emoji: '👥' },
  { name: 'Phone Credit', emoji: '📱' },
  { name: 'Repairs', emoji: '🔧' }
];

export function RecordExpense({ onBack, onComplete }: RecordExpenseProps) {
  const [currentStep, setCurrentStep] = useState<Step>('expense-name');
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');

  const steps: Step[] = ['expense-name', 'amount', 'confirm'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === 'expense-name' && !expenseName.trim()) {
      toast.error('Please enter expense name');
      return;
    }
    
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    const reward = awardCoins('expense_recorded');
    toast.success('Expense recorded successfully! 💰');
    
    // Show coin reward notification after a short delay
    setTimeout(() => {
      toast.success(reward.message, {
        duration: 3000,
        icon: '🪙'
      });
    }, 500);
    
    onComplete();
  };

  const expenseAmount = parseFloat(amount) || 0;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'expense-name':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 lg:px-8 py-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 rounded-2xl p-6 lg:p-8 mb-6 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <FileText className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
                  </div>
                  <h3 className="text-gray-900 text-lg lg:text-xl mb-2">What did you spend on?</h3>
                  <p className="text-sm lg:text-base text-gray-600">Describe your expense</p>
                </div>

                <input
                  type="text"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  placeholder="e.g. Shop Rent, Transport"
                  className="w-full px-6 py-5 lg:py-6 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm text-center mb-6 lg:text-lg"
                  autoFocus
                />

                <h4 className="text-gray-700 text-base lg:text-lg mb-3 lg:mb-4 text-center">Or choose common expense:</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  {commonExpenses.map((expense) => (
                    <button
                      key={expense.name}
                      onClick={() => setExpenseName(expense.name)}
                      className="py-4 lg:py-5 px-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50 hover:border-red-300 transition-colors"
                    >
                      <div className="text-2xl lg:text-3xl mb-1 lg:mb-2">{expense.emoji}</div>
                      <div className="text-sm lg:text-base">{expense.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 lg:px-8 pb-6">
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={handleNext}
                  disabled={!expenseName.trim()}
                  className={`w-full py-5 lg:py-6 rounded-2xl shadow-lg transition-all lg:text-lg ${
                    expenseName.trim()
                      ? 'bg-red-600 text-white active:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'amount':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 lg:px-8 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 rounded-2xl p-6 lg:p-8 mb-6 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <DollarSign className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
                  </div>
                  <h3 className="text-gray-900 text-lg lg:text-xl mb-2">How much did you spend?</h3>
                  <p className="text-sm lg:text-base text-gray-600">Enter the amount</p>
                </div>

                <div className="relative mb-6">
                  <span className="absolute left-6 lg:left-8 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg lg:text-xl">₦</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-12 lg:pl-16 pr-6 py-5 lg:py-6 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm text-center lg:text-lg"
                    min="0"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
                  <button
                    onClick={() => setAmount('1000')}
                    className="py-3 lg:py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50 hover:border-red-300 transition-colors lg:text-base"
                  >
                    ₦1,000
                  </button>
                  <button
                    onClick={() => setAmount('5000')}
                    className="py-3 lg:py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50 hover:border-red-300 transition-colors lg:text-base"
                  >
                    ₦5,000
                  </button>
                  <button
                    onClick={() => setAmount('10000')}
                    className="py-3 lg:py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50 hover:border-red-300 transition-colors lg:text-base"
                  >
                    ₦10,000
                  </button>
                  <button
                    onClick={() => setAmount('20000')}
                    className="py-3 lg:py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50 hover:border-red-300 transition-colors lg:text-base"
                  >
                    ₦20,000
                  </button>
                  <button
                    onClick={() => setAmount('50000')}
                    className="py-3 lg:py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50 hover:border-red-300 transition-colors lg:text-base"
                  >
                    ₦50,000
                  </button>
                  <button
                    onClick={() => setAmount('100000')}
                    className="py-3 lg:py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50 hover:border-red-300 transition-colors lg:text-base"
                  >
                    ₦100,000
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 lg:px-8 pb-6 space-y-3">
              <div className="max-w-4xl mx-auto space-y-3">
                <button
                  onClick={handleNext}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className={`w-full py-5 lg:py-6 rounded-2xl shadow-lg transition-all lg:text-lg ${
                    amount && parseFloat(amount) > 0
                      ? 'bg-red-600 text-white active:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 inline ml-2" />
                </button>
                <button
                  onClick={handleBack}
                  className="w-full py-4 lg:py-5 rounded-2xl border-2 border-gray-200 text-gray-700 active:bg-gray-50 lg:text-base"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 lg:px-8 py-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 lg:p-8 mb-6 text-center border-2 border-red-200">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
                  </div>
                  <h3 className="text-gray-900 text-lg lg:text-xl mb-2">Confirm Expense</h3>
                  <p className="text-sm lg:text-base text-gray-600">Review details before saving</p>
                </div>

                {/* Expense Details */}
                <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-md mb-4 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600 lg:text-lg">Expense:</span>
                    <span className="text-gray-900 font-medium lg:text-lg">{expenseName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 lg:text-lg">Amount Spent:</span>
                    <span className="text-red-700 font-semibold lg:text-xl">₦{expenseAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Amount Display */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 lg:p-8 shadow-md border-2 border-red-200">
                  <p className="text-sm lg:text-base text-gray-600 text-center mb-2">Money Out</p>
                  <p className="text-center text-red-700 text-3xl lg:text-4xl font-bold">-₦{expenseAmount.toLocaleString()}</p>
                  <p className="text-xs lg:text-sm text-gray-500 text-center mt-2">
                    This will be deducted from your profit
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4 lg:px-8 pb-6 space-y-3">
              <div className="max-w-4xl mx-auto space-y-3">
                <button
                  onClick={handleSubmit}
                  className="w-full py-5 lg:py-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg active:scale-98 transition-all lg:text-lg font-semibold"
                >
                  Confirm & Save Expense
                </button>
                <button
                  onClick={handleBack}
                  className="w-full py-4 lg:py-5 rounded-2xl border-2 border-gray-200 text-gray-700 active:bg-gray-50 lg:text-base"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with Progress */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-700 px-4 lg:px-8 pt-6 pb-4 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={currentStepIndex === 0 ? onBack : handleBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <h2 className="text-white text-xl lg:text-2xl flex-1 text-center">Record Expense</h2>
            <div className="w-10"></div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-xs lg:text-sm text-center mt-2">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>
      </div>

      {renderStepContent()}
    </div>
  );
}