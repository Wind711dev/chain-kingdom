import { useCallback, useMemo, useRef, useState } from 'react';
import { useFarmStore } from '../../stores/farm.store';
import FarmTile from './components/FarmTile';
import type { Plant, PlantPhase } from './components/types';
import { typeMap } from './components/types';
import './styles.scss';

interface FarmGridProps {
  openPlantSeed?: () => void;
}

export default function FarmGrid({ openPlantSeed }: FarmGridProps) {
  const { farmTooltip, setFarmTooltip } = useFarmStore();
  const plantRef = useRef<HTMLDivElement>(null);

  const [plants, setPlants] = useState<Plant[]>([
    {
      id: 1,
      type: 'none',
      phase: 'seed',
      quantity: 1,
      time: 20,
      cost: 3,
    },
    {
      id: 2,
      type: 'none',
      phase: 'seed',
      quantity: 1,
      time: 20,
      cost: 3,
    },
    {
      id: 3,
      type: 'none',
      phase: 'seed',
      quantity: 1,
      time: 20,
      cost: 3,
    },
    {
      id: 4,
      type: 'none',
      phase: 'seed',
      quantity: 1,
      time: 20,
      cost: 3,
    },
  ]);

  const onOpenPlantTooltip = useCallback(
    (id: number) => {
      if (farmTooltip === id) {
        setFarmTooltip(null);
        return;
      }
      setFarmTooltip(id);
    },
    [farmTooltip, setFarmTooltip]
  );

  const handleDrop = useCallback(
    (plantId: number, name: keyof typeof typeMap) => {
      const hasEmptySlot = plants.some((plant) => plant.id === plantId && plant.type === 'none');
      if (!hasEmptySlot) {
        return;
      }
      const newPlants: Plant[] = plants.map((plant) => {
        return plant.id === plantId && plant.type === 'none'
          ? {
              ...plant,
              type: typeMap[name],
              phase: 'sprout' as const,
            }
          : plant;
      });
      setPlants(newPlants);
    },
    [plants, setPlants]
  );

  const onOpenPlantSeed = useCallback(() => {
    if (plants.some((plant) => plant.type === 'none') && openPlantSeed) {
      openPlantSeed();
    } else {
      () => {};
    }
  }, [openPlantSeed, plants]);

  const treeHasGrown = (id: number, phase: PlantPhase) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id && phase === 'sprout' ? { ...plant, phase: 'mature' } : plant
      )
    );
  };

  const buyFast = useCallback(() => {}, []);

  const plantMap = useMemo(() => {
    return plants.map((plant) => (
      <FarmTile
        key={plant.id}
        plantRef={plantRef}
        plant={plant}
        dataPlant={{ quantity: plant.quantity, time: plant.time, cost: plant.cost }}
        onDrop={handleDrop}
        onEndTime={(id, phase) => {
          treeHasGrown(id, phase);
        }}
        isTooltipOpen={farmTooltip === plant.id && plant.phase === 'sprout'}
        onClick={() => {
          plant.type === 'none' ? onOpenPlantSeed() : onOpenPlantTooltip(plant.id);
        }}
        onBuyFast={buyFast}
      />
    ));
  }, [
    plants,
    farmTooltip,
    plantRef,
    handleDrop,
    onOpenPlantSeed,
    onOpenPlantTooltip,
    treeHasGrown,
    buyFast,
  ]);

  return <div className='farm-grid'>{plantMap}</div>;
}
