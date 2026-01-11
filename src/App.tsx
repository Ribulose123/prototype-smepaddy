import { useState, useEffect } from 'react';
import { Home, Wallet, Package, Banknote, MoreHorizontal, FileText, Settings as SettingsIcon, ShieldCheck, BarChart3, Receipt } from 'lucide-react';
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
import { TaxFilingPage } from './components/TaxFilingPage';
import { AdminAuthPage } from './components/admin/AdminAuthPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminAccessButton } from './components/AdminAccessButton';
import { HelpButton } from './components/HelpButton';
import { Toaster } from 'sonner@2.0.3';
import logoImage from 'figma:asset/8ac2e11748528f9d47cdc72ae8c8e1a7740456d8.png';

type Page = 'home' | 'transactions' | 'stock' | 'loans' | 'more' | 'invoices' | 'settings' | 'reports' | 'tax';
type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Admin state
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);

  // Mock user profile data (would come from context/API in production)
  const userProfile = {
    businessName: 'Mama Ngozi Provisions',
    ownerName: 'Ngozi Okafor',
    businessLogo: null
  };
  
  // Check if accessing admin URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
      setIsAdminMode(true);
    }
  }, []);
  
  // Admin portal
  if (isAdminMode) {
    if (!isAdminAuthenticated) {
      return (
        <>
          <Toaster position="top-center" richColors />
          <AdminAuthPage onLogin={(role) => {
            setIsAdminAuthenticated(true);
            setAdminRole(role);
          }} />
        </>
      );
    }
    
    return (
      <>
        <Toaster position="top-center" richColors />
        <AdminLayout 
          role={adminRole!} 
          onLogout={() => {
            setIsAdminAuthenticated(false);
            setAdminRole(null);
            setIsAdminMode(false);
          }} 
        />
      </>
    );
  }

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasCompletedProfile(false);
    setCurrentPage('home');
  };

  // Handle navigation from More page
  const handleMoreNavigation = (page: 'invoices' | 'settings' | 'reports' | 'tax') => {
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
        return <HomePage onNavigate={(page) => setCurrentPage(page)} />;
      case 'transactions':
        return <TransactionsPage />;
      case 'stock':
        return <StockPage />;
      case 'loans':
        return <LoansPage />;
      case 'more':
        return <MorePage 
          onNavigate={(page) => setCurrentPage(page)} 
          onAccessAdmin={() => setIsAdminMode(true)}
          userProfile={userProfile} 
        />;
      case 'invoices':
        return <InvoicesPage />;
      case 'settings':
        return <SettingsPage onBack={() => setCurrentPage('more')} />;
      case 'reports':
        return <ReportsPage />;
      case 'tax':
        return <TaxFilingPage onBack={() => setCurrentPage('more')} />;
      default:
        return <HomePage onNavigate={(page) => setCurrentPage(page)} />;
    }
  };

  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home, mobileLabel: 'Home' },
    { id: 'transactions' as Page, label: 'Money In & Out', icon: Wallet, mobileLabel: 'Money' },
    { id: 'stock' as Page, label: 'Stock & Items', icon: Package, mobileLabel: 'Stock' },
    { id: 'invoices' as Page, label: 'Invoices', icon: FileText, mobileLabel: 'Invoices' },
    { id: 'reports' as Page, label: 'Reports', icon: BarChart3, mobileLabel: 'Reports', desktopOnly: true },
    { id: 'loans' as Page, label: 'Business Loans', icon: Banknote, mobileLabel: 'Loans' },
    { id: 'tax' as Page, label: 'Tax Filing', icon: Receipt, mobileLabel: 'Tax', desktopOnly: true },
    { id: 'settings' as Page, label: 'Settings', icon: SettingsIcon, mobileLabel: 'Settings', desktopOnly: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />
      
      {/* Floating Help Button (Desktop) */}
      <HelpButton userProfile={userProfile} />
      
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
                  (item.id === 'more' && ['invoices', 'settings', 'reports', 'tax'].includes(currentPage));
                
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
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">NG</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm truncate">{userProfile.businessName}</p>
                <p className="text-gray-500 text-xs truncate">{userProfile.ownerName}</p>
              </div>
            </div>
            
            {/* Admin Access Button */}
            <button
              onClick={() => setIsAdminMode(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all group"
            >
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <div className="flex-1 text-left">
                <p className="text-purple-900 font-semibold text-sm">Admin Portal</p>
                <p className="text-purple-600 text-xs">Staff access only</p>
              </div>
            </button>
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
                currentPage === 'more' || currentPage === 'invoices' || currentPage === 'settings' || currentPage === 'reports' || currentPage === 'tax' ? 'text-blue-600' : 'text-gray-500'
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