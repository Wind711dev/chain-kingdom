import { useCallback } from 'react';
import { fetchClaim, fetchCreateAnimalInShelter, fetchFeed } from '../apis';
import { useShelter } from '../stores';
import { useAnimalShelter } from './useAnimalShelter';
import { useProfile } from './useProfile';

export const useAnimalInstance = () => {
  const { getShelterId } = useShelter();
  const { handleGetShelter } = useAnimalShelter();
  const { getInventory } = useProfile();

  const handleCreateAnimalInShelter = async (shedName: string) => {
    const id = getShelterId(shedName);
    try {
      const res = await fetchCreateAnimalInShelter(id);
      if (res.status === 200) {
        await handleGetShelter(shedName);
      }
    } catch (error: any) {
      console.log('🚀 ~ handleCreateAnimalInShelter ~ error:', error);
    }
  };

  const handleClaim = async (id: string) => {
    try {
      const res = await fetchClaim(id);
      if (res.status === 200) {
        getInventory();
      }
    } catch (error: any) {}
  };
  const handleFeed = useCallback(
    async (id: string) => {
      try {
        const res = await fetchFeed(id);
        if (res.status === 200) {
          console.log('🚀 ~ handleFeed ~ res:', res);
          getInventory();
        }
      } catch (error: any) {}
    },
    [fetchFeed, getInventory]
  );
  return { handleCreateAnimalInShelter, handleClaim, handleFeed };
};
