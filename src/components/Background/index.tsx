import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useAnimalShelter, useProfile } from '../../hooks';
import { useFarm } from '../../hooks/useFarm';
import DiamondHoneycombGrid from './Gird';
import './styles.scss';

interface IBackgroundProps {
  children: React.ReactNode;
  overflowHidden?: boolean;
  onClick?: () => void;
  showGrid?: boolean;
}

interface ICoordinates {
  top: 0 | 100 | 200;
  left: 0 | 100 | 200;
}

export default function Background({
  children,
  overflowHidden,
  showGrid = false,
  onClick,
}: IBackgroundProps) {
  const { getUseProfile, getInventory, getItemsConfig } = useProfile();
  const { handleGetFarmPlots } = useFarm();
  const { handleGetAllAnimalShelter, handleGetShelterTypes } = useAnimalShelter();

  const [coordinates, _setCoordinates] = useState<ICoordinates>({
    top: 0,
    left: 0,
  });

  const setupShelter = useCallback(async () => {
    await handleGetAllAnimalShelter();
    await handleGetShelterTypes();
  }, [handleGetAllAnimalShelter, handleGetShelterTypes]);

  useEffect(() => {
    getUseProfile();
    getInventory();
    getItemsConfig();
  }, [getUseProfile, getInventory, getItemsConfig]);

  useEffect(() => {
    handleGetFarmPlots();
  }, [handleGetFarmPlots]);

  useEffect(() => {
    setupShelter();
  }, [setupShelter]);

  return (
    <div
      className='background-container diamond-grid-bg'
      style={{ overflow: overflowHidden || showGrid ? 'hidden' : 'auto' }}
    >
      <div className='h-[300%] w-[300%]' onClick={onClick}>
        <div
          className='relative'
          style={{ top: `${coordinates.top}vh`, left: `${coordinates.left}vh` }}
        >
          <DiamondHoneycombGrid showGrid={showGrid} onClickGrid={() => {}} />
        </div>
        {children}
      </div>
    </div>
  );
}
