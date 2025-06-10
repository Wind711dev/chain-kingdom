import { apiPost } from '../apiService';
import type { FightResultResponse } from './types';

enum Path {
  Match = '/api/v1/match',
}

export const fetchFightingMatch = () => {
  return apiPost<FightResultResponse>(`${Path.Match}`, {});
};
