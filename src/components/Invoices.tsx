import { useState } from 'react';
import { Plus, Download, Send, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { CreateInvoiceModal } from './CreateInvoiceModal';

export function Invoices() {
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const invoicesData = [
    { id: 'INV-001', customer: 'Adebayo Motors', amount: 45000, status: 'paid', date: 'Dec 1, 2024', items: 'Rice (5 bags)' },
    { id: 'INV-002', customer: 'Chioma Beauty Shop', amount: 8500, status: 'not-paid', date: 'Dec 2, 2024', items: 'Palm Oil (2)' },
    { id: 'INV-003', customer: 'Emeka Stores', amount: 12000, status: 'paid', date: 'Dec 3, 2024', items: 'Beans (3 bags)' },
    { id: 'INV-004', customer: 'Faith Boutique', amount: 10000, status: 'not-paid', date: 'Dec 3, 2024', items: 'Garri (4 bags)' },
    { id: 'INV-005', customer: 'Tunde Electronics', amount: 5000, status: 'not-paid', date: 'Dec 4, 2024', items: 'Groundnut Oil (1)' },
  ];

  const unpaidTotal = invoicesData
    .filter(inv => inv.status === 'not-paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const unpaidCount = invoicesData.filter(inv => inv.status === 'not-paid').length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-gray-800">Invoices</h1>
          <p className="text-gray-600">Create and track customer invoices</p>
        </div>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowCreateInvoice(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200">
          <p className="text-gray-600 mb-2">People Who Owe Me</p>
          <p className="text-orange-600 mb-1">₦{unpaidTotal.toLocaleString()}</p>
          <p className="text-gray-500 text-sm">{unpaidCount} unpaid invoices</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
          <p className="text-gray-600 mb-2">Total Invoiced (This Week)</p>
          <p className="text-green-600 mb-1">₦156,500</p>
          <p className="text-gray-500 text-sm">From 15 invoices</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <p className="text-gray-600 mb-2">Paid This Week</p>
          <p className="text-blue-600 mb-1">₦133,000</p>
          <p className="text-gray-500 text-sm">10 invoices paid</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search customer or invoice number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-gray-600">Invoice #</th>
                <th className="text-left p-4 text-gray-600">Customer</th>
                <th className="text-left p-4 text-gray-600">Items</th>
                <th className="text-left p-4 text-gray-600">Amount</th>
                <th className="text-left p-4 text-gray-600">Date</th>
                <th className="text-left p-4 text-gray-600">Status</th>
                <th className="text-left p-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoicesData.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800">{invoice.id}</td>
                  <td className="p-4 text-gray-800">{invoice.customer}</td>
                  <td className="p-4 text-gray-600">{invoice.items}</td>
                  <td className="p-4">₦{invoice.amount.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">{invoice.date}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {invoice.status === 'paid' ? 'Paid' : 'Not Paid'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-9">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm" className="h-9 text-green-600 hover:text-green-700 hover:bg-green-50">
                        <Send className="w-4 h-4 mr-1" />
                        WhatsApp
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CreateInvoiceModal open={showCreateInvoice} onOpenChange={setShowCreateInvoice} />
    </div>
  );
}
