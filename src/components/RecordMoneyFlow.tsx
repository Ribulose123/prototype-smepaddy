import { X, ArrowUpCircle, ArrowDownCircle, Package, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { SelectItemGrid } from './SelectItemGrid';
import { RecordServiceSale } from './RecordServiceSale';
import { RecordExpense } from './RecordExpense';
import { RecordProductSale } from './RecordProductSale';
import { NetworkGridPattern } from './NetworkGridPattern';

interface RecordMoneyFlowProps {
  onClose: () => void;
}

type FlowStep = 'choose-type' | 'choose-category' | 'select-item' | 'record-product' | 'record-service' | 'record-expense';
type TransactionType = 'in' | 'out' | null;
type SaleCategory = 'product' | 'service' | null;

export function RecordMoneyFlow({ onClose }: RecordMoneyFlowProps) {
  const [step, setStep] = useState<FlowStep>('choose-type');
  const [transactionType, setTransactionType] = useState<TransactionType>(null);
  const [saleCategory, setSaleCategory] = useState<SaleCategory>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleTypeSelect = (type: TransactionType) => {
    setTransactionType(type);
    if (type === 'in') {
      setStep('choose-category');
    } else {
      setStep('record-expense');
    }
  };

  const handleCategorySelect = (category: SaleCategory) => {
    setSaleCategory(category);
    if (category === 'product') {
      setStep('select-item');
    } else {
      setStep('record-service');
    }
  };

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setStep('record-product');
  };

  const handleBack = () => {
    if (step === 'choose-category') {
      setStep('choose-type');
      setTransactionType(null);
    } else if (step === 'select-item') {
      setStep('choose-category');
      setSaleCategory(null);
    } else if (step === 'record-product') {
      setStep('select-item');
      setSelectedItem(null);
    } else if (step === 'record-service') {
      setStep('choose-category');
      setSaleCategory(null);
    } else if (step === 'record-expense') {
      setStep('choose-type');
      setTransactionType(null);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'choose-type':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 pt-6 pb-8 rounded-b-3xl shadow-lg overflow-hidden">
              {/* Network Grid Background */}
              <NetworkGridPattern />
              
              <div className="relative z-10 flex items-center justify-between mb-6">
                <h2 className="text-white">Record Transaction</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <p className="relative z-10 text-white/90 text-sm">What would you like to record?</p>
            </div>

            {/* Options */}
            <div className="flex-1 px-4 py-8">
              <div className="space-y-4">
                <button
                  onClick={() => handleTypeSelect('in')}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-green-500 transition-all active:scale-98"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-100 rounded-2xl">
                      <ArrowUpCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-gray-900 mb-1">Money In</h3>
                      <p className="text-sm text-gray-600">Record a sale or payment received</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleTypeSelect('out')}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-red-500 transition-all active:scale-98"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-red-100 rounded-2xl">
                      <ArrowDownCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-gray-900 mb-1">Money Out</h3>
                      <p className="text-sm text-gray-600">Record an expense or payment made</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'choose-category':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-green-600 to-green-700 px-4 pt-6 pb-8 rounded-b-3xl shadow-lg overflow-hidden">
              {/* Network Grid Background */}
              <NetworkGridPattern />
              
              <div className="relative z-10 flex items-center justify-between mb-6">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <h2 className="text-white flex-1 text-center">What are you selling?</h2>
                <div className="w-10"></div>
              </div>
              <p className="text-white/90 text-sm text-center">Choose what best describes your sale</p>
            </div>

            {/* Options */}
            <div className="flex-1 px-4 py-8">
              <div className="space-y-4">
                <button
                  onClick={() => handleCategorySelect('product')}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-blue-500 transition-all active:scale-98"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-100 rounded-2xl">
                      <Package className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-gray-900 mb-1">Product</h3>
                      <p className="text-sm text-gray-600">Items from your stock (rice, beans, oil, etc.)</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleCategorySelect('service')}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-purple-500 transition-all active:scale-98"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-purple-100 rounded-2xl">
                      <Briefcase className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-gray-900 mb-1">Service</h3>
                      <p className="text-sm text-gray-600">Tailoring, repairs, consultation, etc.</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'select-item':
        return <SelectItemGrid onBack={handleBack} onSelect={handleItemSelect} />;

      case 'record-product':
        return <RecordProductSale item={selectedItem} onBack={handleBack} onComplete={onClose} />;

      case 'record-service':
        return <RecordServiceSale onBack={handleBack} onComplete={onClose} />;

      case 'record-expense':
        return <RecordExpense onBack={handleBack} onComplete={onClose} />;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {renderStep()}
    </div>
  );
}