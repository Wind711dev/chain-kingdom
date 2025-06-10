import { useEffect } from 'react';
import CoinIcon from '../../../assets/object/coin.png';
import GrassIcon from '../../../assets/object/grass.png';
import MilkIcon from '../../../assets/object/milk.png';
import CloseBtn from '../../../assets/object/x_btn.png';
import { useFightStore } from '../../../stores/fight.store';
import BaseModal from '../BaseModal';
import './styles.scss';

interface IReavardModalProps {
  isOpen: boolean;
  title?: string;
  contentText?: string;
  rewardData?: IRewardData[];
  onClaim?: () => void;
  onClose?: () => void;
}

type RewardType = 'coin' | 'milk' | 'grass' | string;

interface IRewardData {
  type: RewardType;
  quantity: number;
}

export default function RewardModal({
  isOpen,
  title = 'victory',
  contentText = 'You have defeated the enemy',
  onClaim,
  onClose,
}: IReavardModalProps) {
  // const { claimMilk, claimGold } = useDataStore();
  const { itemReward } = useFightStore();

  const getIcon = (type: RewardType) => {
    switch (type) {
      case 'coin':
        return CoinIcon;
      case 'milk':
        return MilkIcon;
      case 'grass':
        return GrassIcon;

      default:
        break;
    }
  };
  const rewardElm = itemReward.map((item, index) => {
    return (
      <div key={index}>
        <img src={getIcon(item.name)} alt={item.name} className='w-12 h-12' />
        <div className='text-[#4F1E03] py-1'>x{item.total}</div>
      </div>
    );
  });
  const claim = () => {
    onClaim && onClaim();
  };
  useEffect(() => {
    // if (isOpen) {
    //   const rewardObject: Record<RewardType, number> = itemReward.reduce(
    //     (acc, item) => {
    //       acc[item.type] = item.total;
    //       return acc;
    //     },
    //     {} as Record<string, number>
    //   );
    //   // claimGold(rewardObject.coin);
    //   // claimMilk(rewardObject.milk);
    // }
  }, [isOpen]);
  return (
    <BaseModal isOpen={isOpen}>
      <div className='w-[70vw] h-[50vh] bg-[#F2D9A7] rounded-4xl border-2 border-[#4F1E0380]'>
        <div className='w-full relative'>
          <div className='uppercase py-[3%] text-2xl text-[#4F1E03]'>{title}</div>
          <div
            className='absolute right-[8%] top-0 left-0 bottom-0 flex items-center justify-end'
            onClick={onClose}
          >
            <img src={CloseBtn} alt='' className='w-6 h-6' />
          </div>
        </div>
        <div className='custom-border'></div>
        <div className='py-[3%]'>
          <p className='text-[#4F1E03] font-medium text-base'>{contentText}</p>
        </div>
        <div className='w-full h-[45%] flex items-center justify-center'>
          <div className='bg-[#FFF9CD] w-[80%] h-full rounded-2xl flex items-center justify-evenly'>
            {rewardElm}
          </div>
        </div>
        <div className='pt-[5%]'>
          <button className='btn-claim' onClick={claim}>
            <span>Great</span>
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
