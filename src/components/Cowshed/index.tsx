import { useMemo } from 'react';
import CowHouse from '../../assets/object/cow_house.png';
import HouseAdd from '../../assets/object/house_add.png';
import { useShelter } from '../../stores';
import type { BuildType } from '../../utils/type';

interface ICowShedProps {
  onClickCowshed: () => void;
  isOpenBuild: boolean;
  onClickBuildHouse: (house: BuildType) => void;
}

export default function Cowshed({ isOpenBuild, onClickCowshed, onClickBuildHouse }: ICowShedProps) {
  const { hasBuilt } = useShelter();

  const hasCow = useMemo(() => {
    return hasBuilt.some((item) => item === 'cowshed');
  }, [hasBuilt]);

  // Nếu đã có cowshed, luôn hiển thị
  if (hasCow) {
    return (
      <div className='absolute w-[32vw] top-[15%] left-[5%]' onClick={onClickCowshed}>
        <img src={CowHouse} alt='CowHouse' className='w-full h-full' />
      </div>
    );
  }

  // Nếu chưa có và đang trong chế độ build
  if (isOpenBuild) {
    return (
      <div className='absolute top-[30%] left-[10vw]'>
        <img
          src={HouseAdd}
          alt='add-cow'
          className='w-[25vw]'
          onClick={() => {
            onClickBuildHouse('cowshed');
          }}
        />
      </div>
    );
  }

  // Nếu chưa có và không bật chế độ build
  return null;
}
