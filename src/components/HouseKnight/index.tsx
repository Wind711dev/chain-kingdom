// import CrossedSword from '../../assets/object/crossed_sword.png';
import Knight from '../../assets/object/main.png';
import House from '../../assets/object/main_house.png';
import './styles.scss';

interface IHouseWithKnightProps {
  onClick?: () => void;
  houseRef: React.RefObject<HTMLDivElement | null>;
  isDefend?: boolean;
}
export default function HouseWithKnight({ onClick, houseRef, isDefend }: IHouseWithKnightProps) {
  return (
    <div className='house-container' ref={houseRef}>
      <img className='house' src={House} alt='house' />
      <img
        className='knight'
        src={Knight}
        alt='knight'
        style={{ display: isDefend ? 'none' : 'block' }}
        onClick={onClick}
      />
    </div>
  );
}
