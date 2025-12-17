import { Coins, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { PaddyCoinModal } from './PaddyCoinModal';

interface PaddyCoinBadgeProps {
  coins: number;
  totalEarned: number;
}

export function PaddyCoinBadge({ coins, totalEarned }: PaddyCoinBadgeProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
      >
        <Coins className="w-5 h-5" />
        <span className="font-semibold">{coins.toLocaleString()}</span>
        <TrendingUp className="w-4 h-4 opacity-70" />
      </button>

      {showModal && (
        <PaddyCoinModal 
          coins={coins} 
          totalEarned={totalEarned}
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}
