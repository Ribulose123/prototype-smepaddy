import React, { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '../assets/logo.png';

interface AdminAuthPageProps {
  onLogin: (role: 'super_admin' | 'support_admin' | 'finance_admin') => void;
}

export function AdminAuthPage({ onLogin }: AdminAuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock authentication - In production, this would be a real API call
      if (email.includes('super')) {
        onLogin('super_admin');
        toast.success('Logged in as Super Admin');
      } else if (email.includes('support')) {
        onLogin('support_admin');
        toast.success('Logged in as Support Admin');
      } else if (email.includes('finance')) {
        onLogin('finance_admin');
        toast.success('Logged in as Finance Admin');
      } else {
        onLogin('super_admin');
        toast.success('Logged in successfully');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl mb-4">
            <img src={Logo} alt="SME Paddy" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-gray-900 text-2xl font-bold mb-2">SME Paddy Admin</h1>
          <p className="text-gray-600">Secure admin portal access</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-6 p-3 bg-blue-50 rounded-xl">
            <Shield className="w-5 h-5 text-blue-600" />
            <p className="text-blue-900 text-sm">This portal is for authorized administrators only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smepaddy.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Signing in...' : 'Sign in to Admin Portal'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm text-center">
              Demo credentials: Use any email containing 'super', 'support', or 'finance'
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            All admin actions are logged and monitored for security
          </p>
        </div>
      </div>
    </div>
  );
}

