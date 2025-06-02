import { create } from 'zustand';
import { guardLevelData, milkLevelData } from '../utils/constanst';

type GuardLevel = keyof typeof guardLevelData;

interface IDataState {
  mainLevel: GuardLevel;
  cowLevel: number;
  goldAll: number;
  milkAll: number;
  goldHolding: number;
  milkHolding: number;
  goldHoldTime: number;
  milkHoldTime: number;
  grass: number;
  increaseLevel: () => void;
  claimGold: (gold: number) => void;
  claimMilk: (milk: number) => void;
  setGoldHolding: () => void;
  setMilkHolding: () => void;
  cowShed: (grass: number) => void;
}

export const useDataStore = create<IDataState>()((set, get) => ({
  mainLevel: 1 as GuardLevel,
  cowLevel: 1,
  goldAll: 3000,
  milkAll: 0,
  goldHolding: 0,
  milkHolding: 120,
  goldHoldTime: 0,
  milkHoldTime: 0,
  grass: 100,
  increaseLevel: () => {
    const currentLevel = get().mainLevel;
    const levelKeys = Object.keys(guardLevelData)
      .map(Number)
      .sort((a, b) => a - b) as GuardLevel[];

    const currentIndex = levelKeys.indexOf(currentLevel);
    const nextLevel = levelKeys[currentIndex + 1];

    if (nextLevel) {
      set({ mainLevel: nextLevel });
    }
  },
  claimGold: (gold) =>
    set((state) => ({
      goldAll: state.goldAll + gold,
    })),
  claimMilk: (milk: number) =>
    set((state) => ({
      milkAll: state.milkAll + milk,
    })),
  setGoldHolding: () => {
    const currentLevel = get().mainLevel;
    const nextGold = guardLevelData[currentLevel].goldPerMinute + get().goldHolding;
    set((state) => ({ goldHolding: nextGold, goldHoldTime: state.goldHoldTime + 1 }));
  },
  setMilkHolding: () => {
    const currentLevel = get().cowLevel;
    const nextMilk = milkLevelData[currentLevel].milkPerMinute + get().milkHolding;
    set((state) => ({ milkHolding: nextMilk, milkHoldTime: state.milkHoldTime + 1 }));
  },
  cowShed: (grass: number) =>
    set((state) => ({
      grass: state.grass - grass,
    })),
}));
