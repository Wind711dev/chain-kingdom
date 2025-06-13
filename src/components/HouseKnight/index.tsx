import Knight from '../../assets/object/main.png';
import House from '../../assets/object/main_house.png';
import './styles.scss';

interface IHouseWithKnightProps {
  onClick?: () => void;
  isDefend?: boolean;
}
export default function HouseWithKnight({ onClick, isDefend }: IHouseWithKnightProps) {
  return (
    <div className='house-container'>
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
