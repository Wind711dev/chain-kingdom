// components/FarmTile.tsx
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import CarrotSeed from '../../../assets/object/carrot_1.png';
import CarrotSprout from '../../../assets/object/carrot_2.png';
import CarrotMature from '../../../assets/object/carrot_3.png';
import CornSeed from '../../../assets/object/corn_1.png';
import CornSprout from '../../../assets/object/corn_2.png';
import CornMature from '../../../assets/object/corn_3.png';
import LandPlot from '../../../assets/object/land_plot.png';
import PaddySeed from '../../../assets/object/paddy_1.png';
import PaddySprout from '../../../assets/object/paddy_2.png';
import PaddyMature from '../../../assets/object/paddy_3.png';
import type { InternalPlantType, Plant, PlantPhase, typeMap } from './types';

interface FarmTileProps {
  plant: Plant;
  onDrop: (plantId: number, name: keyof typeof typeMap) => void;
}

export default function FarmTile({ plant, onDrop }: FarmTileProps) {
  const plantImages = useMemo(
    () => ({
      carrot: { seed: CarrotSeed, sprout: CarrotSprout, mature: CarrotMature },
      paddy: { seed: PaddySeed, sprout: PaddySprout, mature: PaddyMature },
      corn: { seed: CornSeed, sprout: CornSprout, mature: CornMature },
      none: { seed: '', sprout: '', mature: '' },
    }),
    []
  );

  const getPlantImage = (plantType: InternalPlantType, phase: PlantPhase): string => {
    return plantImages[plantType][phase];
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['CARROT', 'PADDY', 'CORN'],
    drop: (item: { name: keyof typeof typeMap }) => {
      onDrop(plant.id, item.name);
      console.log('Dropped:', item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const plantImage = getPlantImage(plant.type, plant.phase);

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`tile ${isOver ? 'hovered' : ''}`}
    >
      <img src={LandPlot} alt='land-plot' className='land-plot' />
      {plantImage && (
        <img src={plantImage} alt={`${plant.type}-${plant.phase}`} className='plant' />
      )}
    </div>
  );
}
