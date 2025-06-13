import dayjs from 'dayjs';
import { create } from 'zustand';
import type { FarmPlot } from '../apis/Farming/types';
import type { InternalPlantType, PlantPhase } from '../components/FarmGrid/components/types';
import type { FarmTileData } from '../hooks/useFarm';

interface IFarmStore {
  farmTooltip: string | null;
  farmData: FarmTileData[];
  seedId: number | null;
  setFarmTooltip: (value: string | null) => void;
  setFarmData: (data: FarmPlot[]) => void;
  setSeedId: (data: number) => void;
}

export const useFarmStore = create<IFarmStore>()((set) => ({
  farmTooltip: null,
  farmData: [],
  seedId: null,
  setFarmTooltip: (value) =>
    set(() => ({
      farmTooltip: value,
    })),
  setFarmData: (data) => {
    const farmData = data.map((plant) => {
      let type: InternalPlantType | null = null;
      switch (plant.seed?.name) {
        case 'corn-seed':
          type = 'corn' as InternalPlantType;
          break;
        case 'rice-seed':
          type = 'paddy' as InternalPlantType;
          break;
        default:
          type = null;
          break;
      }
      const timeCountdown =
        (plant?.seed?.metadata.max_loading_time ?? 0) * 60 -
        dayjs().diff(dayjs(plant.last_seed_at), 'second');

      const phase: PlantPhase | null = !timeCountdown
        ? null
        : timeCountdown <= 0
          ? 'mature'
          : timeCountdown >= ((plant?.seed?.metadata.max_loading_time ?? 0) * 60) / 2
            ? 'sprout'
            : 'seed';
      return {
        id: plant.id,
        timeSeed: plant.last_seed_at,
        timeLoading: (plant?.seed?.metadata.max_loading_time ?? 0) * 60,
        seedId: plant.seed_id,
        quantity: plant?.seed?.metadata.max_production_holding ?? 0,
        typePlant: type,
        isPlanted: Boolean(plant.last_seed_at),
        phase: phase,
      };
    });
    set(() => ({
      farmData: farmData,
    }));
  },
  setSeedId: (data) =>
    set(() => ({
      seedId: data,
    })),
}));
