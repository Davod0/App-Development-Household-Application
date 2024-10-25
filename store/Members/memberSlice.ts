import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member, mockedMembers } from '../../data';
import {
  addMember,
  deleteMemberById,
  getAllMembers,
  updateMember,
} from './membersAction';

export type CreateMembers = Omit<Member, 'id'>;
export type DeleteMembers = string;
export type CreateHouseholdMember = Omit<Member, 'id' | 'householdId'>;

type MembersState = Member[];
const initialState: MembersState = mockedMembers;

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addMember.fulfilled,
      (state, action: PayloadAction<Member>) => {
        state.push(action.payload);
      },
    );
    builder.addCase(addMember.rejected, (state, action) => {
      console.error('Failed to add member: ', action.payload);
    });
    builder.addCase(
      deleteMemberById.fulfilled,
      (state, action: PayloadAction<string>) => {
        return state.filter((member) => member.id !== action.payload);
      },
    );
    builder.addCase(deleteMemberById.rejected, (state, action) => {
      console.error('Failed to delete member: ', action.payload);
    });
    builder.addCase(
      updateMember.fulfilled,
      (state, action: PayloadAction<Member>) => {
        const index = state.findIndex(
          (member) => member.id === action.payload.id,
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      },
    );
    builder.addCase(updateMember.rejected, (state, action) => {
      console.error('Failed to update member: ', action.payload);
    });
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const membersReducer = membersSlice.reducer;
export const {} = membersSlice.actions;
