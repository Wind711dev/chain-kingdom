import AttackGif from '../../../assets/object/attack.gif';
import BossChar from '../../../assets/object/boss_after.png';
import MainChar from '../../../assets/object/main.png';

interface MonsterTeamProps {
  msg?: 'left' | 'right';
  isMsg?: boolean;
  isWin?: boolean;
  isAttack?: boolean;
  defendRef: React.RefObject<HTMLDivElement | null>;
}

export default function MonsterTeam({ msg, isMsg, isWin, isAttack, defendRef }: MonsterTeamProps) {
  return (
    <div className='absolute top-[35vh] left-[60%] z-10' ref={defendRef} id='combat'>
      <div className='relative'>
        <div className='relative'>
          <div className='absolute top-[-7vw] right-[-1vw]'>
            {msg === 'left' && isMsg && (
              <div className='speech-bubble'>
                <span className='dots'>●</span>
                <span className='dots'>●</span>
                <span className='dots'>●</span>
              </div>
            )}
          </div>
          <img src={MainChar} alt='' className='w-[5vw]' style={{ transform: 'scaleX(-1)' }} />
        </div>
        {isAttack && (
          <div className='absolute top-[-170%] right-[-40vw] z-50 w-[85vw] h-[60vw]'>
            <img src={AttackGif} alt='Attack animation' className='w-full h-full' />
          </div>
        )}
        {!isWin && (
          <div className='relative'>
            <div className='absolute top-0 right-[-5vw]'>
              <div className='absolute top-[-6vw] right-[1vw]'>
                {msg === 'right' && (
                  <div className='speech-bubble'>
                    <span className='dots'>●</span>
                    <span className='dots'>●</span>
                    <span className='dots'>●</span>
                  </div>
                )}
              </div>
              <img src={BossChar} alt='' className='w-[10vw]' style={{ transform: 'scaleX(-1)' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
