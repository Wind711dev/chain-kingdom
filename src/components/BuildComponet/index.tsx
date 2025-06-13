import { useMemo } from 'react';
import BuildBtn from '../../assets/object/build_btn.png';
import CloseBuildBtn from '../../assets/object/close_build_btn.png';
import CowHouse from '../../assets/object/cow_house.png';
import FactoryHouse from '../../assets/object/factory_house.png';
import LandPlot from '../../assets/object/land_plot.png';
import SheepHouse from '../../assets/object/sheep_house.png';
import type { BuildType } from '../../utils/type';

interface IProps {
  isBuilding: boolean;
  onOpenBuild: () => void;
  onBuild: () => void;
  buildType: BuildType;
}

export default function BuildComponent({ isBuilding, buildType, onOpenBuild, onBuild }: IProps) {
  const buildImg = useMemo(() => {
    switch (buildType) {
      case 'sheep-house':
        return SheepHouse;
      case 'cowshed':
        return CowHouse;
      case 'shirt-factory':
        return FactoryHouse;
      case 'plant':
        return LandPlot;

      default:
        return null;
    }
  }, [buildType]);
  return (
    <div className='fixed bottom-0 left-0 w-full h-[25vh] z-10'>
      <div className='w-full h-full flex flex-col items-center justify-evenly'>
        <div className='w-full h-[10vh] flex items-center justify-center'>
          {buildImg && isBuilding && (
            <div
              className='w-[90%] h-[10vh] bg-black/50 top-0 rounded-2xl px-2 flex flex-col justify-center'
              onClick={onBuild}
            >
              <div className='flex items-center justify-center w-[12vw] h-[12vw] bg-[#00000099] rounded-xl'>
                <img
                  src={buildImg}
                  alt='build-img'
                  className={`w-[90%] ${buildType === 'plant' ? 'h-[50%]' : 'h-[90%]'}`}
                />
              </div>
            </div>
          )}
        </div>
        <div className='w-full'>
          <div className='w-24 ml-[2%]' onClick={onOpenBuild}>
            {!isBuilding ? (
              <img src={BuildBtn} alt='build' className='w-full h-full' />
            ) : (
              <img src={CloseBuildBtn} alt='build-close' className='w-full h-full' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
