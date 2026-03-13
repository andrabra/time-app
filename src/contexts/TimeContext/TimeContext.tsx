import { useState } from 'react';
import { AppContext } from './AppContextInstance';

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [timeDifference, setTimeDifference] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMilliseconds: number;
  } | null>(null);

  const value = {
    timeDifference,
    setTimeDifference,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
