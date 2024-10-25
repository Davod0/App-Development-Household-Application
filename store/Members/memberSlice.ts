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
    builder
      .addCase(addMember.fulfilled, (state, action: PayloadAction<Member>) => {
        state.push(action.payload);
      })
      .addCase(addMember.rejected, (state, action) => {
        console.error('Failed to add member: ', action.payload);
      })
      .addCase(
        deleteMemberById.fulfilled,
        (state, action: PayloadAction<string>) => {
          return state.filter((member) => member.id !== action.payload);
        },
      )
      .addCase(deleteMemberById.rejected, (state, action) => {
        console.error('Failed to delete member: ', action.payload);
      })
      .addCase(
        updateMember.fulfilled,
        (state, action: PayloadAction<Member>) => {
          const index = state.findIndex(
            (member) => member.id === action.payload.id,
          );
          if (index !== -1) {
            state[index] = action.payload;
          }
        },
      )
      .addCase(updateMember.rejected, (state, action) => {
        console.error('Failed to update member: ', action.payload);
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state = action.payload;
      });
  },
});

export const membersReducer = membersSlice.reducer;
export const {} = membersSlice.actions;
