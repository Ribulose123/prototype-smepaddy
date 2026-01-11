import { Plus, Search, AlertCircle, Package } from 'lucide-react';
import { useState } from 'react';
import { AddItemModal } from './modal/AddItemModal';
import { NetworkGridPattern } from './NetworkGridPattern';

const stockItems = [
  { id: 1, name: 'Rice 50kg', quantity: 24, lowStock: false, costPrice: 32000, sellingPrice: 35000, category: 'Grains' },
  { id: 2, name: 'Beans 25kg', quantity: 8, lowStock: false, costPrice: 20000, sellingPrice: 22500, category: 'Grains' },
  { id: 3, name: 'Vegetable Oil 5L', quantity: 3, lowStock: true, costPrice: 8000, sellingPrice: 9000, category: 'Oils' },
  { id: 4, name: 'Garri 10kg', quantity: 45, lowStock: false, costPrice: 7500, sellingPrice: 8500, category: 'Grains' },
  { id: 5, name: 'Tomato Paste', quantity: 2, lowStock: true, costPrice: 1000, sellingPrice: 1250, category: 'Canned' },
  { id: 6, name: 'Sugar 1kg', quantity: 18, lowStock: false, costPrice: 1200, sellingPrice: 1500, category: 'Others' },
  { id: 7, name: 'Salt 500g', quantity: 4, lowStock: true, costPrice: 280, sellingPrice: 350, category: 'Spices' },
  { id: 8, name: 'Milk Powder 400g', quantity: 12, lowStock: false, costPrice: 2400, sellingPrice: 2800, category: 'Dairy' }
];

export function StockPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'low'>('all');

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'low' && item.lowStock);
    return matchesSearch && matchesFilter;
  });

  const lowStockCount = stockItems.filter(item => item.lowStock).length;
  const totalValue = stockItems.reduce((sum, item) => sum + (item.quantity * item.sellingPrice), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 lg:px-12 pt-6 lg:pt-8 pb-6 lg:pb-8 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div>
              <h1 className="text-white text-2xl lg:text-3xl">My Stock</h1>
              <p className="text-blue-100 text-sm lg:text-base mt-1 hidden lg:block">Manage your inventory</p>
            </div>
            {/* Desktop Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="hidden lg:flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Item</span>
            </button>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mb-4">
            <div className="bg-white/95 backdrop-blur rounded-xl p-4 lg:p-6">
              <p className="text-gray-600 text-sm lg:text-base mb-1">Total Items</p>
              <p className="text-blue-700 text-xl lg:text-3xl font-bold">{stockItems.length}</p>
            </div>
            
            <div className="bg-white/95 backdrop-blur rounded-xl p-4 lg:p-6">
              <p className="text-gray-600 text-sm lg:text-base mb-1">Stock Value</p>
              <p className="text-blue-700 text-xl lg:text-3xl font-bold">₦{totalValue.toLocaleString()}</p>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-xl p-4 lg:p-6 col-span-2 lg:col-span-1">
              <p className="text-gray-600 text-sm lg:text-base mb-1">Low Stock Alerts</p>
              <p className="text-orange-700 text-xl lg:text-3xl font-bold">{lowStockCount}</p>
            </div>
          </div>

          {lowStockCount > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 lg:p-4 flex items-center gap-2 lg:gap-3">
              <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600 flex-shrink-0" />
              <p className="text-orange-800 text-sm lg:text-base">
                <span className="font-semibold">{lowStockCount} item{lowStockCount > 1 ? 's' : ''}</span> running low. Stock up soon!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-4 lg:px-12 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 mb-4 lg:mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2 lg:gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 lg:flex-none lg:px-6 py-3 rounded-xl font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setFilter('low')}
                className={`flex-1 lg:flex-none lg:px-6 py-3 rounded-xl font-medium transition-colors ${
                  filter === 'low'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Low Stock
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-7 gap-4 p-6 border-b border-gray-100 bg-gray-50">
              <div className="col-span-2 text-sm font-semibold text-gray-600">Item Name</div>
              <div className="text-sm font-semibold text-gray-600">Category</div>
              <div className="text-sm font-semibold text-gray-600 text-center">Quantity</div>
              <div className="text-sm font-semibold text-gray-600 text-right">Cost Price</div>
              <div className="text-sm font-semibold text-gray-600 text-right">Selling Price</div>
              <div className="text-sm font-semibold text-gray-600 text-right">Value</div>
            </div>
            
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="grid grid-cols-7 gap-4 p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors items-center"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    {item.lowStock && (
                      <span className="inline-block bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-xs font-medium mt-1">
                        Low Stock
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-gray-600">{item.category}</div>
                <div className="text-center">
                  <span className={`inline-block px-3 py-1.5 rounded-lg font-semibold ${
                    item.lowStock 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {item.quantity}
                  </span>
                </div>
                <div className="text-right text-gray-600">₦{item.costPrice.toLocaleString()}</div>
                <div className="text-right text-gray-800 font-semibold">₦{item.sellingPrice.toLocaleString()}</div>
                <div className="text-right text-blue-700 font-bold">
                  ₦{(item.quantity * item.sellingPrice).toLocaleString()}
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No items found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
              </div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-gray-800 font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  {item.lowStock && (
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                      Low Stock
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Quantity</p>
                    <p className={`font-semibold ${item.lowStock ? 'text-orange-700' : 'text-green-700'}`}>
                      {item.quantity} units
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Stock Value</p>
                    <p className="text-blue-700 font-semibold">
                      ₦{(item.quantity * item.sellingPrice).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Cost Price</p>
                    <p className="text-gray-700">₦{item.costPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Selling Price</p>
                    <p className="text-gray-800 font-semibold">₦{item.sellingPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No items found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showAddModal && <AddItemModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}