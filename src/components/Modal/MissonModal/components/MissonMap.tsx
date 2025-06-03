import { useMemo } from 'react';
import CoinIcon from '../../../../assets/object/coin.png';

interface IProps {
  missionData: IMisson[];
}

interface IMisson {
  id: number;
  title: string;
  gift: number;
  giftType: string;
  total: number;
  missionCount: number;
}

export default function MissonMap({ missionData }: IProps) {
  const mission = useMemo(() => {
    const mapData = missionData.map((item) => {
      const progress = item.total === 0 ? 0 : Math.round((item.missionCount / item.total) * 100);
      return (
        <div
          key={item.id}
          className='w-[90%] h-[8vh] bg-[#F2D9A7] border border-[#4F1E034D] my-[2%] min-h-[56px] rounded-md flex items-center justify-evenly'
        >
          <div className='flex flex-col w-[60%] h-full justify-evenly items-start'>
            <div className='text-[#4F1E03] text-sm font-medium'>
              {item.title} {`(${item.missionCount}/${item.total})`}
            </div>
            <div className={`progress-container w-full h-[20%]`}>
              <div className='progress-fill' style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <div className='custom-border-v'></div>
          <div className='flex w-[15%] h-full items-center justify-between'>
            <div className='text-[#4F1E03] text-base font-semibold'>{item.gift}</div>
            <img src={CoinIcon} alt='Coin' className='w-5 h-5' />
          </div>
        </div>
      );
    });
    return mapData;
  }, [missionData]);

  return (
    <div className='bg-[#FFF9CD] rounded-md w-[90%] h-[73%] mt-3 overflow-auto flex flex-col flex-1 items-center py-[2%]'>
      {mission}
    </div>
  );
}
