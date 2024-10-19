// constants
const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Function to calculate monday T00:00:00.000 of the same week as the input date.
 * @param today a date.
 * @returns new date from the same week.
 */
export function startDayCurrentWeek(today: Date): Date {
  //FIXME: need to use setHours(0,0,0,0)?
  return new Date(today.getTime() - (today.getDay() - 1) * DAY_IN_MS);
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
