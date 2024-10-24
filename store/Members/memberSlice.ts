import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member, mockedMembers } from '../../data';

export type CreateMembers = Omit<Member, 'id'>;
export type DeleteMembers = string;

type MembersState = Member[];
const initialState: MembersState = mockedMembers;

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<CreateMembers>) => {
      state.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    deleteMemberById: (state, action: PayloadAction<DeleteMembers>) => {
      return state.filter((member) => member.id !== action.payload);
    },
  },
});

export const membersReducer = membersSlice.reducer;
export const { addMember, deleteMemberById } = membersSlice.actions;
