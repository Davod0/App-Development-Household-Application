export type Household = {
  id: string;
  name: string;
  code: string;
};

export type EmailPassword = {
  email: string;
  password: string;
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
  name: string;
  userId: string;
  householdId: string;
  avatar: Avatar;
  isOwner: boolean;
  isAllowed: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export type CompletedTask = {
  id: string;
  memberId: string;
  taskId: string;
  householdId: string;
  dateDone: string;
};

export type ScheduledTask = {
  id: string;
  memberId: string;
  taskId: string;
  householdId: string;
};

export type Avatar = {
  icon: string;
  color: string;
};

export type Request = {
  id: string;
  householdId: string;
  memberId: string;
};

export type CreateScheduledTask = Omit<ScheduledTask, 'id'>;
export type CreateCompletedTask = Omit<CompletedTask, 'id'>;
export type CreateHousehold = Omit<Household, 'id'>;
export type CreateTask = Omit<Task, 'id' | 'householdId' | 'isArchived'>;
export type CreateMembers = Omit<Member, 'id'>;
export type CreateHouseholdMember = Omit<Member, 'id' | 'householdId'>;

export type AvatarName =
  | 'fox'
  | 'pig'
  | 'frog'
  | 'chicken'
  | 'octopus'
  | 'dolphin'
  | 'owl'
  | 'unicorn';
