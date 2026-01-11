import { useState } from 'react';
import { X, Send, HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: {
    businessName: string;
    ownerName: string;
  };
}

export function SupportTicketModal({ isOpen, onClose, userProfile }: SupportTicketModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    message: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing & Payment' },
    { value: 'loan', label: 'Loan Inquiry' },
    { value: 'account', label: 'Account Problem' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'training', label: 'Need Training/Help' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject || !formData.category || !formData.message || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const ticketNumber = `TKT-2025-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      toast.success(`Support ticket ${ticketNumber} submitted! We'll respond within 24 hours.`);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        subject: '',
        category: '',
        priority: 'medium',
        message: '',
        email: ''
      });
      
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-bold">Get Help</h2>
              <p className="text-blue-100 text-sm mt-1">Submit a support ticket</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 font-medium text-sm">We're here to help!</p>
              <p className="text-blue-700 text-sm mt-1">
                Our support team will respond within 24 hours. For urgent issues, select "Urgent" priority.
              </p>
            </div>
          </div>

          {/* Business Info (Auto-filled) */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 text-sm mb-2">Submitting as:</p>
            <p className="text-gray-900 font-semibold">{userProfile.businessName}</p>
            <p className="text-gray-600 text-sm">{userProfile.ownerName}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-gray-500 text-sm mt-1">We'll send updates to this email</p>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="low">Low - General question</option>
                <option value="medium">Medium - Need help soon</option>
                <option value="high">High - Issue affecting business</option>
                <option value="urgent">Urgent - Critical problem</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please describe your issue in detail..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <p className="text-gray-500 text-sm mt-1">
              Include as much detail as possible to help us resolve your issue faster
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
