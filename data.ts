import { avatarList } from './library/avatarList';
import {
  CompletedTask,
  Household,
  Member,
  ScheduledTask,
  Task,
  User,
} from './types';

// Mocked Household data
export const mockedHouseholds: Household[] = [
  {
    id: 'household-1',
    name: 'Johnson Family',
    code: 'JH123',
  },
  {
    id: 'household-2',
    name: 'Doe Family',
    code: 'AF246',
  },
  {
    id: 'household-3',
    name: 'Hällentorp Family',
    code: 'GE246',
  },
];

// Mocked Member data
export const mockedMembers: Member[] = [
  {
    id: 'member-0',
    name: 'Kalle',
    userId: 'user-0',
    householdId: 'household-1',
    avatar: avatarList['fox'],
    isOwner: true,
    isAllowed: true,
  },
  {
    id: 'member-1',
    name: 'Magnus',
    userId: 'user-1',
    householdId: 'household-1',
    avatar: avatarList['pig'],
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-2',
    name: 'Liam',
    userId: 'user-2',
    householdId: 'household-1',
    avatar: avatarList['frog'],
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-3',
    name: 'Tony',
    userId: 'user-3',
    householdId: 'household-2',
    avatar: avatarList['octopus'],
    isOwner: true,
    isAllowed: true,
  },
  {
    id: 'member-4',
    name: 'Tony2',
    userId: 'user-3',
    householdId: 'household-2',
    avatar: avatarList['chicken'],
    isOwner: true,
    isAllowed: true,
  },
  {
    id: 'member-5',
    name: 'Olle',
    userId: 'user-5',
    householdId: 'household-1',
    avatar: avatarList['dolphin'],
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-6',
    name: 'Anna',
    userId: 'user-6',
    householdId: 'household-2',
    avatar: avatarList['owl'],
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-7',
    name: 'Stina',
    userId: 'user-7',
    householdId: 'household-2',
    avatar: avatarList['unicorn'],
    isOwner: false,
    isAllowed: true,
  },
];

// Mocked ScheduledTask data
export const mockedScheduledTasks: ScheduledTask[] = [
  {
    id: 'scheduled-task-1',
    memberId: 'member-1',
    householdId: 'household-1',
    taskId: 'task-1',
  },
  {
    id: 'scheduled-task-2',
    memberId: 'member-3',
    householdId: 'household-2',
    taskId: 'task-2',
  },
];

// Mocked CompletedTask data
export const mockedCompletedTasks: CompletedTask[] = [
  {
    id: '652dcd1b2c8f3a00169b68a5',
    memberId: 'member-1',
    taskId: 'task-14',
    householdId: 'household-1',
    dateDone: new Date(2024, 9, 23).toUTCString(), // October 7, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68a6',
    memberId: 'member-2',
    taskId: 'task-5',
    householdId: 'household-1',
    dateDone: new Date(2024, 9, 8).toUTCString(), // October 8, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68a8',
    memberId: 'member-0',
    taskId: 'task-17',
    householdId: 'household-1',
    dateDone: new Date(2024, 9, 10).toUTCString(), // October 10, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68a9',
    memberId: 'member-5',
    taskId: 'task-22',
    householdId: 'household-1',
    dateDone: new Date(2024, 9, 11).toUTCString(), // October 11, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b0',
    memberId: 'member-4',
    taskId: 'task-20',
    householdId: 'household-1',
    dateDone: new Date(2024, 9, 15).toUTCString(), // October 12, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b1',
    memberId: 'member-7',
    taskId: 'task-3',
    householdId: 'household-1',
    dateDone: new Date(2024, 9, 13).toUTCString(), // October 13, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b2',
    memberId: 'member-1',
    taskId: 'task-15',
    householdId: 'household-1',
    dateDone: new Date(2024, 9, 14).toUTCString(), // October 14, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b3',
    memberId: 'member-3',
    taskId: 'task-24',
    householdId: 'household-1',
    dateDone: new Date(2024, 9, 15).toUTCString(), // October 15, 2024
  },
];

export const mockedTasks: Task[] = [
  {
    id: 'task-0',
    householdId: 'household-1',
    name: 'Take out the trash',
    description: 'Empty all trash bins in the house and take them out.',
    weight: 3,
    frequency: 7,
    isArchived: false,
  },
  {
    id: 'task-1',
    householdId: 'household-2',
    name: 'Do the laundry',
    description: 'Wash, dry, and fold clothes.',
    weight: 4,
    frequency: 3,
    isArchived: false,
  },
  {
    id: 'task-3',
    householdId: 'household-1',
    name: 'Clean the kitchen',
    description: 'Wipe down counters, clean the sink, and mop the floor.',
    weight: 5,
    frequency: 7,
    isArchived: false,
  },
  {
    id: 'task-4',
    householdId: 'household-2',
    name: 'Mow the lawn',
    description: 'Mow the front and back lawn, trim the edges.',
    weight: 4,
    frequency: 14,
    isArchived: false,
  },
  {
    id: 'task-5',
    householdId: 'household-2',
    name: 'Wash the car',
    description: 'Clean the exterior and interior of the car.',
    weight: 3,
    frequency: 30,
    isArchived: false,
  },
  {
    id: 'task-6',
    householdId: 'household-1',
    name: 'Vacuum living room',
    description: 'Vacuum the living room and under the furniture.',
    weight: 2,
    frequency: 3,
    isArchived: true,
  },
  {
    id: 'task-7',
    householdId: 'household-1',
    name: 'Clean windows',
    description: 'Wipe down all windows inside the house.',
    weight: 4,
    frequency: 30,
    isArchived: false,
  },
  {
    id: 'task-10',
    householdId: 'household-1',
    name: 'Mow the lawn',
    description: 'Mow the front and back lawn, trim the edges.',
    weight: 4,
    frequency: 14,
    isArchived: false,
  },
  {
    id: 'task-11',
    householdId: 'household-2',
    name: 'Wash the car',
    description: 'Clean the exterior and interior of the car.',
    weight: 3,
    frequency: 30,
    isArchived: false,
  },
  {
    id: 'task-13',
    householdId: 'household-2',
    name: 'Clean windows',
    description: 'Wipe down all windows inside the house.',
    weight: 4,
    frequency: 30,
    isArchived: false,
  },
  {
    id: 'task-14',
    householdId: 'household-1',
    name: 'Water indoor plants',
    description: 'Water all the indoor plants in the living room and kitchen.',
    weight: 1,
    frequency: 2,
    isArchived: false,
  },
  {
    id: 'task-15',
    householdId: 'household-1',
    name: 'Dust shelves',
    description: 'Dust all the shelves in the living room and bedrooms.',
    weight: 2,
    frequency: 5,
    isArchived: false,
  },
];

// Mocked User data
export const mockedUsers: User[] = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Johnson',
  },
  {
    id: 'user-2',
    firstName: 'Jane',
    lastName: 'Roberts',
  },
  {
    id: 'user-3',
    firstName: 'Sarah',
    lastName: 'Doe',
  },
];
