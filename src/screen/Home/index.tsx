import { useRef, useState } from 'react';
import Background from '../../components/Background';
import Cowshed from '../../components/Cowshed';
import DefendComponent from '../../components/Defend';
import FarmGrid from '../../components/FarmGrid';
import PlantSeed from '../../components/FarmGrid/components/PlantSeed';
import HouseWithKnight from '../../components/HouseKnight';
import HUDComponent from '../../components/Hub';
import { CowShedModal } from '../../components/Modal';
import RewardModal from '../../components/Modal/RewardModal';
import Warehouse from '../../components/Warehouse';
import { useDataStore } from '../../stores/data.store';

export default function HomeScreen() {
  const { goldAll, milkAll, claimMilk, claimGold } = useDataStore();

  const [shakeMilkIcon, setShakeMilkIcon] = useState(false);
  const [shakeGoldIcon, setShakeGoldIcon] = useState(false);

  const [isCowShedOpen, setIsCowShedOpen] = useState(false);
  const [isPlantSeedOpen, setIsPlantSeedOpen] = useState(false);
  const [isShowCombat, setIsShowCombat] = useState(false);
  const [isShowReward, setIsShowReward] = useState(false);

  const milkHudRef = useRef<HTMLDivElement>(null);
  const goldHudRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLDivElement>(null);
  const defendRef = useRef<HTMLDivElement>(null);

  const onClickCowShed = () => {
    setIsCowShedOpen(!isCowShedOpen);
  };

  const onShowRewardModal = () => {
    setIsShowReward(true);
  };
  const onCloseRewardModal = () => {
    setIsShowReward(false);
  };
  const onClaimRewardModal = (data: Record<'coin' | 'milk', number>) => {
    claimGold(data.coin);
    claimMilk(data.milk);
    setIsShowReward(false);
    setIsShowCombat(false);
  };
  const closePlantSeed = () => {
    setIsPlantSeedOpen(false);
  };

  const onStartCombat = () => {
    setIsShowCombat(true);
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

  const onClickBackgound = () => {
    if (isPlantSeedOpen) {
      closePlantSeed();
    }
  };

  return (
    <>
      <HUDComponent
        milkCount={milkAll}
        goldCount={goldAll}
        shakeMilkIcon={shakeMilkIcon}
        shakeGoldIcon={shakeGoldIcon}
        setShakeMilkIcon={setShakeMilkIcon}
        setShakeGoldIcon={setShakeGoldIcon}
        milkHudRef={milkHudRef}
        goldHudRef={goldHudRef}
      />
      <CowShedModal
        isOpen={isCowShedOpen}
        onClose={onClickCowShed}
        handleCailm={(milk) => claimMilk(milk)}
        milkHudRef={milkHudRef}
        setShakeMilkIcon={setShakeMilkIcon}
      />
      <PlantSeed isOpen={isPlantSeedOpen} onClose={closePlantSeed} />
      <RewardModal
        isOpen={isShowReward}
        onClose={onCloseRewardModal}
        onClaim={onClaimRewardModal}
      />
      <Background overflowHidden={isCowShedOpen} onClick={onClickBackgound}>
        <HouseWithKnight
          houseRef={houseRef}
          onClick={() => {
            onStartCombat();
          }}
          isDefend={isShowCombat}
        />
        <Warehouse />
        <Cowshed onClick={onClickCowShed} />
        <FarmGrid
          openPlantSeed={() => {
            setIsPlantSeedOpen(!isPlantSeedOpen);
          }}
        />
        <DefendComponent
          isShow={isShowCombat}
          defendRef={defendRef}
          showReward={onShowRewardModal}
        />
        {/* {flyingGoldIcons} */}
        {/* <Tree className='bottom-10' /> */}
      </Background>
    </>
  );
}
