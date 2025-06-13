import { Tooltip } from 'antd';

// import type { TooltipPlacement } from 'antd/es/tooltip';
import { useEffect, useMemo, useState } from 'react';
import CarrotIcon from '../../../assets/object/carrot.png';
import ClockIcon from '../../../assets/object/clock_icon.png';
import CoinIcon from '../../../assets/object/coin.png';
import CornIcon from '../../../assets/object/corn.png';
import PaddyIcon from '../../../assets/object/paddy.png';
import type { InternalPlantType } from './types';

interface IPlantTooltip {
  children: React.ReactNode;
  isShowTooltip: boolean;
  data: {
    id: string;
    timeSeed: string | null;
    timeLoading: number;
    quantity: number;
    cost: number;
    type: InternalPlantType;
    timeCountDown: number;
  };
  handlePhaseWithTime: (isHalf: boolean) => void;
}
interface IContentElm {
  quantity: number;
  countdown: number;
  cost: number;
  type: InternalPlantType;
}
const ContentElm = ({ quantity, countdown, cost, type }: IContentElm) => {
  const ImgPlant = useMemo(() => {
    switch (type) {
      case 'carrot':
        return CarrotIcon;
      case 'corn':
        return CornIcon;
      case 'paddy':
        return PaddyIcon;

      default:
        break;
    }
  }, [type]);
  const { minutes, seconds } = useMemo(() => {
    return {
      minutes: Math.floor(countdown / 60),
      seconds: countdown % 60,
    };
  }, [countdown]);
  const secondGenerated = useMemo(() => {
    if (seconds === 0) return '0';
    return String(seconds).padStart(2, '0');
  }, [seconds]);

  const onBuyFast = () => {
    // Implement the logic for fast buying here
    console.log('Fast buy clicked');
  };
  return (
    <div className='flex items-center justify-evenly h-full py-2 w-[35vw]'>
      <div className='flex h-full justify-center items-center gap-0.5'>
        <img src={ImgPlant} alt='ImgPlant' className='w-8 h-8' />
        <p className='text-[#7B3706] text-base font-bold'>{quantity}</p>
      </div>
      <div className='custom-border-v'></div>
      <div className='w-[50%] flex flex-col items-center'>
        <div className='py-2 w-full flex justify-center items-center relative'>
          <img src={ClockIcon} alt='ClockIcon' className='w-6 h-6 absolute left-[-5%]' />
          <div className='time-container w-[100%] h-3 flex items-center justify-center text-[#7B3706] text-sm font-bold uppercase'>
            {minutes > 0 && <span>{String(minutes).padStart(2, '0')}m </span>}
            <span>{secondGenerated}s</span>
          </div>
        </div>
        <button className='btn-fast' onClick={onBuyFast}>
          <img src={CoinIcon} alt='CoinIcon' className='w-2 h-2' />
          <span>{cost}</span>
        </button>
      </div>
    </div>
  );
};

export default function PlantTooltip({
  children,
  isShowTooltip,
  data,
  handlePhaseWithTime,
}: IPlantTooltip) {
  const [countdown, setCountdown] = useState<number | undefined>();

  useEffect(() => {
    if (data.timeCountDown === undefined || data.timeCountDown <= 0) {
      setCountdown(undefined);
      return;
    }

    setCountdown(data.timeCountDown);
  }, [data.timeCountDown]);

  useEffect(() => {
    // Trường hợp không hợp lệ: không làm gì cả
    if (countdown === undefined) return;

    if (countdown <= 0) {
      handlePhaseWithTime(false);
      return;
    }
    if (countdown <= data.timeLoading / 2) {
      handlePhaseWithTime(true);
    }
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === undefined || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, data.timeLoading, handlePhaseWithTime]);

  return (
    <Tooltip
      open={isShowTooltip}
      arrow={true}
      title={
        <ContentElm
          cost={data.cost}
          quantity={data.quantity}
          countdown={countdown ?? 0}
          type={data.type}
        />
      }
    >
      {children}
    </Tooltip>
  );
}
