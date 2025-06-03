interface IProps {
  tab: SegmentedValue;
  onChangeTab: (value: SegmentedValue) => void;
}

type SegmentedValue = 'Active' | 'Completed';

export default function Tab({ tab, onChangeTab }: IProps) {
  return (
    <div className='bg-[#FFF9CD] tab-container w-[90%] h-[10%] rounded-md flex justify-evenly items-center py-6'>
      <div
        onClick={() => onChangeTab('Active')}
        className={`${tab === 'Active' ? 'text-[#FFFFFF]' : 'text-[#4F1E03]'} ${tab === 'Active' ? 'bg-[#14480a] border border-[#052400]' : ''} text-base font-medium w-[45%] py-[2%] rounded-md`}
      >
        Active
      </div>
      <div
        onClick={() => onChangeTab('Completed')}
        className={`${tab === 'Completed' ? 'text-[#FFFFFF]' : 'text-[#4F1E03]'} ${tab === 'Completed' ? 'bg-[#14480a] border border-[#052400]' : ''} text-base font-medium w-[45%] py-[2%] rounded-md`}
      >
        Completed
      </div>
    </div>
  );
}
