import { axiosAuthInstance } from '../axiosInstance';
import type { UserResponse } from './types';

enum Path {
  GetProfile = '/api/v1/user/me',
}

export const fetchGetUseProfile = () => {
  return axiosAuthInstance.get<UserResponse>(`${Path.GetProfile}`);
};
