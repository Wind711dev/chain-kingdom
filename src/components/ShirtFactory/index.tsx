import { useMemo } from 'react';
import FactoryHouse from '../../assets/object/factory_house.png';
import HouseAdd from '../../assets/object/house_add.png';
import { useShelter } from '../../stores';
import type { BuildType } from '../../utils/type';

interface ICowShedProps {
  onClickShirtFactory: () => void;
  isOpenBuild: boolean;
  onClickBuildHouse: (house: BuildType) => void;
}

export default function ShirtFactory({
  isOpenBuild,
  onClickShirtFactory,
  onClickBuildHouse,
}: ICowShedProps) {
  const { hasBuilt } = useShelter();

  const hasShirt = useMemo(() => {
    return hasBuilt.some((item) => item === 'sheep-house');
  }, [hasBuilt]);

  // Nếu đã có shirt-factory, luôn hiển thị nhà máy
  if (hasShirt) {
    return (
      <div className='absolute w-[32vw] bottom-[5%] left-[5%]' onClick={onClickShirtFactory}>
        <img src={FactoryHouse} alt='FactoryHouse' className='w-full h-full' />
      </div>
    );
  }

  // Nếu chưa có và đang trong chế độ build, hiển thị nút xây
  if (isOpenBuild) {
    return (
      <div className='absolute bottom-[10%] left-[10vw]'>
        <img
          src={HouseAdd}
          alt='add-factory'
          className='w-[25vw]'
          onClick={() => {
            onClickBuildHouse('shirt-factory');
          }}
        />
      </div>
    );
  }

  // Nếu chưa có và không ở chế độ build, không hiển thị gì
  return null;
}
