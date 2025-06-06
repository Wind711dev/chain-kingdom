import { create } from 'zustand';
import type { ShelterInfo } from '../apis/AnimalInstance/type';

interface IInit {
  shelterTypes: ShelterInfo[];
  setShelterTypes: (value: ShelterInfo[]) => void;
}

export const useInitStore = create<IInit>()((set) => ({
  shelterTypes: [],
  setShelterTypes: (value) =>
    set(() => ({
      shelterTypes: value,
    })),
}));
