export type EmailPassword = {
  email: string;
  password: string;
};

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
    id: 'member-1',
    userId: 'user-1',
    householdId: 'household-1',
    avatarId: 'avatar-1',
    isOwner: true,
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
];

// Mocked Task data
export const mockedTasks: Task[] = [
  {
    id: 'task-1',
    householdId: 'household-1',
    name: 'Take out the trash',
    description: 'Empty all trash bins in the house and take them out.',
    weight: 3,
    frequency: 7, // Weekly task
    isArchived: false,
  },
  {
    id: 'task-2',
    householdId: 'household-2',
    name: 'Do the laundry',
    description: 'Wash, dry, and fold clothes.',
    weight: 4,
    frequency: 3, // Every 3 days
    isArchived: false,
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
