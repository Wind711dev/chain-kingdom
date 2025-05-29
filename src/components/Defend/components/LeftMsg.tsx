import BossAvt from '../../../assets/object/boss_avt.png';
import LeftMsgBg from '../../../assets/object/left_msg.png';
import '../styles.scss';

interface LeftMsgProps {
  text?: string;
  onNext?: () => void;
}
export default function LeftMsg({ text, onNext }: LeftMsgProps) {
  return (
    <div className='fixed bottom-[2vh] right-[1vw] left-[1vw] h-[35vh] z-50'>
      <div className='relative w-full h-full'>
        <img src={LeftMsgBg} alt='' className='absolute w-[85vw] h-[20vh] top-[5%] left-[5%]' />
        <div className='absolute z-50 left-[6vw] bottom-[16vw] h-[21vh] w-[80vw]'>
          <div className='relative w-full h-full'>
            <div className='text-sm text-black text-left leading-tight whitespace-normal break-words px-6 py-[3%] '>
              {text}
            </div>
            <button className='btn-next absolute bottom-[40%] right-[5%] z-50' onClick={onNext}>
              <span className='gradient-text'>Next</span>
            </button>
          </div>
        </div>

        <div className='w-[20vw] h-[25vw] absolute left-[2vw] bottom-0 z-51'>
          <img src={BossAvt} alt='Character' className='w-full h-full object-contain' />
        </div>
      </div>
    </div>
  );
}
