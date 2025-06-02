// components/FarmGrid.tsx
import { useRef, useState } from 'react';
import FarmTile from './components/FarmTile';
import type { Plant, PlantPhase } from './components/types';
import { typeMap } from './components/types';
import './styles.scss';

interface FarmGridProps {
  openPlantSeed?: () => void;
  // onOpenTooltip: () => void;
}

export default function FarmGrid({ openPlantSeed }: FarmGridProps) {
  const plantRef = useRef<HTMLDivElement>(null);
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);

  const [plants, setPlants] = useState<Plant[]>(
    Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      type: 'none',
      phase: 'seed' as PlantPhase,
    }))
  );

  const handleDrop = (plantId: number, name: keyof typeof typeMap) => {
    const hasEmptySlot = plants.some((plant) => plant.id === plantId && plant.type === 'none');
    if (!hasEmptySlot) {
      return;
    }
    const newPlants: Plant[] = plants.map((plant) => {
      return plant.id === plantId && plant.type === 'none'
        ? {
            ...plant,
            type: typeMap[name],
            phase: 'seed' as const,
          }
        : plant;
    });
    setPlants(newPlants);
  };

  const onOpenPlantSeed = () => {
    if (plants.some((plant) => plant.type === 'none') && openPlantSeed) {
      openPlantSeed();
    } else {
      () => {};
    }
  };

  const onOpenPlantTooltip = (id: number) => {
    if (openTooltip === id) {
      setOpenTooltip(null);
      return;
    }
    setOpenTooltip(id);
  };

  return (
    <div className='farm-grid' onClick={onOpenPlantSeed}>
      {plants.map((plant) => (
        <FarmTile
          key={plant.id}
          plantRef={plantRef}
          plant={plant}
          onDrop={handleDrop}
          isTooltipOpen={
            openTooltip === plant.id && plant.type !== 'none' && plant.phase === 'mature'
          }
          onClick={() => {
            onOpenPlantTooltip(plant.id);
          }}
          onBuyFast={() => {}}
        />
      ))}
    </div>
  );
}
