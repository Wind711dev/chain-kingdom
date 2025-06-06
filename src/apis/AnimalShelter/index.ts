import { apiGet, apiPost } from '../apiService';
import type { AnimalShelter, ShelterInfo } from './types';

enum Path {
  GetAllAnimalShelter = '/api/v1/user/animal-shelter',
  CreateAnimalShelter = '/api/v1/user/animal-shelter',
  GetShelter = '/api/v1/user/animal-shelter',
  GetShelterTypes = '/api/v1/animal-shelter/types',
}

export const fetchGetAllAnimalShelter = () => {
  return apiGet<{ data: AnimalShelter[] }>(`${Path.GetAllAnimalShelter}`);
};
export const fetchCreateAnimalShelter = (id: number) => {
  return apiPost<{ data: AnimalShelter }>(`${Path.CreateAnimalShelter}`, { shelter_id: id });
};
export const fetchGetShelter = (id: string) => {
  return apiGet<{ data: AnimalShelter }>(`${Path.GetShelter}/${id}`);
};
export const fetchGetShelterTypes = () => {
  return apiGet<{ data: ShelterInfo[] }>(`${Path.GetShelterTypes}`);
};