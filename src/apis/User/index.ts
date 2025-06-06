import { apiGet } from '../apiService';
import type { UserResponse } from './types';

enum Path {
  GetProfile = '/api/v1/user/me',
}

export const fetchGetUseProfile = () => {
  return apiGet<UserResponse>(`${Path.GetProfile}`);
};
