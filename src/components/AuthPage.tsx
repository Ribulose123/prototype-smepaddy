import { useState } from 'react';
import { Phone, Lock, ArrowRight, Sparkles, Zap, Shield, TrendingUp, CheckCircle2, Users, Coins as CoinsIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import logoImage from 'figma:asset/8ac2e11748528f9d47cdc72ae8c8e1a7740456d8.png';
import { NetworkGridPattern } from './NetworkGridPattern';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthPageProps {
  onLogin: () => void;
}

type AuthScreen = 'welcome' | 'phone' | 'otp' | 'pin-setup' | 'pin-login';

export function AuthPage({ onLogin }: AuthPageProps) {
  const [screen, setScreen] = useState<AuthScreen>('welcome');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [isNewUser, setIsNewUser] = useState(false);

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle PIN input
  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Submit phone number
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    // Simulate checking if user exists
    const userExists = Math.random() > 0.5; // Random for demo
    setIsNewUser(!userExists);

    toast.success('OTP sent to your phone!');
    setScreen('otp');
  };

  // Submit OTP
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    toast.success('Phone verified!');
    
    if (isNewUser) {
      setScreen('pin-setup');
    } else {
      setScreen('pin-login');
    }
  };

  // Setup PIN (new users)
  const handlePinSetup = (e: React.FormEvent) => {
    e.preventDefault();
    const pinValue = pin.join('');
    if (pinValue.length !== 6) {
      toast.error('Please enter 6-digit PIN');
      return;
    }

    toast.success('Welcome to SME Paddy! 🎉');
    onLogin();
  };

  // Login with PIN (existing users)
  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const pinValue = pin.join('');
    if (pinValue.length !== 6) {
      toast.error('Please enter 6-digit PIN');
      return;
    }

    toast.success('Welcome back! 🎉');
    onLogin();
  };

  // Welcome Screen - OPay Style
  if (screen === 'welcome') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-white"
      >
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
          {/* Network Grid Watermark - Subtle SVG Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="networkGrid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                {/* Connection lines */}
                <line x1="0" y1="60" x2="40" y2="20" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="40" y1="20" x2="80" y2="40" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="80" y1="40" x2="120" y2="60" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="40" y1="20" x2="60" y2="80" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="60" y1="80" x2="100" y2="100" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="0" y1="60" x2="60" y2="80" stroke="white" strokeWidth="0.5" opacity="0.4" />
                
                {/* Store nodes (circles representing connected stores) */}
                <circle cx="0" cy="60" r="3" fill="white" opacity="0.6" />
                <circle cx="40" cy="20" r="4" fill="white" opacity="0.7" />
                <circle cx="80" cy="40" r="3" fill="white" opacity="0.6" />
                <circle cx="120" cy="60" r="3" fill="white" opacity="0.5" />
                <circle cx="60" cy="80" r="4" fill="white" opacity="0.7" />
                <circle cx="100" cy="100" r="3" fill="white" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#networkGrid)" />
          </svg>

          {/* Background Pattern - Existing soft blurs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 px-6 lg:px-12 py-12 max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <img src={logoImage} alt="SME Paddy" className="w-10 h-10 object-contain" />
              </div>
              <span className="text-white text-xl font-bold">SME Paddy</span>
            </div>

            {/* Hero Content - Desktop Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="mb-8 lg:mb-0">
                <h1 className="text-white text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
                  Grow Your Business<br/>
                  Like Never Before
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl leading-relaxed mb-8">
                  Track sales, manage stock, and get business loans - all in simple Nigerian language. Join 10,000+ businesses.
                </p>
                
                <button
                  onClick={() => setScreen('phone')}
                  className="w-full lg:w-auto lg:px-12 bg-white text-blue-700 py-4 rounded-2xl shadow-xl font-bold text-lg mb-3 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-blue-100 text-center lg:text-left text-sm">
                  No credit card • Free forever • Setup in 2 minutes
                </p>
              </div>

              {/* Hero Image */}
              <div className="mt-8 lg:mt-0">
                <img 
                  src="https://images.unsplash.com/photo-1734255026082-82fdc81991f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMG1hcmtldCUyMHdvbWFuJTIwc2VsbGluZ3xlbnwxfHx8fDE3NjU4NzkwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Nigerian market woman"
                  className="w-full h-64 lg:h-96 object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 lg:px-12 py-12 lg:py-16 bg-gray-50">
          <div className="grid grid-cols-3 gap-4 lg:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-blue-600 text-3xl lg:text-5xl font-bold mb-1 lg:mb-2">10k+</div>
              <div className="text-gray-600 text-sm lg:text-base">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-green-600 text-3xl lg:text-5xl font-bold mb-1 lg:mb-2">₦2B+</div>
              <div className="text-gray-600 text-sm lg:text-base">Sales Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-purple-600 text-3xl lg:text-5xl font-bold mb-1 lg:mb-2">500M+</div>
              <div className="text-gray-600 text-sm lg:text-base">Paddy Coins</div>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-gray-900 text-3xl lg:text-5xl font-bold text-center mb-3 lg:mb-4">
              Built For Nigerian Business Owners
            </h2>
            <p className="text-gray-600 text-center text-lg mb-12 lg:mb-16 max-w-2xl mx-auto">
              From market women to shop owners, we understand your business
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Market Women */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden border border-green-100">
                <img 
                  src="https://images.unsplash.com/photo-1687422808204-6892507bb8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3RyZWV0JTIwdmVuZG9yJTIwaGFwcHl8ZW58MXx8fHwxNzY1ODc5MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Market woman"
                  className="w-full h-48 lg:h-64 object-cover"
                />
                <div className="p-6 lg:p-8">
                  <h3 className="text-gray-900 text-xl lg:text-2xl font-bold mb-2">Market Women</h3>
                  <p className="text-gray-600 mb-4 lg:text-lg">
                    Track what you sell every day, know your profit, and never forget who owes you
                  </p>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Easy daily tracking</span>
                  </div>
                </div>
              </div>

              {/* Shop Owners */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl overflow-hidden border border-blue-100">
                <img 
                  src="https://images.unsplash.com/photo-1753351052617-62818ffc9173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMHNob3AlMjBvd25lcnxlbnwxfHx8fDE3NjU4NzkwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Shop owner"
                  className="w-full h-48 lg:h-64 object-cover"
                />
                <div className="p-6 lg:p-8">
                  <h3 className="text-gray-900 text-xl lg:text-2xl font-bold mb-2">Shop Owners</h3>
                  <p className="text-gray-600 mb-4 lg:text-lg">
                    Manage your stock, create professional invoices, and grow your business
                  </p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Professional tools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-gray-900 text-3xl lg:text-5xl font-bold text-center mb-3 lg:mb-4">
              Everything You Need To Succeed
            </h2>
            <p className="text-gray-600 text-center text-lg mb-12 lg:mb-16 max-w-2xl mx-auto">
              Simple tools that work for your business
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg lg:text-xl font-bold mb-1 lg:mb-2">Track Every Sale</h3>
                  <p className="text-gray-600 lg:text-lg">
                    Record Money In and Money Out instantly. Know your daily profit without stress.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg lg:text-xl font-bold mb-1 lg:mb-2">Know Who Owes You</h3>
                  <p className="text-gray-600 lg:text-lg">
                    Track "People Who Owe Me" and send friendly reminders via WhatsApp.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CoinsIcon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg lg:text-xl font-bold mb-1 lg:mb-2">Earn Paddy Coins</h3>
                  <p className="text-gray-600 lg:text-lg">
                    Get rewarded for recording sales daily. Use coins to unlock better loan rates.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg lg:text-xl font-bold mb-1 lg:mb-2">Get Business Loans</h3>
                  <p className="text-gray-600 lg:text-lg">
                    Access up to ₦2M with no collateral. Better business habits = bigger loans.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 flex items-start gap-4 lg:col-span-2">
                <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg lg:text-xl font-bold mb-1 lg:mb-2">Bank-Level Security</h3>
                  <p className="text-gray-600 lg:text-lg">
                    Your data is encrypted and protected. We never share your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Story Section */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1758876202167-f81c995c3fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBidXNpbmVzcyUyMHBob25lfGVufDF8fHx8MTc2NTg3OTAxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Success story"
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto mb-6 lg:mb-8 border-4 border-white/30 object-cover"
              />
            </div>
            <blockquote className="text-white text-xl lg:text-3xl mb-6 lg:mb-8 leading-relaxed max-w-3xl mx-auto">
              "Before SME Paddy, I was always confused about my profit. Now I know exactly how much I make every day. I even got a ₦50,000 loan to expand my shop!"
            </blockquote>
            <div className="text-blue-100">
              <p className="font-bold lg:text-xl">Chioma Nwosu</p>
              <p className="text-sm lg:text-base">Provisions Shop Owner, Surulere</p>
            </div>
            
            <div className="flex items-center justify-center gap-1 mt-4 lg:mt-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Sparkles key={star} className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-gray-900 text-3xl lg:text-5xl font-bold text-center mb-3 lg:mb-4">
              Get Started In 3 Simple Steps
            </h2>
            <p className="text-gray-600 text-center text-lg mb-12 lg:mb-16 max-w-2xl mx-auto">
              Start managing your business in less than 2 minutes
            </p>

            <div className="space-y-6 lg:space-y-8">
              <div className="flex gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg lg:text-2xl font-bold mb-1 lg:mb-2">Enter Your Phone Number</h3>
                  <p className="text-gray-600 lg:text-lg">Quick and secure verification via SMS</p>
                </div>
              </div>

              <div className="flex gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg lg:text-2xl font-bold mb-1 lg:mb-2">Set Up Your Profile</h3>
                  <p className="text-gray-600 lg:text-lg">Tell us about your business in 3 quick steps</p>
                </div>
              </div>

              <div className="flex gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg lg:text-2xl font-bold mb-1 lg:mb-2">Start Tracking Sales</h3>
                  <p className="text-gray-600 lg:text-lg">Record your first sale and start earning Paddy Coins</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-6 lg:px-12 py-16 lg:py-24 bg-gradient-to-br from-green-500 to-emerald-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Join 10,000+ Nigerian Business Owners
            </h2>
            <p className="text-green-50 text-lg lg:text-xl mb-8 lg:mb-10">
              Start tracking your business today. It's free forever.
            </p>
            
            <button
              onClick={() => setScreen('phone')}
              className="bg-white text-green-700 px-8 lg:px-12 py-4 lg:py-5 rounded-2xl shadow-2xl font-bold text-lg lg:text-xl mx-auto inline-flex items-center gap-2 active:scale-[0.98] transition-transform"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>

            <div className="mt-8 lg:mt-10 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 text-green-50 text-sm lg:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 lg:px-12 py-12 lg:py-16 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 lg:mb-12">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <img src={logoImage} alt="SME Paddy" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-white text-lg font-bold">SME Paddy</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8 lg:mb-12">
              <div>
                <h4 className="text-white font-bold mb-3 lg:mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                  <li className="hover:text-gray-300 cursor-pointer">Features</li>
                  <li className="hover:text-gray-300 cursor-pointer">Pricing</li>
                  <li className="hover:text-gray-300 cursor-pointer">Security</li>
                  <li className="hover:text-gray-300 cursor-pointer">Loans</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3 lg:mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                  <li className="hover:text-gray-300 cursor-pointer">About Us</li>
                  <li className="hover:text-gray-300 cursor-pointer">Contact</li>
                  <li className="hover:text-gray-300 cursor-pointer">Support</li>
                  <li className="hover:text-gray-300 cursor-pointer">Privacy</li>
                </ul>
              </div>
              <div className="hidden lg:block">
                <h4 className="text-white font-bold mb-3 lg:mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                  <li className="hover:text-gray-300 cursor-pointer">Blog</li>
                  <li className="hover:text-gray-300 cursor-pointer">Help Center</li>
                  <li className="hover:text-gray-300 cursor-pointer">Guides</li>
                  <li className="hover:text-gray-300 cursor-pointer">FAQs</li>
                </ul>
              </div>
              <div className="hidden lg:block">
                <h4 className="text-white font-bold mb-3 lg:mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                  <li className="hover:text-gray-300 cursor-pointer">Terms</li>
                  <li className="hover:text-gray-300 cursor-pointer">Privacy Policy</li>
                  <li className="hover:text-gray-300 cursor-pointer">Cookie Policy</li>
                  <li className="hover:text-gray-300 cursor-pointer">Licenses</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm lg:text-base text-center">
                © 2024 SME Paddy. All rights reserved. Made with ❤️ for Nigerian businesses.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    );
  }

  // Phone Number Screen
  if (screen === 'phone') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col"
      >
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="p-6 text-center relative"
        >
          {/* Back button */}
          <button
            onClick={() => setScreen('welcome')}
            className="absolute left-6 top-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowRight className="w-6 h-6 text-white transform rotate-180" />
          </button>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center"
          >
            <Phone className="w-8 h-8 text-blue-600" />
          </motion.div>
          <h2 className="text-white text-2xl mb-2">Enter Your Phone Number</h2>
          <p className="text-blue-100">We'll send you a verification code</p>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex-1 bg-white rounded-t-3xl p-6"
        >
          <form onSubmit={handlePhoneSubmit} className="max-w-md mx-auto mt-8">
            <label className="block text-gray-700 mb-3 font-semibold">Phone Number</label>
            <div className="relative mb-2">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">+234</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="8012345678"
                className="w-full pl-16 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
                maxLength={10}
              />
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Enter 10 digits (e.g. 8012345678)
            </p>
            
            {/* Show current input length for debugging */}
            <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
              <p className="text-sm text-blue-800">
                {phoneNumber.length === 10 
                  ? '✓ Ready to continue' 
                  : `Enter ${10 - phoneNumber.length} more digit${10 - phoneNumber.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>

            <button
              type="submit"
              disabled={phoneNumber.length !== 10}
              className={`w-full py-4 rounded-xl shadow-md transition-colors ${
                phoneNumber.length === 10
                  ? 'bg-blue-600 text-white active:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  // OTP Screen
  if (screen === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-white text-2xl mb-2">Enter Verification Code</h2>
          <p className="text-blue-100">
            Code sent to +234{phoneNumber}
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <form onSubmit={handleOtpSubmit} className="max-w-md mx-auto mt-8">
            <label className="block text-gray-700 mb-4 text-center font-semibold">Enter 6-digit code</label>
            
            {/* OTP Input */}
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="tel"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              type="button"
              className="text-blue-600 text-sm mb-8 mx-auto block font-semibold"
            >
              Resend Code
            </button>

            <button
              type="submit"
              disabled={otp.join('').length !== 6}
              className={`w-full py-4 rounded-xl shadow-md transition-colors ${
                otp.join('').length === 6
                  ? 'bg-blue-600 text-white active:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    );
  }

  // PIN Setup Screen (New Users)
  if (screen === 'pin-setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-700 flex flex-col">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-white text-2xl mb-2">Create Your PIN</h2>
          <p className="text-green-100">
            6-digit PIN to secure your account
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <form onSubmit={handlePinSetup} className="max-w-md mx-auto mt-8">
            <label className="block text-gray-700 mb-4 text-center font-semibold">Choose a 6-digit PIN</label>
            
            {/* PIN Input */}
            <div className="flex gap-2 justify-center mb-6">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="password"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value.replace(/\D/g, ''))}
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-8 border border-green-200">
              <p className="text-sm text-green-800">
                💡 Choose a PIN you can remember. You'll use it to login every time.
              </p>
            </div>

            <button
              type="submit"
              disabled={pin.join('').length !== 6}
              className={`w-full py-4 rounded-xl shadow-md transition-colors ${
                pin.join('').length === 6
                  ? 'bg-green-600 text-white active:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Create PIN & Start
            </button>
          </form>
        </div>
      </div>
    );
  }

  // PIN Login Screen (Existing Users)
  if (screen === 'pin-login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-white text-2xl mb-2">Welcome Back!</h2>
          <p className="text-blue-100">
            Enter your PIN to continue
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <form onSubmit={handlePinLogin} className="max-w-md mx-auto mt-8">
            <label className="block text-gray-700 mb-4 text-center font-semibold">Enter your 6-digit PIN</label>
            
            {/* PIN Input */}
            <div className="flex gap-2 justify-center mb-6">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="password"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value.replace(/\D/g, ''))}
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              type="button"
              className="text-blue-600 text-sm mb-8 mx-auto block font-semibold"
            >
              Forgot PIN?
            </button>

            <button
              type="submit"
              disabled={pin.join('').length !== 6}
              className={`w-full py-4 rounded-xl shadow-md transition-colors ${
                pin.join('').length === 6
                  ? 'bg-blue-600 text-white active:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
}