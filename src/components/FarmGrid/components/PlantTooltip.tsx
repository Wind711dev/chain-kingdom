import { Tooltip, type TooltipProps } from 'antd';

import type { TooltipPlacement } from 'antd/es/tooltip';
import { useEffect, useMemo, useState } from 'react';
import CarrotIcon from '../../../assets/object/carrot.png';
import ClockIcon from '../../../assets/object/clock_icon.png';
import CoinIcon from '../../../assets/object/coin.png';
import CornIcon from '../../../assets/object/corn.png';
import PaddyIcon from '../../../assets/object/paddy.png';
import type { InternalPlantType } from './types';

interface IPlantTooltip {
  children: React.ReactNode;
  data?: IContentElm;
  arrow?: 'Show' | 'Hide' | 'Center';
  isOpen?: boolean;
  placement?: TooltipPlacement;
  onBuyFast?: () => void;
  handleEndTime: () => void;
  type?: InternalPlantType;
}
interface IContentElm {
  quantity?: number;
  time?: number;
  cost?: number;
  type?: InternalPlantType;
  onBuyFast?: () => void;
}
const ContentElm = ({ quantity, time, cost, type, onBuyFast }: IContentElm) => {
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
  return (
    <div className='flex items-center justify-evenly h-full p-2 w-[30vw]'>
      <div className='flex h-full'>
        <img src={ImgPlant} alt='ImgPlant' className='w-6 h-6' />
        <p className='text-[#7B3706] text-base font-bold'>{quantity}</p>
      </div>
      <div className='custom-border-v'></div>
      <div className='w-[50%] flex flex-col items-center'>
        <div className='py-2 w-full flex justify-center items-center relative'>
          <img src={ClockIcon} alt='ClockIcon' className='w-6 h-6 absolute left-[-5%]' />
          <div className='time-container w-[100%] h-3 flex items-center justify-center text-[#7B3706] text-sm font-bold uppercase'>
            {time}s
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
  data = { quantity: 1, time: 20, cost: 3 },
  arrow = 'Show',
  isOpen,
  placement = 'bottom',
  type,
  onBuyFast,
  handleEndTime,
}: IPlantTooltip) {
  const [remainingTime, setRemainingTime] = useState(data.time);
  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  useEffect(() => {
    if (remainingTime === undefined) return;
    if (remainingTime <= 0) {
      handleEndTime();
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === undefined) {
          clearInterval(interval);
          return 0;
        }
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <Tooltip
      open={isOpen}
      arrow={mergedArrow}
      placement={placement}
      title={
        <ContentElm
          cost={data.cost}
          quantity={data.quantity}
          time={remainingTime}
          onBuyFast={onBuyFast}
          type={type}
        />
      }
    >
      {children}
    </Tooltip>
  );
}
