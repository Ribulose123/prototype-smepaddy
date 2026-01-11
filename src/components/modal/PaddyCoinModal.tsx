import React from 'react';
import { X, Coins, Gift, Trophy, Lock } from 'lucide-react';
import { REDEMPTION_OPTIONS, COIN_REWARDS, calculateLevel, canRedeem } from '../../utils/paddyCoinSystem';
import { toast } from 'sonner';

interface PaddyCoinModalProps {
  coins: number;
  totalEarned: number;
  onClose: () => void;
}

export function PaddyCoinModal({ coins, totalEarned, onClose }: PaddyCoinModalProps) {
  const { level, title, nextLevelCoins } = calculateLevel(totalEarned);
  const progressPercent = nextLevelCoins > 0 
    ? ((totalEarned - (totalEarned - nextLevelCoins)) / nextLevelCoins) * 100 
    : 100;

  const handleRedeem = (option: typeof REDEMPTION_OPTIONS[0]) => {
    if (!canRedeem(coins, option.cost)) {
      toast.error(`You need ${option.cost - coins} more coins to redeem this`);
      return;
    }

    toast.success(`${option.icon} ${option.name} redeemed successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto pb-safe">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-yellow-400 to-yellow-500 px-4 py-6 rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-yellow-900 flex items-center gap-2">
              <Coins className="w-6 h-6" />
              Paddy Coins
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-600/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-yellow-900" />
            </button>
          </div>

          {/* Coin Balance */}
          <div className="bg-white/95 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Your Balance</span>
              <div className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-yellow-600" />
                <span className="text-yellow-700 text-2xl font-bold">{coins.toLocaleString()}</span>
              </div>
            </div>

            {/* Level Progress */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">Level {level}: {title}</span>
                </div>
              </div>
              {nextLevelCoins > 0 && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{nextLevelCoins} coins to next level</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 pb-24">{/* Added pb-24 */}
          {/* How to Earn */}
          <div>
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              <Gift className="w-5 h-5 text-blue-600" />
              How to Earn Coins
            </h3>
            <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
              {Object.entries(COIN_REWARDS).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{value.description}</span>
                  <span className="text-blue-700 font-semibold">+{value.coins}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Redeem Options */}
          <div>
            <h3 className="text-gray-800 mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              Redeem Your Coins
            </h3>
            <div className="space-y-3">
              {REDEMPTION_OPTIONS.map(option => {
                const affordable = canRedeem(coins, option.cost);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleRedeem(option)}
                    disabled={!affordable}
                    className={`w-full rounded-2xl p-4 text-left transition-all ${
                      affordable
                        ? 'bg-white border-2 border-gray-200 hover:border-purple-500 active:scale-98 shadow-sm'
                        : 'bg-gray-100 border-2 border-gray-200 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`text-3xl ${!affordable && 'grayscale'}`}>{option.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-gray-900">{option.name}</h4>
                          {!affordable && <Lock className="w-4 h-4 text-gray-400" />}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                        <div className="flex items-center gap-2">
                          <Coins className={`w-4 h-4 ${affordable ? 'text-yellow-600' : 'text-gray-400'}`} />
                          <span className={`text-sm font-semibold ${
                            affordable ? 'text-yellow-700' : 'text-gray-500'
                          }`}>
                            {option.cost.toLocaleString()} coins
                          </span>
                          {!affordable && (
                            <span className="text-xs text-red-600">
                              (Need {(option.cost - coins).toLocaleString()} more)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 border-2 border-purple-200">
            <p className="text-sm text-gray-700 text-center">
              🎯 Keep recording your sales and expenses to earn more Paddy Coins! 
              Every transaction brings you closer to premium rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

