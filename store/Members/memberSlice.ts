import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockedMembers } from '../../data';
import { CreateMembers, Member } from '../../types';

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
    deleteMemberById: (state, action: PayloadAction<string>) => {
      return state.filter((member) => member.id !== action.payload);
    },
    updateMember: (state, action: PayloadAction<Member>) => {
      const index = state.findIndex(
        (member) => member.id === action.payload.id,
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const membersReducer = membersSlice.reducer;
export const { addMember, deleteMemberById, updateMember } =
  membersSlice.actions;
