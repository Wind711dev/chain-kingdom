import { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import Carrot from '../../../assets/object/carrot.png';
import Corn from '../../../assets/object/corn.png';
import LeftArrow from '../../../assets/object/left_arrow.png';
import Paddy from '../../../assets/object/paddy.png';
import RightArrow from '../../../assets/object/right_arrow.png';
import CarrotDragPreview from './CarrotDragPreview';
import CornDragPreview from './CornDragPreview';
import PaddyDragPreview from './PaddyDragPreview';

interface PlantSeedProps {
  isOpen?: boolean;
  onClose: () => void;
}

const seeds = [
  { type: 'PADDY', name: 'Paddy' },
  { type: 'CORN', name: 'Corn' },
  { type: 'CARROT', name: 'Carrot' },
  // { type: 'TOMATO', name: 'Tomato' },
  // { type: 'POTATO', name: 'Potato' },
  // { type: 'WHEAT', name: 'Wheat' },
  // { type: 'RICE', name: 'Rice' },
  // { type: 'BEAN', name: 'Bean' },
  // { type: 'LETTUCE', name: 'Lettuce' },
];

export default function PlantSeed({ isOpen = true, onClose }: PlantSeedProps) {
  const refs = useRef<Record<string, HTMLImageElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const emptyImage = new Image();
  emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const getRefCallback = (type: string) => (el: HTMLImageElement | null) => {
    refs.current[type] = el;
  };

  const renderSeed = ({ type, name }: { type: string; name: string }) => {
    const [{ opacity, isDragging }, drag, dragPreview] = useDrag(() => ({
      type,
      item: { name: type },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        isDragging: monitor.isDragging(),
      }),
    }));
    useEffect(() => {
      const ref = refs.current[type];
      if (ref) {
        drag(ref);
      }
      dragPreview(emptyImage);
    }, [drag, dragPreview]);

    useEffect(() => {
      if (isDragging) {
        onClose();
      }
    }, [isDragging]);

    const imgIcon = useMemo(() => {
      switch (type) {
        case 'CARROT':
          return Carrot;
        case 'PADDY':
          return Paddy;

        default:
          return Corn;
      }
    }, [type]);

    return (
      <div
        key={type}
        className='flex items-center justify-center w-[12vw] h-[12vw] bg-[#00000099] rounded-xl'
      >
        <img
          ref={getRefCallback(type)}
          src={imgIcon}
          alt={name}
          style={{ opacity }}
          onDragStart={() => console.log(`Dragging ${name}`)}
          onClick={() => console.log(`Clicked ${name}`)}
          className='cursor-grab active:cursor-grabbing pointer-events-auto w-[90%] h-[90%]'
        />
      </div>
    );
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // trừ nhẹ để tránh lỗi làm tròn
  };

  useEffect(() => {
    updateScrollButtons(); // khởi tạo trạng thái nút
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', updateScrollButtons);
    }
    return () => {
      scrollEl?.removeEventListener('scroll', updateScrollButtons);
    };
  }, []);
  return (
    <>
      <div
        style={{ display: isOpen ? 'flex' : 'none' }}
        className='fixed z-[50] bottom-0 left-0 right-0 h-[20vh] justify-center items-start'
      >
        <div className='w-[80%] h-[10vh] bg-black/50 rounded-2xl flex items-center justify-between'>
          <div
            className={`h-[80%] w-[10%] px-1 py-3 cursor-pointer ${!canScrollLeft ? 'opacity-30 pointer-events-none' : ''}`}
            onClick={scrollLeft}
          >
            <img src={LeftArrow} alt='' className='w-full h-full' />
          </div>
          <div
            className='flex-1 h-[8vh] flex items-center gap-2 overflow-x-auto scroll-smooth scrollbar-hide'
            ref={scrollRef}
          >
            <div className='flex gap-2 flex-nowrap px-2'>{seeds.map(renderSeed)}</div>
          </div>
          <div
            className={`h-[80%] w-[10%] px-1 py-3 cursor-pointer ${!canScrollRight ? 'opacity-30 pointer-events-none' : ''}`}
            onClick={scrollRight}
          >
            <img src={RightArrow} alt='' className='w-full h-full' />
          </div>
        </div>
      </div>
      <CarrotDragPreview />
      <CornDragPreview />
      <PaddyDragPreview />
    </>
  );
}
