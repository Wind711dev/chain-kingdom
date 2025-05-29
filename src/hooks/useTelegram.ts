import { retrieveRawInitData, useRawInitData, useRawLaunchParams } from '@telegram-apps/sdk-react';

export const useTelegram = () => {
  const userRawData = useRawLaunchParams();
  const userIOnitData = useRawInitData();
  const initDataRaw = retrieveRawInitData();
  const getDataInitial = () => {};
  return {
    userRawData,
    userIOnitData,
    initDataRaw,
    getDataInitial,
  };
};
