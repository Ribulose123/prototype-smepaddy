import { X, ChevronRight, User, FileText, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface RecordServiceSaleProps {
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'customer' | 'service-name' | 'price' | 'payment' | 'confirm';

export function RecordServiceSale({ onBack, onComplete }: RecordServiceSaleProps) {
  const [currentStep, setCurrentStep] = useState<Step>('customer');
  const [customerName, setCustomerName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [isPaid, setIsPaid] = useState(true);

  const steps: Step[] = ['customer', 'service-name', 'price', 'payment', 'confirm'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === 'customer' && !customerName.trim()) {
      toast.error('Please enter customer name');
      return;
    }
    if (currentStep === 'service-name' && !serviceName.trim()) {
      toast.error('Please describe the service');
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
    toast.success('Service sale recorded successfully! 🎉');
    onComplete();
  };

  const amount = parseFloat(price) || 0;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'customer':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 py-8">
              <div className="bg-purple-50 rounded-2xl p-6 mb-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Who is the customer?</h3>
                <p className="text-sm text-gray-600">Enter the customer's name</p>
              </div>

              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Mama Ngozi, Bro Emeka"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm text-center"
                autoFocus
              />

              <div className="mt-4 bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 text-center">
                  💡 Recording customer names helps track your best clients
                </p>
              </div>
            </div>

            <div className="px-4 pb-6">
              <button
                onClick={handleNext}
                disabled={!customerName.trim()}
                className={`w-full py-5 rounded-2xl shadow-lg transition-all ${
                  customerName.trim()
                    ? 'bg-purple-600 text-white active:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </div>
        );

      case 'service-name':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 py-8">
              <div className="bg-purple-50 rounded-2xl p-6 mb-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-2">What service did you provide?</h3>
                <p className="text-sm text-gray-600">Describe the work you did</p>
              </div>

              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g. Sew native wear, Fix phone screen"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm text-center"
                autoFocus
              />

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setServiceName('Tailoring')}
                  className="py-3 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50"
                >
                  ✂️ Tailoring
                </button>
                <button
                  onClick={() => setServiceName('Hair Styling')}
                  className="py-3 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50"
                >
                  💇 Hair Styling
                </button>
                <button
                  onClick={() => setServiceName('Phone Repair')}
                  className="py-3 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50"
                >
                  📱 Phone Repair
                </button>
                <button
                  onClick={() => setServiceName('Consultation')}
                  className="py-3 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50"
                >
                  💼 Consultation
                </button>
              </div>
            </div>

            <div className="px-4 pb-6 space-y-3">
              <button
                onClick={handleNext}
                disabled={!serviceName.trim()}
                className={`w-full py-5 rounded-2xl shadow-lg transition-all ${
                  serviceName.trim()
                    ? 'bg-purple-600 text-white active:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5 inline ml-2" />
              </button>
              <button
                onClick={handleBack}
                className="w-full py-4 rounded-2xl border-2 border-gray-200 text-gray-700 active:bg-gray-50"
              >
                Back
              </button>
            </div>
          </div>
        );

      case 'price':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 py-8">
              <div className="bg-purple-50 rounded-2xl p-6 mb-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-2">How much are you charging?</h3>
                <p className="text-sm text-gray-600">Enter the service price</p>
              </div>

              <div className="relative mb-4">
                <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">₦</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full pl-12 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm text-center"
                  min="0"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPrice('5000')}
                  className="py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50"
                >
                  ₦5,000
                </button>
                <button
                  onClick={() => setPrice('10000')}
                  className="py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50"
                >
                  ₦10,000
                </button>
                <button
                  onClick={() => setPrice('20000')}
                  className="py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 active:bg-gray-50"
                >
                  ₦20,000
                </button>
              </div>
            </div>

            <div className="px-4 pb-6 space-y-3">
              <button
                onClick={handleNext}
                disabled={!price || parseFloat(price) <= 0}
                className={`w-full py-5 rounded-2xl shadow-lg transition-all ${
                  price && parseFloat(price) > 0
                    ? 'bg-purple-600 text-white active:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5 inline ml-2" />
              </button>
              <button
                onClick={handleBack}
                className="w-full py-4 rounded-2xl border-2 border-gray-200 text-gray-700 active:bg-gray-50"
              >
                Back
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 py-8">
              <div className="bg-purple-50 rounded-2xl p-6 mb-6 text-center">
                <h3 className="text-gray-900 mb-2">Payment Status</h3>
                <p className="text-sm text-gray-600">Has the customer paid?</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsPaid(true);
                    handleNext();
                  }}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-green-500 transition-all active:scale-98"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-100 rounded-2xl">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-gray-900 mb-1">Paid Now</h4>
                      <p className="text-sm text-gray-600">Customer paid in full</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsPaid(false);
                    handleNext();
                  }}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-orange-500 transition-all active:scale-98"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-orange-100 rounded-2xl">
                      <AlertCircle className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-gray-900 mb-1">Pay Later</h4>
                      <p className="text-sm text-gray-600">Customer will pay later</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="px-4 pb-6">
              <button
                onClick={handleBack}
                className="w-full py-4 rounded-2xl border-2 border-gray-200 text-gray-700 active:bg-gray-50"
              >
                Back
              </button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 py-8 overflow-y-auto">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6 text-center border-2 border-purple-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Confirm Service Sale</h3>
                <p className="text-sm text-gray-600">Review details before saving</p>
              </div>

              {/* Sale Details */}
              <div className="bg-white rounded-2xl p-5 shadow-md mb-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Customer:</span>
                  <span className="text-gray-900">{customerName}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Service:</span>
                  <span className="text-gray-900">{serviceName}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-green-700">₦{amount.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className={isPaid ? 'text-green-700' : 'text-orange-700'}>
                    {isPaid ? 'Paid Now' : 'Pay Later'}
                  </span>
                </div>
              </div>

              {/* Amount Display */}
              <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-2xl p-6 shadow-md border-2 border-purple-200">
                <p className="text-sm text-gray-600 text-center mb-2">Total Amount</p>
                <p className="text-center text-green-700">₦{amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 text-center mt-2">
                  {isPaid ? '✅ Payment received' : '⏳ Awaiting payment'}
                </p>
              </div>
            </div>

            <div className="px-4 pb-6 space-y-3">
              <button
                onClick={handleSubmit}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg active:scale-98 transition-all"
              >
                Confirm & Save Service
              </button>
              <button
                onClick={handleBack}
                className="w-full py-4 rounded-2xl border-2 border-gray-200 text-gray-700 active:bg-gray-50"
              >
                Back
              </button>
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
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 px-4 pt-6 pb-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={currentStepIndex === 0 ? onBack : handleBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-white flex-1 text-center">Record Service</h2>
          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/80 text-xs text-center mt-2">
          Step {currentStepIndex + 1} of {steps.length}
        </p>
      </div>

      {renderStepContent()}
    </div>
  );
}
