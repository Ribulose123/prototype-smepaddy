import { X, ChevronRight, User, Hash, DollarSign, CheckCircle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface RecordProductSaleProps {
  item: any;
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'customer' | 'unit-type' | 'quantity' | 'price' | 'payment' | 'confirm';

export function RecordProductSale({ item, onBack, onComplete }: RecordProductSaleProps) {
  const [currentStep, setCurrentStep] = useState<Step>('customer');
  const [customerName, setCustomerName] = useState('');
  const [unitType, setUnitType] = useState<'bulk' | 'retail'>('retail');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [isPaid, setIsPaid] = useState(true);

  const steps: Step[] = ['customer', 'unit-type', 'quantity', 'price', 'payment', 'confirm'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === 'customer' && !customerName.trim()) {
      toast.error('Please enter customer name');
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

  const handleUnitTypeSelect = (type: 'bulk' | 'retail') => {
    setUnitType(type);
    // Auto-set price based on unit type
    if (type === 'bulk') {
      setPricePerUnit(item.sellingPricePerBulk.toString());
    } else {
      setPricePerUnit(item.sellingPricePerRetail.toString());
    }
    handleNext();
  };

  const handleSubmit = () => {
    toast.success('Sale recorded successfully! 🎉');
    onComplete();
  };

  // Calculations
  const qty = parseFloat(quantity) || 0;
  const price = parseFloat(pricePerUnit) || 0;
  const totalAmount = qty * price;
  
  const costPerUnit = unitType === 'bulk' ? item.costPrice : (item.costPrice / item.unitsPerBulk);
  const totalCost = qty * costPerUnit;
  const totalProfit = totalAmount - totalCost;

  const standardPrice = unitType === 'bulk' ? item.sellingPricePerBulk : item.sellingPricePerRetail;
  const priceComparison = price === standardPrice ? 'standard' : 
                         price < standardPrice ? 'below' : 'above';

  const renderStepContent = () => {
    switch (currentStep) {
      case 'customer':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 py-8">
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Who is buying?</h3>
                <p className="text-sm text-gray-600">Enter the customer's name</p>
              </div>

              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Mama Ngozi, Bro Emeka"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-center"
                autoFocus
              />

              <div className="mt-4 bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 text-center">
                  💡 Tip: Use familiar names to track repeat customers
                </p>
              </div>
            </div>

            <div className="px-4 pb-6">
              <button
                onClick={handleNext}
                disabled={!customerName.trim()}
                className={`w-full py-5 rounded-2xl shadow-lg transition-all ${
                  customerName.trim()
                    ? 'bg-blue-600 text-white active:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </div>
        );

      case 'unit-type':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 py-8">
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center">
                <h3 className="text-gray-900 mb-2">How are you selling?</h3>
                <p className="text-sm text-gray-600">Choose bulk or retail sale</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleUnitTypeSelect('bulk')}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-purple-500 transition-all active:scale-98"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{item.emoji}</div>
                    <h4 className="text-gray-900 mb-2">Sell by {item.bulkUnit}</h4>
                    <p className="text-sm text-gray-600 mb-3">Whole {item.bulkUnit}</p>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Standard price:</p>
                      <p className="text-green-700">₦{item.sellingPricePerBulk.toLocaleString()}/{item.bulkUnit}</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleUnitTypeSelect('retail')}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-blue-500 transition-all active:scale-98"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-3">{item.emoji}</div>
                    <h4 className="text-gray-900 mb-2">Sell by {item.retailUnit}</h4>
                    <p className="text-sm text-gray-600 mb-3">Smaller portions (retail)</p>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Standard price:</p>
                      <p className="text-green-700">₦{item.sellingPricePerRetail.toLocaleString()}/{item.retailUnit}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'quantity':
        return (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 px-4 py-8">
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Hash className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-2">How many {unitType === 'bulk' ? item.bulkUnit : item.retailUnit}s?</h3>
                <p className="text-sm text-gray-600">Enter the quantity</p>
              </div>

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-center"
                min="0"
                step="0.5"
                autoFocus
              />

              {unitType === 'retail' && qty > 0 && (
                <div className="mt-4 bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-center">
                    <span className="text-purple-700">{qty} {item.retailUnit}s</span>
                    <span className="text-gray-600"> = </span>
                    <span className="text-purple-700">{(qty / item.unitsPerBulk).toFixed(2)} {item.bulkUnit}s</span>
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 pb-6 space-y-3">
              <button
                onClick={handleNext}
                disabled={!quantity || parseFloat(quantity) <= 0}
                className={`w-full py-5 rounded-2xl shadow-lg transition-all ${
                  quantity && parseFloat(quantity) > 0
                    ? 'bg-blue-600 text-white active:bg-blue-700'
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
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-2">What's the price?</h3>
                <p className="text-sm text-gray-600">Price per {unitType === 'bulk' ? item.bulkUnit : item.retailUnit}</p>
              </div>

              <div className="relative mb-4">
                <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">₦</span>
                <input
                  type="number"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                  placeholder="0"
                  className="w-full pl-12 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-center"
                  min="0"
                  autoFocus
                />
              </div>

              {price > 0 && price !== standardPrice && (
                <div className={`rounded-xl p-4 border-2 mb-4 ${
                  priceComparison === 'below' 
                    ? 'bg-orange-50 border-orange-200' 
                    : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center gap-2 justify-center">
                    {priceComparison === 'below' ? (
                      <TrendingDown className="w-5 h-5 text-orange-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    )}
                    <span className={`text-sm ${
                      priceComparison === 'below' ? 'text-orange-800' : 'text-green-800'
                    }`}>
                      {priceComparison === 'below' 
                        ? `₦${(standardPrice - price).toLocaleString()} below standard`
                        : `₦${(price - standardPrice).toLocaleString()} above standard`
                      }
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setPricePerUnit(standardPrice.toString())}
                className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 active:bg-gray-200 mb-4"
              >
                Use Standard Price (₦{standardPrice.toLocaleString()})
              </button>
            </div>

            <div className="px-4 pb-6 space-y-3">
              <button
                onClick={handleNext}
                disabled={!pricePerUnit || parseFloat(pricePerUnit) <= 0}
                className={`w-full py-5 rounded-2xl shadow-lg transition-all ${
                  pricePerUnit && parseFloat(pricePerUnit) > 0
                    ? 'bg-blue-600 text-white active:bg-blue-700'
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
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center">
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
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6 text-center border-2 border-green-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Confirm Sale</h3>
                <p className="text-sm text-gray-600">Review details before saving</p>
              </div>

              {/* Sale Details */}
              <div className="bg-white rounded-2xl p-5 shadow-md mb-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Customer:</span>
                  <span className="text-gray-900">{customerName}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Item:</span>
                  <span className="text-gray-900">{item.name}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="text-gray-900">{qty} {unitType === 'bulk' ? item.bulkUnit : item.retailUnit}s</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Price per unit:</span>
                  <span className="text-gray-900">₦{price.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className={isPaid ? 'text-green-700' : 'text-orange-700'}>
                    {isPaid ? 'Paid Now' : 'Pay Later'}
                  </span>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-5 shadow-md border-2 border-blue-200">
                <h4 className="text-gray-800 mb-4 text-center">Financial Summary</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Amount:</span>
                    <span className="text-blue-700">₦{totalAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Cost:</span>
                    <span className="text-gray-700">₦{totalCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="h-px bg-gray-300" />
                  
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-800">Your Profit:</span>
                    <span className={`${
                      totalProfit > 0 ? 'text-green-700' : totalProfit < 0 ? 'text-red-700' : 'text-gray-700'
                    }`}>
                      ₦{totalProfit.toLocaleString()}
                    </span>
                  </div>
                </div>

                {totalProfit < 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2 mt-4">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-800">
                      Warning: You're selling below cost. You'll lose ₦{Math.abs(totalProfit).toLocaleString()}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 pb-6 space-y-3">
              <button
                onClick={handleSubmit}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg active:scale-98 transition-all"
              >
                Confirm & Save Sale
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
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 pt-6 pb-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={currentStepIndex === 0 ? onBack : handleBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-white flex-1 text-center">{item.name}</h2>
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
