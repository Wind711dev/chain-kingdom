import { create } from 'zustand';
import type { FarmPlot } from '../apis/Farming/types';

interface IFarmStore {
  farmTooltip: string | null;
  plantData: FarmPlot[];
  seedId: number | null;
  setFarmTooltip: (value: string | null) => void;
  setPlantData: (data: FarmPlot[]) => void;
  setSeedId: (data: number) => void;
}

export const useFarmStore = create<IFarmStore>()((set) => ({
  farmTooltip: null,
  plantData: [],
  seedId: null,
  setFarmTooltip: (value) =>
    set(() => ({
      farmTooltip: value,
    })),
  setPlantData: (data) =>
    set(() => ({
      plantData: data,
    })),
  setSeedId: (data) =>
    set(() => ({
      seedId: data,
    })),
}));
