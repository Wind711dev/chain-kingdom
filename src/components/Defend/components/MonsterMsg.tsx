import BossAvt from '../../../assets/object/boss_avt.png';
import RightMsgBg from '../../../assets/object/right_msg.png';
import '../styles.scss';

interface RightMsgProps {
  text?: string;
  onNext?: () => void;
}

export default function MonsterMsg({
  text = 'Lorem ipsum dolor sit amet consectetur. Posuere blandit mauris tellus enim platea consequat nulla consequat.',
  onNext,
}: RightMsgProps) {
  return (
    <div className='fixed bottom-0 right-0 left-0 top-0 z-50' onClick={onNext}>
      <div className='relative w-full h-full'>
        <img
          src={RightMsgBg}
          alt=''
          className='absolute w-[85vw] h-[20vh] bottom-[12%] left-[8%]'
        />
        <div className='absolute z-50 right-[6vw] bottom-[14vw] h-[21vh] w-[80vw]'>
          <div className='relative w-full h-full'>
            <div className='text-sm text-black text-left leading-tight whitespace-normal break-words px-4 py-[3%]'>
              {text}
            </div>
          </div>
        </div>

        <div className='w-[20vw] h-[25vw] absolute right-[2vw] bottom-0 z-51'>
          <img src={BossAvt} alt='Character' className='w-full h-full object-contain' />
        </div>
        <div className='absolute left-[30%] bottom-[5vh] z-51'>Click space to continue...</div>
      </div>
    </div>
  );
}
