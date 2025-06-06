import { axiosAuthInstance } from '../axiosInstance';
import type { BattleResponse } from './types';

enum Path {
  Match = '/api/v1/match',
}

export const fetchFightingMatch = () => {
  return axiosAuthInstance.get<BattleResponse>(`${Path.Match}`);
};
