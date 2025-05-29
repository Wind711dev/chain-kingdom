import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import Grass from '../../../assets/object/grass.png';
import CarrotDragPreview from './CarrotDragPreview';
import CornDragPreview from './CornDragPreview';
import PaddyDragPreview from './PaddyDragPreview';

interface PlantSeedProps {
  isOpen?: boolean;
}

const seeds = [
  { type: 'CARROT', name: 'Carrot' },
  { type: 'PADDY', name: 'Paddy' },
  { type: 'CORN', name: 'Corn' },
];

export default function PlantSeed({ isOpen = true }: PlantSeedProps) {
  const refs = useRef<Record<string, HTMLImageElement | null>>({});

  const emptyImage = new Image();
  emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const getRefCallback = (type: string) => (el: HTMLImageElement | null) => {
    refs.current[type] = el;
  };

  const renderSeed = ({ type, name }: { type: string; name: string }) => {
    const [{ opacity }, drag, dragPreview] = useDrag(() => ({
      type, // Must be "CARROT", "PADDY", "CORN"
      item: { name: type }, // not name: "Carrot", must match keyof typeMap
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }));
    useEffect(() => {
      if (!isOpen) return;
      const ref = refs.current[type];
      if (ref) {
        drag(ref);
        dragPreview(emptyImage);
      }
    }, [isOpen, drag, dragPreview]);

    return (
      <div key={type}>
        <img
          ref={getRefCallback(type)}
          src={Grass}
          alt={name}
          style={{ opacity }}
          onDragStart={() => console.log(`Dragging ${name}`)}
          onClick={() => console.log(`Clicked ${name}`)}
          className='cursor-grab active:cursor-grabbing pointer-events-auto'
        />
      </div>
    );
  };

  return (
    <div
      style={{ display: isOpen ? 'flex' : 'none' }}
      className='fixed z-[50] bottom-0 left-0 right-0 h-[30vh] justify-center items-start'
    >
      <div className='w-[70%] h-[30%] bg-black/50 flex items-start justify-evenly'>
        {seeds.map(renderSeed)}
      </div>
      <CarrotDragPreview />
      <CornDragPreview />
      <PaddyDragPreview />
    </div>
  );
}
