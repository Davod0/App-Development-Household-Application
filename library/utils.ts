/**
 * A proper modulo function that ony gives positive answers.
 * @param n number to take the modulo on
 * @param m the modulo base
 * @returns a positive answer [0 .. m-1]
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
