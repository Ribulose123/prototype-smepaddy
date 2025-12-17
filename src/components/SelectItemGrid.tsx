import { X, Search, Package, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { NetworkGridPattern } from './NetworkGridPattern';

interface SelectItemGridProps {
  onBack: () => void;
  onSelect: (item: any) => void;
}

// Mock stock items with fractional units support
const stockItems = [
  { 
    id: 1, 
    name: 'Rice', 
    bulkUnit: '50kg bag',
    retailUnits: [
      { unit: 'cup', unitsPerBulk: 200, sellingPrice: 200 },
      { unit: 'mudu', unitsPerBulk: 25, sellingPrice: 1500 },
      { unit: 'paint bucket', unitsPerBulk: 10, sellingPrice: 3500 }
    ],
    costPrice: 32000, 
    sellingPricePerBulk: 35000,
    quantity: 24,
    category: 'Grains',
    inStock: 24
  },
  { 
    id: 2, 
    name: 'Beans', 
    bulkUnit: '25kg bag',
    retailUnits: [
      { unit: 'mudu', unitsPerBulk: 8, sellingPrice: 3000 },
      { unit: 'cup', unitsPerBulk: 100, sellingPrice: 250 }
    ],
    costPrice: 20000, 
    sellingPricePerBulk: 22500,
    quantity: 8,
    category: 'Grains',
    inStock: 8
  },
  { 
    id: 3, 
    name: 'Vegetable Oil', 
    bulkUnit: '25L keg',
    retailUnits: [
      { unit: 'bottle', unitsPerBulk: 25, sellingPrice: 2000 },
      { unit: 'litre', unitsPerBulk: 25, sellingPrice: 2000 }
    ],
    costPrice: 40000, 
    sellingPricePerBulk: 45000,
    quantity: 3,
    category: 'Oils',
    inStock: 3
  },
  { 
    id: 4, 
    name: 'Garri', 
    bulkUnit: '10kg bag',
    retailUnits: [
      { unit: 'cup', unitsPerBulk: 50, sellingPrice: 200 },
      { unit: 'mudu', unitsPerBulk: 6, sellingPrice: 1500 }
    ],
    costPrice: 7500, 
    sellingPricePerBulk: 8500,
    quantity: 45,
    category: 'Grains',
    inStock: 45
  },
  { 
    id: 5, 
    name: 'Tomato Paste', 
    bulkUnit: 'carton',
    retailUnits: [
      { unit: 'tin', unitsPerBulk: 12, sellingPrice: 1250 }
    ],
    costPrice: 12000, 
    sellingPricePerBulk: 15000,
    quantity: 2,
    category: 'Canned',
    inStock: 2
  },
  { 
    id: 6, 
    name: 'Sugar', 
    bulkUnit: '10kg bag',
    retailUnits: [
      { unit: 'cup', unitsPerBulk: 60, sellingPrice: 250 },
      { unit: 'kg', unitsPerBulk: 10, sellingPrice: 1500 }
    ],
    costPrice: 12000, 
    sellingPricePerBulk: 15000,
    quantity: 18,
    category: 'Sweeteners',
    inStock: 18
  },
  { 
    id: 7, 
    name: 'Salt', 
    bulkUnit: '5kg bag',
    retailUnits: [
      { unit: 'cup', unitsPerBulk: 30, sellingPrice: 120 }
    ],
    costPrice: 2800, 
    sellingPricePerBulk: 3500,
    quantity: 4,
    category: 'Spices',
    inStock: 4
  },
  { 
    id: 8, 
    name: 'Milk Powder', 
    bulkUnit: 'carton',
    retailUnits: [
      { unit: 'sachet', unitsPerBulk: 24, sellingPrice: 1200 }
    ],
    costPrice: 24000, 
    sellingPricePerBulk: 28000,
    quantity: 12,
    category: 'Dairy',
    inStock: 12
  }
];

export function SelectItemGrid({ onBack, onSelect }: SelectItemGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(stockItems.map(item => item.category))];

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 pt-6 pb-6 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <div className="relative z-10 flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-white flex-1 text-center">Select Item</h2>
          <div className="w-10"></div>
        </div>

        {/* Search */}
        <div className="relative z-10 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Items' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Excel-like Table Header */}
      <div className="px-4 mb-2">
        <div className="bg-gray-100 rounded-t-xl p-3 grid grid-cols-9 gap-2 text-xs text-gray-600">
          <div className="col-span-4">Item Name</div>
          <div className="col-span-2 text-center">Stock</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Items List (Excel-like) */}
      <div className="flex-1 px-4 pb-6">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No items found</p>
          </div>
        ) : (
          <div className="bg-white rounded-b-xl shadow-md border border-gray-200 overflow-hidden">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className={`w-full p-3 grid grid-cols-9 gap-2 items-center hover:bg-blue-50 active:bg-blue-100 transition-colors text-left ${
                  index !== filteredItems.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                {/* Item Name */}
                <div className="col-span-4">
                  <p className="text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>

                {/* Stock */}
                <div className="col-span-2 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-sm ${
                      item.inStock <= 5 ? 'text-orange-700' : 'text-gray-700'
                    }`}>
                      {item.inStock}
                    </span>
                    {item.inStock <= 5 && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 mt-1">
                        Low
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-right">
                  <p className="text-sm text-green-700">₦{item.retailUnits[0].sellingPrice.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">per {item.retailUnits[0].unit}</p>
                </div>

                {/* Arrow */}
                <div className="col-span-1 flex justify-end">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}