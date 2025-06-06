import { useDragLayer } from 'react-dnd';
import Carrot from '../../../assets/object/carrot.png';

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 1000,
  left: 0,
  top: 0,
};

function getItemStyles(initialOffset: any, currentOffset: any) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default function CarrotDragPreview() {
  const { itemType, isDragging, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || itemType !== 'CARROT') return null;

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <img src={Carrot} alt='Grass Preview' className='w-[15vw] drop-shadow-xl' />
      </div>
    </div>
  );
}
