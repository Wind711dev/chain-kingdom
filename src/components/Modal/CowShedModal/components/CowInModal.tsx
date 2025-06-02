import React, { useEffect, useMemo, useRef, useState, type JSX } from 'react';
import { useDrop } from 'react-dnd';
import Coin from '../../../../assets/object/coin.png';
import CowAdd from '../../../../assets/object/cow_add.png';
import CowEat from '../../../../assets/object/cow_eat.png';
import CowIdle from '../../../../assets/object/cow_idle.png';
import CowMilk from '../../../../assets/object/cow_milk.png';
import MilkIcon from '../../../../assets/object/milk.png';
import { CowModal, CowStatus } from './type';

import FlyingComponent from '../../../FlyingComponent';
import CowTooltip from './CowTooltip';
import './styles.scss';

interface IProps {
  status: CowStatus | string; // 0: idle, 1: eating, 2: milking
  milkHolding: number;
  milkHudRef: React.RefObject<HTMLDivElement | null>;
  isTooltipOpen?: boolean;
  dataCow?: IDataCow;
  disabled?: boolean;
  cowPrice?: number;
  setShakeMilkIcon: React.Dispatch<React.SetStateAction<boolean>>;
  onBuyFast?: () => void;
  onDrop: () => void;
  handleCailm: () => void;
  onClick: () => void;
  handleEndTime: () => void;
}

interface IDataCow {
  quantity?: number;
  time?: number;
  cost?: number;
}

function CowInModal({
  status,
  milkHudRef,
  milkHolding,
  isTooltipOpen,
  dataCow,
  disabled,
  cowPrice,
  onDrop,
  handleCailm,
  setShakeMilkIcon,
  onClick,
  handleEndTime,
  onBuyFast,
}: IProps) {
  const [flyingMilk, setFlyingMilk] = useState(false);
  const [flyingMilkIcons, setFlyingMilkIcons] = useState<JSX.Element[]>([]);
  const cowRef = useRef<HTMLDivElement>(null);
  // const []

  const Cow = useMemo(() => {
    switch (status) {
      case '0':
        return CowIdle;
      case '1':
        return CowEat;
      case '2':
        return CowMilk;
      default:
        return CowAdd;
    }
  }, [status]);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: CowModal.GRASS,
      drop: () => {
        // onDrop();
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );
  const handleCollectMilk = () => {
    if (flyingMilk || !cowRef.current || !milkHudRef.current) return;

    const cowRect = cowRef.current.getBoundingClientRect();
    const milkIcon = milkHudRef.current.querySelector('img');
    if (!milkIcon) return;

    const milkRect = milkIcon.getBoundingClientRect();

    const start = {
      x: cowRect.left + cowRect.width / 2,
      y: cowRect.top + cowRect.height / 2,
    };

    const end = {
      x: milkRect.left + milkRect.width / 2,
      y: milkRect.top + milkRect.height / 2,
    };

    const icons: JSX.Element[] = [];
    const numIcons = Math.ceil(milkHolding / 10);

    let finishedCount = 0;

    setFlyingMilk(true);

    for (let i = 0; i < numIcons; i++) {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      const delay = i * 100;

      icons.push(
        <FlyingComponent
          key={i}
          start={{ x: start.x + offsetX, y: start.y + offsetY }}
          end={end}
          setShakeIcon={() => {
            setShakeMilkIcon(true);
          }}
          icon={MilkIcon}
          delay={delay}
          onComplete={() => {
            finishedCount++;
            if (finishedCount === numIcons) {
              setFlyingMilk(false);
              setFlyingMilkIcons([]);
              handleCailm();
            }
          }}
        />
      );
    }

    setFlyingMilkIcons(icons);
  };

  const onClickCow = () => {
    if (disabled) return;
    if (status === CowStatus.ADD || status === CowStatus.EATING) {
      onClick();
    }
    if (status === CowStatus.MILKING) {
      handleCollectMilk();
    }
  };

  useEffect(() => {
    if (canDrop && isOver && status === CowStatus.IDLE) {
      onDrop();
    }
  }, [canDrop, isOver, status, onDrop]);

  return (
    <>
      <div
        ref={drop as unknown as React.Ref<HTMLDivElement>}
        onClick={onClickCow}
        onDragOver={(e) => e.preventDefault()}
        className={`${status === CowStatus.ADD ? 'relative' : ''}`}
      >
        <div ref={cowRef}>
          {status === '1' && (
            <CowTooltip
              isOpen={isTooltipOpen}
              data={dataCow}
              handleEndTime={handleEndTime}
              onBuyFast={onBuyFast}
            >
              <img src={Cow} alt='Cow' className='w-[12vw] h-[18vw]' />
            </CowTooltip>
          )}
          {status !== '1' && <img src={Cow} alt='Cow' className='w-[12vw] h-[18vw]' />}
        </div>
        {status === CowStatus.ADD && (
          <div className='absolute flex items-center justify-center gap-1 bottom-[5%] left-0 right-0'>
            <img src={Coin} alt='Coin' className='w-[3vw]' />
            <span className='gradient-text'>{cowPrice || 100}</span>
          </div>
        )}
      </div>
      {flyingMilkIcons}
    </>
  );
}

export default React.memo(CowInModal);
