import { HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { SupportTicketModal } from './SupportTicketModal';

interface HelpButtonProps {
  userProfile: {
    businessName: string;
    ownerName: string;
  };
}

export function HelpButton({ userProfile }: HelpButtonProps) {
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <>
      {/* Desktop Help Button - Bottom Right */}
      <button
        onClick={() => setShowSupportModal(true)}
        className="hidden lg:flex fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all items-center justify-center z-40 group"
        title="Get Help"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Need Help?
        </span>
      </button>

      {/* Support Modal */}
      <SupportTicketModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        userProfile={userProfile}
      />
    </>
  );
}
