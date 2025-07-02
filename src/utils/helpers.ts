import { TrackType } from '@/sherdTypes/sheredTypes';

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });
  return Array.from(uniqueValues);
}

export const formatTime = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds); // обрезаем дробную часть
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
};
