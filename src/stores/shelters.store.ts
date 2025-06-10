import { create } from 'zustand';
import type { AnimalInShelter } from '../apis/AnimalInstance/types';
import type { AnimalShelter } from '../apis/AnimalShelter/types';

interface ISheltersStore {
  shelters: AnimalShelter[];
  cowInShelter: AnimalInShelter[];
  setShelters: (value: AnimalShelter[]) => void;
  getShelterId: (shelterName: string) => string;
  setCowInShelter: (data: AnimalInShelter[]) => void;
}

export const useShelter = create<ISheltersStore>()((set, get) => ({
  shelters: [],
  cowInShelter: [],
  setShelters: (value) =>
    set(() => ({
      shelters: value,
    })),
  getShelterId: (shelterName) => {
    const shelterArr = get().shelters;

    const shelter = shelterArr.find((item) => item.info.name === shelterName);
    return shelter?.id || '';
  },
  setCowInShelter: (data) => {
    set(() => ({
      cowInShelter: data,
    }));
  },
}));
