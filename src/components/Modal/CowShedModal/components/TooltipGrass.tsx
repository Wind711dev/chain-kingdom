import { Tooltip, type TooltipProps } from 'antd';
import type { TooltipPlacement } from 'antd/es/tooltip';
import { useMemo } from 'react';

import ClockIcon from '../../../../assets/object/clock_icon.png';
import MilkIcon from '../../../../assets/object/milk.png';
import './styles.scss';

interface IProps {
  children: React.ReactNode;
  arrow?: 'Show' | 'Hide' | 'Center';
  placement?: TooltipPlacement;
  isOpen?: boolean;
}

interface IContentElm {
  quantity?: number;
  time?: number;
}

const ContentElm = ({ quantity = 1, time = 20 }: IContentElm) => {
  return (
    <div className='flex flex-col items-center w-[25vw]'>
      <div className='uppercase text-[#7B3706] font-bold w-full text-center text-base bg-[#F2DDBB] pt-2 pb-1 px-2 rounded-t-lg'>
        Cow FeeD
      </div>
      <div className='flex gap-1 py-2'>
        <img src={MilkIcon} alt='Milk' className='w-6 h-6' />
        <p className='text-[#7B3706] text-base font-bold'>{quantity}</p>
      </div>
      <div className='custom-border-h'></div>
      <div className='py-2 w-full flex justify-center items-center relative'>
        <img src={ClockIcon} alt='ClockIcon' className='w-6 h-6 absolute left-[10%]' />
        <div className='time-container w-[70%] h-3 flex items-center justify-center text-[#7B3706] text-sm font-bold uppercase'>
          {time}s
        </div>
      </div>
    </div>
  );
};

export default function TooltipGrass({
  children,
  placement = 'top',
  arrow = 'Show',
  isOpen,
}: IProps) {
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
  return (
    <Tooltip placement={placement} title={<ContentElm />} arrow={mergedArrow} open={isOpen}>
      {children}
    </Tooltip>
  );
}
