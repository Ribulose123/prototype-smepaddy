import { X, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RecordSaleModalProps {
  onClose: () => void;
}

// Mock stock items - in real app this would come from a shared state/context
const stockItems = [
  { id: 1, name: 'Rice 50kg', costPrice: 32000, sellingPrice: 35000, quantity: 24 },
  { id: 2, name: 'Beans 25kg', costPrice: 20000, sellingPrice: 22500, quantity: 8 },
  { id: 3, name: 'Vegetable Oil 5L', costPrice: 8000, sellingPrice: 9000, quantity: 3 },
  { id: 4, name: 'Garri 10kg', costPrice: 7500, sellingPrice: 8500, quantity: 45 },
  { id: 5, name: 'Tomato Paste', costPrice: 1000, sellingPrice: 1250, quantity: 2 },
  { id: 6, name: 'Sugar 1kg', costPrice: 1200, sellingPrice: 1500, quantity: 18 },
  { id: 7, name: 'Salt 500g', costPrice: 280, sellingPrice: 350, quantity: 4 },
  { id: 8, name: 'Milk Powder 400g', costPrice: 2400, sellingPrice: 2800, quantity: 12 }
];

export function RecordSaleModal({ onClose }: RecordSaleModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');
  const [isPaid, setIsPaid] = useState(true);

  const selectedItem = stockItems.find(item => item.id.toString() === selectedItemId);

  // Auto-populate price when item is selected
  useEffect(() => {
    if (selectedItem) {
      setPrice(selectedItem.sellingPrice.toString());
    }
  }, [selectedItemId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  const qty = parseInt(quantity) || 0;
  const salePrice = parseFloat(price) || 0;
  const totalAmount = qty * salePrice;
  
  // Calculate profit if item is selected
  const costPrice = selectedItem?.costPrice || 0;
  const profitPerUnit = salePrice - costPrice;
  const totalProfit = profitPerUnit * qty;
  const totalCost = costPrice * qty;

  // Check if selling below, at, or above standard price
  const standardPrice = selectedItem?.sellingPrice || 0;
  const priceComparison = salePrice === standardPrice ? 'standard' : 
                         salePrice < standardPrice ? 'below' : 'above';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-gray-900">Record Sale</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Mama Ngozi"
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Select Item</label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Choose an item from your stock</option>
              {stockItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.quantity} in stock
                </option>
              ))}
            </select>
            {selectedItem && (
              <div className="mt-2 bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Standard selling price:</span>
                  <span className="text-blue-700">₦{selectedItem.sellingPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Available in stock:</span>
                  <span className="text-gray-700">{selectedItem.quantity} units</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 2"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="1"
                max={selectedItem?.quantity}
              />
              {selectedItem && qty > selectedItem.quantity && (
                <p className="text-xs text-red-600 mt-1">
                  Only {selectedItem.quantity} available
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Price (₦)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price per unit"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
            </div>
          </div>

          {/* Price Adjustment Indicator */}
          {selectedItem && salePrice > 0 && salePrice !== standardPrice && (
            <div className={`rounded-xl p-3 border ${
              priceComparison === 'below' 
                ? 'bg-orange-50 border-orange-200' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-2">
                {priceComparison === 'below' ? (
                  <TrendingDown className="w-4 h-4 text-orange-600" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                )}
                <span className={`text-sm ${
                  priceComparison === 'below' ? 'text-orange-800' : 'text-green-800'
                }`}>
                  {priceComparison === 'below' 
                    ? `₦${(standardPrice - salePrice).toLocaleString()} below your standard price`
                    : `₦${(salePrice - standardPrice).toLocaleString()} above your standard price`
                  }
                </span>
              </div>
            </div>
          )}

          {/* Sale Summary */}
          {selectedItem && qty > 0 && salePrice > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-4 border border-blue-200 space-y-3">
              <h3 className="text-gray-800">Sale Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-blue-700">₦{totalAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Your Cost:</span>
                  <span className="text-gray-700">₦{totalCost.toLocaleString()}</span>
                </div>
                
                <div className="h-px bg-blue-200" />
                
                <div className="flex justify-between">
                  <span className="text-gray-700">Your Profit:</span>
                  <span className={`${
                    totalProfit > 0 ? 'text-green-700' : totalProfit < 0 ? 'text-red-700' : 'text-gray-700'
                  }`}>
                    ₦{totalProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              {totalProfit < 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-800">
                    You&apos;re selling below cost. You&apos;ll lose ₦{Math.abs(totalProfit).toLocaleString()} on this sale.
                  </p>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-3">Payment Status</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsPaid(true)}
                className={`py-4 rounded-xl border-2 transition-colors ${
                  isPaid
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Paid Now
              </button>
              <button
                type="button"
                onClick={() => setIsPaid(false)}
                className={`py-4 rounded-xl border-2 transition-colors ${
                  !isPaid
                    ? 'border-orange-600 bg-orange-50 text-orange-700'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Pay Later
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={selectedItem && qty > selectedItem.quantity}
            className={`w-full py-4 rounded-xl shadow-md mt-6 ${
              selectedItem && qty > selectedItem.quantity
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white active:bg-blue-700'
            }`}
          >
            Save Sale
          </button>
        </form>
      </div>
    </div>
  );
}
