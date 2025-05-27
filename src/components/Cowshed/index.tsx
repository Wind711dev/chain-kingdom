import { useMemo, useState } from 'react';
import CowShedBot from '../../assets/object/cow_shed_bot.png';
import CowGroup1 from './components/CowGroup1';
import CowGroup2 from './components/CowGroup2';
import CowGroup3 from './components/CowGroup3';
import CowGroup4 from './components/CowGroup4';
import CowGroup5 from './components/CowGroup5';
import CowGroup6 from './components/CowGroup6';
import './styles.scss';

interface ICowShedProps {
  onClick: () => void;
  containerClass: string;
  // milkProgress: number;
}

export default function Cowshed({
  onClick,
  containerClass,
  // milkProgress,
}: ICowShedProps) {
  const [cowNumber, _setCowNumber] = useState(6);
  const cowOfShed = useMemo(() => {
    switch (cowNumber) {
      case 1:
        return <CowGroup1 />;
      case 2:
        return <CowGroup2 />;
      case 3:
        return <CowGroup3 />;
      case 4:
        return <CowGroup4 />;
      case 5:
        return <CowGroup5 />;
      default:
        return <CowGroup6 />;
    }
  }, [cowNumber]);
  return (
    <div className={`cow-shed ${containerClass}`} onClick={onClick}>
      <div className='cow-wrapper'>
        {cowOfShed}
        <img className={`cow-shed-bot`} src={CowShedBot} alt='cow' />
      </div>
    </div>
  );
}
