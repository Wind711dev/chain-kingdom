import { useCallback } from 'react';
import { fetchGetUseProfile } from '../apis';
import { useUserStore } from '../stores';

export const useProfile = () => {
  const { setUserData } = useUserStore();
  const getUseProfile = useCallback(async () => {
    try {
      const res = await fetchGetUseProfile();
      if (res.status === 200) {
        setUserData(res.responseData.data);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ fetchGetUseProfile ~ error:', error);
    }
  }, [fetchGetUseProfile]);
  return {
    getUseProfile,
  };
};
