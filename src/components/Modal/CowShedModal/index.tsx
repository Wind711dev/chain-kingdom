import { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import CowShed from '../../../assets/object/cow_shed_modal.png';
import Grass from '../../../assets/object/grass.png';
import XButton from '../../../assets/object/x_btn.png';
import BaseModal from '../BaseModal';
import CowInModal from './components/CowInModal';
import GrassDragPreview from './components/GrassDragPreview';
import { CowModal, CowStatus } from './components/type';

interface ICowShedModalProps {
  isOpen: boolean;
  onClose?: () => void;
  setShakeMilkIcon: React.Dispatch<React.SetStateAction<boolean>>;
  handleCailm: () => void;
  milkHudRef: React.RefObject<HTMLDivElement | null>;
  milkHolding: number;
}

export default function CowShedModal({
  isOpen,
  onClose,
  setShakeMilkIcon,
  //   handleCailm,
  milkHudRef,
  milkHolding,
}: ICowShedModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [cowArray, setCowArray] = useState([
    {
      status: CowStatus.MILKING,
    },
    {
      status: CowStatus.EATING,
    },
    {
      status: CowStatus.MILKING,
    },
    {
      status: CowStatus.IDLE,
    },
  ]);

  const [{ opacity }, drag, dragPreview] = useDrag(() => ({
    type: CowModal.GRASS,
    item: { name: 'Grass' },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const onClickAddCow = () => {
    setCowArray((prev) => [...prev, { status: CowStatus.IDLE }]);
  };
  const onClickMilkHarvest = (value: number) => {
    // handleCailm();
    setCowArray((prev) => {
      const newCows = [...prev];
      newCows[value].status = CowStatus.IDLE;
      return newCows;
    });
  };
  const handleFeedCow = (value: number) => {
    setCowArray((prev) => {
      const newCows = [...prev];
      newCows[value].status = CowStatus.EATING;
      return newCows;
    });
  };

  const CowMap = useMemo(() => {
    const cows = cowArray.map((item, index) => (
      <CowInModal
        key={index}
        status={item.status}
        milkHudRef={milkHudRef}
        onClick={() => {}}
        onDrop={() => {
          handleFeedCow(index);
        }}
        setShakeMilkIcon={setShakeMilkIcon}
        handleCailm={() => onClickMilkHarvest(index)}
        milkHolding={milkHolding}
      />
    ));
    if (cowArray.length < 6) {
      cows.push(
        <CowInModal
          key={'add'}
          status={CowStatus.ADD}
          milkHudRef={milkHudRef}
          onClick={onClickAddCow}
          onDrop={() => {}}
          setShakeMilkIcon={setShakeMilkIcon}
          handleCailm={() => {}}
          milkHolding={milkHolding}
        />
      );
    }
    return cows;
  }, [cowArray]);

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
            <span className='text-[8vw] font-bold text-center block uppercase absolute w-full top-[8%]'>
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
          <div className='w-[35vw] h-[20vw] mt-[2rem] bg-black/40 rounded-[1rem] p-[1rem] flex items-center justify-center relative'>
            <img
              ref={imgRef}
              src={Grass}
              alt='grass'
              style={{ opacity }}
              onDragStart={() => console.log('Dragging grass')}
              onClick={() => console.log('Clicked grass')}
              className='w-[20vw] cursor-grab active:cursor-grabbing pointer-events-auto z-50'
            />
            <span className='absolute bg-[#FFE8B7] py-[0.5vw] px-[2vw] z-51 text-[3vw] bottom-[18%] right-[15%] rounded-sm text-[#7B3706] font-bold'>
              10
            </span>
          </div>
        </div>
      </BaseModal>
      <GrassDragPreview />
    </>
  );
}
