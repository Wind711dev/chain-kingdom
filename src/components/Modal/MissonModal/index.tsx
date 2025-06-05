import { useState } from 'react';
import CloseBtn from '../../../assets/object/x_btn.png';
import BaseModal from '../BaseModal';
import MissonMap from './components/MissonMap';
import Tab from './components/Tab';
import './styles.scss';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
}

type SegmentedValue = 'Active' | 'Completed';

const mockup = [
  {
    id: 1,
    title: 'Login 3 days',
    gift: 10,
    giftType: 'string',
    total: 10,
    missionCount: 1,
  },
  {
    id: 2,
    title: 'Complete 5 tasks',
    gift: 15,
    giftType: 'string',
    total: 5,
    missionCount: 2,
  },
  {
    id: 3,
    title: 'Invite a friend',
    gift: 20,
    giftType: 'string',
    total: 1,
    missionCount: 1,
    isCompleted: true,
  },
  {
    id: 4,
    title: 'Daily check-in 7 days',
    gift: 25,
    giftType: 'string',
    total: 7,
    missionCount: 5,
  },
  {
    id: 5,
    title: 'Watch 3 ads',
    gift: 5,
    giftType: 'string',
    total: 3,
    missionCount: 1,
  },
  {
    id: 6,
    title: 'Complete profile',
    gift: 10,
    giftType: 'string',
    total: 1,
    missionCount: 1,
    isCompleted: true,
  },
  {
    id: 7,
    title: 'Login 7 days',
    gift: 30,
    giftType: 'string',
    total: 7,
    missionCount: 4,
  },
  {
    id: 8,
    title: 'Win 3 games',
    gift: 18,
    giftType: 'string',
    total: 3,
    missionCount: 2,
  },
  {
    id: 9,
    title: 'Rate the app',
    gift: 10,
    giftType: 'string',
    total: 1,
    missionCount: 0,
  },
  {
    id: 10,
    title: 'Join 2 events',
    gift: 12,
    giftType: 'string',
    total: 2,
    missionCount: 1,
  },
];

export default function MissonModal({ isOpen, title = 'Mission', onClose }: IProps) {
  const [tab, setTab] = useState<SegmentedValue>('Active');

  const onChangeTab = (value: SegmentedValue) => {
    setTab(value);
  };

  return (
    <BaseModal isOpen={isOpen}>
      <div className='w-[80vw] h-[75vh] bg-[#F2D9A7] rounded-4xl border-2 border-[#4F1E0380]'>
        <div className='w-full h-full'>
          <div className='w-full h-[10%]'>
            <div className='relative uppercase py-[3%] text-2xl text-[#4F1E03]'>
              {title}
              <div
                className='absolute right-[8%] top-0 left-0 bottom-0 flex items-center justify-end'
                onClick={onClose}
              >
                <img src={CloseBtn} alt='' className='w-6 h-6' />
              </div>
            </div>
            <div className='custom-border'></div>
          </div>
          <div className='w-full h-[85%] pt-[4%] flex flex-col items-center flex-grow overflow-hidden'>
            <Tab tab={tab} onChangeTab={onChangeTab} />
            <MissonMap missionData={mockup} tab={tab} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
