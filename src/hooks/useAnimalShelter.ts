import { fetchCreateAnimalShelter, fetchGetAllAnimalShelter, fetchGetShelter } from '../apis';

export const useAnimalShelter = () => {
  const handleCreatAnimalInShelter = async (id: number) => {
    try {
      const res = await fetchCreateAnimalShelter(id);
      if (res) {
        console.log('🚀 ~ handleCreatAnimalInShelter ~ res:', res);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ handleCreatAnimalInShelter ~ error:', error);
    }
  };

  const handleGetAllAnimalShelter = async () => {
    try {
      const res = await fetchGetAllAnimalShelter();
      if (res) {
        console.log('🚀 ~ handleCreatAnimalInShelter ~ res:', res);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ handleCreatAnimalInShelter ~ error:', error);
    }
  };
  const handleGetShelter = async () => {
    try {
      const res = await fetchGetShelter();
      if (res) {
        console.log('🚀 ~ handleCreatAnimalInShelter ~ res:', res);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ handleCreatAnimalInShelter ~ error:', error);
    }
  };
  return { handleCreatAnimalInShelter, handleGetAllAnimalShelter, handleGetShelter };
};
