import type { GuardLevelInfo, MilkLevelInfo } from './type';

export const MIN_TIME_CLAIM = 1; // 1 minute

export const guardLevelData: Record<number, GuardLevelInfo> = {
  1: {
    goldToPromote: 100,
    totalGoldToCurrent: 0,
    goldPerMinute: 1,
    loadTimeMinutes: 120,
    maxGoldHolding: 120,
    claimableCondition: 'anytime',
  },
  2: {
    goldToPromote: 200,
    totalGoldToCurrent: 10,
    goldPerMinute: 2,
    loadTimeMinutes: 240,
    maxGoldHolding: 480,
    claimableCondition: 'anytime',
  },
};

export const milkLevelData: Record<number, MilkLevelInfo> = {
  1: {
    goldCostBuyFromShop: 1000,
    goldToUpgrade: 0,
    totalGoldToCurrent: 0,
    milkPerMinute: 1,
    loadTimeMinutes: 60,
    maxMilkHolding: 60,
    claimablePercent: 100,
  },
  2: {
    goldCostBuyFromShop: null, // n/a
    goldToUpgrade: 100,
    totalGoldToCurrent: 100,
    milkPerMinute: 2,
    loadTimeMinutes: 90,
    maxMilkHolding: 180,
    claimablePercent: 100,
  },
  3: {
    goldCostBuyFromShop: null,
    goldToUpgrade: 200,
    totalGoldToCurrent: 300,
    milkPerMinute: 3,
    loadTimeMinutes: 150,
    maxMilkHolding: 450,
    claimablePercent: 100,
  },
  4: {
    goldCostBuyFromShop: null,
    goldToUpgrade: 300,
    totalGoldToCurrent: 600,
    milkPerMinute: 5,
    loadTimeMinutes: 240,
    maxMilkHolding: 1200,
    claimablePercent: 100,
  },
  5: {
    goldCostBuyFromShop: null,
    goldToUpgrade: 500,
    totalGoldToCurrent: 1100,
    milkPerMinute: 8,
    loadTimeMinutes: 390,
    maxMilkHolding: 3120,
    claimablePercent: 100,
  },
};
