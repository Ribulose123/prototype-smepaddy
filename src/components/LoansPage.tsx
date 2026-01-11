import { CheckCircle, Coins, Lock, TrendingUp, Zap, ArrowRight, Gift, Trophy, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import { LoanApplicationModal } from './LoanApplicationModal';
import { getLoanTier, getNextLoanTier, LOAN_TIERS } from '../utils/loanSystem';
import { NetworkGridPattern } from './NetworkGridPattern';

export function LoansPage() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Mock user data - in real app from state
  const userCoins = 245;
  const monthlyRevenue = 520000;
  
  const currentTier = getLoanTier(userCoins);
  const nextTier = getNextLoanTier(currentTier);
  const isEligible = currentTier.level >= 2; // Need at least Bronze tier
  const coinsNeededForNext = nextTier ? nextTier.minCoins - userCoins : 0;

  // Calculate recommended loan based on revenue and tier
  const maxLoanByRevenue = monthlyRevenue * 1.5;
  const actualMaxLoan = Math.min(currentTier.maxLoanAmount, maxLoanByRevenue);
  const recommendedLoanAmount = actualMaxLoan * 0.6;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 px-4 lg:px-12 pt-6 lg:pt-8 pb-6 lg:pb-8 rounded-b-3xl shadow-lg overflow-hidden">
        {/* Network Grid Background */}
        <NetworkGridPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div>
              <h1 className="text-white text-2xl lg:text-3xl">Business Loans</h1>
              <p className="text-blue-100 text-sm lg:text-base mt-1 hidden lg:block">Grow your business with affordable loans</p>
            </div>
          </div>
          
          {/* Desktop Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Current Loan Tier */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-5 lg:p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm lg:text-base mb-1">Your Loan Tier</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl lg:text-4xl">{currentTier.badge}</span>
                    <h2 className="text-blue-700 text-2xl lg:text-3xl font-bold">{currentTier.name}</h2>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    <Coins className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600" />
                    <span className="text-sm lg:text-base text-gray-600">{userCoins} coins</span>
                  </div>
                  {currentTier.level < 6 && (
                    <div className="text-xs lg:text-sm text-gray-500">
                      {coinsNeededForNext} to {nextTier?.name}
                    </div>
                  )}
                </div>
              </div>

              {isEligible ? (
                <div className="bg-green-50 rounded-xl p-4 lg:p-5 border border-green-200">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-green-900 mb-1 lg:text-lg">You can borrow up to</p>
                      <h3 className="text-green-700 text-2xl lg:text-3xl font-bold">{actualMaxLoan > 0 ? `₦${actualMaxLoan.toLocaleString()}` : 'Not available'}</h3>
                      <p className="text-xs lg:text-sm text-green-700 mt-2">
                        💎 Interest rate: {currentTier.interestRate}% per month
                      </p>
                      <p className="text-xs lg:text-sm text-green-700">
                        ⚡ Approval time: {currentTier.approvalTime}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-orange-900 mb-1">Earn {100 - userCoins} more Paddy Coins to unlock loans</p>
                      <p className="text-xs text-orange-700 mt-2">
                        🎯 Keep recording sales and expenses daily to earn coins
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress to next tier */}
              {nextTier && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Next tier: {nextTier.badge} {nextTier.name}</span>
                    <span className="text-xs text-blue-600">{coinsNeededForNext} coins away</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(((userCoins - currentTier.minCoins) / (nextTier.minCoins - currentTier.minCoins)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Loan Tier Benefits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="space-y-3">
                {currentTier.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Loan Tiers */}
      <div className="px-4 lg:px-12 mt-6 lg:mt-8 mb-6 lg:mb-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-gray-800 text-lg lg:text-xl mb-4 lg:mb-6">All Loan Tiers</h3>
          
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-6">
            {LOAN_TIERS.slice(1).map((tier) => {
              const isCurrentTier = tier.level === currentTier.level;
              const isUnlocked = userCoins >= tier.minCoins;
              
              return (
                <div
                  key={tier.level}
                  className={`rounded-2xl p-4 lg:p-6 transition-all ${
                    isCurrentTier
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500 shadow-md'
                      : isUnlocked
                      ? 'bg-white border-2 border-green-200'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-3xl lg:text-4xl ${!isUnlocked && 'grayscale'}`}>{tier.badge}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-gray-900 text-lg lg:text-xl font-semibold">{tier.name}</h4>
                          {isCurrentTier && (
                            <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                          {!isUnlocked && <Lock className="w-4 h-4 text-gray-400" />}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Coins className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-600" />
                          <span className="text-xs lg:text-sm text-gray-600">
                            {tier.minCoins.toLocaleString()} coins required
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white/80 rounded-lg p-2 lg:p-3">
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Max Loan</p>
                      <p className="text-sm lg:text-base text-gray-900 font-semibold">₦{tier.maxLoanAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2 lg:p-3">
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Interest</p>
                      <p className="text-sm lg:text-base text-green-700 font-semibold">{tier.interestRate}%/month</p>
                    </div>
                  </div>

                  <div className="bg-white/80 rounded-lg p-2 lg:p-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                      <p className="text-xs lg:text-sm text-gray-700">
                        <span className="font-medium">Approval:</span> {tier.approvalTime}
                      </p>
                    </div>
                  </div>

                  {!isUnlocked && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-orange-600">
                        🎯 Earn {tier.minCoins - userCoins} more coins to unlock
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How to Earn More Coins & Loan Calculator - Desktop Side by Side */}
      <div className="px-4 lg:px-12 mb-6 lg:mb-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* How to Earn More Coins */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 lg:p-6 border-2 border-yellow-200">
            <div className="flex items-start gap-3">
              <Gift className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-yellow-900 mb-2 font-semibold lg:text-lg">Earn More Paddy Coins!</p>
                <div className="space-y-1 text-sm lg:text-base text-yellow-800">
                  <p>• Record sales daily (+10 coins each)</p>
                  <p>• Track expenses (+5 coins each)</p>
                  <p>• 7-day streak bonus (+50 coins)</p>
                  <p>• 30-day streak bonus (+200 coins)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Calculator Info */}
          {isEligible && (
            <div>
              <h3 className="text-gray-800 text-lg lg:text-xl mb-4 lg:mb-6">Quick Estimate</h3>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <div className="mb-4">
                  <p className="text-gray-600 text-sm lg:text-base mb-1">Recommended Safe Amount</p>
                  <h3 className="text-green-700 text-2xl lg:text-3xl font-bold">₦{recommendedLoanAmount.toLocaleString()}</h3>
                  <p className="text-xs lg:text-sm text-gray-500 mt-1">
                    Based on your monthly sales of ₦{monthlyRevenue.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 lg:gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-2 lg:p-3 text-center">
                    <p className="text-xs lg:text-sm text-gray-600 mb-1">3 months</p>
                    <p className="text-sm lg:text-base text-gray-900 font-semibold">
                      ₦{Math.round((recommendedLoanAmount * (1 + currentTier.interestRate/100 * 3)) / 3).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 lg:p-3 text-center">
                    <p className="text-xs lg:text-sm text-gray-600 mb-1">6 months</p>
                    <p className="text-sm lg:text-base text-gray-900 font-semibold">
                      ₦{Math.round((recommendedLoanAmount * (1 + currentTier.interestRate/100 * 6)) / 6).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 lg:p-3 text-center">
                    <p className="text-xs lg:text-sm text-gray-600 mb-1">12 months</p>
                    <p className="text-sm lg:text-base text-gray-900 font-semibold">
                      ₦{Math.round((recommendedLoanAmount * (1 + currentTier.interestRate/100 * 12)) / 12).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-lg font-semibold"
                >
                  <span>Apply for Loan Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loan Rewards & Trust Message - Desktop Side by Side */}
      <div className="px-4 lg:px-12 mb-6 lg:mb-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Loan Rewards */}
          <div>
            <h3 className="text-gray-800 text-lg lg:text-xl mb-4 lg:mb-6">Earn Bonus Coins</h3>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {[
                { action: 'First loan application', coins: 50, icon: '📝' },
                { action: 'Loan approved', coins: 100, icon: '✅' },
                { action: 'On-time payment (each)', coins: 10, icon: '⏰' },
                { action: 'Early full repayment', coins: 150, icon: '🚀' },
                { action: 'Complete loan repayment', coins: 200, icon: '🎉' }
              ].map((reward, index, arr) => (
                <div 
                  key={index}
                  className={`p-4 lg:p-5 flex items-center justify-between ${
                    index !== arr.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{reward.icon}</span>
                    <span className="text-gray-700 text-sm lg:text-base">{reward.action}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600" />
                    <span className="text-blue-700 font-semibold lg:text-lg">+{reward.coins}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Message */}
          <div>
            <h3 className="text-gray-800 text-lg lg:text-xl mb-4 lg:mb-6">Why Paddy Coin-Based Loans?</h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 lg:p-6 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-blue-900 mb-2 font-semibold lg:text-lg">Our Promise to You</p>
                  <p className="text-sm lg:text-base text-blue-800 leading-relaxed">
                    Your coins show us you're a responsible business owner who keeps good records. 
                    The more you track your business, the better loan terms you get. It's that simple! 
                    No complex paperwork, just honest business tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showApplicationModal && isEligible && (
        <LoanApplicationModal 
          maxAmount={actualMaxLoan}
          recommendedAmount={recommendedLoanAmount}
          interestRate={currentTier.interestRate}
          tierName={currentTier.name}
          tierBadge={currentTier.badge}
          onClose={() => setShowApplicationModal(false)} 
        />
      )}
    </div>
  );
}