import { useCallback } from 'react';
import {
    fetchCreateAnimalShelter,
    fetchGetAllAnimalShelter,
    fetchGetShelter,
    fetchGetShelterTypes,
} from '../apis';
import { useInitStore, useShelter } from '../stores';

export const useAnimalShelter = () => {
  const { setShelters, getShelterId } = useShelter();
  const { setShelterTypes } = useInitStore();

  const handleCreatAnimalShelter = useCallback(async (id: number) => {
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
  }, []);

  const handleGetAllAnimalShelter = useCallback(async () => {
    try {
      const res = await fetchGetAllAnimalShelter();
      if (res.status === 200) {
        if (res.responseData.data.length === 0) {
          await handleCreatAnimalShelter(1);
        } else {
          setShelters(res.responseData.data);
        }
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ handleCreatAnimalInShelter ~ error:', error);
    }
  }, []);

  const handleGetShelter = useCallback(async (shedName: string) => {
    try {
      const id = getShelterId(shedName);
      const res = await fetchGetShelter(id);
      if (res) {
        console.log('🚀 ~ handleGetShelter ~ res:', res);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ handleGetShelter ~ error:', error);
    }
  }, []);
  const handleGetShelterTypes = useCallback(async () => {
    try {
      const res = await fetchGetShelterTypes();
      if (res.status === 200) {
        setShelterTypes(res.responseData.data);
        console.log('🚀 ~ handleGetShelterTypes ~ res:', res);
      } else {
        throw new Error('error');
      }
    } catch (error: any) {
      console.log('🚀 ~ handleGetShelterTypes ~ error:', error);
    }
  }, []);
  return {
    handleCreatAnimalShelter,
    handleGetAllAnimalShelter,
    handleGetShelter,
    handleGetShelterTypes,
  };
};
