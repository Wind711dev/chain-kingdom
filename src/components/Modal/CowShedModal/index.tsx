import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import CowShed from '../../../assets/object/cow_shed_modal.png';
import Grass from '../../../assets/object/grass.png';
import XButton from '../../../assets/object/x_btn.png';
import { useAnimalInstance, useAnimalShelter } from '../../../hooks';
import { useDataStore } from '../../../stores';
import BaseModal from '../BaseModal';
import CowInModal from './components/CowInModal';
import GrassDragPreview from './components/GrassDragPreview';
import TooltipGrass from './components/TooltipGrass';
import { CowModal, CowStatus } from './components/type';

interface ICowShedModalProps {
  isOpen: boolean;
  onClose?: () => void;
  setShakeMilkIcon: React.Dispatch<React.SetStateAction<boolean>>;
  handleCailm: (milk: number) => void;
  milkHudRef: React.RefObject<HTMLDivElement | null>;
}

const shedName = 'cowshed';

export default function CowShedModal({
  isOpen,
  onClose,
  setShakeMilkIcon,
  handleCailm,
  milkHudRef,
}: ICowShedModalProps) {
  const { goldAll, grass, cowPrice, cowShed, useGold } = useDataStore();
  const { handleGetShelter } = useAnimalShelter();
  const { handleCreateAnimalInShelter } = useAnimalInstance();

  const imgRef = useRef<HTMLImageElement>(null);
  const [isTooltip, setIsTooltip] = useState(false);
  const [hoveredCow, setHoveredCow] = useState<number | null>(null);
  const [disabledCows, setDisabledCows] = useState<boolean[]>([]);
  const [cowArray, setCowArray] = useState([
    {
      status: CowStatus.IDLE,
      quantity: 0,
      time: 0,
      cost: 0,
    },
    // {
    //   status: CowStatus.IDLE,
    //   quantity: 0,
    //   time: 0,
    //   cost: 0,
    // },
    // {
    //   status: CowStatus.IDLE,
    //   quantity: 0,
    //   time: 0,
    //   cost: 0,
    // },
    // {
    //   status: CowStatus.IDLE,
    //   quantity: 0,
    //   time: 0,
    //   cost: 0,
    // },
    // {
    //   status: CowStatus.IDLE,
    //   quantity: 0,
    //   time: 0,
    //   cost: 0,
    // },
    // {
    //   status: CowStatus.EATING,
    //   quantity: 60,
    //   time: 20,
    //   cost: 3,
    // },
  ]);

  const [{ opacity }, drag, dragPreview] = useDrag(() => ({
    type: CowModal.GRASS,
    item: { name: 'Grass' },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const onClickAddCow = useCallback(() => {
    handleCreateAnimalInShelter();
    useGold(cowPrice);
    setCowArray((prev) => [...prev, { status: CowStatus.IDLE, quantity: 0, time: 0, cost: 0 }]);
  }, [handleCreateAnimalInShelter, useGold, setCowArray, cowPrice]);
  const onClickMilkHarvest = useCallback(
    (value: number) => {
      handleCailm(cowArray[value].quantity);
      setCowArray((prev) => {
        const newCows = [...prev];
        newCows[value].status = CowStatus.IDLE;
        newCows[value].cost = 0;
        newCows[value].quantity = 0;
        newCows[value].time = 0;
        return newCows;
      });
    },
    [cowArray]
  );

  const handleFeedCow = (value: number) => {
    cowShed(1);
    setCowArray((prev) => {
      const newCows = [...prev];
      newCows[value].status = CowStatus.EATING;
      newCows[value].cost = 3;
      newCows[value].quantity = 60;
      newCows[value].time = 20;
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
    const cows = cowArray.map((item, index) => (
      <CowInModal
        key={index}
        status={item.status}
        disabled={disabledCows[index]}
        dataCow={{ quantity: item.quantity, time: item.time, cost: item.cost }}
        milkHudRef={milkHudRef}
        onClick={() => {
          onClickCowEat(index);
        }}
        onDrop={() => {
          handleFeedCow(index);
        }}
        setShakeMilkIcon={setShakeMilkIcon}
        handleCailm={() => {
          setDisabledCows((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });

          onClickMilkHarvest(index);

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
    ));
    if (cowArray.length < 6) {
      cows.push(
        <CowInModal
          key={'add'}
          status={CowStatus.ADD}
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
