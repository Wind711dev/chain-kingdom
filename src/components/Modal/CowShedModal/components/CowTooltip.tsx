import type { TooltipPlacement, TooltipProps } from 'antd/es/tooltip';
import Tooltip from 'antd/es/tooltip';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import ClockIcon from '../../../../assets/object/clock_icon.png';
import CoinIcon from '../../../../assets/object/coin.png';
import MilkIcon from '../../../../assets/object/milk.png';

interface IProps {
  children: React.ReactNode;
  arrow?: 'Show' | 'Hide' | 'Center';
  placement?: TooltipPlacement;
  isOpen?: boolean;
  data: {
    quantity: number;
    maxLoadTime: number;
    lastFeedTime: string;
    cost?: number;
    onBuyFast?: () => void;
  };
  handleEndTime: () => void;
  onBuyFast?: () => void;
}
interface IContentElm {
  quantity: number;
  minute: number;
  second: number;
  cost?: number;
  onBuyFast?: () => void;
}

const ContentElm = ({ quantity, minute, second, cost, onBuyFast }: IContentElm) => {
  return (
    <div className='flex items-center justify-evenly h-full p-2 w-[40vw]'>
      <div className='flex h-full gap-0.5'>
        <img src={MilkIcon} alt='Milk' className='w-6 h-6' />
        <p className='text-[#7B3706] text-base font-bold'>{quantity}</p>
      </div>
      <div className='custom-border-v'></div>
      <div className='w-[50%] flex flex-col items-center'>
        <div className='py-2 w-full flex justify-center items-center relative ml-[20%]'>
          <img src={ClockIcon} alt='ClockIcon' className='w-6 h-6 absolute left-[-15%]' />
          <div className='time-container w-full h-3 flex items-center justify-center text-[#7B3706] text-sm font-bold'>
            {minute > 0 && <span>{String(minute).padStart(2, '0')}m </span>}
            <span>{String(second).padStart(2, '0')}s</span>
          </div>
        </div>
        <button className='btn-fast' onClick={onBuyFast}>
          <img src={CoinIcon} alt='CoinIcon' className='w-2 h-2' />
          <span className=''>{cost}</span>
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
  data,
  handleEndTime,
  onBuyFast,
}: IProps) {
  const [minute, setMinute] = useState<number | undefined>();
  const [second, setSecond] = useState(0);
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
    const time = data.maxLoadTime * 60 - dayjs().diff(dayjs(data.lastFeedTime), 'second');
    if (time > 0) {
      setMinute(Math.floor(time / 60));
    } else {
      setMinute(0);
    }
  }, [data, data.maxLoadTime, data.lastFeedTime, setMinute]);

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
      placement={placement}
      title={
        <ContentElm
          cost={data.cost}
          quantity={data.quantity}
          minute={minute ?? 0}
          second={second}
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
