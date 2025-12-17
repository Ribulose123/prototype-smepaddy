import { useState } from 'react';
import { 
  User, Lock, Store, MapPin, Mail, Phone, Camera, 
  ChevronRight, LogOut, Shield, Bell, HelpCircle, 
  FileText, X, Check, AlertCircle, ArrowLeft, Receipt, CreditCard, Upload, Eye 
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { NetworkGridPattern } from './NetworkGridPattern';

interface SettingsPageProps {
  onLogout: () => void;
  onBack?: () => void;
}

type SettingsScreen = 'main' | 'edit-profile' | 'change-pin' | 'notifications' | 'help' | 'invoice-settings';

export function SettingsPage({ onLogout, onBack }: SettingsPageProps) {
  const [currentScreen, setCurrentScreen] = useState<SettingsScreen>('main');
  
  // Profile data (would come from context/API in production)
  const [profileData, setProfileData] = useState({
    businessName: 'Mama Ngozi Provisions',
    businessType: 'retail',
    ownerName: 'Ngozi Okafor',
    email: 'ngozi@example.com',
    phone: '+2348012345678',
    address: '23 Allen Avenue',
    city: 'Ikeja',
    state: 'Lagos',
    businessLogo: null as string | null
  });

  // Invoice Settings
  const [invoiceSettings, setInvoiceSettings] = useState({
    invoiceLogo: null as string | null,
    bankName: '',
    accountName: '',
    accountNumber: '',
    showAccountDetails: true,
    showBusinessAddress: true,
    invoiceNotes: 'Thank you for your business!',
    paymentTerms: '7' // days
  });

  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

  // PIN change state
  const [pinState, setPinState] = useState({
    currentPin: ['', '', '', '', '', ''],
    newPin: ['', '', '', '', '', ''],
    confirmPin: ['', '', '', '', '', '']
  });

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  const businessTypes = [
    { value: 'retail', label: 'Retail Shop (Selling to customers)' },
    { value: 'wholesale', label: 'Wholesale (Selling in bulk)' },
    { value: 'services', label: 'Services (Hair, Repair, etc.)' },
    { value: 'food', label: 'Food & Drinks' },
    { value: 'fashion', label: 'Fashion & Tailoring' },
    { value: 'electronics', label: 'Electronics & Phones' },
    { value: 'agriculture', label: 'Farm Products' },
    { value: 'transport', label: 'Transport & Logistics' },
    { value: 'other', label: 'Other Business' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image too large. Maximum 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, businessLogo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInvoiceLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image too large. Maximum 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceSettings({ ...invoiceSettings, invoiceLogo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileData.businessName || !profileData.ownerName) {
      toast.error('Business name and owner name are required');
      return;
    }

    // Simulate API call
    toast.success('Profile updated successfully! 🎉');
    setCurrentScreen('main');
  };

  const handlePinChange = (type: 'currentPin' | 'newPin' | 'confirmPin', index: number, value: string) => {
    if (value.length > 1) return;
    const newState = { ...pinState };
    newState[type][index] = value;
    setPinState(newState);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`${type}-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentPinStr = pinState.currentPin.join('');
    const newPinStr = pinState.newPin.join('');
    const confirmPinStr = pinState.confirmPin.join('');

    if (currentPinStr.length !== 6) {
      toast.error('Please enter your current PIN');
      return;
    }

    if (newPinStr.length !== 6) {
      toast.error('Please enter your new PIN');
      return;
    }

    if (newPinStr !== confirmPinStr) {
      toast.error('New PIN and confirmation do not match');
      return;
    }

    // Simulate API call
    toast.success('PIN changed successfully! 🔒');
    setPinState({
      currentPin: ['', '', '', '', '', ''],
      newPin: ['', '', '', '', '', ''],
      confirmPin: ['', '', '', '', '', '']
    });
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      toast.success('Logged out successfully');
      onLogout();
    }
  };

  const handleInvoiceSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate bank details if show_account_details is enabled
    if (invoiceSettings.showAccountDetails) {
      if (!invoiceSettings.bankName || !invoiceSettings.accountName || !invoiceSettings.accountNumber) {
        toast.error('Please fill in all bank details or disable "Show Account Details"');
        return;
      }
    }

    // Simulate API call
    toast.success('Invoice settings saved successfully! 🎉');
    setCurrentScreen('main');
  };

  // Main Settings Screen
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-6 lg:px-12 pt-12 lg:pt-16 pb-8 lg:pb-12 overflow-hidden">
          {/* Network Grid Background */}
          <NetworkGridPattern />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Back Button - Mobile Only */}
            {onBack && (
              <button
                onClick={onBack}
                className="lg:hidden mb-4 text-white hover:text-blue-100 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            <h1 className="text-white text-2xl lg:text-3xl mb-1">Settings</h1>
            <p className="text-blue-100 lg:text-lg">Manage your account and preferences</p>
          </div>
        </div>

        {/* Profile Preview */}
        <div className="px-6 lg:px-12 -mt-6 mb-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="relative">
                {profileData.businessLogo ? (
                  <img 
                    src={profileData.businessLogo} 
                    alt="Business logo" 
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Store className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-semibold lg:text-xl">{profileData.businessName}</h3>
                <p className="text-gray-600 text-sm lg:text-base">{profileData.ownerName}</p>
                <p className="text-gray-500 text-xs lg:text-sm mt-1">{profileData.phone}</p>
              </div>
              <button
                onClick={() => setCurrentScreen('edit-profile')}
                className="text-blue-600 text-sm lg:text-base font-semibold hover:text-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="px-6 lg:px-12 space-y-6 lg:space-y-8">
          <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
            {/* Account Settings */}
            <div>
              <h2 className="text-gray-500 text-xs lg:text-sm uppercase tracking-wider mb-3 px-2">Account</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setCurrentScreen('edit-profile')}
                  className="w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium lg:text-lg">Edit Profile</p>
                    <p className="text-gray-500 text-sm lg:text-base">Update business info</p>
                  </div>
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                </button>

                <button
                  onClick={() => setCurrentScreen('change-pin')}
                  className="w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium lg:text-lg">Change PIN</p>
                    <p className="text-gray-500 text-sm lg:text-base">Update your login PIN</p>
                  </div>
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h2 className="text-gray-500 text-xs lg:text-sm uppercase tracking-wider mb-3 px-2">Business</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setCurrentScreen('invoice-settings')}
                  className="w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <Receipt className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium lg:text-lg">Invoice Settings</p>
                    <p className="text-gray-500 text-sm lg:text-base">Logo, account details & preferences</p>
                  </div>
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                </button>

                <button
                  onClick={() => setCurrentScreen('notifications')}
                  className="w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium lg:text-lg">Notifications</p>
                    <p className="text-gray-500 text-sm lg:text-base">Manage alerts and reminders</p>
                  </div>
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Support */}
            <div>
              <h2 className="text-gray-500 text-xs lg:text-sm uppercase tracking-wider mb-3 px-2">Support</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setCurrentScreen('help')}
                  className="w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium lg:text-lg">Help & Support</p>
                    <p className="text-gray-500 text-sm lg:text-base">Get help, FAQs</p>
                  </div>
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                </button>

                <button
                  className="w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium lg:text-lg">Terms & Privacy</p>
                    <p className="text-gray-500 text-sm lg:text-base">Legal information</p>
                  </div>
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="w-full bg-white rounded-2xl shadow-sm border border-red-200 px-4 py-4 flex items-center justify-center gap-3 active:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-semibold">Logout</span>
              </button>
            </div>

            {/* App Version */}
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm">SME Paddy v1.0.0</p>
              <p className="text-gray-400 text-xs mt-1">© 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Profile Screen
  if (currentScreen === 'edit-profile') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-12 pb-6 flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('main')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl flex-1">Edit Profile</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleProfileUpdate} className="px-6 py-6 space-y-6">
          {/* Business Logo */}
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="relative">
                {profileData.businessLogo ? (
                  <img 
                    src={profileData.businessLogo} 
                    alt="Business logo" 
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Change logo</p>
            </label>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-blue-600" />
              Business Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.businessName}
                  onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Type of Business
                </label>
                <select
                  value={profileData.businessType}
                  onChange={(e) => setProfileData({ ...profileData, businessType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {businessTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.ownerName}
                  onChange={(e) => setProfileData({ ...profileData, ownerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Contact support to change phone number
                </p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Business Location
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">State</label>
                <select
                  value={profileData.state}
                  onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select state</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">City/Town</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">Address</label>
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="sticky bottom-0 bg-white pt-4 pb-4 -mx-6 px-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl shadow-md active:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Change PIN Screen
  if (currentScreen === 'change-pin') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 pt-12 pb-6 flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('main')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl flex-1">Change PIN</h1>
        </div>

        {/* Form */}
        <form onSubmit={handlePinUpdate} className="px-6 py-8 max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-3 flex items-center justify-center">
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-gray-900 text-lg mb-2">Update Your PIN</h2>
            <p className="text-gray-600 text-sm">Enter your current PIN, then choose a new one</p>
          </div>

          {/* Current PIN */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-3 text-sm font-medium text-center">
              Current PIN
            </label>
            <div className="flex gap-2 justify-center mb-2">
              {pinState.currentPin.map((digit, index) => (
                <input
                  key={index}
                  id={`currentPin-${index}`}
                  type="password"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handlePinChange('currentPin', index, e.target.value.replace(/\D/g, ''))}
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ))}
            </div>
          </div>

          {/* New PIN */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-3 text-sm font-medium text-center">
              New PIN
            </label>
            <div className="flex gap-2 justify-center mb-2">
              {pinState.newPin.map((digit, index) => (
                <input
                  key={index}
                  id={`newPin-${index}`}
                  type="password"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handlePinChange('newPin', index, e.target.value.replace(/\D/g, ''))}
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ))}
            </div>
          </div>

          {/* Confirm New PIN */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-3 text-sm font-medium text-center">
              Confirm New PIN
            </label>
            <div className="flex gap-2 justify-center mb-2">
              {pinState.confirmPin.map((digit, index) => (
                <input
                  key={index}
                  id={`confirmPin-${index}`}
                  type="password"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handlePinChange('confirmPin', index, e.target.value.replace(/\D/g, ''))}
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-200">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-purple-900 font-medium mb-1">Security Tips</p>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Don't use obvious PINs like 123456</li>
                  <li>• Never share your PIN with anyone</li>
                  <li>• Choose a PIN you can remember</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              pinState.currentPin.join('').length !== 6 ||
              pinState.newPin.join('').length !== 6 ||
              pinState.confirmPin.join('').length !== 6
            }
            className={`w-full py-4 rounded-xl shadow-md transition-colors ${
              pinState.currentPin.join('').length === 6 &&
              pinState.newPin.join('').length === 6 &&
              pinState.confirmPin.join('').length === 6
                ? 'bg-purple-600 text-white active:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Update PIN
          </button>
        </form>
      </div>
    );
  }

  // Notifications Screen
  if (currentScreen === 'notifications') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 pt-12 pb-6 flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('main')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl flex-1">Notifications</h1>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 font-medium">Daily Reminders</h3>
                <p className="text-gray-500 text-sm">Get reminded to record sales</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 font-medium">Payment Reminders</h3>
                <p className="text-gray-500 text-sm">Alerts for customer payments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 font-medium">Low Stock Alerts</h3>
                <p className="text-gray-500 text-sm">When items run low</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 font-medium">Coin Achievements</h3>
                <p className="text-gray-500 text-sm">Level ups and rewards</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Help & Support Screen
  if (currentScreen === 'help') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 pt-12 pb-6 flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('main')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl flex-1">Help & Support</h1>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-medium mb-2">📞 Contact Support</h3>
            <p className="text-gray-600 text-sm mb-3">
              Need help? Our team is here for you
            </p>
            <div className="space-y-2">
              <a href="tel:+2348012345678" className="text-blue-600 text-sm block">
                📱 +234 801 234 5678
              </a>
              <a href="mailto:support@smepaddy.ng" className="text-blue-600 text-sm block">
                ✉️ support@smepaddy.ng
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-medium mb-2">❓ FAQs</h3>
            <div className="space-y-3">
              <details className="text-sm">
                <summary className="text-gray-900 font-medium cursor-pointer">
                  How do I earn Paddy Coins?
                </summary>
                <p className="text-gray-600 mt-2 ml-4">
                  Record sales, add stock, maintain streaks, and complete business activities to earn coins!
                </p>
              </details>
              <details className="text-sm">
                <summary className="text-gray-900 font-medium cursor-pointer">
                  How do business loans work?
                </summary>
                <p className="text-gray-600 mt-2 ml-4">
                  Build your coin level to unlock loans. Higher levels = bigger loans and better rates!
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Invoice Settings Screen
  if (currentScreen === 'invoice-settings') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-12 pb-6 flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('main')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl flex-1">Invoice Settings</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleInvoiceSettingsUpdate} className="px-6 py-6 space-y-6">
          {/* Invoice Logo */}
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleInvoiceLogoUpload}
                className="hidden"
              />
              <div className="relative">
                {invoiceSettings.invoiceLogo ? (
                  <img 
                    src={invoiceSettings.invoiceLogo} 
                    alt="Business logo" 
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Upload invoice logo</p>
            </label>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Bank Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={invoiceSettings.bankName}
                  onChange={(e) => setInvoiceSettings({ ...invoiceSettings, bankName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Account Name
                </label>
                <input
                  type="text"
                  value={invoiceSettings.accountName}
                  onChange={(e) => setInvoiceSettings({ ...invoiceSettings, accountName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Account Number
                </label>
                <input
                  type="text"
                  value={invoiceSettings.accountNumber}
                  onChange={(e) => setInvoiceSettings({ ...invoiceSettings, accountNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Invoice Options */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-600" />
              Invoice Options
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Show Account Details
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={invoiceSettings.showAccountDetails} onChange={(e) => setInvoiceSettings({ ...invoiceSettings, showAccountDetails: e.target.checked })} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Show Business Address
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={invoiceSettings.showBusinessAddress} onChange={(e) => setInvoiceSettings({ ...invoiceSettings, showBusinessAddress: e.target.checked })} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Invoice Notes
                </label>
                <input
                  type="text"
                  value={invoiceSettings.invoiceNotes}
                  onChange={(e) => setInvoiceSettings({ ...invoiceSettings, invoiceNotes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Payment Terms (days)
                </label>
                <input
                  type="number"
                  value={invoiceSettings.paymentTerms}
                  onChange={(e) => setInvoiceSettings({ ...invoiceSettings, paymentTerms: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Preview Button */}
          <div className="sticky bottom-0 bg-white pt-4 pb-4 -mx-6 px-6 border-t border-gray-200 space-y-3">
            <button
              type="button"
              onClick={() => setShowInvoicePreview(true)}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl shadow-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview Invoice
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl shadow-md active:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>

        {/* Invoice Preview Modal */}
        {showInvoicePreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-900 font-medium">Invoice Preview</h2>
                <button
                  onClick={() => setShowInvoicePreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    {invoiceSettings.invoiceLogo ? (
                      <img 
                        src={invoiceSettings.invoiceLogo} 
                        alt="Invoice logo" 
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Store className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold lg:text-xl">{profileData.businessName}</h3>
                    <p className="text-gray-600 text-sm lg:text-base">{profileData.ownerName}</p>
                    <p className="text-gray-500 text-xs lg:text-sm mt-1">{profileData.phone}</p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 font-medium">Bank Details</h3>
                      <p className="text-gray-500 text-sm">Payment information</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={invoiceSettings.showAccountDetails} onChange={(e) => setInvoiceSettings({ ...invoiceSettings, showAccountDetails: e.target.checked })} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {invoiceSettings.showAccountDetails && (
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">Bank: {invoiceSettings.bankName}</p>
                      <p className="text-gray-600 text-sm">Account Name: {invoiceSettings.accountName}</p>
                      <p className="text-gray-600 text-sm">Account Number: {invoiceSettings.accountNumber}</p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-100 rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 font-medium">Business Address</h3>
                      <p className="text-gray-500 text-sm">Location details</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={invoiceSettings.showBusinessAddress} onChange={(e) => setInvoiceSettings({ ...invoiceSettings, showBusinessAddress: e.target.checked })} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {invoiceSettings.showBusinessAddress && (
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">Address: {profileData.address}</p>
                      <p className="text-gray-600 text-sm">City: {profileData.city}</p>
                      <p className="text-gray-600 text-sm">State: {profileData.state}</p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-100 rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 font-medium">Invoice Notes</h3>
                      <p className="text-gray-500 text-sm">Additional information</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">{invoiceSettings.invoiceNotes}</p>
                </div>

                <div className="bg-gray-100 rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 font-medium">Payment Terms</h3>
                      <p className="text-gray-500 text-sm">Payment deadline</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">Payment due in {invoiceSettings.paymentTerms} days</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}