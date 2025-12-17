// Loan System with Paddy Coin Integration

export interface LoanTier {
  level: number;
  name: string;
  minCoins: number;
  maxLoanAmount: number;
  interestRate: number; // monthly %
  approvalTime: string;
  badge: string;
  benefits: string[];
}

// Loan tiers based on Paddy Coin levels
export const LOAN_TIERS: LoanTier[] = [
  {
    level: 1,
    name: 'Starter',
    minCoins: 0,
    maxLoanAmount: 0,
    interestRate: 0,
    approvalTime: 'Not eligible',
    badge: '🔒',
    benefits: ['Keep recording sales to unlock loans']
  },
  {
    level: 2,
    name: 'Bronze',
    minCoins: 100,
    maxLoanAmount: 100000,
    interestRate: 3.0,
    approvalTime: '48 hours',
    badge: '🥉',
    benefits: ['Up to ₦100k loans', '3% monthly interest', 'Basic approval']
  },
  {
    level: 3,
    name: 'Silver',
    minCoins: 300,
    maxLoanAmount: 300000,
    interestRate: 2.5,
    approvalTime: '24 hours',
    badge: '🥈',
    benefits: ['Up to ₦300k loans', '2.5% monthly interest', 'Fast approval', 'Flexible repayment']
  },
  {
    level: 4,
    name: 'Gold',
    minCoins: 600,
    maxLoanAmount: 500000,
    interestRate: 2.0,
    approvalTime: '12 hours',
    badge: '🥇',
    benefits: ['Up to ₦500k loans', '2% monthly interest', 'Same-day approval', 'Grace period: 1 month']
  },
  {
    level: 5,
    name: 'Platinum',
    minCoins: 1000,
    maxLoanAmount: 1000000,
    interestRate: 1.5,
    approvalTime: '6 hours',
    badge: '💎',
    benefits: ['Up to ₦1M loans', '1.5% monthly interest', 'Instant approval', 'Grace period: 2 months', 'No collateral needed']
  },
  {
    level: 6,
    name: 'Paddy VIP',
    minCoins: 2000,
    maxLoanAmount: 2000000,
    interestRate: 1.0,
    approvalTime: 'Instant',
    badge: '👑',
    benefits: ['Up to ₦2M loans', '1% monthly interest', 'Instant approval', 'Grace period: 3 months', 'No collateral', 'Dedicated support']
  }
];

export function getLoanTier(coins: number): LoanTier {
  // Find the highest tier the user qualifies for
  const qualifiedTiers = LOAN_TIERS.filter(tier => coins >= tier.minCoins);
  return qualifiedTiers[qualifiedTiers.length - 1] || LOAN_TIERS[0];
}

export function getNextLoanTier(currentTier: LoanTier): LoanTier | null {
  const currentIndex = LOAN_TIERS.findIndex(tier => tier.level === currentTier.level);
  if (currentIndex === -1 || currentIndex === LOAN_TIERS.length - 1) return null;
  return LOAN_TIERS[currentIndex + 1];
}

export function calculateLoanDetails(amount: number, months: number, interestRate: number) {
  const monthlyInterest = interestRate / 100;
  const totalInterest = amount * monthlyInterest * months;
  const totalRepayment = amount + totalInterest;
  const monthlyPayment = totalRepayment / months;

  return {
    totalInterest,
    totalRepayment,
    monthlyPayment,
    effectiveAnnualRate: monthlyInterest * 12 * 100
  };
}

// Bonus coins for loan actions
export const LOAN_COIN_REWARDS = {
  firstApplication: 50,
  loanApproved: 100,
  earlyRepayment: 150,
  fullRepayment: 200,
  onTimePayment: 10 // per payment
};
