// Paddy Coin Reward System
// Users earn coins for various activities and can redeem them for premium features

export interface CoinActivity {
  type: 'sale_recorded' | 'expense_recorded' | 'item_added' | 'daily_login' | 'week_streak' | 'month_streak';
  coins: number;
  description: string;
}

export interface CoinRedemption {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'premium_month' | 'loan_access' | 'advanced_reports' | 'export_data' | 'priority_support';
  icon: string;
}

// Earning rates
export const COIN_REWARDS: Record<CoinActivity['type'], { coins: number; description: string }> = {
  sale_recorded: { coins: 10, description: 'Sale recorded' },
  expense_recorded: { coins: 5, description: 'Expense tracked' },
  item_added: { coins: 15, description: 'New item added' },
  daily_login: { coins: 5, description: 'Daily login bonus' },
  week_streak: { coins: 50, description: '7-day recording streak' },
  month_streak: { coins: 200, description: '30-day recording streak' }
};

// Redemption options
export const REDEMPTION_OPTIONS: CoinRedemption[] = [
  {
    id: 'premium_month',
    name: '1 Month Premium',
    description: 'Unlock all premium features for 30 days',
    cost: 500,
    type: 'premium_month',
    icon: '👑'
  },
  {
    id: 'loan_access',
    name: 'Loan Service Access',
    description: 'Apply for business loans up to ₦500,000',
    cost: 300,
    type: 'loan_access',
    icon: '💰'
  },
  {
    id: 'advanced_reports',
    name: 'Advanced Reports',
    description: 'Detailed analytics and profit insights',
    cost: 200,
    type: 'advanced_reports',
    icon: '📊'
  },
  {
    id: 'export_data',
    name: 'Export Data',
    description: 'Download your records as Excel/PDF',
    cost: 150,
    type: 'export_data',
    icon: '📥'
  },
  {
    id: 'priority_support',
    name: 'Priority Support',
    description: 'Get help within 2 hours',
    cost: 100,
    type: 'priority_support',
    icon: '🚀'
  }
];

// Helper functions
export function awardCoins(type: CoinActivity['type']): { coins: number; message: string } {
  const reward = COIN_REWARDS[type];
  return {
    coins: reward.coins,
    message: `🎉 +${reward.coins} Paddy Coins! ${reward.description}`
  };
}

export function canRedeem(userCoins: number, cost: number): boolean {
  return userCoins >= cost;
}

export function calculateLevel(totalCoinsEarned: number): { level: number; title: string; nextLevelCoins: number } {
  const levels = [
    { level: 1, title: 'Beginner Trader', min: 0, next: 100 },
    { level: 2, title: 'Smart Seller', min: 100, next: 300 },
    { level: 3, title: 'Business Pro', min: 300, next: 600 },
    { level: 4, title: 'Market Leader', min: 600, next: 1000 },
    { level: 5, title: 'Business Legend', min: 1000, next: 2000 },
    { level: 6, title: 'Paddy Master', min: 2000, next: Infinity }
  ];

  const currentLevel = levels.find(l => totalCoinsEarned >= l.min && totalCoinsEarned < l.next) || levels[levels.length - 1];
  
  return {
    level: currentLevel.level,
    title: currentLevel.title,
    nextLevelCoins: currentLevel.next === Infinity ? 0 : currentLevel.next - totalCoinsEarned
  };
}
