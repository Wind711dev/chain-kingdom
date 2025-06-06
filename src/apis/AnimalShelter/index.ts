import { axiosAuthInstance } from '../axiosInstance';
import type { AnimalShelter } from './types';

enum Path {
  GetAllAnimalShelter = '/api/v1/user/animal-shelter',
  CreateAnimalShelter = '/api/v1/user/animal-shelter',
  GetShelter = '/api/v1/user/animal-shelter',
}

export const fetchGetAllAnimalShelter = () => {
  return axiosAuthInstance.get<AnimalShelter[]>(`${Path.GetAllAnimalShelter}`);
};
export const fetchCreateAnimalShelter = (id: number) => {
  return axiosAuthInstance.post<AnimalShelter>(`${Path.GetShelter}/${id}`);
};
export const fetchGetShelter = () => {
  return axiosAuthInstance.get<AnimalShelter>(`${Path.CreateAnimalShelter}`);
};
