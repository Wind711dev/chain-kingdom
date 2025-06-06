import { create } from 'zustand';
import type { UserData } from '../apis/User/types';

interface IUser {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
}

export const useUserStore = create<IUser>()((set) => ({
  userData: null,
  setUserData: (data) => {
    set(() => ({
      userData: data,
    }));
  },
}));
