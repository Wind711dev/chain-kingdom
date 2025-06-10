import { useCallback } from 'react';
import { fetchClaimPlant, fetchCreatePlot, fetchGetPlots, fetchSowingSeed } from '../apis/Farming';
import { useFarmStore } from '../stores';

export const useFarm = () => {
  const { setPlantData } = useFarmStore();

  const handleGetFarmPlots = useCallback(async () => {
    try {
      const res = await fetchGetPlots();
      if (res.status === 200) {
        setPlantData(res.responseData.data);
        return;
      }
      throw new Error('Failed to fetch farm plots');
    } catch (error: any) {
      console.error('Error fetching farm plots:', error);
    }
  }, [fetchGetPlots, setPlantData]);

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

  return { handleGetFarmPlots, handleCreateFarmPlot, handleClaimPlant, handleSowingSeed };
};
