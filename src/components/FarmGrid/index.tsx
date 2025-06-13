import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useCallback, useMemo } from 'react';

import PlotAdd from '../../assets/object/plot_add.png';
import { useFarm } from '../../hooks/useFarm';
import { useFarmStore, useUserStore } from '../../stores';
import FarmTile from './components/FarmTile';
import './styles.scss';

dayjs.extend(utc);
dayjs.extend(timezone);
interface FarmGridProps {
  isBuilding: boolean;
  openPlantSeed: () => void;
  openClaimPlant: () => void;
  onBuildPlot: () => void;
}

export default function FarmGrid({
  isBuilding,
  openPlantSeed,
  openClaimPlant,
  onBuildPlot,
}: FarmGridProps) {
  const { farmTooltip, farmData, setFarmTooltip, seedId } = useFarmStore();
  const { itemsConfigData } = useUserStore();
  const { handleSowingSeed, handleClaimPlant } = useFarm();
  // const plantRef = useRef<HTMLImageElement>(null);

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

  const onSowingSeed = useCallback(
    (plotId: string) => {
      handleSowingSeed(seedId ?? 0, plotId);
    },
    [itemsConfigData, seedId]
  );
  const onClaimPlant = useCallback(
    (id: string) => {
      handleClaimPlant(id);
    },
    [handleClaimPlant]
  );

  const farmMap = useMemo(() => {
    return farmData.map((farmItem) => {
      return (
        <FarmTile
          key={farmItem.id}
          isTooltipOpen={farmTooltip === farmItem.id}
          dataPlant={farmItem}
          onOpenPlantSeed={openPlantSeed}
          onOpenClaimPlant={openClaimPlant}
          onOpenPlantTooltip={onOpenPlantTooltip}
          onSowingSeed={onSowingSeed}
          onClaimPlant={onClaimPlant}
        />
      );
    });
  }, [
    farmData,
    farmTooltip,
    openPlantSeed,
    openClaimPlant,
    onOpenPlantTooltip,
    onSowingSeed,
    onClaimPlant,
  ]);

  return (
    <div className='absolute bottom-0 left-0 right-0 top-[50vh] z-1 flex flex-col items-center justify-center'>
      <div className='relative w-[90%] h-[90%]'>
        {farmMap}
        <>
          {isBuilding && (
            <div className={`absolute w-[16vw] z-2 tile `}>
              <div className='relative w-full h-full flex items-center' onClick={onBuildPlot}>
                <img src={PlotAdd} alt='Land Plot' className='w-full h-full z-3' />
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
