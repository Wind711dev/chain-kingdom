import { useRef, useState } from 'react';
import HouseAdd from '../../assets/object/house_add.png';
import Background from '../../components/Background';
import BuildComponent from '../../components/BuildComponet';
import Cowshed from '../../components/Cowshed';
import DefendComponent from '../../components/Defend';
import FarmGrid from '../../components/FarmGrid';
import ClaimPlant from '../../components/FarmGrid/components/ClaimPlant';
import PlantSeed from '../../components/FarmGrid/components/PlantSeed';
import HouseWithKnight from '../../components/HouseKnight';
import HUDComponent from '../../components/Hub';
import { CowShedModal } from '../../components/Modal';
import MissonModal from '../../components/Modal/MissonModal';
import RewardModal from '../../components/Modal/RewardModal';
import SheepHouse from '../../components/SheepHouse';
import ShirtFactory from '../../components/ShirtFactory';
import { useFarm } from '../../hooks/useFarm';
import { useFightingMatch } from '../../hooks/useFightingMatch';
import { useDataStore } from '../../stores/data.store';
import { useFarmStore } from '../../stores/farm.store';
import type { BuildType } from '../../utils/type';

export default function HomeScreen() {
  const { goldAll, milkAll } = useDataStore();
  const { farmTooltip, setFarmTooltip } = useFarmStore();
  const { handleFightingMatch } = useFightingMatch();
  const { handleCreateFarmPlot } = useFarm();

  const [isCowShedOpen, setIsCowShedOpen] = useState(false);
  const [isPlantSeedOpen, setIsPlantSeedOpen] = useState(false);
  const [isShowCombat, setIsShowCombat] = useState(false);
  const [isShowReward, setIsShowReward] = useState(false);
  const [isClaimPlant, setIsClaimPlant] = useState(false);
  const [isOpenBuild, setOpenBuild] = useState(false);
  const [buildType, setBuildType] = useState<BuildType>(null);

  const defendRef = useRef<HTMLDivElement>(null);

  const onClickCowShed = () => {
    setIsCowShedOpen(!isCowShedOpen);
  };

  const onClickShirtFactory = () => {
    // setIsCowShedOpen(!isCowShedOpen);
  };

  const onClickSheepHouse = () => {
    // setIsCowShedOpen(!isCowShedOpen);
  };

  const onShowRewardModal = () => {
    setIsShowReward(true);
  };
  const onCloseRewardModal = () => {
    setIsShowReward(false);
    setIsShowCombat(false);
  };
  const onClaimRewardModal = () => {
    setIsShowReward(false);
    setIsShowCombat(false);
  };
  const closePlantSeed = () => {
    setIsPlantSeedOpen(false);
  };
  const closeClaimPlant = () => {
    setIsClaimPlant(false);
  };

  const onStartCombat = () => {
    setIsShowCombat(true);
    handleFightingMatch();
    // setTimeout(() => {
    //   const el = document.getElementById('combat');
    //   if (el) {
    //     el.scrollIntoView({ behavior: 'smooth', block: 'end' });
    //     setTimeout(() => {
    //       window.scrollBy({ left: window.innerWidth * 0.5, behavior: 'smooth' }); // 50vw
    //     }, 400);
    //   }
    // }, 100);
  };

  const onOpenBuild = () => {
    setOpenBuild(!isOpenBuild);
    setBuildType(null);
  };

  const onClickBuildHouse = (house: BuildType) => {
    setBuildType(house);
  };

  const onBuilding = () => {
    switch (buildType) {
      case 'plant':
        handleCreateFarmPlot(1);
        break;

      default:
        break;
    }
  };

  const onClickBackgound = () => {
    if (isPlantSeedOpen) {
      closePlantSeed();
    }
    if (isClaimPlant) {
      closeClaimPlant();
    }
    if (farmTooltip) {
      setFarmTooltip(null);
    }
  };

  return (
    <>
      <HUDComponent milkCount={milkAll} goldCount={goldAll} />
      <BuildComponent
        isBuilding={isOpenBuild}
        onBuild={onBuilding}
        onOpenBuild={onOpenBuild}
        buildType={buildType}
      />
      <CowShedModal isOpen={isCowShedOpen} onClose={onClickCowShed} />
      <PlantSeed isOpen={isPlantSeedOpen} onClose={closePlantSeed} />
      <ClaimPlant isOpen={isClaimPlant} onClose={closeClaimPlant} />
      <RewardModal
        isOpen={isShowReward}
        onClose={onCloseRewardModal}
        onClaim={onClaimRewardModal}
      />
      <MissonModal isOpen={false} />
      <Background overflowHidden={isCowShedOpen} onClick={onClickBackgound}>
        <div className='w-[100vw] h-[50vh] relative'>
          <Cowshed
            isOpenBuild={isOpenBuild}
            onClickCowshed={onClickCowShed}
            onClickBuildHouse={onClickBuildHouse}
          />
          <ShirtFactory
            isOpenBuild={isOpenBuild}
            onClickShirtFactory={onClickShirtFactory}
            onClickBuildHouse={onClickBuildHouse}
          />
          <HouseWithKnight
            onClick={() => {
              onStartCombat();
            }}
            isDefend={isShowCombat}
          />
          {isOpenBuild && (
            <div className='absolute top-[30%] right-[10vw]'>
              <img
                src={HouseAdd}
                alt=''
                className='w-[25vw]'
                onClick={() => {
                  onClickBuildHouse(null);
                }}
              />
            </div>
          )}
          <SheepHouse
            isOpenBuild={isOpenBuild}
            onClickSheepHouse={onClickSheepHouse}
            onClickBuildHouse={onClickBuildHouse}
          />
        </div>

        {/* <Warehouse /> */}
        <FarmGrid
          isBuilding={isOpenBuild}
          openPlantSeed={() => {
            setIsPlantSeedOpen(!isPlantSeedOpen);
          }}
          openClaimPlant={() => {
            setIsClaimPlant(!isClaimPlant);
          }}
          onBuildPlot={() => {
            onClickBuildHouse('plant');
          }}
        />
        <DefendComponent
          isShow={isShowCombat}
          defendRef={defendRef}
          showReward={onShowRewardModal}
        />
        {/* <Tree className='bottom-10' /> */}
      </Background>
    </>
  );
}
