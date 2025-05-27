import { motion } from 'framer-motion';
import { useState } from 'react';

interface IFlyingProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  setShakeIcon?: (value: boolean) => void;
  icon: string;
  onComplete?: () => void;
  delay?: number;
}

const FlyingComponent = ({ start, end, setShakeIcon, icon, onComplete, delay }: IFlyingProps) => {
  const [phase, setPhase] = useState<'up' | 'curve'>('up');

  const intermediateY = start.y - 80;

  return (
    <motion.img
      src={icon}
      alt=''
      className='fixed w-6 h-6 z-[1000] pointer-events-none'
      initial={{ left: start.x, top: start.y, scale: 1, opacity: 1 }}
      animate={
        phase === 'up'
          ? { top: intermediateY }
          : {
              left: end.x,
              top: end.y,
              scale: 0.6,
              opacity: 0,
            }
      }
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
        delay: phase === 'up' ? (delay || 0) / 1000 : 0,
      }}
      onAnimationComplete={() => {
        if (phase === 'up') {
          setPhase('curve');
        } else {
          setShakeIcon?.(true);
          setTimeout(() => {
            onComplete?.();
          }, 100);
        }
      }}
    />
  );
};

export default FlyingComponent;
