//api

import { axiosAuthInstance } from '../axiosInstance';
import type { AnimalInShelter } from './types';

enum Path {
  CreateAnimalInShelter = '/api/v1/animal-shelter',
  Claim = '/api/v1/animal/claim',
  Feed = '/api/v1/animal/feed',
}

export const fetchCreateAnimalInShelter = (ushelter_id: string) => {
  return axiosAuthInstance.post<AnimalInShelter>(
    `${Path.CreateAnimalInShelter}/${ushelter_id}/animal`
  );
};
export const fetchClaim = (id: string) => {
  return axiosAuthInstance.patch<AnimalInShelter>(`${Path.Claim}/${id}`);
};
export const fetchFeed = (id: string) => {
  return axiosAuthInstance.patch<AnimalInShelter>(`${Path.Feed}/${id}`);
};
