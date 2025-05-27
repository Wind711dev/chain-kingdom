import { motion } from 'framer-motion';
import CoinIcon from '../../assets/object/coin.png';
import MilkIcon from '../../assets/object/milk.png';
import './styles.scss';
interface IHUDProps {
  milkCount: number;
  goldCount: number;
  shakeMilkIcon: boolean;
  shakeGoldIcon: boolean;
  setShakeMilkIcon: (value: boolean) => void;
  setShakeGoldIcon: (value: boolean) => void;
  milkHudRef: React.RefObject<HTMLDivElement | null>;
  goldHudRef: React.RefObject<HTMLDivElement | null>;
}

export default function HUDComponent({
  milkCount,
  shakeMilkIcon,
  setShakeMilkIcon,
  setShakeGoldIcon,
  milkHudRef,
  goldCount,
  goldHudRef,
  shakeGoldIcon,
}: IHUDProps) {
  return (
    <div className='hud'>
      <motion.div
        className='hud-item'
        ref={goldHudRef}
        animate={shakeGoldIcon ? { x: [0, -4, 4, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
        onAnimationComplete={() => setShakeGoldIcon(false)}
      >
        <img src={CoinIcon} alt='coin' />
        <span className='gradient-text'>{goldCount}</span>
      </motion.div>
      <motion.div
        className='hud-item'
        animate={shakeMilkIcon ? { x: [0, -4, 4, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
        onAnimationComplete={() => setShakeMilkIcon(false)}
        ref={milkHudRef}
      >
        <img src={MilkIcon} alt='milk' />
        <span className='gradient-text'>{milkCount}</span>
      </motion.div>
    </div>
  );
}
