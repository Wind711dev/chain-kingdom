import { create } from 'zustand';
import { guardLevelData, milkLevelData } from '../utils/constanst';

type GuardLevel = keyof typeof guardLevelData;

interface IDataState {
  mainLevel: GuardLevel;
  cowLevel: number;
  goldAll: number;
  milkAll: number;
  milkHolding: number;
  milkHoldTime: number;
  grass: number;
  cowPrice: number;
  setGold: (gold: number) => void;
  claimGold: (gold: number) => void;
  claimMilk: (milk: number) => void;
  setMilkHolding: () => void;
  cowShed: (grass: number) => void;
  useGold: (gold: number) => void;
}

export const useDataStore = create<IDataState>()((set, get) => ({
  mainLevel: 1 as GuardLevel,
  cowLevel: 1,
  goldAll: 3000,
  milkAll: 0,
  milkHolding: 120,
  milkHoldTime: 0,
  grass: 20,
  cowPrice: 500,
  setGold: (gold) =>
    set(() => ({
      goldAll: gold,
    })),
  claimGold: (gold) =>
    set((state) => ({
      goldAll: state.goldAll + gold,
    })),
  claimMilk: (milk: number) =>
    set((state) => ({
      milkAll: state.milkAll + milk,
    })),
  setMilkHolding: () => {
    const currentLevel = get().cowLevel;
    const nextMilk = milkLevelData[currentLevel].milkPerMinute + get().milkHolding;
    set((state) => ({ milkHolding: nextMilk, milkHoldTime: state.milkHoldTime + 1 }));
  },
  cowShed: (grass: number) =>
    set((state) => ({
      grass: state.grass - grass,
    })),
  useGold: (gold: number) =>
    set((state) => ({
      goldAll: state.goldAll - gold,
    })),
}));
