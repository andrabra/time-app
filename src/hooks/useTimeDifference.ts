import dayjs from 'dayjs';
import type { ITimeDifference } from '../types/types';

export const calculateTimeDifference = (
  start: Date,
  target: Date,
): ITimeDifference => {
  const difference = dayjs(target).diff(dayjs(start));

  const totalMilliseconds = Math.abs(difference);

  const days = dayjs(target).diff(dayjs(start), 'day', true);
  const hours = dayjs(target).diff(dayjs(start), 'hour', true);
  const minutes = dayjs(target).diff(dayjs(start), 'minute', true);
  const seconds = dayjs(target).diff(dayjs(start), 'second', true);

  return { days, hours, minutes, seconds, totalMilliseconds };
};

export const useTimeDifference = (
  start: Date,
  target: Date,
): ITimeDifference => {
  return calculateTimeDifference(start, target);
};
