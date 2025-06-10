// components/types.ts
export type InternalPlantType = 'carrot' | 'paddy' | 'corn' | 'none';
export type PlantPhase = 'seed' | 'sprout' | 'mature';
export type PlantType = 'CARROT' | 'PADDY' | 'CORN';

export const typeMap: Record<PlantType, InternalPlantType> = {
  CARROT: 'carrot',
  PADDY: 'paddy',
  CORN: 'corn',
};

export interface Plant {
  id: string;
  type: InternalPlantType;
  phase: PlantPhase;
  quantity: number;
  minute: number;
  second: number;
  cost: number;
}
