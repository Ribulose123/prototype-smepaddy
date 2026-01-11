import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Receipt, 
  Coins, 
  LifeBuoy, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Tag
} from 'lucide-react';
import { AdminDashboardPage } from './AdminDashboardPage';
import { AdminUsersPage } from './AdminUsersPage';
import { AdminTransactionsPage } from './AdminTransactionsPage';
import { AdminGamificationPage } from './AdminGamificationPage';
import { AdminSupportPage } from './AdminSupportPage';
import { AdminSettingsPage } from './AdminSettingsPage';
import { AdminBusinessCategoriesPage } from './AdminBusinessCategoriesPage';
import { toast } from 'sonner@2.0.3';
import logoImage from 'figma:asset/8ac2e11748528f9d47cdc72ae8c8e1a7740456d8.png';

type AdminPage = 'dashboard' | 'users' | 'transactions' | 'gamification' | 'support' | 'settings' | 'categories';

type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

interface AdminLayoutProps {
  role: AdminRole;
  onLogout: () => void;
}

export function AdminLayout({ role, onLogout }: AdminLayoutProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    onLogout();
  };

  // Role-based access control
  const hasAccess = (page: AdminPage) => {
    if (role === 'super_admin') return true;
    
    if (role === 'support_admin') {
      return ['dashboard', 'users', 'support', 'categories'].includes(page);
    }
    
    if (role === 'finance_admin') {
      return ['dashboard', 'transactions', 'gamification', 'categories'].includes(page);
    }
    
    return false;
  };

  const navItems = [
    { id: 'dashboard' as AdminPage, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users' as AdminPage, label: 'Users & Businesses', icon: Users },
    { id: 'transactions' as AdminPage, label: 'Transactions', icon: Receipt },
    { id: 'gamification' as AdminPage, label: 'Gamification', icon: Coins },
    { id: 'support' as AdminPage, label: 'Support Desk', icon: LifeBuoy },
    { id: 'settings' as AdminPage, label: 'Settings', icon: Settings },
    { id: 'categories' as AdminPage, label: 'Business Categories', icon: Tag },
  ].filter(item => hasAccess(item.id));

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboardPage role={role} />;
      case 'users':
        return <AdminUsersPage role={role} />;
      case 'transactions':
        return <AdminTransactionsPage role={role} />;
      case 'gamification':
        return <AdminGamificationPage role={role} />;
      case 'support':
        return <AdminSupportPage role={role} />;
      case 'settings':
        return <AdminSettingsPage role={role} />;
      case 'categories':
        return <AdminBusinessCategoriesPage role={role} />;
      default:
        return <AdminDashboardPage role={role} />;
    }
  };

  const getRoleBadge = () => {
    const badges = {
      super_admin: { label: 'Super Admin', color: 'bg-purple-100 text-purple-700' },
      support_admin: { label: 'Support Admin', color: 'bg-blue-100 text-blue-700' },
      finance_admin: { label: 'Finance Admin', color: 'bg-green-100 text-green-700' },
    };
    return badges[role];
  };

  const roleBadge = getRoleBadge();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Logo and Toggle */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src={logoImage} alt="SME Paddy Admin" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-gray-900 font-bold">Admin Portal</h1>
                <p className="text-gray-500 text-xs">SME Paddy</p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Role Badge */}
        {!sidebarCollapsed && (
          <div className="px-6 py-4">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${roleBadge.color}`}>
              {roleBadge.label}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-purple-50 text-purple-600 font-semibold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}