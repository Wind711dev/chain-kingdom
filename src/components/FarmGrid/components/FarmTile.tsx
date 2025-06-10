import React, { useEffect } from 'react';
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
import PlantTooltip from './PlantTooltip';
import { typeMap, type InternalPlantType, type Plant, type PlantPhase } from './types';

interface FarmTileProps {
  plant: Plant;
  plantRef: React.RefObject<HTMLDivElement | null>;
  isTooltipOpen?: boolean;
  dataPlant: IDataPlant;
  onDrop: (plantId: string, name: keyof typeof typeMap) => void;
  onBuyFast?: () => void;
  onClick?: () => void;
  onEndTime: (id: string, phase: PlantPhase) => void;
}
interface IDataPlant {
  quantity?: number;
  minute: number;
  second: number;
  cost?: number;
}

const plantImages = {
  carrot: { seed: CarrotSeed, sprout: CarrotSprout, mature: CarrotMature },
  paddy: { seed: PaddySeed, sprout: PaddySprout, mature: PaddyMature },
  corn: { seed: CornSeed, sprout: CornSprout, mature: CornMature },
  none: { seed: '', sprout: '', mature: '' },
};

function FarmTile({ plant, isTooltipOpen, dataPlant, onDrop, onClick, onEndTime }: FarmTileProps) {
  const getPlantImage = (plantType: InternalPlantType, phase: PlantPhase): string => {
    return plantImages[plantType][phase];
  };

  const [{ isOver, canDrop, draggedItem }, drop] = useDrop(() => ({
    accept: ['CARROT', 'PADDY', 'CORN'],
    drop: () => {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedItem: monitor.getItem() as { name: keyof typeof typeMap } | null,
    }),
  }));

  useEffect(() => {
    if (canDrop && isOver && draggedItem && draggedItem.name && draggedItem.name in typeMap) {
      onDrop(plant.id, draggedItem.name);
    }
  }, [canDrop, isOver, draggedItem, onDrop, plant.id]);

  const plantImage = getPlantImage(plant.type, plant.phase);

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`tile ${isOver ? 'hovered' : ''}`}
    >
      <div onClick={onClick} className='relative w-full h-full flex items-center'>
        <img src={LandPlot} alt='land-plot' className='land-plot' />
        <PlantTooltip
          data={dataPlant}
          handleEndTime={() => onEndTime(plant.id, plant.phase)}
          isOpen={isTooltipOpen}
          onBuyFast={() => {}}
          type={plant.type}
        >
          {plantImage && (
            <img src={plantImage} alt={`${plant.type}-${plant.phase}`} className='plant' />
          )}
        </PlantTooltip>
      </div>
    </div>
  );
}

function areEqual(prevProps: FarmTileProps, nextProps: FarmTileProps) {
  return (
    prevProps.plant.id === nextProps.plant.id &&
    prevProps.plant.phase === nextProps.plant.phase &&
    prevProps.plant.type === nextProps.plant.type &&
    prevProps.isTooltipOpen === nextProps.isTooltipOpen &&
    prevProps.onDrop === nextProps.onDrop &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.onEndTime === nextProps.onEndTime
  );
}

export default React.memo(FarmTile, areEqual);
