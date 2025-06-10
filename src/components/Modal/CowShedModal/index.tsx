import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import type { AnimalInShelter } from '../../../apis/AnimalInstance/types';
import CowShed from '../../../assets/object/cow_shed_modal.png';
import Grass from '../../../assets/object/grass.png';
import XButton from '../../../assets/object/x_btn.png';
import { useAnimalInstance, useAnimalShelter } from '../../../hooks';
import { useDataStore, useShelter, useUserStore } from '../../../stores';
import BaseModal from '../BaseModal';
import CowInModal from './components/CowInModal';
import GrassDragPreview from './components/GrassDragPreview';
import TooltipGrass from './components/TooltipGrass';
import { CowModal, CowStatus } from './components/type';

interface ICowShedModalProps {
  isOpen: boolean;
  onClose?: () => void;
  setShakeMilkIcon: React.Dispatch<React.SetStateAction<boolean>>;
  milkHudRef: React.RefObject<HTMLDivElement | null>;
}

interface ICow extends AnimalInShelter {
  status: CowStatus.IDLE | CowStatus.ADD | CowStatus.EATING | CowStatus.MILKING;
  quantity: number;
  time: number;
  cost: number;
}

const shedName = 'cowshed';

export default function CowShedModal({
  isOpen,
  onClose,
  setShakeMilkIcon,
  milkHudRef,
}: ICowShedModalProps) {
  const { goldAll, cowShed, useGold } = useDataStore();
  const { handleGetShelter } = useAnimalShelter();
  const { inventoryData } = useUserStore();
  const { handleCreateAnimalInShelter, handleFeed, handleClaim } = useAnimalInstance();
  const { cowInShelter } = useShelter();

  const imgRef = useRef<HTMLImageElement>(null);
  const [isTooltip, setIsTooltip] = useState(false);
  const [hoveredCow, setHoveredCow] = useState<number | null>(null);
  const [disabledCows, setDisabledCows] = useState<boolean[]>([]);
  const [cowArray, setCowArray] = useState<ICow[]>([]);
  const [cowPrice, setCowPrice] = useState<number>(0);

  const [{ opacity }, drag, dragPreview] = useDrag(() => ({
    type: CowModal.GRASS,
    item: { name: 'Grass' },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const grass = useMemo(() => {
    const grassItem = inventoryData.find((item) => item.info.name === 'grass');
    return grassItem ? grassItem.total : 0;
  }, [inventoryData]);

  const onClickAddCow = useCallback(() => {
    handleCreateAnimalInShelter(shedName);
    useGold(cowPrice);
  }, [handleCreateAnimalInShelter, useGold, cowPrice]);
  const onClickMilkHarvest = useCallback(
    (id: string, index: number) => {
      handleClaim(id);
      setCowArray((prev) => {
        const newCows = [...prev];
        newCows[index].status = CowStatus.IDLE;
        newCows[index].cost = 0;
        return newCows;
      });
    },
    [cowArray, handleClaim, setCowArray]
  );

  const handleFeedCow = (id: string, index: number) => {
    cowShed(1);
    handleFeed(id);
    setCowArray((prev) => {
      const newCows = [...prev];
      newCows[index].status = CowStatus.EATING;
      return newCows;
    });
  };

  const handleEndTime = useCallback(
    (cow: number) => {
      setCowArray((prev) => {
        const newCows = [...prev];
        newCows[cow].time = 0;
        newCows[cow].status = CowStatus.MILKING;
        return newCows;
      });
    },
    [setCowArray]
  );

  const onBuyFast = useCallback(
    (cow: number) => {
      if (goldAll < cowArray[cow].cost) {
        return;
      }
      useGold(cowArray[cow].cost);
      setCowArray((prev) => {
        const newCows = [...prev];
        newCows[cow].time = 0;
        newCows[cow].status = CowStatus.MILKING;
        return newCows;
      });
    },
    [cowArray, goldAll, setCowArray]
  );

  const onClickCowEat = useCallback(
    (cow: number) => {
      if (hoveredCow === cow) {
        setHoveredCow(null);
        return;
      }
      setHoveredCow(cow);
    },
    [hoveredCow, setHoveredCow]
  );

  const CowMap = useMemo(() => {
    const cows = cowArray.map((item, index) => {
      return (
        <CowInModal
          key={index}
          status={item.status}
          disabled={disabledCows[index]}
          dataCow={{
            quantity: item.quantity,
            lastFeedTime: item.last_feed_at,
            maxLoadTime: item.metadata.max_loading_time,
            cost: item.cost,
          }}
          milkHudRef={milkHudRef}
          onClick={() => {
            onClickCowEat(index);
          }}
          onDrop={() => {
            handleFeedCow(item.id, index);
          }}
          setShakeMilkIcon={setShakeMilkIcon}
          handleCailm={() => {
            setDisabledCows((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });

            onClickMilkHarvest(item.id, index);

            setTimeout(() => {
              setDisabledCows((prev) => {
                const updated = [...prev];
                updated[index] = false;
                return updated;
              });
            }, 1000);
          }}
          handleEndTime={() => handleEndTime(index)}
          isTooltipOpen={hoveredCow === index && item.time > 0}
          onBuyFast={() => {
            onBuyFast(index);
          }}
        />
      );
    });
    if (cowArray.length < 6) {
      cows.push(
        <CowInModal
          key={'add'}
          status={CowStatus.ADD}
          dataCow={{ quantity: 0, cost: 0, lastFeedTime: '', maxLoadTime: 0 }}
          milkHudRef={milkHudRef}
          onDrop={() => {}}
          onClick={onClickAddCow}
          setShakeMilkIcon={setShakeMilkIcon}
          handleCailm={() => {}}
          handleEndTime={() => {}}
          cowPrice={cowPrice}
        />
      );
    }
    return cows;
  }, [
    cowArray,
    cowPrice,
    hoveredCow,
    disabledCows,
    milkHudRef,
    handleEndTime,
    onClickCowEat,
    onClickMilkHarvest,
    onBuyFast,
    onClickAddCow,
  ]);

  const getDataShed = useCallback(async () => {
    await handleGetShelter(shedName);
  }, []);

  useEffect(() => {
    setDisabledCows(new Array(cowArray.length).fill(false));
  }, [cowArray]);

  const cowSet = useCallback(() => {
    if (!cowInShelter || cowInShelter.length < 0) {
      handleCreateAnimalInShelter(shedName);
      return;
    }
    const cowArr = cowInShelter.map((item) => {
      if (cowPrice === 0) {
        setCowPrice(item.metadata.price);
      }
      return {
        ...item,
        status: item.last_feed_at === null ? CowStatus.IDLE : CowStatus.EATING,
        quantity: item.metadata.max_loading_time,
        time: item.metadata.max_production_holding * 60,
        cost: 0,
      };
    });
    setCowArray(cowArr as ICow[]);
  }, [cowInShelter, cowPrice, setCowArray]);

  useEffect(() => {
    if (isOpen) {
      cowSet();
    }
  }, [isOpen, cowSet]);

  useEffect(() => {
    if (!isOpen) {
      setIsTooltip(false);
      setHoveredCow(null);
    } else {
      getDataShed();
    }
  }, [isOpen]);

  useEffect(() => {
    if (imgRef.current) {
      drag(imgRef.current);
    }
    const emptyImage = new Image();
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    dragPreview(emptyImage);
  }, [drag, dragPreview, imgRef, isOpen]);

  return (
    <>
      <BaseModal isOpen={isOpen}>
        <div className='w-full flex items-center flex-col'>
          <div className='w-[95vw] relative'>
            <span className='text-[8vw] font-bold text-center block uppercase absolute w-full top-[8%] text-[#FFFFFF]'>
              CowShed
            </span>
            <img
              src={XButton}
              alt='cow-shed'
              className='absolute right-[11.5%] top-[2%] w-[7%]'
              onClick={onClose}
            />
            <img src={CowShed} alt='cow-shed' className='w-[100%]' />
            <div className='flex gap-0 absolute bottom-[7%] left-[12%]'>{CowMap}</div>
          </div>
          <TooltipGrass isOpen={isTooltip}>
            <div className='w-[35vw] h-[20vw] mt-[2rem] bg-black/40 rounded-[1rem] p-[1rem] flex items-center justify-center relative'>
              <img
                ref={imgRef}
                src={Grass}
                alt='grass'
                style={{ opacity }}
                onDragStart={(e) => {
                  if (grass === 0) {
                    e.preventDefault();
                  } else {
                    console.log('Dragging grass');
                  }
                }}
                onClick={() => setIsTooltip(!isTooltip)}
                className={`w-[20vw] z-50 ${
                  grass === 0
                    ? 'cursor-default pointer-events-none opacity-50'
                    : 'cursor-grab active:cursor-grabbing pointer-events-auto'
                }`}
              />
              <span className='absolute bg-[#FFE8B7] py-[0.5vw] px-[2vw] z-51 text-[3vw] bottom-[18%] right-[15%] rounded-sm text-[#7B3706] font-bold'>
                {grass}
              </span>
            </div>
          </TooltipGrass>
        </div>
      </BaseModal>
      <GrassDragPreview />
    </>
  );
}
