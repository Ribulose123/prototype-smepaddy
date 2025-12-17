import { useState } from 'react';
import { Plus, Search, AlertTriangle, CheckCircle2, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { AddItemModal } from './AddItemModal';

export function Stock() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stockData = [
    { id: 1, name: 'Rice (50kg bag)', quantity: 45, buyPrice: 28000, sellPrice: 30000, status: 'ok' },
    { id: 2, name: 'Beans (50kg bag)', quantity: 8, buyPrice: 35000, sellPrice: 38000, status: 'low' },
    { id: 3, name: 'Garri (50kg bag)', quantity: 32, buyPrice: 22000, sellPrice: 25000, status: 'ok' },
    { id: 4, name: 'Palm Oil (25L)', quantity: 5, buyPrice: 38000, sellPrice: 42500, status: 'low' },
    { id: 5, name: 'Groundnut Oil (25L)', quantity: 18, buyPrice: 42000, sellPrice: 45000, status: 'ok' },
    { id: 6, name: 'Vegetable Oil (25L)', quantity: 3, buyPrice: 40000, sellPrice: 43000, status: 'low' },
  ];

  const lowStockCount = stockData.filter(item => item.status === 'low').length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-gray-800">Your Items</h1>
          <p className="text-gray-600">Manage your stock and inventory</p>
        </div>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowAddItem(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Total Items</p>
              <p className="text-blue-600">{stockData.length} types</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600">Low Stock</p>
              <p className="text-orange-600">{lowStockCount} items</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Stock Value</p>
              <p className="text-green-600">₦8.2M</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </Card>

      {/* Stock Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-gray-600">Item Name</th>
                <th className="text-left p-4 text-gray-600">How Many Left</th>
                <th className="text-left p-4 text-gray-600">How Much You Buy It</th>
                <th className="text-left p-4 text-gray-600">How Much You Sell It</th>
                <th className="text-left p-4 text-gray-600">Profit Per Item</th>
                <th className="text-left p-4 text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stockData.map((item) => {
                const profit = item.sellPrice - item.buyPrice;
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-800">{item.name}</td>
                    <td className="p-4">
                      <span className={item.status === 'low' ? 'text-orange-600' : 'text-gray-600'}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">₦{item.buyPrice.toLocaleString()}</td>
                    <td className="p-4 text-gray-600">₦{item.sellPrice.toLocaleString()}</td>
                    <td className="p-4 text-green-600">₦{profit.toLocaleString()}</td>
                    <td className="p-4">
                      {item.status === 'low' ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <AddItemModal open={showAddItem} onOpenChange={setShowAddItem} />
    </div>
  );
}
