import CloseBtn from '../../../assets/object/close_button.png';
import CoinIcon from '../../../assets/object/coin.png';
import MilkIcon from '../../../assets/object/milk.png';
import BaseModal from '../BaseModal';
import './styles.scss';

interface IReavardModalProps {
  isOpen: boolean;
  title?: string;
  contentText?: string;
  rewardData?: IRewardData[];
  onClose?: () => void;
  onClaim?: (data: Record<RewardType, number>) => void;
}

type RewardType = 'coin' | 'milk';

interface IRewardData {
  type: RewardType;
  quantity: number;
}

export default function RewardModal({
  isOpen,
  title = 'victory',
  contentText = 'You have defeated the enemy',
  rewardData = [
    {
      type: 'coin',
      quantity: 1,
    },
    {
      type: 'milk',
      quantity: 1,
    },
  ],
  onClose,
  onClaim,
}: IReavardModalProps) {
  const getIcon = (type: RewardType) => {
    switch (type) {
      case 'coin':
        return CoinIcon;
      case 'milk':
        return MilkIcon;

      default:
        break;
    }
  };
  const rewardElm = rewardData.map((item, index) => {
    return (
      <div key={index}>
        <img src={getIcon(item.type)} alt={item.type} className='w-12 h-12' />
        <div className='text-[#4F1E03] py-1'>x{item.quantity}</div>
      </div>
    );
  });
  const claim = () => {
    const rewardObject: Record<RewardType, number> = rewardData.reduce(
      (acc, item) => {
        acc[item.type] = item.quantity;
        return acc;
      },
      {} as Record<string, number>
    );
    onClaim && onClaim(rewardObject);
  };
  return (
    <BaseModal isOpen={isOpen}>
      <div className='w-[70%] h-[50%] bg-[#F2D9A7] rounded-4xl border-2 border-[#4F1E0380]'>
        <div className='w-full relative'>
          <div className='uppercase py-3 text-2xl text-[#4F1E03]'>{title}</div>
          <div
            className='absolute right-[8%] top-0 left-0 bottom-0 flex items-center justify-end'
            onClick={onClose}
          >
            <img src={CloseBtn} alt='' className='w-6 h-6' />
          </div>
        </div>
        <div className='custom-border'></div>
        <div className='py-3'>
          <p className='text-[#4F1E03] font-medium text-base'>{contentText}</p>
        </div>
        <div className='w-full h-[45%] flex items-center justify-center'>
          <div className='bg-[#FFF9CD] w-[80%] h-full rounded-2xl flex items-center justify-evenly'>
            {rewardElm}
          </div>
        </div>
        <div className='pt-4'>
          <button className='btn-claim' onClick={claim}>
            <span>Claim</span>
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
