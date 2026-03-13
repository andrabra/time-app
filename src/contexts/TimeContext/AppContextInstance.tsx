import React from 'react';
import type { AppContextType } from './AppContext';

export const AppContext = React.createContext<AppContextType | undefined>(undefined);
