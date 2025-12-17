import { Home, ShoppingBag, Package, FileText, BarChart3, Settings } from 'lucide-react';

type Page = 'home' | 'sales' | 'items' | 'invoices' | 'summary' | 'settings';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'sales' as Page, label: 'Sales', icon: ShoppingBag },
    { id: 'items' as Page, label: 'Items', icon: Package },
    { id: 'invoices' as Page, label: 'Invoices', icon: FileText },
    { id: 'summary' as Page, label: 'Summary', icon: BarChart3 },
    { id: 'settings' as Page, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-blue-600">SME Paddy</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 text-center text-gray-400 text-sm">
        <p>Made for Nigerian SMEs</p>
      </div>
    </aside>
  );
}
