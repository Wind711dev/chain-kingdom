import CowHouse from '../../assets/object/cow_house.png';

interface ICowShedProps {
  onClick: () => void;
}

export default function Cowshed({ onClick }: ICowShedProps) {
  return (
    <div className='absolute top-[40vh] w-[35vw]' onClick={onClick}>
      <img src={CowHouse} alt='CowHouse' className='w-full h-full' />
    </div>
  );
}
