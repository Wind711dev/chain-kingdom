import CoinIcon from '../../assets/object/coin.png';
import MilkIcon from '../../assets/object/milk.png';
import './styles.scss';
interface IHUDProps {
  milkCount: number;
  goldCount: number;
}

export default function HUDComponent({ milkCount, goldCount }: IHUDProps) {
  return (
    <div className='hud'>
      <div className='hud-item'>
        <img src={CoinIcon} alt='coin' />
        <span className='gradient-text'>{goldCount}</span>
      </div>
      <div className='hud-item'>
        <img src={MilkIcon} alt='milk' />
        <span className='gradient-text'>{milkCount}</span>
      </div>
    </div>
  );
}
