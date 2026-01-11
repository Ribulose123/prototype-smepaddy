import { 
  FileText, 
  Settings, 
  BarChart3, 
  HelpCircle, 
  Bell,
  User,
  Shield,
  ChevronRight,
  Sparkles,
  Receipt,
  ShieldCheck,
  Download
} from 'lucide-react';
import { useState } from 'react';
import { SupportTicketModal } from './SupportTicketModal';
import { TransactionStatementModal } from './TransactionStatementModal';

interface MorePageProps {
  onNavigate: (page: 'invoices' | 'settings' | 'reports' | 'tax') => void;
  onAccessAdmin?: () => void;
  userProfile: {
    businessName: string;
    ownerName: string;
    businessLogo?: string | null;
  };
}

export function MorePage({ onNavigate, onAccessAdmin, userProfile }: MorePageProps) {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with Profile */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-12 pb-8">
        <h1 className="text-white text-2xl mb-1">More</h1>
        <p className="text-blue-100">Additional features and settings</p>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              {userProfile.businessLogo ? (
                <img 
                  src={userProfile.businessLogo} 
                  alt="Business logo" 
                  className="w-16 h-16 rounded-xl object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold">{userProfile.businessName}</h3>
              <p className="text-gray-600 text-sm">{userProfile.ownerName}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-yellow-600" />
                  <span className="text-yellow-600 text-xs font-semibold">Level 2</span>
                </div>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-gray-600 text-xs">245 Coins</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Menu Items */}
      <div className="px-6 space-y-6">
        {/* Business Tools */}
        <div>
          <h2 className="text-gray-500 text-xs uppercase tracking-wider mb-3 px-2">Business Tools</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => onNavigate('invoices')}
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium">Invoices</p>
                <p className="text-gray-500 text-sm">Create and manage invoices</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium">Reports</p>
                <p className="text-gray-500 text-sm">View business insights</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => onNavigate('tax')}
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">
                <Receipt className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium">Tax Filing</p>
                <p className="text-gray-500 text-sm">File your business taxes easily</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">New</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button
              onClick={() => setShowStatementModal(true)}
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors"
            >
              <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Download className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium">Transaction Statement</p>
                <p className="text-gray-500 text-sm">Download your transaction history</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Account & Preferences */}
        <div>
          <h2 className="text-gray-500 text-xs uppercase tracking-wider mb-3 px-2">Account</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => onNavigate('settings')}
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium">Settings</p>
                <p className="text-gray-500 text-sm">Manage your account</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors"
            >
              <div className="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium">Notifications</p>
                <p className="text-gray-500 text-sm">Manage alerts and reminders</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">3</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-gray-500 text-xs uppercase tracking-wider mb-3 px-2">Support</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowSupportModal(true)}
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium">Help & Support</p>
                <p className="text-gray-500 text-sm">Get help, FAQs</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 font-medium">Security & Privacy</p>
                <p className="text-gray-500 text-sm">Keep your account safe</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {onAccessAdmin && (
              <button
                onClick={onAccessAdmin}
                className="w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors"
              >
                <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-900 font-medium">Admin Portal</p>
                  <p className="text-gray-500 text-sm">Access admin dashboard</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">Staff</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* App Info */}
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm">SME Paddy v1.0.0</p>
          <p className="text-gray-400 text-xs mt-1">© 2024 All rights reserved</p>
        </div>
      </div>

      {/* Support Ticket Modal */}
      <SupportTicketModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        userProfile={userProfile}
      />

      {/* Transaction Statement Modal */}
      <TransactionStatementModal
        isOpen={showStatementModal}
        onClose={() => setShowStatementModal(false)}
        userProfile={userProfile}
      />
    </div>
  );
}