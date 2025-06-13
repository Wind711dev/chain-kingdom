import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useFarmStore } from '../../../stores';

import SickleIcon from '../../../assets/object/sickle.png';
import SickleDragPreview from './SickleDragPreview';

interface ClaimPlantProps {
  isOpen?: boolean;
  onClose: () => void;
}

interface SickleItem {
  type: string;
  name: string;
  id: number;
}

const SeedComponent = ({ type, name, id, onClose }: SickleItem & { onClose: () => void }) => {
  const refs = useRef<Record<string, HTMLImageElement | null>>({});
  const { setSeedId } = useFarmStore();
  const [{ opacity, isDragging }, drag, dragPreview] = useDrag(() => ({
    type,
    item: { name: type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: monitor.isDragging(),
    }),
  }));

  const getRefCallback = (type: string) => (el: HTMLImageElement | null) => {
    refs.current[type] = el;
  };
  const emptyImage = new Image();
  emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  useEffect(() => {
    dragPreview(emptyImage);
  }, [dragPreview]);

  useEffect(() => {
    const ref = refs.current[type];
    if (ref) {
      drag(ref);
    }
  }, [drag]);

  useEffect(() => {
    if (isDragging) {
      setSeedId(id);
      onClose();
    }
  }, [isDragging]);

  return (
    <div className='flex items-center justify-center w-[12vw] h-[12vw] bg-[#00000099] rounded-xl'>
      <img
        ref={getRefCallback(type)}
        src={SickleIcon}
        alt={name}
        style={{ opacity }}
        onDragStart={() => console.log(`Dragging ${name}`)}
        onClick={() => console.log(`Clicked ${name}`)}
        className='cursor-grab active:cursor-grabbing pointer-events-auto w-[90%] h-[90%]'
      />
    </div>
  );
};

export default function ClaimPlant({ isOpen = true, onClose }: ClaimPlantProps) {
  return (
    <>
      <div
        style={{ display: isOpen ? 'flex' : 'none' }}
        className='fixed z-[50] bottom-0 left-0 right-0 h-[20vh] justify-center items-start'
      >
        <div className='w-[80%] h-[10vh] bg-black/50 rounded-2xl flex items-center justify-center'>
          <SeedComponent id={0} name='Sickle' type='SICKLE' onClose={onClose} />
        </div>
      </div>
      <SickleDragPreview />
    </>
  );
}
