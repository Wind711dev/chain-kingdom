import { apiGet, apiPost } from '../apiService';
import type { QuestResponse, QuestUpdateResponse } from './types';

enum Path {
  Mission = '/api/v1/mission',
  MissionUpdate = '/api/v1/mission/do',
}

export const fetchGetMission = () => {
  return apiGet<QuestResponse>(`${Path.Mission}`);
};

export const fetchDoDuty = (id: number) => {
  return apiPost<QuestUpdateResponse>(`${Path.MissionUpdate}/${id}`, {});
};
