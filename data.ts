export type ScheduledTask = {
  id: string;
  memberId: string;
  taskId: string;
};

export type CompletedTask = {
  id: string;
  memberId: string;
  taskId: string;
  dateDone: Date;
};

export type Task = {
  id: string;
  householdId: string;
  name: string;
  description: string;
  weight: number;
  frequency: number;
  isArchived: boolean;
};

export type Member = {
  id: string;
  userId: string;
  householdId: string;
  avatarId: string;
  isOwner: boolean;
  isAllowed: boolean;
};

export type Household = {
  id: string;
  name: string;
  code: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export type NewUser = Omit<User, 'id'>;

export type Avatar = {
  id: string;
  icon: Icon;
  colour: Colour;
};

type Icon =
  | 'fox'
  | 'whale'
  | 'pig'
  | 'frog'
  | 'chic'
  | 'octopus'
  | 'owl'
  | 'unicorn';

type Colour =
  | 'orange'
  | 'blue'
  | 'pink'
  | 'green'
  | 'yellow'
  | 'red'
  | 'brown'
  | 'purple';

export const ColourHexMap: { [key in Colour]: string } = {
  orange: '#FFA500',
  blue: '#0000FF',
  pink: '#FFC0CB',
  green: '#008000',
  yellow: '#FFFF00',
  red: '#FF0000',
  brown: '#A52A2A',
  purple: '#800080',
};

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
    code: 'DF456',
  },
];

// Mocked Member data
export const mockedMembers: Member[] = [
  {
    id: 'member-0',
    userId: 'user-0',
    householdId: 'household-1',
    avatarId: 'avatar-0',
    isOwner: true,
    isAllowed: true,
  },
  {
    id: 'member-1',
    userId: 'user-1',
    householdId: 'household-1',
    avatarId: 'avatar-1',
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-2',
    userId: 'user-2',
    householdId: 'household-1',
    avatarId: 'avatar-2',
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-3',
    userId: 'user-3',
    householdId: 'household-2',
    avatarId: 'avatar-3',
    isOwner: true,
    isAllowed: true,
  },
  {
    id: 'member-4',
    userId: 'user-4',
    householdId: 'household-2',
    avatarId: 'avatar-4',
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-5',
    userId: 'user-5',
    householdId: 'household-1',
    avatarId: 'avatar-5',
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-6',
    userId: 'user-6',
    householdId: 'household-2',
    avatarId: 'avatar-6',
    isOwner: false,
    isAllowed: true,
  },
  {
    id: 'member-7',
    userId: 'user-7',
    householdId: 'household-2',
    avatarId: 'avatar-7',
    isOwner: false,
    isAllowed: true,
  },
];

// Mocked ScheduledTask data
export const mockedScheduledTasks: ScheduledTask[] = [
  {
    id: 'scheduled-task-1',
    memberId: 'member-1',
    taskId: 'task-1',
  },
  {
    id: 'scheduled-task-2',
    memberId: 'member-3',
    taskId: 'task-2',
  },
];

// Mocked CompletedTask data
export const mockedCompletedTasks: CompletedTask[] = [
  {
    id: 'completed-task-1',
    memberId: 'member-1',
    taskId: 'task-1',
    dateDone: new Date('2024-10-01'),
  },
  {
    id: 'completed-task-2',
    memberId: 'member-3',
    taskId: 'task-2',
    dateDone: new Date('2024-10-05'),
  },
  {
    id: '652dcd1b2c8f3a00169b68a5',
    memberId: 'member-3',
    taskId: 'task-0',
    dateDone: new Date(2024, 9, 7), // October 7, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68a6',
    memberId: 'member-2',
    taskId: 'task-5',
    dateDone: new Date(2024, 9, 8), // October 8, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68a7',
    memberId: 'member-4',
    taskId: 'task-12',
    dateDone: new Date(2024, 9, 9), // October 9, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68a8',
    memberId: 'member-0',
    taskId: 'task-17',
    dateDone: new Date(2024, 9, 10), // October 10, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68a9',
    memberId: 'member-5',
    taskId: 'task-22',
    dateDone: new Date(2024, 9, 11), // October 11, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b0',
    memberId: 'member-6',
    taskId: 'task-9',
    dateDone: new Date(2024, 9, 12), // October 12, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b1',
    memberId: 'member-7',
    taskId: 'task-3',
    dateDone: new Date(2024, 9, 13), // October 13, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b2',
    memberId: 'member-1',
    taskId: 'task-15',
    dateDone: new Date(2024, 9, 14), // October 14, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b3',
    memberId: 'member-3',
    taskId: 'task-24',
    dateDone: new Date(2024, 9, 15), // October 15, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b4',
    memberId: 'member-4',
    taskId: 'task-6',
    dateDone: new Date(2024, 9, 16), // October 16, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b5',
    memberId: 'member-2',
    taskId: 'task-19',
    dateDone: new Date(2024, 9, 17), // October 17, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b6',
    memberId: 'member-6',
    taskId: 'task-13',
    dateDone: new Date(2024, 9, 18), // October 18, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b7',
    memberId: 'member-1',
    taskId: 'task-8',
    dateDone: new Date(2024, 9, 7), // October 7, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b8',
    memberId: 'member-7',
    taskId: 'task-11',
    dateDone: new Date(2024, 9, 8), // October 8, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68b9',
    memberId: 'member-0',
    taskId: 'task-21',
    dateDone: new Date(2024, 9, 9), // October 9, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68ba',
    memberId: 'member-5',
    taskId: 'task-2',
    dateDone: new Date(2024, 9, 10), // October 10, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68bb',
    memberId: 'member-3',
    taskId: 'task-14',
    dateDone: new Date(2024, 9, 11), // October 11, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68bc',
    memberId: 'member-6',
    taskId: 'task-23',
    dateDone: new Date(2024, 9, 12), // October 12, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68bd',
    memberId: 'member-4',
    taskId: 'task-4',
    dateDone: new Date(2024, 9, 13), // October 13, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68be',
    memberId: 'member-2',
    taskId: 'task-10',
    dateDone: new Date(2024, 9, 14), // October 14, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68bf',
    memberId: 'member-1',
    taskId: 'task-27',
    dateDone: new Date(2024, 9, 15), // October 15, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68c0',
    memberId: 'member-5',
    taskId: 'task-7',
    dateDone: new Date(2024, 9, 16), // October 16, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68c1',
    memberId: 'member-3',
    taskId: 'task-18',
    dateDone: new Date(2024, 9, 17), // October 17, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68c2',
    memberId: 'member-0',
    taskId: 'task-25',
    dateDone: new Date(2024, 9, 18), // October 18, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68c3',
    memberId: 'member-7',
    taskId: 'task-1',
    dateDone: new Date(2024, 9, 7), // October 7, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68c4',
    memberId: 'member-6',
    taskId: 'task-16',
    dateDone: new Date(2024, 9, 8), // October 8, 2024
  },
  {
    id: '652dcd1b2c8f3a00169b68c5',
    memberId: 'member-4',
    taskId: 'task-26',
    dateDone: new Date(2024, 9, 9), // October 9, 2024
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
    lastName: 'Johnson',
  },
  {
    id: 'user-3',
    firstName: 'Sarah',
    lastName: 'Doe',
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
    id: 'task-2',
    householdId: 'household-1',
    name: 'Take out the trash again',
    description: 'Empty all trash bins in the house and take them out.',
    weight: 3,
    frequency: 7,
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
    householdId: 'household-2',
    name: 'Clean windows',
    description: 'Wipe down all windows inside the house.',
    weight: 4,
    frequency: 30,
    isArchived: false,
  },
  {
    id: 'task-8',
    householdId: 'household-1',
    name: 'Take out the trash one more time',
    description: 'Empty all trash bins in the house and take them out.',
    weight: 3,
    frequency: 7,
    isArchived: false,
  },
  {
    id: 'task-9',
    householdId: 'household-1',
    name: 'Clean the kitchen again',
    description: 'Wipe down counters, clean the sink, and mop the floor.',
    weight: 5,
    frequency: 7,
    isArchived: false,
  },
  {
    id: 'task-10',
    householdId: 'household-2',
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
    id: 'task-12',
    householdId: 'household-1',
    name: 'Vacuum living room',
    description: 'Vacuum the living room and under the furniture.',
    weight: 2,
    frequency: 3,
    isArchived: true,
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
    householdId: 'household-2',
    name: 'Dust shelves',
    description: 'Dust all the shelves in the living room and bedrooms.',
    weight: 2,
    frequency: 5,
    isArchived: false,
  },
  {
    id: 'task-16',
    householdId: 'household-1',
    name: 'Change bed linens',
    description: 'Remove old bed linens, wash, and replace with fresh ones.',
    weight: 3,
    frequency: 14,
    isArchived: false,
  },
  {
    id: 'task-17',
    householdId: 'household-2',
    name: 'Sweep the driveway',
    description: 'Sweep leaves and debris from the driveway.',
    weight: 3,
    frequency: 7,
    isArchived: false,
  },
  {
    id: 'task-18',
    householdId: 'household-1',
    name: 'Organize pantry',
    description: 'Reorganize the pantry and check for expired items.',
    weight: 4,
    frequency: 30,
    isArchived: false,
  },
  {
    id: 'task-19',
    householdId: 'household-2',
    name: 'Clean gutters',
    description: 'Clear out leaves and debris from the gutters.',
    weight: 5,
    frequency: 90,
    isArchived: false,
  },
  {
    id: 'task-20',
    householdId: 'household-1',
    name: 'Clean bathroom',
    description: 'Scrub tiles, clean the sink, toilet, and shower.',
    weight: 3,
    frequency: 7,
    isArchived: false,
  },
  {
    id: 'task-21',
    householdId: 'household-2',
    name: 'Check smoke detectors',
    description: 'Test all smoke detectors and replace batteries if needed.',
    weight: 2,
    frequency: 180,
    isArchived: false,
  },
  {
    id: 'task-22',
    householdId: 'household-1',
    name: 'Clean refrigerator',
    description:
      'Remove old food and clean the shelves inside the refrigerator.',
    weight: 4,
    frequency: 30,
    isArchived: false,
  },
  {
    id: 'task-23',
    householdId: 'household-2',
    name: 'Wash curtains',
    description: 'Take down curtains and wash them.',
    weight: 4,
    frequency: 90,
    isArchived: false,
  },
  {
    id: 'task-24',
    householdId: 'household-1',
    name: 'Sweep porch',
    description: 'Sweep dirt and debris off the porch area.',
    weight: 2,
    frequency: 7,
    isArchived: true,
  },
  {
    id: 'task-25',
    householdId: 'household-2',
    name: 'Organize garage',
    description: 'Organize tools, clean the floor, and sort out storage boxes.',
    weight: 5,
    frequency: 60,
    isArchived: false,
  },
  {
    id: 'task-26',
    householdId: 'household-1',
    name: 'Wipe down appliances',
    description: 'Clean the exterior of the microwave, oven, and fridge.',
    weight: 2,
    frequency: 7,
    isArchived: false,
  },
  {
    id: 'task-27',
    householdId: 'household-2',
    name: 'Trim hedges',
    description: 'Trim the hedges around the front yard.',
    weight: 4,
    frequency: 30,
    isArchived: false,
  },
];

// Mocked Avatar data
export const mockedAvatars: Avatar[] = [
  {
    id: 'avatar-1',
    icon: 'fox',
    colour: 'orange',
  },
  {
    id: 'avatar-2',
    icon: 'whale',
    colour: 'blue',
  },
  {
    id: 'avatar-3',
    icon: 'frog',
    colour: 'green',
  },
];

type Avatar_test = { id: string; icon: string; color: string };
export const avatarList: Avatar_test[] = [
  { id: 'avatar-0', icon: '\uD83E\uDD8A', color: '#FFA500' },
  { id: 'avatar-1', icon: '\uD83D\uDC37', color: '#FFC0CB' },
  { id: 'avatar-2', icon: '\uD83D\uDC38', color: '#008000' },
  { id: 'avatar-3', icon: '\uD83D\uDC25', color: '#FFFF00' },
  { id: 'avatar-4', icon: '\uD83D\uDC19', color: '#FF0000' },
  { id: 'avatar-5', icon: '\uD83D\uDC2C', color: '#0000FF' },
  { id: 'avatar-6', icon: '\uD83E\uDD89', color: '#A52A2A' },
  { id: 'avatar-7', icon: '\uD83E\uDD84', color: '#800080' },
];

type AvatarName =
  | 'fox'
  | 'whale'
  | 'pig'
  | 'frog'
  | 'chic'
  | 'octopus'
  | 'owl'
  | 'unicorn';

interface AvatarInfo {
  icon: string;
  color: string;
}

// export const avatarList2: Record<AvatarName, AvatarInfo> = {
export const avatarList2: { [key in AvatarName]: AvatarInfo } = {
  fox: { icon: '\uD83E\uDD8A', color: '#FFA500' },
  whale: { icon: '\uD83D\uDC37', color: '#FFC0CB' },
  pig: { icon: '\uD83D\uDC38', color: '#008000' },
  frog: { icon: '\uD83D\uDC25', color: '#FFFF00' },
  chic: { icon: '\uD83D\uDC19', color: '#FF0000' },
  octopus: { icon: '\uD83D\uDC2C', color: '#0000FF' },
  owl: { icon: '\uD83E\uDD89', color: '#A52A2A' },
  unicorn: { icon: '\uD83E\uDD84', color: '#800080' },
};
