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
  increaseLevel: () => void;
  claimGold: () => void;
  claimMilk: () => void;
  setGoldHolding: () => void;
  setMilkHolding: () => void;
}

export const useDataStore = create<IDataState>()((set, get) => ({
  mainLevel: 1 as GuardLevel,
  cowLevel: 1,
  goldAll: 0,
  milkAll: 0,
  goldHolding: 0,
  milkHolding: 120,
  goldHoldTime: 0,
  milkHoldTime: 0,
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
  claimGold: () =>
    set((state) => ({
      goldAll: state.goldAll + state.goldHolding,
      goldHolding: 0,
      goldHoldTime: 0,
    })),
  claimMilk: () =>
    set((state) => ({
      milkAll: state.milkAll + state.milkHolding,
      milkHolding: 0,
      milkHoldTime: 0,
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
}));
