import type { ITimeDifference } from '../../types/types';

export interface AppContextType {
  timeDifference: ITimeDifference | null;
  setTimeDifference: (value: ITimeDifference | null) => void;
}
