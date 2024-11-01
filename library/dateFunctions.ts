import { mod } from './utils';

// constants
const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Check if a date is in the current week. Find monday at 0.00.00 for the current week
 * and check it the given date is after that date.
 * @param d a date.
 * @returns true if the given date is in the current week.
 */
export function isDateInCurrentWeek(d: Date): boolean {
  return d >= startDayOfWeek(todayAtMidnight());
}

/**
 * Check if a date is in last week by finding monday of last week and monday of this week,
 * then check if the given date is between those dates.
 * @param d a date.
 * @returns true if the given date is in last week.
 */
export function isDateInPreviousWeek(d: Date): boolean {
  const dateInLastWeek = new Date(todayAtMidnight().getTime() - 7 * DAY_IN_MS);
  return (
    d >= startDayOfWeek(dateInLastWeek) && d < startDayOfWeek(todayAtMidnight())
  );
}

/**
 * Check if a date is in previous month.
 * @param d a date
 * @returns true if the given date is in the previous month.
 */
export function isDateInPreviousMonth(d: Date): boolean {
  const firstDayOfPreviousMonth = todayAtMidnight();
  firstDayOfPreviousMonth.setMonth(d.getMonth() - 1);
  firstDayOfPreviousMonth.setDate(1);
  const LastDayOfPreviousMonth = todayAtMidnight();
  LastDayOfPreviousMonth.setDate(0);

  return d >= firstDayOfPreviousMonth && d < LastDayOfPreviousMonth;
}

/**
 * Function to create a new date with time set to 00:00:00
 * @returns new date at midnight
 */
export function todayAtMidnight(): Date {
  let today = new Date();
  return new Date(today.setHours(0, 0, 0, 0));
}

/**
 * Function to calculate monday T00:00:00.000 of the same week as the input date.
 * @param today a date.
 * @returns new date from the same week.
 */
export function startDayOfWeek(date: Date): Date {
  date.setHours(0, 0, 0, 0);
  return new Date(date.getTime() - mod(date.getDay() - 1, 7) * DAY_IN_MS);
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
