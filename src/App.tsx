import { useState } from 'react';
import { Home, Wallet, Package, Banknote, MoreHorizontal, FileText, Settings as SettingsIcon } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { TransactionsPage } from './components/TransactionsPage';
import { StockPage } from './components/StockPage';
import { InvoicesPage } from './components/InvoicesPage';
import { LoansPage } from './components/LoansPage';
import { AuthPage } from './components/AuthPage';
import { ProfileSetupPage } from './components/ProfileSetupPage';
import { SettingsPage } from './components/SettingsPage';
import { ReportsPage } from './components/ReportsPage';
import { MorePage } from './components/MorePage';
import { Toaster } from 'sonner@2.0.3';
import logoImage from 'figma:asset/8ac2e11748528f9d47cdc72ae8c8e1a7740456d8.png';

type Page = 'home' | 'transactions' | 'stock' | 'loans' | 'more' | 'invoices' | 'settings' | 'reports';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Mock user profile data (would come from context/API in production)
  const userProfile = {
    businessName: 'Mama Ngozi Provisions',
    ownerName: 'Ngozi Okafor',
    businessLogo: null
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasCompletedProfile(false);
    setCurrentPage('home');
  };

  // Handle navigation from More page
  const handleMoreNavigation = (page: 'invoices' | 'settings' | 'reports') => {
    setCurrentPage(page);
  };

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <AuthPage onLogin={() => setIsAuthenticated(true)} />
      </>
    );
  }

  // Show profile setup for first-time users
  if (!hasCompletedProfile) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <ProfileSetupPage onComplete={() => setHasCompletedProfile(true)} />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'stock':
        return <StockPage />;
      case 'loans':
        return <LoansPage />;
      case 'more':
        return <MorePage onNavigate={handleMoreNavigation} userProfile={userProfile} />;
      case 'invoices':
        return <InvoicesPage />;
      case 'settings':
        return <SettingsPage onLogout={handleLogout} onBack={() => setCurrentPage('more')} />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <HomePage />;
    }
  };

  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home, mobileLabel: 'Home' },
    { id: 'transactions' as Page, label: 'Transactions', icon: Wallet, mobileLabel: 'Money' },
    { id: 'stock' as Page, label: 'Stock & Items', icon: Package, mobileLabel: 'Stock' },
    { id: 'loans' as Page, label: 'Business Loans', icon: Banknote, mobileLabel: 'Loans' },
    { id: 'invoices' as Page, label: 'Invoices', icon: FileText, mobileLabel: 'Invoices', desktopOnly: true },
    { id: 'settings' as Page, label: 'Settings', icon: SettingsIcon, mobileLabel: 'Settings', desktopOnly: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src={logoImage} alt="SME Paddy" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-gray-900 font-bold">SME Paddy</h1>
                <p className="text-gray-500 text-xs">Business Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id || 
                  (item.id === 'more' && ['invoices', 'settings', 'reports'].includes(currentPage));
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Profile at Bottom */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">NG</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm truncate">{userProfile.businessName}</p>
                <p className="text-gray-500 text-xs truncate">{userProfile.ownerName}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <main className="pb-20">
          {renderPage()}
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
          <div className="flex justify-around items-center h-16 px-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-2 transition-colors ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('transactions')}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-2 transition-colors ${
                currentPage === 'transactions' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Wallet className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Money</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('stock')}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-2 transition-colors ${
                currentPage === 'stock' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Package className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Stock</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('loans')}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-2 transition-colors ${
                currentPage === 'loans' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Banknote className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Loans</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('more')}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-2 transition-colors ${
                currentPage === 'more' || currentPage === 'invoices' || currentPage === 'settings' || currentPage === 'reports' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <MoreHorizontal className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">More</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
