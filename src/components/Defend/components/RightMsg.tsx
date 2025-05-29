import MainAvt from '../../../assets/object/main_avt.png';
import RightMsgBg from '../../../assets/object/right_msg.png';
import '../styles.scss';

interface RightMsgProps {
  text?: string;
  onNext?: () => void;
  onAttack?: () => void;
  isAttack?: boolean;
}

export default function RightMsg({
  text = 'Lorem ipsum dolor sit amet consectetur. Posuere blandit mauris tellus enim platea consequat nulla consequat.',
  onNext,
  onAttack,
  isAttack,
}: RightMsgProps) {
  return (
    <div className='fixed bottom-[2vh] right-[1vw] left-[1vw] h-[35vh] z-50'>
      <div className='relative w-full h-full'>
        <img src={RightMsgBg} alt='' className='absolute w-[85vw] h-[20vh] top-[10%] left-[8%]' />
        <div className='absolute z-50 right-[6vw] bottom-[14vw] h-[21vh] w-[80vw]'>
          <div className='relative w-full h-full'>
            <div className='text-sm text-black text-left leading-tight whitespace-normal break-words px-4 py-[3%]'>
              {text}
            </div>
            <button
              className='btn-next absolute bottom-[40%] right-[5%] z-50'
              onClick={isAttack ? onAttack : onNext}
            >
              {isAttack ? (
                <span className='gradient-text'>Attack</span>
              ) : (
                <span className='gradient-text'>Next</span>
              )}
            </button>
          </div>
        </div>

        <div className='w-[20vw] h-[25vw] absolute right-[2vw] bottom-0 z-51'>
          <img src={MainAvt} alt='Character' className='w-full h-full object-contain' />
        </div>
      </div>
    </div>
  );
}
