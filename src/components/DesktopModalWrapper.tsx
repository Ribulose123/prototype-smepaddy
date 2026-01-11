import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface DesktopModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function DesktopModalWrapper({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg'
}: DesktopModalWrapperProps) {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl'
  };

  return (
    <>
      {/* Mobile: Full screen */}
      <div className="lg:hidden fixed inset-0 z-50">
        {children}
      </div>

      {/* Desktop: Centered modal */}
      <div className="hidden lg:block">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 pointer-events-none">
          <div 
            className={`bg-white rounded-2xl shadow-2xl ${maxWidthClasses[maxWidth]} w-full max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between border-b border-blue-500">
              <div>
                <h2 className="text-white text-xl font-bold">{title}</h2>
                {subtitle && <p className="text-blue-100 text-sm mt-1">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
