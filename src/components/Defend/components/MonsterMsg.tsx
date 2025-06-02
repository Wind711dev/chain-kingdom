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
        <div className='absolute w-full h-[30%] bottom-0'>
          <div className='relative w-[85vw] h-[20vh]'>
            <img src={RightMsgBg} alt='' className='absolute w-full h-full top-0 left-[8%]' />
            <div className='absolute z-50 left-[10%] top-0 h-full w-[80vw]'>
              <div className='relative w-full h-full mt-[2%]'>
                <div className='text-sm text-black text-left leading-tight whitespace-normal break-words px-4 py-[3%]'>
                  {text}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-[20vw] h-[25vw] absolute right-[2vw] bottom-0 z-51'>
          <img src={BossAvt} alt='Character' className='w-full h-full object-contain' />
        </div>
        <div className='absolute left-[20%] bottom-[5vh] z-51 text-sm'>Tap anywhere to continue...</div>
      </div>
    </div>
  );
}
