import { mod } from './utils';

// constants
const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Function to calculate monday T00:00:00.000 of the same week as the input date.
 * @param today a date.
 * @returns new date from the same week.
 */
export function startDayCurrentWeek(today: Date): Date {
  today.setHours(0, 0, 0, 0);
  return new Date(today.getTime() - mod(today.getDay() - 1, 7) * DAY_IN_MS);
}

/**
 * Function to create a new date with time set to 00:00:00
 * @returns new date at midnight
 */
export function todayStart(): Date {
  let today = new Date();
  return new Date(today.setHours(0, 0, 0, 0));
}

/**
 * Function that calculate the number of whole days between to dates.
 * @param d1 a date
 * @param d2 another date
 * @returns number of whole days between d1 and d2
 */
export function dateDifference(d1: Date, d2: Date): number {
  return Math.floor(Math.abs(d1.getTime() - d2.getTime()) / DAY_IN_MS);
}

// isBetween(start: Date, end: Date, d: Date): boolean
// isAfter(start: Date, d: Date): boolean
