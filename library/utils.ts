import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { AvatarName, Member } from '../types';
import { avatarList } from './avatarList';

/**
 * A proper modulo function that only return positive numbers.
 * @param n number to take the modulo on
 * @param m the modulo base
 * @returns a positive number [0 .. m-1]
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/**
 * Generate a random 5 characters long code using A-Z and 0-9.
 * @returns a 5 character long string
 */
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

/**
 * A function to return a random index of an array.
 * @param array an array
 * @returns a number in the interval [0 .. array.length - 1]
 */

export function randomIndex<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length) % array.length;
}

/**
 * A function to get the available avatars in a household.
 * @param householdId a string
 * @returns an array of available avatar names
 */
export async function getAvailableIcons(householdId: string) {
  let avatars: AvatarName[] = [
    'fox',
    'pig',
    'frog',
    'chicken',
    'octopus',
    'dolphin',
    'unicorn',
    'owl',
  ];

  const members: Member[] = [];
  try {
    const snapshot = await getDocs(
      query(collection(db, 'members'), where('householdId', '==', householdId)),
    );
    snapshot.forEach((doc) => members.push(doc.data() as Member));
  } catch (error) {
    console.error(error);
  }

  members.forEach((m) => {
    avatars = avatars.filter(
      (avatar) => avatarList[avatar].icon !== m.avatar.icon,
    );
  });

  return avatars;
}
