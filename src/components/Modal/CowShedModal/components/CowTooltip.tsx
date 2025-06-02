import type { TooltipPlacement, TooltipProps } from 'antd/es/tooltip';
import Tooltip from 'antd/es/tooltip';
import React, { useEffect, useMemo, useState } from 'react';
import ClockIcon from '../../../../assets/object/clock_icon.png';
import CoinIcon from '../../../../assets/object/coin.png';
import MilkIcon from '../../../../assets/object/milk.png';

interface IProps {
  children: React.ReactNode;
  arrow?: 'Show' | 'Hide' | 'Center';
  placement?: TooltipPlacement;
  isOpen?: boolean;
  data?: IContentElm;
  handleEndTime: () => void;
  onBuyFast?: () => void;
}
interface IContentElm {
  quantity?: number;
  time?: number;
  cost?: number;
  onBuyFast?: () => void;
}

const ContentElm = ({ quantity, time, cost, onBuyFast }: IContentElm) => {
  return (
    <div className='flex items-center justify-evenly h-full p-2 w-[30vw]'>
      <div className='flex h-full'>
        <img src={MilkIcon} alt='Milk' className='w-6 h-6' />
        <p className='text-[#7B3706] text-base font-bold'>{quantity}</p>
      </div>
      <div className='custom-border-v'></div>
      <div className='w-[50%] flex flex-col items-center'>
        <div className='py-2 w-full flex justify-center items-center relative ml-[20%]'>
          <img src={ClockIcon} alt='ClockIcon' className='w-6 h-6 absolute left-[-15%]' />
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

export default function CowTooltip({
  children,
  placement = 'bottom',
  arrow = 'Show',
  isOpen,
  data = { quantity: 1, time: 20, cost: 3 },
  handleEndTime,
  onBuyFast,
}: IProps) {
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
    // if (!isOpen) return;
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
      placement={placement}
      title={
        <ContentElm
          cost={data.cost}
          quantity={data.quantity}
          time={remainingTime}
          onBuyFast={onBuyFast}
        />
      }
      arrow={mergedArrow}
      open={isOpen}
    >
      {children}
    </Tooltip>
  );
}
