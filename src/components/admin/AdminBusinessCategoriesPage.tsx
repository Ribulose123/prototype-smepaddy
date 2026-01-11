import { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Save,
  X,
  Tag,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

interface AdminBusinessCategoriesPageProps {
  role: AdminRole;
}

interface BusinessCategory {
  id: string;
  value: string;
  label: string;
  isActive: boolean;
  usageCount: number; // How many businesses use this category
  createdAt: string;
}

export function AdminBusinessCategoriesPage({ role }: AdminBusinessCategoriesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newCategory, setNewCategory] = useState({
    value: '',
    label: ''
  });

  const [editCategory, setEditCategory] = useState({
    value: '',
    label: ''
  });

  // Mock categories (would come from API)
  const [categories, setCategories] = useState<BusinessCategory[]>([
    {
      id: '1',
      value: 'retail',
      label: 'Retail Shop (Selling to customers)',
      isActive: true,
      usageCount: 1245,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '2',
      value: 'wholesale',
      label: 'Wholesale (Selling in bulk)',
      isActive: true,
      usageCount: 567,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '3',
      value: 'services',
      label: 'Services (Hair, Repair, Consulting)',
      isActive: true,
      usageCount: 892,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '4',
      value: 'food',
      label: 'Food & Drinks (Restaurant, Catering)',
      isActive: true,
      usageCount: 734,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '5',
      value: 'fashion',
      label: 'Fashion & Tailoring',
      isActive: true,
      usageCount: 423,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '6',
      value: 'electronics',
      label: 'Electronics & Phones',
      isActive: true,
      usageCount: 389,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '7',
      value: 'agriculture',
      label: 'Farm Products & Agribusiness',
      isActive: true,
      usageCount: 312,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '8',
      value: 'transport',
      label: 'Transport & Logistics',
      isActive: true,
      usageCount: 278,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '9',
      value: 'automotive',
      label: 'Car Sales & Auto Parts',
      isActive: true,
      usageCount: 234,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '10',
      value: 'construction',
      label: 'Building & Construction',
      isActive: true,
      usageCount: 198,
      createdAt: '2024-01-01T00:00:00'
    },
    {
      id: '11',
      value: 'other',
      label: 'Other Business',
      isActive: true,
      usageCount: 567,
      createdAt: '2024-01-01T00:00:00'
    },
  ]);

  // Only super admins can manage categories
  const canManage = role === 'super_admin';

  const handleAddCategory = () => {
    if (!newCategory.value || !newCategory.label) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check for duplicates
    if (categories.some(cat => cat.value === newCategory.value)) {
      toast.error('Category value already exists');
      return;
    }

    const category: BusinessCategory = {
      id: Date.now().toString(),
      value: newCategory.value,
      label: newCategory.label,
      isActive: true,
      usageCount: 0,
      createdAt: new Date().toISOString()
    };

    setCategories([...categories, category]);
    toast.success('Category added successfully');
    setNewCategory({ value: '', label: '' });
    setIsAdding(false);
  };

  const handleUpdateCategory = (id: string) => {
    if (!editCategory.value || !editCategory.label) {
      toast.error('Please fill in all fields');
      return;
    }

    setCategories(categories.map(cat => 
      cat.id === id 
        ? { ...cat, value: editCategory.value, label: editCategory.label }
        : cat
    ));
    
    toast.success('Category updated successfully');
    setEditingId(null);
    setEditCategory({ value: '', label: '' });
  };

  const handleToggleActive = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    if (!category) return;

    if (category.usageCount > 0 && category.isActive) {
      toast.error(`Cannot deactivate: ${category.usageCount} businesses are using this category`);
      return;
    }

    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));

    toast.success(category.isActive ? 'Category deactivated' : 'Category activated');
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    if (!category) return;

    if (category.usageCount > 0) {
      toast.error(`Cannot delete: ${category.usageCount} businesses are using this category`);
      return;
    }

    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success('Category deleted successfully');
    }
  };

  const startEdit = (category: BusinessCategory) => {
    setEditingId(category.id);
    setEditCategory({
      value: category.value,
      label: category.label
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCategory({ value: '', label: '' });
  };

  const filteredCategories = categories.filter(cat =>
    cat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Categories</h1>
            <p className="text-gray-600 mt-1">
              Manage categories that users select during onboarding
            </p>
          </div>
          {canManage && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          )}
        </div>

        {!canManage && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 mt-4">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-900 font-medium text-sm">View Only Access</p>
              <p className="text-yellow-700 text-sm mt-1">
                Only Super Admins can add, edit, or delete business categories.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Category Form */}
      {isAdding && canManage && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add New Category</h3>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCategory({ value: '', label: '' });
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Value (lowercase, no spaces)
              </label>
              <input
                type="text"
                value={newCategory.value}
                onChange={(e) => setNewCategory({ ...newCategory, value: e.target.value.toLowerCase().replace(/\s/g, '-') })}
                placeholder="e.g., real-estate"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Label
              </label>
              <input
                type="text"
                value={newCategory.label}
                onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
                placeholder="e.g., Real Estate & Property"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Add Category
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCategory({ value: '', label: '' });
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Display Label
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {canManage && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  {editingId === category.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editCategory.value}
                          onChange={(e) => setEditCategory({ ...editCategory, value: e.target.value.toLowerCase().replace(/\s/g, '-') })}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editCategory.label}
                          onChange={(e) => setEditCategory({ ...editCategory, label: e.target.value })}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm w-full"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-500 text-sm">{category.usageCount.toLocaleString()} businesses</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          category.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateCategory(category.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Save changes"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-900"
                            title="Cancel"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                          {category.value}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">{category.label}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">{category.usageCount.toLocaleString()} businesses</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => canManage && handleToggleActive(category.id)}
                          disabled={!canManage}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            category.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          } ${canManage ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      {canManage && (
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEdit(category)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit category"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete category"
                              disabled={category.usageCount > 0}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Total Categories</p>
          <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Active Categories</p>
          <p className="text-2xl font-bold text-green-600">
            {categories.filter(c => c.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Total Usage</p>
          <p className="text-2xl font-bold text-blue-600">
            {categories.reduce((sum, c) => sum + c.usageCount, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
