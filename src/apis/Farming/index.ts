import { apiGet, apiPatch, apiPost } from '../apiService';
import type { FarmPlotListResponse, SowingSeedResponse } from './types';

enum Path {
  Plots = '/api/v1/farming/plot',
}

export const fetchGetPlots = () => {
  return apiGet<FarmPlotListResponse>(`${Path.Plots}`);
};

export const fetchCreatePlot = (total: number) => {
  return apiPost<FarmPlotListResponse>(`${Path.Plots}`, { total: total });
};

export const fetchSowingSeed = (plantId: number, plotId: string) => {
  return apiPatch<SowingSeedResponse>(`${Path.Plots}/${plotId}/sowing`, { seed_id: plantId });
};

export const fetchClaimPlant = (id: string) => {
  return apiPatch<any>(`${Path.Plots}/${id}/claim`, {});
};
