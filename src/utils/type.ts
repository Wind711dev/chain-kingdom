export type GuardLevelInfo = {
  goldToPromote: number;
  totalGoldToCurrent: number;
  goldPerMinute: number;
  loadTimeMinutes: number;
  maxGoldHolding: number;
  claimableCondition: 'anytime' | string; // có thể cụ thể hơn nếu biết các giá trị khác
};

export type MilkLevelInfo = {
  goldCostBuyFromShop: number | null;
  goldToUpgrade: number;
  totalGoldToCurrent: number;
  milkPerMinute: number;
  loadTimeMinutes: number;
  maxMilkHolding: number;
  claimablePercent: number;
};
