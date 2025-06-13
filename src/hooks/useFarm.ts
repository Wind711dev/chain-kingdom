import dayjs from 'dayjs';
import { useCallback } from 'react';
import { fetchClaimPlant, fetchCreatePlot, fetchGetPlots, fetchSowingSeed } from '../apis/Farming';
import type {
  InternalPlantType,
  PlantPhase,
  PlantType,
} from '../components/FarmGrid/components/types';
import { useFarmStore } from '../stores';

export interface FarmTileData {
  id: string;
  timeSeed: string | null;
  timeLoading: number;
  seedId: number;
  phase: PlantPhase | null;
  typePlant: InternalPlantType | null;
  quantity: number;
  isPlanted: boolean;
}

export const useFarm = () => {
  const { setFarmData } = useFarmStore();

  const getTimeCountdown = (timeSeed: string, timeLoading: number) => {
    return timeLoading - dayjs().diff(dayjs(timeSeed), 'second');
  };

  const getPhasePlant = (timeAll: number, timeLoading: number) => {
    if (timeAll > timeLoading) {
      return 'seed' as PlantPhase;
    }
    if (timeAll >= timeLoading / 2) {
      return 'sprout' as PlantPhase; 
    }
    return 'mature' as PlantPhase;
  };

  const getTypePlant = (seedName: string | PlantType) => {
    switch (seedName) {
      case 'corn-seed':
      case 'CORN':
        return 'corn' as InternalPlantType;
      case 'rice-seed':
      case 'PADDY':
        return 'paddy' as InternalPlantType;
      default:
        return null;
    }
  };

  const handleGetFarmPlots = useCallback(async () => {
    try {
      const res = await fetchGetPlots();
      if (res.status === 200) {
        if (res.responseData.data.length !== 0) {
          setFarmData(res.responseData.data);
          return;
        } else {
          handleCreateFarmPlot(4);
          return;
        }
      }
      throw new Error('Failed to fetch farm plots');
    } catch (error: any) {
      console.error('Error fetching farm plots:', error);
    }
  }, [fetchGetPlots, setFarmData]);

  const handleCreateFarmPlot = useCallback(
    async (total: number) => {
      try {
        const res = await fetchCreatePlot(total);
        if (res.status === 200) {
          await handleGetFarmPlots();
        }
        throw new Error('Failed to create farm plot');
      } catch (error: any) {
        console.error('Error creating farm plot:', error);
      }
    },
    [fetchCreatePlot, handleGetFarmPlots]
  );

  const handleClaimPlant = useCallback(
    async (id: string) => {
      try {
        const res = await fetchClaimPlant(id);
        if (res.status === 200) {
          await handleGetFarmPlots();
          return;
        }
        throw new Error('Failed to claim plant');
      } catch (error: any) {
        console.error('Error claiming plant:', error);
      }
    },
    [fetchClaimPlant, handleGetFarmPlots]
  );

  const handleSowingSeed = useCallback(
    async (plantId: number, plotId: string) => {
      try {
        const res = await fetchSowingSeed(plantId, plotId);
        if (res.status === 200) {
          await handleGetFarmPlots();
          return;
        }
        throw new Error('Failed to sow seed');
      } catch (error: any) {
        console.error('Error sowing seed:', error);
      }
    },
    [fetchSowingSeed, handleGetFarmPlots]
  );

  return {
    handleGetFarmPlots,
    handleCreateFarmPlot,
    handleClaimPlant,
    handleSowingSeed,
    getTimeCountdown,
    getPhasePlant,
    getTypePlant,
  };
};
