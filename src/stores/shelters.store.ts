import { create } from 'zustand';
import type { AnimalInShelter } from '../apis/AnimalInstance/types';
import type { AnimalShelter } from '../apis/AnimalShelter/types';
import type { BuildType } from '../utils/type';

interface ISheltersStore {
  shelters: AnimalShelter[];
  cowInShelter: AnimalInShelter[];
  hasBuilt: BuildType[];
  setShelters: (value: AnimalShelter[]) => void;
  getShelterId: (shelterName: string) => string;
  setCowInShelter: (data: AnimalInShelter[]) => void;
}

export const useShelter = create<ISheltersStore>()((set, get) => ({
  shelters: [],
  cowInShelter: [],
  hasBuilt: [],
  setShelters: (value) => {
    const house = value.map((item) => item.info.slug as BuildType);

    set(() => ({
      shelters: value,
      hasBuilt: house,
    }));
  },
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
