import type { ITimeDifference } from "../../../types/types";


export const formatTimeDifference = (
  timeDifference: ITimeDifference | null,
) => {
  if (!timeDifference) {
    return null;
  }
  const formattedTimeDifference = {
    days: timeDifference.days.toFixed(2),
    hours: timeDifference.hours.toFixed(2),
    minutes: timeDifference.minutes.toFixed(2),
    seconds: timeDifference.seconds.toFixed(2),
    totalMilliseconds: timeDifference.totalMilliseconds.toFixed(2),
  };
  return formattedTimeDifference;
};
