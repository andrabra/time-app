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
const [finished, setFinished] = useState(false);

  const value = {
    timeDifference,
    setTimeDifference,
    finished,
    setFinished
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
