// components/FarmGrid.tsx
import { useState } from 'react';
import FarmTile from './components/FarmTile';
import type { Plant, PlantPhase } from './components/types';
import { typeMap } from './components/types';
import './styles.scss';

interface FarmGridProps {
  onClick?: () => void;
}

export default function FarmGrid({ onClick }: FarmGridProps) {
  const [plants, setPlants] = useState<Plant[]>(
    Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      type: 'none',
      phase: 'seed' as PlantPhase,
    }))
  );

  const handleDrop = (plantId: number, name: keyof typeof typeMap) => {
    const newPlants: Plant[] = plants.map((plant) =>
      plant.id === plantId
        ? {
            ...plant,
            type: typeMap[name],
            phase: 'seed' as const,
          }
        : plant
    );
    setPlants(newPlants);
  };

  return (
    <div className='farm-grid'>
      {plants.map((plant) => (
        <FarmTile key={plant.id} plant={plant} onDrop={handleDrop} onClick={onClick} />
      ))}
    </div>
  );
}
