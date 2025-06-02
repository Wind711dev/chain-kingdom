import { useEffect, useMemo, useRef } from 'react';
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
];

export default function PlantSeed({ isOpen = true, onClose }: PlantSeedProps) {
  const refs = useRef<Record<string, HTMLImageElement | null>>({});

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
      <div key={type} className='flex items-center justify-center w-[20%] h-full'>
        <img
          ref={getRefCallback(type)}
          src={imgIcon}
          alt={name}
          style={{ opacity }}
          onDragStart={() => console.log(`Dragging ${name}`)}
          onClick={() => console.log(`Clicked ${name}`)}
          className='cursor-grab active:cursor-grabbing pointer-events-auto w-full h-full'
        />
      </div>
    );
  };

  return (
    <>
      <div
        style={{ display: isOpen ? 'flex' : 'none' }}
        className='fixed z-[50] bottom-0 left-0 right-0 h-[15vh] justify-center items-start'
      >
        <div className='w-[70%] h-[8vh] bg-black/50 flex items-center justify-evenly rounded-2xl'>
          <div className='h-[50%]'>
            <img src={LeftArrow} alt='' className='w-full h-full' />
          </div>
          {seeds.map(renderSeed)}
          <div className='h-[50%]'>
            <img src={RightArrow} alt='' className='w-full h-full' />
          </div>
        </div>
        {/* <Carousel arrows infinite={false}>
          {seeds.map(renderSeed)}
        </Carousel> */}
      </div>
      <CarrotDragPreview />
      <CornDragPreview />
      <PaddyDragPreview />
    </>
  );
}
