import { X, Package, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { SelectItemGrid } from './SelectItemGrid';
import { QuickProductSale } from './QuickProductSale';
import { QuickServiceSale } from './QuickServiceSale';
import { NetworkGridPattern } from './NetworkGridPattern';

interface RecordSaleProps {
  onClose: () => void;
}

type SaleFlow = 'choose' | 'product-select' | 'product-entry' | 'service-entry';

export function RecordSale({ onClose }: RecordSaleProps) {
  const [flow, setFlow] = useState<SaleFlow>('choose');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setFlow('product-entry');
  };

  const handleBack = () => {
    if (flow === 'product-select' || flow === 'service-entry') {
      setFlow('choose');
    } else if (flow === 'product-entry') {
      setFlow('product-select');
      setSelectedItem(null);
    }
  };

  const renderView = () => {
    switch (flow) {
      case 'choose':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-green-600 to-green-700 px-4 lg:px-8 pt-6 pb-8 rounded-b-3xl shadow-lg overflow-hidden">
              {/* Network Grid Background */}
              <NetworkGridPattern />
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-2xl lg:text-3xl">Record Sale</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                <p className="text-white/90 text-sm lg:text-base">What are you selling?</p>
              </div>
            </div>

            {/* Options */}
            <div className="flex-1 px-4 lg:px-8 py-8">
              <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-4 lg:gap-6">
                <button
                  onClick={() => setFlow('product-select')}
                  className="w-full bg-white rounded-2xl p-6 lg:p-8 shadow-lg border-2 border-transparent hover:border-blue-500 transition-all active:scale-98 hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 lg:p-6 bg-blue-100 rounded-2xl">
                      <Package className="w-10 h-10 lg:w-12 lg:h-12 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-lg lg:text-xl mb-2">Product</h3>
                      <p className="text-sm lg:text-base text-gray-600">Items from your stock (rice, beans, oil, etc.)</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setFlow('service-entry')}
                  className="w-full bg-white rounded-2xl p-6 lg:p-8 shadow-lg border-2 border-transparent hover:border-purple-500 transition-all active:scale-98 hover:shadow-xl"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 lg:p-6 bg-purple-100 rounded-2xl">
                      <Briefcase className="w-10 h-10 lg:w-12 lg:h-12 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-lg lg:text-xl mb-2">Service</h3>
                      <p className="text-sm lg:text-base text-gray-600">Tailoring, repairs, consultation, etc.</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'product-select':
        return <SelectItemGrid onBack={handleBack} onSelect={handleItemSelect} />;

      case 'product-entry':
        return <QuickProductSale item={selectedItem} onBack={handleBack} onComplete={onClose} />;

      case 'service-entry':
        return <QuickServiceSale onBack={handleBack} onComplete={onClose} />;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {renderView()}
    </div>
  );
}