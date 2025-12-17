import { useState } from 'react';
import { Store, User, MapPin, Mail, Camera, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProfileSetupPageProps {
  onComplete: () => void;
}

type SetupStep = 'business-info' | 'owner-info' | 'location' | 'complete';

export function ProfileSetupPage({ onComplete }: ProfileSetupPageProps) {
  const [currentStep, setCurrentStep] = useState<SetupStep>('business-info');
  const [profileData, setProfileData] = useState({
    businessName: '',
    businessType: '',
    ownerName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    businessLogo: null as string | null
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

  const handleBusinessInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.businessName || !profileData.businessType) {
      toast.error('Please fill in all required fields');
      return;
    }
    setCurrentStep('owner-info');
  };

  const handleOwnerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.ownerName) {
      toast.error('Please enter your name');
      return;
    }
    setCurrentStep('location');
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('complete');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile setup complete! 🎉 You earned 50 Paddy Coins!');
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 1000);
  };

  const progressPercentage = {
    'business-info': 33,
    'owner-info': 66,
    'location': 100,
    'complete': 100
  }[currentStep];

  // Business Info Step
  if (currentStep === 'business-info') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white text-xl">Setup Your Business</h2>
              <span className="text-blue-100 text-sm">Step 1 of 3</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Store className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 text-lg mb-2">Tell us about your business</h3>
              <p className="text-gray-600 text-sm">This helps us personalize your experience</p>
            </div>

            <form onSubmit={handleBusinessInfoSubmit} className="space-y-4">
              {/* Business Logo */}
              <div className="flex justify-center mb-4">
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
                  <p className="text-xs text-gray-500 text-center mt-2">Add logo (optional)</p>
                </label>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.businessName}
                  onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                  placeholder="e.g. Mama Ngozi Provisions"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Type of Business <span className="text-red-500">*</span>
                </label>
                <select
                  value={profileData.businessType}
                  onChange={(e) => setProfileData({ ...profileData, businessType: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                >
                  <option value="">Select business type</option>
                  {businessTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl shadow-md active:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-6"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Owner Info Step
  if (currentStep === 'owner-info') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white text-xl">Your Information</h2>
              <span className="text-blue-100 text-sm">Step 2 of 3</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-gray-900 text-lg mb-2">Personal Details</h3>
              <p className="text-gray-600 text-sm">Help us know who's running the business</p>
            </div>

            <form onSubmit={handleOwnerInfoSubmit} className="space-y-4">
              {/* Owner Name */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.ownerName}
                  onChange={(e) => setProfileData({ ...profileData, ownerName: e.target.value })}
                  placeholder="e.g. Ngozi Okafor"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  We'll use this to send you important updates
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep('business-info')}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl active:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-4 rounded-xl shadow-md active:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Location Step
  if (currentStep === 'location') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white text-xl">Business Location</h2>
              <span className="text-blue-100 text-sm">Step 3 of 3</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 text-lg mb-2">Where is your business?</h3>
              <p className="text-gray-600 text-sm">This helps us serve you better (optional)</p>
            </div>

            <form onSubmit={handleLocationSubmit} className="space-y-4">
              {/* State */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  State
                </label>
                <select
                  value={profileData.state}
                  onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select state (optional)</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  City/Town
                </label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  placeholder="e.g. Ikeja, Kano, Port Harcourt"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Street Address
                </label>
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  placeholder="e.g. 23 Allen Avenue"
                  rows={3}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 Adding location helps us provide local insights and connect you with nearby businesses
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep('owner-info')}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl active:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl shadow-md active:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>Complete Setup</span>
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Complete Step (Loading)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-white text-2xl mb-2">Setting up your profile...</h2>
        <p className="text-green-100">This will only take a moment</p>
      </div>
    </div>
  );
}
