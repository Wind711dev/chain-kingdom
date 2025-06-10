import { apiGet } from '../apiService';
import type { InventoryResponse, ItemConfigResponse, UserProfileResponse } from './types';

enum Path {
  GetProfile = '/api/v1/user/me',
  GetInventory = '/api/v1/user/inventory',
  GetItemsConfig = '/api/v1/item',
}

export const fetchGetUseProfile = () => {
  return apiGet<UserProfileResponse>(`${Path.GetProfile}`);
};

export const fetchGetInventory = () => {
  return apiGet<InventoryResponse>(`${Path.GetInventory}`);
};

export const fetchGetItemsConfig = () => {
  return apiGet<ItemConfigResponse>(`${Path.GetItemsConfig}`);
};
