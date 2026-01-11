import { ArrowLeft, Check, Users, CreditCard, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { AmountInput } from './AmountInput';

// Gamification coin awards
const awardCoins = (action: string) => {
  const rewards: { [key: string]: { coins: number; message: string } } = {
    'sale_recorded': { coins: 10, message: '+10 Paddy Coins! Sale recorded' }
  };
  return rewards[action] || { coins: 0, message: '' };
};

interface QuickProductSaleProps {
  item: any;
  onBack: () => void;
  onComplete: () => void;
}

type PaymentType = 'paid' | 'partial' | 'later';

export function QuickProductSale({ item, onBack, onComplete }: QuickProductSaleProps) {
  const [step, setStep] = useState<'entry' | 'confirm'>('entry');
  const [customerName, setCustomerName] = useState('');
  const [unitType, setUnitType] = useState<'bulk' | number>('bulk'); // number = index of retail unit
  const [quantity, setQuantity] = useState('');
  const [paymentType, setPaymentType] = useState<PaymentType>('paid');
  const [partialAmount, setPartialAmount] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [useCustomPrice, setUseCustomPrice] = useState(false);

  // Calculations
  const qty = parseFloat(quantity) || 0;
  
  let standardPrice = 0;
  let costPerUnit = 0;
  let unitName = '';
  
  if (unitType === 'bulk') {
    standardPrice = item.sellingPricePerBulk;
    costPerUnit = item.costPrice;
    unitName = item.bulkUnit;
  } else {
    const retailUnit = item.retailUnits[unitType];
    standardPrice = retailUnit.sellingPrice;
    costPerUnit = item.costPrice / retailUnit.unitsPerBulk;
    unitName = retailUnit.unit;
  }
  
  // Use custom price if enabled, otherwise use standard
  const pricePerUnit = useCustomPrice && customPrice ? parseFloat(customPrice) : standardPrice;
  
  const totalAmount = qty * pricePerUnit;
  const totalCost = qty * costPerUnit;
  const totalProfit = totalAmount - totalCost;
  
  const paidAmount = paymentType === 'paid' ? totalAmount : 
                     paymentType === 'partial' ? (parseFloat(partialAmount) || 0) :
                     0;
  const balance = totalAmount - paidAmount;

  // Price comparison for feedback
  const priceDifference = pricePerUnit - standardPrice;
  const isPriceAdjusted = useCustomPrice && Math.abs(priceDifference) > 0;

  const handleContinue = () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      toast.error('Please enter quantity');
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
    setStep('confirm');
  };

  const handleSubmit = () => {
    const reward = awardCoins('sale_recorded');
    toast.success('Sale recorded successfully! 🎉');
    
    // Show coin reward notification after a short delay
    setTimeout(() => {
      toast.success(reward.message, {
        duration: 3000,
        icon: '🪙'
      });
    }, 500);
    
    onComplete();
  };

  if (step === 'entry') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 pt-6 pb-6 rounded-b-3xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <h2 className="text-white flex-1 text-center">{item.name}</h2>
            <div className="w-10"></div>
          </div>
          <p className="text-white/90 text-sm text-center">Quick Sale Entry</p>
        </div>

        {/* Entry Form */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          {/* Customer Name (Optional) */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm">Customer Name (optional)</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Mama Ngozi, Bro Emeka"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Unit Type Selection - Bulk + All Retail Units */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm">Selling Unit</label>
            <div className="grid grid-cols-2 gap-3">
              {/* Bulk Unit Option */}
              <button
                type="button"
                onClick={() => setUnitType('bulk')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  unitType === 'bulk'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p className="text-gray-900 mb-1 text-sm">{item.bulkUnit}</p>
                <p className="text-xs text-gray-600">₦{item.sellingPricePerBulk.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Bulk</p>
              </button>

              {/* All Retail Units */}
              {item.retailUnits.map((retailUnit: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setUnitType(index)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    unitType === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <p className="text-gray-900 mb-1 text-sm capitalize">{retailUnit.unit}</p>
                  <p className="text-xs text-gray-600">₦{retailUnit.sellingPrice.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Retail</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm">
              Quantity ({unitName}s)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step={unitType !== 'bulk' ? '0.5' : '1'}
              autoFocus
            />
            {unitType !== 'bulk' && qty > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                = {(qty / item.retailUnits[unitType].unitsPerBulk).toFixed(2)} {item.bulkUnit}s
              </p>
            )}
          </div>

          {/* Payment Status */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm">Payment Status</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentType('paid')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentType === 'paid'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p className="text-gray-900 text-sm">Paid</p>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('partial')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentType === 'partial'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p className="text-gray-900 text-sm">Partial</p>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('later')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentType === 'later'
                    ? 'border-orange-600 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p className="text-gray-900 text-sm">Later</p>
              </button>
            </div>
          </div>

          {/* Partial Payment Amount */}
          {paymentType === 'partial' && (
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 text-sm">Amount Paid Now</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">₦</span>
                <AmountInput
                  value={partialAmount}
                  onChange={(val) => setPartialAmount(val)}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {partialAmount && parseFloat(partialAmount) > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Balance: ₦{(totalAmount - parseFloat(partialAmount)).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {/* Custom Price Option */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700 text-sm">Adjust Price (optional)</label>
              <span className="text-xs text-gray-500">Standard: ₦{standardPrice.toLocaleString()}</span>
            </div>
            
            {/* Quick adjustment buttons */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setCustomPrice((standardPrice * 0.9).toString());
                  setUseCustomPrice(true);
                }}
                className="p-2 rounded-lg bg-orange-50 text-orange-700 text-xs border border-orange-200 hover:bg-orange-100 transition-colors"
              >
                -10%
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomPrice((standardPrice * 0.95).toString());
                  setUseCustomPrice(true);
                }}
                className="p-2 rounded-lg bg-orange-50 text-orange-700 text-xs border border-orange-200 hover:bg-orange-100 transition-colors"
              >
                -5%
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomPrice((standardPrice * 1.05).toString());
                  setUseCustomPrice(true);
                }}
                className="p-2 rounded-lg bg-green-50 text-green-700 text-xs border border-green-200 hover:bg-green-100 transition-colors"
              >
                +5%
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomPrice((standardPrice * 1.1).toString());
                  setUseCustomPrice(true);
                }}
                className="p-2 rounded-lg bg-green-50 text-green-700 text-xs border border-green-200 hover:bg-green-100 transition-colors"
              >
                +10%
              </button>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">₦</span>
              <input
                type="number"
                value={customPrice}
                onChange={(e) => {
                  setCustomPrice(e.target.value);
                  setUseCustomPrice(!!e.target.value);
                }}
                placeholder={standardPrice.toString()}
                className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            
            {isPriceAdjusted && (
              <div className={`mt-2 p-2 rounded-lg border ${
                priceDifference > 0 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${
                  priceDifference > 0 ? 'text-green-700' : 'text-orange-700'
                }`}>
                  {priceDifference > 0 ? '↑ Increased' : '↓ Decreased'} by ₦{Math.abs(priceDifference).toLocaleString()} 
                  ({((Math.abs(priceDifference) / standardPrice) * 100).toFixed(1)}%)
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {priceDifference > 0 
                    ? '💰 Higher price - market adjustment or premium sale' 
                    : '🤝 Discount - loyal customer or bulk sale'}
                </p>
              </div>
            )}

            {!useCustomPrice && (
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Use quick buttons or enter custom price for discounts/increases
              </p>
            )}
          </div>

          {/* Live Preview */}
          {qty > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-4 border-2 border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Total Amount:</span>
                <span className="text-blue-700">₦{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Your Profit:</span>
                <span className={totalProfit > 0 ? 'text-green-700' : 'text-red-700'}>
                  ₦{totalProfit.toLocaleString()}
                </span>
              </div>
              {paymentType === 'partial' && paidAmount > 0 && (
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-200">
                  <span className="text-gray-600 text-sm">Balance:</span>
                  <span className="text-orange-700">₦{balance.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="px-4 pb-6">
          <button
            onClick={handleContinue}
            disabled={!quantity || parseFloat(quantity) <= 0}
            className={`w-full py-5 rounded-2xl shadow-lg transition-all ${
              quantity && parseFloat(quantity) > 0
                ? 'bg-blue-600 text-white active:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Review & Confirm
          </button>
        </div>
      </div>
    );
  }

  // Confirmation Step
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 px-4 pt-6 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setStep('entry')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-white flex-1 text-center">Confirm Sale</h2>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Confirmation Details */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6 text-center border-2 border-green-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Review Your Sale</h3>
          <p className="text-sm text-gray-600">Check the details before saving</p>
        </div>

        {/* Sale Details */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-600">Item:</span>
            <span className="text-gray-900">{item.name}</span>
          </div>

          {customerName && (
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Customer:</span>
              <span className="text-gray-900">{customerName}</span>
            </div>
          )}

          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-600">Quantity:</span>
            <span className="text-gray-900">{qty} {unitName}s</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-600">Price per unit:</span>
            <div className="text-right">
              <span className="text-gray-900">₦{pricePerUnit.toLocaleString()}</span>
              {isPriceAdjusted && (
                <p className={`text-xs mt-0.5 ${
                  priceDifference > 0 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {priceDifference > 0 ? '+' : ''}₦{priceDifference.toLocaleString()} from standard
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-blue-700">₦{totalAmount.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Payment:</span>
            <span className={
              paymentType === 'paid' ? 'text-green-700' : 
              paymentType === 'partial' ? 'text-blue-700' : 
              'text-orange-700'
            }>
              {paymentType === 'paid' ? 'Paid in Full' : 
               paymentType === 'partial' ? `Partial (₦${paidAmount.toLocaleString()})` : 
               'Pay Later'}
            </span>
          </div>

          {paymentType === 'partial' && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-gray-600">Balance:</span>
              <span className="text-orange-700">₦{balance.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Financial Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-5 shadow-md border-2 border-blue-200">
          <h4 className="text-gray-800 mb-4 text-center">Financial Summary</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Sale:</span>
              <span className="text-blue-700">₦{totalAmount.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Your Cost:</span>
              <span className="text-gray-700">₦{totalCost.toLocaleString()}</span>
            </div>
            
            <div className="h-px bg-gray-300" />
            
            <div className="flex justify-between pt-1">
              <span className="text-gray-800">Your Profit:</span>
              <span className={totalProfit > 0 ? 'text-green-700' : 'text-red-700'}>
                ₦{totalProfit.toLocaleString()}
              </span>
            </div>

            {paymentType !== 'paid' && (
              <>
                <div className="h-px bg-gray-300" />
                <div className="flex justify-between pt-1">
                  <span className="text-gray-800">Amount Received:</span>
                  <span className="text-green-700">₦{paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Outstanding:</span>
                  <span className="text-orange-700">₦{balance.toLocaleString()}</span>
                </div>
              </>
            )}
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

      {/* Action Buttons */}
      <div className="px-4 pb-6 space-y-3">
        <button
          onClick={handleSubmit}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg active:scale-98 transition-all"
        >
          Confirm & Save Sale
        </button>
        <button
          onClick={() => setStep('entry')}
          className="w-full py-4 rounded-2xl border-2 border-gray-200 text-gray-700 active:bg-gray-50"
        >
          Back to Edit
        </button>
      </div>
    </div>
  );
}