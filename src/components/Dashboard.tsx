import { useState } from 'react';
import { TrendingUp, TrendingDown, Users, AlertTriangle, Plus, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RecordSaleModal } from './modal/RecordSaleModal';
import { AddItemModal } from './modal/AddItemModal';

interface DashboardProps {
  onNavigate: (page: 'home' | 'sales' | 'items' | 'invoices' | 'summary' | 'settings') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [showRecordSale, setShowRecordSale] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-800 mb-2">Hello! Let's manage your business today.</h1>
        <p className="text-gray-600">Quick overview of how your business is doing</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button
          size="lg"
          className="h-14 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowRecordSale(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Record Sale
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          className="h-14 border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          onClick={() => setShowAddItem(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Item to Stock
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          className="h-14 border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          onClick={() => onNavigate('invoices')}
        >
          <FileText className="w-5 h-5 mr-2" />
          Send Invoice
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-l-4 border-l-green-500 bg-white hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Today's Money In</p>
          <p className="text-green-600">₦45,000</p>
          <p className="text-gray-400 text-sm mt-2">From 12 sales today</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-red-500 bg-white hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Today's Money Out</p>
          <p className="text-red-600">₦12,000</p>
          <p className="text-gray-400 text-sm mt-2">Expenses and purchases</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-blue-500 bg-white hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('invoices')}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">People Who Owe Me</p>
          <p className="text-blue-600">₦28,500</p>
          <p className="text-gray-400 text-sm mt-2">5 customers</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-orange-500 bg-white hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('items')}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Low Stock Items</p>
          <p className="text-orange-600">8 items</p>
          <p className="text-gray-400 text-sm mt-2">Need restocking soon</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-white">
        <h3 className="mb-4 text-gray-800">Recent Sales</h3>
        <div className="space-y-4">
          {[
            { customer: 'Adebayo Motors', amount: '₦15,000', time: '30 mins ago', status: 'paid' },
            { customer: 'Chioma Beauty Shop', amount: '₦8,500', time: '1 hour ago', status: 'owes' },
            { customer: 'Emeka Stores', amount: '₦12,000', time: '2 hours ago', status: 'paid' },
          ].map((sale, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-800">{sale.customer}</p>
                <p className="text-gray-500 text-sm">{sale.time}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800">{sale.amount}</p>
                <span className={`text-sm ${sale.status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                  {sale.status === 'paid' ? 'Paid' : 'Not paid yet'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-blue-600 hover:bg-blue-50"
          onClick={() => onNavigate('sales')}
        >
          View all sales
        </Button>
      </Card>

      {/* Modals */}
      <RecordSaleModal open={showRecordSale} onOpenChange={setShowRecordSale} />
      <AddItemModal open={showAddItem} onOpenChange={setShowAddItem} />
    </div>
  );
}
