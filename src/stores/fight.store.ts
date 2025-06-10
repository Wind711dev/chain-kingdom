import { create } from 'zustand';
import type { MatchItem } from '../apis/FightingMatch/types';

interface IFightStore {
  itemReward: MatchItem[];
  setRewardItem: (data: MatchItem[]) => void;
}

export const useFightStore = create<IFightStore>()((set) => ({
  itemReward: [],
  setRewardItem: (value) =>
    set(() => ({
      itemReward: value,
    })),
}));
