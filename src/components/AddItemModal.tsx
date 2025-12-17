import { X, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface AddItemModalProps {
  onClose: () => void;
}

interface RetailUnit {
  id: string;
  unit: string;
  unitsPerBulk: string;
  sellingPrice: string;
}

export function AddItemModal({ onClose }: AddItemModalProps) {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [lowStockAlert, setLowStockAlert] = useState('');
  const [bulkUnit, setBulkUnit] = useState('');
  
  // Multiple retail units
  const [retailUnits, setRetailUnits] = useState<RetailUnit[]>([
    { id: '1', unit: '', unitsPerBulk: '', sellingPrice: '' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Item added successfully! 🎉');
    onClose();
  };

  const categories = ['Grains', 'Oils', 'Canned', 'Dairy', 'Spices', 'Others'];
  
  // Common Nigerian retail units
  const commonRetailUnits = [
    'cup',
    'mudu',
    'paint bucket',
    'derica',
    'bottle',
    'sachet',
    'wrap',
    'piece',
    'bundle',
    'kg',
    'litre'
  ];
  
  const cost = parseFloat(costPrice) || 0;
  const selling = parseFloat(sellingPrice) || 0;
  const profitPerUnit = selling - cost;
  const profitMargin = cost > 0 ? ((profitPerUnit / cost) * 100) : 0;

  const addRetailUnit = () => {
    setRetailUnits([
      ...retailUnits,
      { id: Date.now().toString(), unit: '', unitsPerBulk: '', sellingPrice: '' }
    ]);
  };

  const removeRetailUnit = (id: string) => {
    if (retailUnits.length > 1) {
      setRetailUnits(retailUnits.filter(unit => unit.id !== id));
    }
  };

  const updateRetailUnit = (id: string, field: keyof RetailUnit, value: string) => {
    setRetailUnits(retailUnits.map(unit => 
      unit.id === id ? { ...unit, [field]: value } : unit
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto pb-safe">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-gray-900">Add New Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 pb-24">{/* Added pb-24 */}
          <div>
            <label className="block text-gray-700 mb-2">Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Rice, Beans, Vegetable Oil"
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 mb-2">Quantity in Stock</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Low Stock Alert</label>
              <input
                type="number"
                value={lowStockAlert}
                onChange={(e) => setLowStockAlert(e.target.value)}
                placeholder="5"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Bulk Unit (What you buy)</label>
            <input
              type="text"
              value={bulkUnit}
              onChange={(e) => setBulkUnit(e.target.value)}
              placeholder="e.g. 50kg bag, 25L keg, carton"
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 mb-2">Cost Price (per {bulkUnit || 'unit'})</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">₦</span>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Selling Price (per {bulkUnit || 'unit'})</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">₦</span>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {cost > 0 && selling > 0 && (
            <div className={`rounded-xl p-3 ${
              profitPerUnit > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className="text-sm text-gray-700">
                Profit: <span className={profitPerUnit > 0 ? 'text-green-700' : 'text-red-700'}>
                  ₦{profitPerUnit.toLocaleString()}
                </span> ({profitMargin.toFixed(1)}%)
              </p>
            </div>
          )}

          {/* Multiple Retail Units Section */}
          {bulkUnit && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-gray-700">Retail Units (How you sell)</label>
                <button
                  type="button"
                  onClick={addRetailUnit}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Unit</span>
                </button>
              </div>

              <div className="space-y-4">
                {retailUnits.map((retailUnit, index) => (
                  <div key={retailUnit.id} className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Retail Unit #{index + 1}</span>
                      {retailUnits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRetailUnit(retailUnit.id)}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">Unit Name</label>
                      <select
                        value={retailUnit.unit}
                        onChange={(e) => updateRetailUnit(retailUnit.id, 'unit', e.target.value)}
                        className="w-full px-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                        required
                      >
                        <option value="">Select unit</option>
                        {commonRetailUnits.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">
                        How many {retailUnit.unit || 'units'} in 1 {bulkUnit}?
                      </label>
                      <input
                        type="number"
                        value={retailUnit.unitsPerBulk}
                        onChange={(e) => updateRetailUnit(retailUnit.id, 'unitsPerBulk', e.target.value)}
                        placeholder="e.g. 200"
                        className="w-full px-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        min="1"
                        step="0.5"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">
                        Selling Price (per {retailUnit.unit || 'unit'})
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">₦</span>
                        <input
                          type="number"
                          value={retailUnit.sellingPrice}
                          onChange={(e) => updateRetailUnit(retailUnit.id, 'sellingPrice', e.target.value)}
                          placeholder="0"
                          className="w-full pl-8 pr-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    {/* Show calculated bulk price */}
                    {retailUnit.sellingPrice && retailUnit.unitsPerBulk && (
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <p className="text-xs text-gray-600 mb-1">Calculated bulk price:</p>
                        <p className="text-purple-700 text-sm">
                          ₦{(parseFloat(retailUnit.sellingPrice) * parseFloat(retailUnit.unitsPerBulk)).toLocaleString()} per {bulkUnit}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ({retailUnit.unit} price × {retailUnit.unitsPerBulk} {retailUnit.unit}s)
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-3 mt-3 border border-blue-200">
                <p className="text-xs text-blue-800">
                  💡 Tip: You can sell the same item in different units. E.g., Rice can be sold by cup, mudu, or paint bucket.
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-4 px-4 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              Add Item to Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}