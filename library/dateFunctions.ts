// constants
const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Function to calculate monday T00:00:00.000 of the same week as the input date.
 * @param today todays date
 * @returns new date
 */
export function startDayCurrentWeek(today: Date): Date {
  return new Date(today.getTime() - (today.getDay() - 1) * DAY_IN_MS);
}

// isBetween(start: Date, end: Date, d: Date): boolean
// isAfter(start: Date, d: Date): boolean
