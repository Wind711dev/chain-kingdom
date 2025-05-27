import CrossedSword from '../../assets/object/crossed_sword.png';
import House from '../../assets/object/home.png';
import Knight from '../../assets/object/main.png';
import ProgressBar from '../ProgressBar';
import './styles.scss';

interface IHouseWithKnightProps {
  startGuard: boolean;
  claimDisable: boolean;
  guardProgess: number;
  setStartGuard: (value: boolean) => void;
  onClaim: () => void;
  houseRef: React.RefObject<HTMLDivElement | null>;
}
export default function HouseWithKnight({
  startGuard,
  guardProgess,
  claimDisable,
  setStartGuard,
  onClaim,
  houseRef,
}: IHouseWithKnightProps) {
  return (
    <div className='house-container' ref={houseRef}>
      <img className='house' src={House} alt='house' />
      <img className='knight' src={Knight} alt='knight' />
      <div className='guard-container'>
        <img className='guard' src={CrossedSword} alt='guard' />
        {!startGuard && (
          <button className='mt-2' onClick={() => setStartGuard(true)}>
            Start
          </button>
        )}
        {startGuard && (
          <div className=''>
            <ProgressBar progress={guardProgess} className='mt-2' width='100%' height='18px' />
            <button className='mt-2' onClick={() => onClaim()} disabled={claimDisable}>
              Claim
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
