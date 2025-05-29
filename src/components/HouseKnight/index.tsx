import CrossedSword from '../../assets/object/crossed_sword.png';
import House from '../../assets/object/home.png';
import Knight from '../../assets/object/main.png';
import './styles.scss';

interface IHouseWithKnightProps {
  onClick?: () => void;
  houseRef: React.RefObject<HTMLDivElement | null>;
}
export default function HouseWithKnight({ onClick, houseRef }: IHouseWithKnightProps) {
  return (
    <div className='house-container' ref={houseRef}>
      <img className='house' src={House} alt='house' />
      <img className='knight' src={Knight} alt='knight' />
      <div className='guard-container'>
        <img className='guard' src={CrossedSword} alt='guard' />
        <button className='mt-2' onClick={onClick}>
          Start
        </button>
      </div>
    </div>
  );
}
