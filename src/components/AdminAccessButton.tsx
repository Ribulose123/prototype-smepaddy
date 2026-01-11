import { Shield } from 'lucide-react';

interface AdminAccessButtonProps {
  onAccessAdmin: () => void;
}

/**
 * Development helper component to easily access admin portal
 * Remove this component in production or restrict to development environments only
 */
export function AdminAccessButton({ onAccessAdmin }: AdminAccessButtonProps) {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <button
      onClick={onAccessAdmin}
      className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
      title="Access Admin Portal (Dev Only)"
    >
      <Shield className="w-5 h-5" />
      <span className="font-semibold">Admin Portal</span>
    </button>
  );
}
