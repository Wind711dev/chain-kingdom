import LeftMsgBg from '../../../assets/object/left_msg.png';
import MainAvt from '../../../assets/object/main_avt.png';
import '../styles.scss';

interface LeftMsgProps {
  text?: string;
  onNext?: () => void;
  onAttack?: () => void;
  isAttack?: boolean;
}
export default function MainCharMsg({ text, onNext, onAttack, isAttack }: LeftMsgProps) {
  return (
    <div className='fixed bottom-0 right-0 left-0 top-0 z-50' onClick={onNext}>
      <div className='relative w-full h-full'>
        <div className='absolute w-full h-[32%] bottom-0'>
          <div className='relative w-[85vw] h-[20vh]'>
            <img
              src={LeftMsgBg}
              alt=''
              className='absolute w-full h-full top-0 left-[5%]'
            />
            <div className='absolute z-50 left-[6vw] bottom-[16%] h-[15vh] w-[80vw]'>
              <div className='w-full h-full flex flex-col'>
                <div className='text-sm text-black text-left leading-tight whitespace-normal break-words px-4 py-[3%] '>
                  {text}
                </div>
                <div className='flex justify-end pr-2'>
                  {isAttack && (
                    <button className='btn-next' onClick={onAttack}>
                      <span className='gradient-text'>Attack</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-[20vw] h-[25vw] absolute left-[2vw] bottom-0 z-51'>
          <img src={MainAvt} alt='Character' className='w-full h-full object-contain' />
        </div>
        {!isAttack && (
          <div className='absolute left-[35%] bottom-[5vh] z-51 text-sm'>Tap anywhere to continue...</div>
        )}
      </div>
    </div>
  );
}
