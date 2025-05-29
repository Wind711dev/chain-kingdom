import { useEffect, useRef, useState } from 'react';
import Background from '../../components/Background';
import Cowshed from '../../components/Cowshed';
import DefendComponent from '../../components/Defend';
import FarmGrid from '../../components/FarmGrid';
import PlantSeed from '../../components/FarmGrid/components/PlantSeed';
import HouseWithKnight from '../../components/HouseKnight';
import HUDComponent from '../../components/Hub';
import { CowShedModal } from '../../components/Modal';
import { useDataStore } from '../../stores/data.store';
import { milkLevelData } from '../../utils/constanst';

export default function HomeScreen() {
  const { goldAll, milkAll, cowLevel, milkHolding, milkHoldTime, setMilkHolding, claimMilk } =
    useDataStore();

  // const [flyingGoldIcons, setFlyingGoldIcons] = useState<JSX.Element[]>([]);
  // const [startPosMilk, setStartPosMilk] = useState({ x: 0, y: 0 });
  // const [endPosMilk, setEndPosMilk] = useState({ x: 0, y: 0 });
  // const [flyingGold, setFlyingGold] = useState(false);
  // const [startPosGold, setStartPosGold] = useState({ x: 0, y: 0 });
  // const [endPosGold, setEndPosGold] = useState({ x: 0, y: 0 });
  const [shakeMilkIcon, setShakeMilkIcon] = useState(false);
  const [shakeGoldIcon, setShakeGoldIcon] = useState(false);
  // const [startGuard, setStartGuard] = useState(false);

  const [isCowShedOpen, setIsCowShedOpen] = useState(false);
  const [isPlantSeedOpen, setIsPlantSeedOpen] = useState(false);
  const [isShowCombat, setIsShowCombat] = useState(false);

  // const cowRef = useRef<HTMLDivElement>(null);
  const milkHudRef = useRef<HTMLDivElement>(null);
  const goldHudRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLDivElement>(null);
  const defendRef = useRef<HTMLDivElement>(null);

  // const guardProgess = useMemo(() => {
  //   if (!startGuard) return 0;
  //   const maxTime = guardLevelData[mainLevel].loadTimeMinutes;

  //   if (goldHoldTime >= maxTime) {
  //     return 100;
  //   }

  //   return Math.round((goldHoldTime / maxTime) * 100);
  // }, [goldHoldTime, startGuard]);
  // const claimDisable = useMemo(() => {
  //   if (goldHoldTime < 1) {
  //     return true;
  //   }
  //   return false;
  // }, [goldHoldTime]);

  // const handleCollectGold = () => {
  //   if (flyingGold || !houseRef.current || !goldHudRef.current) return;

  //   const houseRect = houseRef.current.getBoundingClientRect();
  //   const goldIcon = goldHudRef.current.querySelector('img');
  //   if (!goldIcon) return;

  //   const goldRect = goldIcon.getBoundingClientRect();

  //   const start = {
  //     x: houseRect.left + houseRect.width / 2,
  //     y: houseRect.top + houseRect.height / 2,
  //   };

  //   const end = {
  //     x: goldRect.left + goldRect.width / 2,
  //     y: goldRect.top + goldRect.height / 2,
  //   };

  //   const icons: JSX.Element[] = [];
  //   const numIcons = Math.ceil(goldHolding / 10); // 10 đơn vị = 1 icon
  //   let finishedCount = 0;

  //   setFlyingGold(true);

  //   for (let i = 0; i < numIcons; i++) {
  //     const offsetX = (Math.random() - 0.5) * 40;
  //     const offsetY = (Math.random() - 0.5) * 40;
  //     const delay = i * 100;

  //     icons.push(
  //       <FlyingComponent
  //         key={i}
  //         start={{ x: start.x + offsetX, y: start.y + offsetY }}
  //         end={end}
  //         icon={GoldIcon}
  //         delay={delay}
  //         onComplete={() => {
  //           finishedCount++;
  //           if (finishedCount === numIcons) {
  //             setFlyingGold(false);
  //             setFlyingGoldIcons([]);
  //             setShakeGoldIcon(true);
  //             onClaimGold();
  //           }
  //         }}
  //       />
  //     );
  //   }

  //   setFlyingGoldIcons(icons);
  // };

  // const onClaimGold = () => {
  //   setStartGuard(false);
  //   claimGold();
  // };

  const onClickCowShed = () => {
    setIsCowShedOpen(!isCowShedOpen);
  };

  // useEffect(() => {
  //   if (!startGuard) return;

  //   const interval = setInterval(() => {
  //     const maxTime = guardLevelData[mainLevel].loadTimeMinutes;
  //     const maxGold = guardLevelData[mainLevel].maxGoldHolding;

  //     if (goldHoldTime >= maxTime || goldHolding >= maxGold) {
  //       clearInterval(interval);
  //     } else {
  //       setGoldHolding();
  //     }
  //   }, 500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [startGuard, goldHoldTime, goldHolding, mainLevel]);

  const onStartCombat = () => {
    // if (defendRef.current) {
    //   defendRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }
    setIsShowCombat(true);
    setTimeout(() => {
      const el = document.getElementById('combat');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'end' });
        setTimeout(() => {
          window.scrollBy({ left: window.innerWidth * 0.5, behavior: 'smooth' }); // 50vw
        }, 400);
      }
    }, 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const maxTime = milkLevelData[cowLevel].loadTimeMinutes;
      const maxMilk = milkLevelData[cowLevel].maxMilkHolding;

      if (milkHoldTime >= maxTime || milkHolding >= maxMilk) {
        clearInterval(interval);
      } else {
        setMilkHolding();
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [milkHoldTime, milkHolding, cowLevel]);

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
        handleCailm={claimMilk}
        milkHolding={milkHolding}
        milkHudRef={milkHudRef}
        setShakeMilkIcon={setShakeMilkIcon}
      />
      <PlantSeed isOpen={isPlantSeedOpen} />

      <Background overflowHidden={isCowShedOpen}>
        <HouseWithKnight
          houseRef={houseRef}
          onClick={() => {
            onStartCombat();
          }}
        />
        <Cowshed onClick={onClickCowShed} containerClass='top-[60%]' />
        <FarmGrid
          onClick={() => {
            setIsPlantSeedOpen(!isPlantSeedOpen);
          }}
        />
        <DefendComponent isShow={isShowCombat} defendRef={defendRef} />
        {/* {flyingGoldIcons} */}
        {/* <Tree className='bottom-10' /> */}
      </Background>
    </>
  );
}
