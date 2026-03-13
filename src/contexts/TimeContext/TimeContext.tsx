import { useState } from 'react';
import { AppContext } from './AppContextInstance';
import type { ITimeDifference } from '../../types/types';

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [timeDifference, setTimeDifference] = useState<ITimeDifference | null>(
    null,
  );

  const value = {
    timeDifference,
    setTimeDifference,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
