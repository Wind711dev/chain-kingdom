import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useFarm, type FarmTileData } from '../../../hooks/useFarm';
import { useFarmStore, useUserStore } from '../../../stores';
import PlantTooltip from './PlantTooltip';
import { typeMap, type InternalPlantType, type PlantPhase } from './types';

interface FarmTileProps {
  dataPlant?: FarmTileData;
  isTooltipOpen?: boolean;
  onOpenPlantSeed: () => void;
  onOpenClaimPlant: () => void;
  onSowingSeed: (plotId: string) => void;
  onClaimPlant: (id: string) => void;
  onOpenPlantTooltip: (id: string) => void;
}

const plantImages = {
  carrot: { seed: CarrotSeed, sprout: CarrotSprout, mature: CarrotMature },
  paddy: { seed: PaddySeed, sprout: PaddySprout, mature: PaddyMature },
  corn: { seed: CornSeed, sprout: CornSprout, mature: CornMature },
  none: { seed: null, sprout: null, mature: null },
};

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function FarmTileComponent({
  dataPlant,
  isTooltipOpen,
  onOpenClaimPlant,
  onOpenPlantSeed,
  onOpenPlantTooltip,
  onSowingSeed,
  onClaimPlant,
}: FarmTileProps) {
  const plantRef = useRef<HTMLImageElement>(null);

  const [farmTileData, setFarmTileData] = useState<FarmTileData | undefined>(dataPlant);
  const [isCollecting, setIsCollecting] = useState(false);
  const [plantImg, setPlantImg] = useState<string | null>(null);

  const { getTimeCountdown, getTypePlant } = useFarm();
  const { itemsConfigData } = useUserStore();
  const { seedId } = useFarmStore();

  // const [plantInFarm, setPlantInFarm] = useState<{
  //   typePlant: InternalPlantType | 'none';
  //   plantImg: string | null;
  // }>({
  //   typePlant: 'none',
  //   plantImg: null,
  // });

  const [{ isOver, canDrop, draggedItem }, drop] = useDrop(() => ({
    accept: ['CARROT', 'PADDY', 'CORN', 'SICKLE'],
    drop: () => {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedItem: monitor.getItem() as { name: keyof typeof typeMap | 'SICKLE' } | null,
    }),
  }));

  useEffect(() => {
    if (!farmTileData || !farmTileData.isPlanted || !farmTileData.phase) {
      setPlantImg(null);
      return;
    }
    setPlantImg(plantImages[farmTileData.typePlant ?? 'none'][farmTileData.phase]);
  }, [farmTileData, setPlantImg]);

  const isShowTooltip = useMemo(() => {
    return (isTooltipOpen && farmTileData?.phase && farmTileData?.phase !== 'mature') ?? false;
  }, [isTooltipOpen, farmTileData]);

  const timeCountDown = useMemo(() => {
    if (farmTileData && farmTileData.timeSeed) {
      return getTimeCountdown(farmTileData.timeSeed, farmTileData.timeLoading);
    }
    return 0;
  }, [farmTileData]);

  const dataTooltip = useMemo(() => {
    return {
      id: farmTileData?.id ?? '',
      timeSeed: farmTileData?.timeSeed ?? '',
      timeLoading: farmTileData?.timeLoading ?? 0,
      quantity: farmTileData?.quantity ?? 0,
      cost: 0,
      type: (farmTileData?.typePlant ?? 'carrot') as InternalPlantType,
      timeCountDown: timeCountDown,
    };
  }, [farmTileData, timeCountDown]);

  const onClickFarmTile = useCallback(() => {
    if (!farmTileData?.phase) {
      onOpenPlantSeed();
      return;
    }
    if (farmTileData?.phase === 'mature') {
      onOpenClaimPlant();
      return;
    }
  }, [farmTileData, onOpenPlantSeed, onOpenClaimPlant]);

  const handlePhaseWithTime = useCallback(
    (isHalf: boolean) => {
      if (isHalf) {
        setFarmTileData((prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            phase: 'sprout',
          };
        });
      } else {
        setFarmTileData((prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            phase: 'mature',
          };
        });
      }
    },
    [setFarmTileData]
  );
  const handleDropSowing = useCallback(() => {
    if (farmTileData?.phase !== null || farmTileData?.id === undefined) {
      return;
    }
    const itemById = itemsConfigData.find((item) => item.id === seedId);
    const now = dayjs().tz(userTimeZone);
    console.log((itemById?.metadata.max_loading_time ?? 0) * 60);
    setFarmTileData((prev) => {
      if (!prev) return prev; // Ensure id exists
      return {
        ...prev,
        timeSeed: now.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        timeLoading: (itemById?.metadata.max_loading_time ?? 0) * 60,
        seedId: itemById?.id ?? 0,
        quantity: itemById?.metadata.max_production_holding ?? 0,
        typePlant: getTypePlant(itemById?.name ?? ''),
        isPlanted: true,
        phase: 'seed' as PlantPhase,
      };
    });

    onSowingSeed(farmTileData.id);
  }, [farmTileData, itemsConfigData, seedId, onSowingSeed]);

  const handleDropClaim = useCallback(
    (id: string) => {
      setFarmTileData((prev) => {
        if (!prev) return prev; // Ensure id exists
        return {
          ...prev,
          timeSeed: null,
          timeLoading: 0,
          typePlant: null,
          isPlanted: false,
          phase: null,
        };
      });

      onClaimPlant(id);
    },
    [onClaimPlant]
  );

  useEffect(() => {
    if (canDrop && isOver && draggedItem && draggedItem.name && draggedItem.name !== 'SICKLE') {
      handleDropSowing();
    }
    if (canDrop && isOver && draggedItem && draggedItem.name && draggedItem.name === 'SICKLE') {
      if (farmTileData?.phase === 'mature' && isCollecting === false && farmTileData?.id) {
        setIsCollecting(true); // 🔥 Kích hoạt animation
        setTimeout(() => {
          setIsCollecting(false); // Dừng animation sau 1s
          handleDropClaim(farmTileData.id);
        }, 1000);
      }
    }
  }, [
    canDrop,
    isOver,
    draggedItem,
    isCollecting,
    farmTileData,
    handleDropSowing,
    handleDropClaim,
    setIsCollecting,
  ]);

  return (
    // <></>
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`absolute w-[16vw] z-2 tile ${isOver ? 'hovered' : ''}`}
    >
      <PlantTooltip
        isShowTooltip={isShowTooltip}
        data={dataTooltip}
        handlePhaseWithTime={handlePhaseWithTime}
      >
        <div className='relative w-full h-full flex items-center' onClick={onClickFarmTile}>
          <img src={LandPlot} alt='Land Plot' className='w-full h-full z-3' />
          {plantImg && (
            <div
              className='absolute z-4 w-[80%] bottom-[30%] left-[15%]'
              onClick={() => onOpenPlantTooltip(farmTileData?.id ?? '')}
            >
              <img ref={plantRef} src={plantImg} alt='plant' className='w-[90%]' />
              <AnimatePresence>
                {isCollecting && (
                  <motion.img
                    src={plantImg}
                    alt='collect-icon'
                    className='collect-icon'
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -140, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', times: [0, 0.6, 1], delay: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </PlantTooltip>
    </div>
  );
}
// function areEqual(prevProps: FarmTileProps, nextProps: FarmTileProps) {
//   return (
//     prevProps.dataPlant?.id === nextProps.dataPlant?.id
//     // prevProps.dataPlant?.seed_id === nextProps.dataPlant?.seed_id &&
//     // prevProps.dataPlant?.last_seed_at === nextProps.dataPlant?.last_seed_at &&
//     // prevProps.isTooltipOpen === nextProps.isTooltipOpen
//     // callback functions thường không đổi reference nếu dùng useCallback từ cha
//     // nên bạn có thể bỏ kiểm nếu chắc chắn hoặc so sánh === nếu muốn kỹ hơn
//   );
// }

const FarmTile = memo(FarmTileComponent);
export default FarmTile;
