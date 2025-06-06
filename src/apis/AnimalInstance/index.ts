//api

import { axiosAuthInstance } from '../axiosInstance';
import type { AnimalInShelter } from './type';

enum Path {
  CreateAnimalInShelter = '/api/v1/animal-shelter',
  Claim = '/api/v1/animal/claim/{id}',
  Feed = '/api/v1/animal/feed/{id}',
}

export const fetchCreateAnimalInShelter = (ushelter_id: string) => {
  return axiosAuthInstance.post<AnimalInShelter>(
    `${Path.CreateAnimalInShelter}/${ushelter_id}/animal`
  );
};
export const fetchClaim = (id: number) => {
  return axiosAuthInstance.patch<AnimalInShelter>(`${Path.Claim}/${id}`);
};
export const fetchFeed = (id: number) => {
  return axiosAuthInstance.patch<AnimalInShelter>(`${Path.Feed}/${id}`);
};
