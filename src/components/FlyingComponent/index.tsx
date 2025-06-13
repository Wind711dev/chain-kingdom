import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface IFlyingProps {
  start: { x: number; y: number };
  icon: string;
  delay?: number;
  onComplete?: () => void;
}

const FlyingComponent = ({ start, icon, delay = 0, onComplete }: IFlyingProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 1000 + delay); // animation duration + delay

    return () => clearTimeout(timeout);
  }, [onComplete, delay]);

  const flyUpDistance = 120 + Math.random() * 60;

  return (
    <motion.img
      src={icon}
      alt=''
      className='fixed w-6 h-6 z-[1000] pointer-events-none'
      initial={{ left: start.x, top: start.y, scale: 1, opacity: 1 }}
      animate={{
        top: [start.y, start.y - flyUpDistance, start.y - flyUpDistance],
        opacity: [1, 1, 0],
        scale: 0.8,
      }}
      transition={{
        duration: 1.6,
        ease: 'easeOut',
        delay: delay / 1000,
        times: [0, 0.6, 1],
      }}
    />
  );
};

export default FlyingComponent;
