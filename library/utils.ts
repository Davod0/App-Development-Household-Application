/**
 * A proper modulo function that only return positive numbers.
 * @param n number to take the modulo on
 * @param m the modulo base
 * @returns a positive number [0 .. m-1]
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

/**
 * A function that will slice off the end of a long string, and add ellipsis (...) to the
 * end if the string is sliced.
 * @param str a text string that can be undefined
 * @param len the max length you want the text to be
 * @returns a string that is max len characters long or an empty string if str is undefined.
 */
export function sliceStringToLengthAddEllipsis(
  str: string | undefined,
  len: number,
) {
  if (!str) return '';
  return str.length > len
    ? str.slice(0, len - 3).trim() + (str.length > len - 3 ? '...' : '')
    : str;
}
