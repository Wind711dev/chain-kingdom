import { useCallback } from 'react';
import { fetchGetInventory, fetchGetItemsConfig, fetchGetUseProfile } from '../apis';
import { useDataStore, useUserStore } from '../stores';

export const useProfile = () => {
  const { setUserData, setInventoryData, setitemsConfigData } = useUserStore();
  const { setGold } = useDataStore();

  const getUseProfile = useCallback(async () => {
    try {
      const res = await fetchGetUseProfile();
      if (res.status === 200) {
        setUserData(res.responseData.data);
        setGold(res.responseData.data.assets.total_gold);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ fetchGetUseProfile ~ error:', error);
    }
  }, [fetchGetUseProfile, setUserData, setGold]);

  const getInventory = useCallback(async () => {
    try {
      const res = await fetchGetInventory();
      if (res.status === 200) {
        setInventoryData(res.responseData.data);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ fetchGetUseProfile ~ error:', error);
    }
  }, [fetchGetInventory, setInventoryData]);

  const getItemsConfig = useCallback(async () => {
    try {
      const res = await fetchGetItemsConfig();
      if (res.status === 200) {
        setitemsConfigData(res.responseData.data);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ fetchGetUseProfile ~ error:', error);
    }
  }, [fetchGetItemsConfig, setitemsConfigData]);
  return {
    getUseProfile,
    getInventory,
    getItemsConfig,
  };
};
