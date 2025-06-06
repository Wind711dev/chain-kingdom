import { create } from 'zustand';
import type { AnimalShelter } from '../apis/AnimalShelter/types';

interface ISheltersStore {
  shelters: AnimalShelter[];
  setShelters: (value: AnimalShelter[]) => void;
  getShelterId: (shelterName: string) => string;
}

export const useShelter = create<ISheltersStore>()((set, get) => ({
  shelters: [],
  setShelters: (value) =>
    set(() => ({
      shelters: value,
    })),
  getShelterId: (shelterName) => {
    const shelterArr = get().shelters;
    console.log('🚀 ~ shelterArr:', shelterArr);

    const shelter = shelterArr.find((item) => item.info.name === shelterName);
    console.log('🚀 ~ shelter:', shelter);
    return shelter?.id || '';
  },
}));
