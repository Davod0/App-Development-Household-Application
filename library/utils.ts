/**
 * A proper modulo function that ony gives positive answers.
 * @param n number to take the modulo on
 * @param m the modulo base
 * @returns a positive answer [0 .. m-1]
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};
