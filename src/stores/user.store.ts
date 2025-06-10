import { create } from 'zustand';
import type {
  InventoryItem,
  ItemConfig,
  UserProfile
} from '../apis/User/types';

interface IUser {
  userData: UserProfile | null;
  inventoryData: InventoryItem[];
  itemsConfigData: ItemConfig[];
  setUserData: (data: UserProfile) => void;
  setInventoryData: (data: InventoryItem[]) => void;
  setitemsConfigData: (data: ItemConfig[]) => void;
}

export const useUserStore = create<IUser>()((set) => ({
  userData: null,
  inventoryData: [],
  itemsConfigData: [],
  setUserData: (data) => {
    set(() => ({
      userData: data,
    }));
  },
  setInventoryData: (data) => {
    set(() => ({
      inventoryData: data,
    }));
  },
  setitemsConfigData: (data) => {
    set(() => ({
      itemsConfigData: data,
    }));
  },
}));
