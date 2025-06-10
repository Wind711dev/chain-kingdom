import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFarm } from '../../hooks/useFarm';
import { useUserStore } from '../../stores';
import { useFarmStore } from '../../stores/farm.store';
import FarmTile from './components/FarmTile';
import type { Plant, PlantPhase } from './components/types';
import { typeMap } from './components/types';
import './styles.scss';

interface FarmGridProps {
  openPlantSeed?: () => void;
}

export default function FarmGrid({ openPlantSeed }: FarmGridProps) {
  const { farmTooltip, plantData, seedId, setFarmTooltip } = useFarmStore();
  const { itemsConfigData } = useUserStore();
  const { handleSowingSeed } = useFarm();
  const plantRef = useRef<HTMLDivElement>(null);

  const [plants, setPlants] = useState<Plant[]>([]);

  const onOpenPlantTooltip = useCallback(
    (id: string) => {
      if (farmTooltip === id) {
        setFarmTooltip(null);
        return;
      }
      setFarmTooltip(id);
    },
    [farmTooltip, setFarmTooltip]
  );

  const handleDrop = useCallback(
    (plantId: string, name: keyof typeof typeMap) => {
      const hasEmptySlot = plants.some((plant) => plant.id === plantId && plant.type === 'none');
      if (!hasEmptySlot) {
        return;
      }
      const plant = plants.find((plant) => plant.phase !== 'seed' && plant.id === plantId);
      if (!plant || seedId === null) {
        return;
      }
      handleSowingSeed(seedId, plantId);
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
    [plants, seedId, setPlants]
  );

  const onOpenPlantSeed = useCallback(() => {
    if (plants.some((plant) => plant.type === 'none') && openPlantSeed) {
      openPlantSeed();
    } else {
      () => {};
    }
  }, [openPlantSeed, plants]);

  const treeHasGrown = (id: string, phase: PlantPhase) => {
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
        dataPlant={{
          quantity: plant.quantity,
          minute: plant.minute,
          second: plant.second,
          cost: plant.cost,
        }}
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

  const getPlantType = useCallback((id: number) => {
    switch (id) {
      case 3:
        return typeMap.CORN;
      case 4:
        return typeMap.PADDY;

      default:
        return 'none';
    }
  }, []);

  const getTime = useCallback((time: string | null, loadTime: number) => {
    if (!time) {
      return { minute: 0, second: 0 };
    }
    const timeGet = loadTime * 60 - dayjs().diff(dayjs(time), 'second');
    if (timeGet <= 0) {
      return { minute: 0, second: 0 };
    }
    return {
      minute: Math.floor(timeGet / 60),
      second: 0,
    };
  }, []);

  useEffect(() => {
    if (plantData.length === 0 || itemsConfigData.length === 0) return;
    const plantArray = plantData.map((item) => {
      const { minute, second } = getTime(
        item.last_seed_at,
        item?.seed?.metadata.max_loading_time ?? 0
      );
      return {
        id: item.id,
        type: getPlantType(item.seed_id),
        phase: !item.last_seed_at
          ? ('seed' as PlantPhase)
          : minute > 0
            ? ('sprout' as PlantPhase)
            : ('mature' as PlantPhase),
        quantity: item.seed?.metadata.max_production_holding ?? 0,
        minute: minute,
        second: second,
        cost: 3,
      };
    });
    setPlants(plantArray);
  }, [plantData, itemsConfigData, setPlants, getPlantType, getTime]);

  return <div className='farm-grid'>{plantMap}</div>;
}
