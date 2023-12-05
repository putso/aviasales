import { addMinutes, getHours, getMinutes, parseISO } from 'date-fns';

export function getHMTime(time: Date) {
  const hourse = getHours(time);
  const minutes = getMinutes(time);
  return { hourse, minutes };
}
export function getFormatDates(dateStartString: string, duration: number) {
  const dateStart = parseISO(dateStartString);
  const dateEnd = addMinutes(dateStart, duration);
  const startMH = getHMTime(dateStart);
  const endMH = getHMTime(dateEnd);
  return { startMH, endMH };
}
export function getNoun(number: number, one: string, two: string, five: string) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}
