import { fetchClaim, fetchCreateAnimalInShelter, fetchFeed } from '../apis';
import { useShelter } from '../stores';
import { useAnimalShelter } from './useAnimalShelter';

export const useAnimalInstance = () => {
  const { getShelterId } = useShelter();
  const { handleGetShelter } = useAnimalShelter();

  const handleCreateAnimalInShelter = async () => {
    const id = getShelterId('cowshed');
    try {
      const res = await fetchCreateAnimalInShelter(id);
      if (res.status === 200) {
        console.log('🚀 ~ handleCreateAnimalInShelter ~ res:', res);
        await handleGetShelter();
      }
    } catch (error: any) {
      console.log('🚀 ~ handleCreateAnimalInShelter ~ error:', error);
    }
  };

  const handleClaim = async (id: number) => {
    try {
      const res = await fetchClaim(id);
      if (res.status === 200) {
      }
    } catch (error: any) {}
  };
  const handleFeed = async (id: number) => {
    try {
      const res = await fetchFeed(id);
      if (res.status === 200) {
      }
    } catch (error: any) {}
  };
  return { handleCreateAnimalInShelter, handleClaim, handleFeed };
};
