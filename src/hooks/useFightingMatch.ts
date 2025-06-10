import { useCallback } from 'react';
import { fetchFightingMatch } from '../apis/FightingMatch';
import { useFightStore } from '../stores/fight.store';
import { useProfile } from './useProfile';

export const useFightingMatch = () => {
  const { setRewardItem } = useFightStore();
  const { getInventory } = useProfile();

  const handleFightingMatch = useCallback(async () => {
    try {
      const res = await fetchFightingMatch();
      if (res.status === 200) {
        setRewardItem(res.responseData.data.items);
        getInventory();
      }
    } catch (error: any) {
      console.log('🚀 ~ handleFightingMatch ~ error:', error);
    }
  }, [fetchFightingMatch, setRewardItem, getInventory]);
  return {
    handleFightingMatch,
  };
};
