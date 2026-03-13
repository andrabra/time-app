import React from 'react';
import { AppContext } from '../contexts/TimeContext/AppContextInstance';

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};
