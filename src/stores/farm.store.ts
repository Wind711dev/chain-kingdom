import { create } from 'zustand';

interface IFarmStore {
  farmTooltip: number | null;
  setFarmTooltip: (value: number | null) => void;
}

export const useFarmStore = create<IFarmStore>()((set, get) => ({
  farmTooltip: null,
  setFarmTooltip: (value) =>
    set(() => ({
      farmTooltip: value,
    })),
}));
