import { X, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CreateInvoiceModalProps {
  onClose: () => void;
}

export function CreateInvoiceModal({ onClose }: CreateInvoiceModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, name: '', quantity: 1, price: 0 }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto pb-safe">{/* Added pb-safe */}
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-gray-900">Create Invoice</h2>
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
            <label className="block text-gray-700 mb-2">Payment Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-gray-700">Items</label>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-blue-600 text-sm active:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Item {index + 1}</span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="Item name"
                    className="w-full px-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    required
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      placeholder="Qty"
                      className="w-full px-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="1"
                    />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                      placeholder="Price (₦)"
                      className="w-full px-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="0"
                    />
                  </div>

                  {item.quantity > 0 && item.price > 0 && (
                    <p className="text-sm text-gray-600 mt-2 text-right">
                      Subtotal: ₦{(item.quantity * item.price).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Amount:</span>
              <span className="text-blue-700">₦{calculateTotal().toLocaleString()}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl active:bg-blue-700 shadow-md mt-6"
          >
            Create Invoice
          </button>
        </form>
      </div>
    </div>
  );
}