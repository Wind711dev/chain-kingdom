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
  data: IContentElm;
  arrow?: 'Show' | 'Hide' | 'Center';
  isOpen?: boolean;
  placement?: TooltipPlacement;
  onBuyFast?: () => void;
  handleEndTime: () => void;
  type?: InternalPlantType;
}
interface IContentElm {
  quantity?: number;
  minute: number;
  second: number;
  cost?: number;
  type?: InternalPlantType;
  onBuyFast?: () => void;
}
const ContentElm = ({ quantity, minute, second, cost, type, onBuyFast }: IContentElm) => {
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
            {minute > 0 && <span>{String(minute).padStart(2, '0')}m </span>}
            <span>{String(second).padStart(2, '0')}s</span>
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
  data,
  arrow = 'Show',
  isOpen,
  placement = 'bottom',
  type,
  onBuyFast,
  handleEndTime,
}: IPlantTooltip) {
  const [minute, setMinute] = useState(data.minute);
  const [second, setSecond] = useState(data.second);
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
    if (minute === 0 && second === 0 && minute !== undefined) {
      handleEndTime();
      return;
    }

    const interval = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond > 0) return prevSecond - 1;

        // Nếu second == 0, giảm phút và đặt lại giây
        if (minute !== undefined && minute > 0) {
          setMinute((prevMinute) => (prevMinute !== undefined ? prevMinute - 1 : 0));
          return 59;
        }

        // Đã hết thời gian
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minute, second]);

  return (
    <Tooltip
      open={isOpen}
      arrow={mergedArrow}
      placement={placement}
      title={
        <ContentElm
          cost={data.cost}
          quantity={data.quantity}
          minute={minute}
          second={second}
          onBuyFast={onBuyFast}
          type={type}
        />
      }
    >
      {children}
    </Tooltip>
  );
}
