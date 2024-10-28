import { createSlice } from '@reduxjs/toolkit';
import { Member } from '../../types';
import {
  addMember,
  deleteMember,
  getMembersByHouseholdId,
  updateMember,
} from './membersActions';

// state
type MembersState = {
  list: Member[];
  isLoading?: boolean;
};
const initialState: MembersState = {
  list: [],
};

// slice
const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.isLoading = false;
      })
      .addCase(updateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        // const index = state.list.findIndex(
        //   (member) => member.id === action.payload.id,
        // );
        // if (index !== -1) {
        //   state.list[index] = action.payload;
        // }
        const member = state.list.find((m) => m.id === action.payload.id);
        if (member) {
          Object.assign(member, action.payload);
        }
        state.isLoading = false;
      })
      .addCase(getMembersByHouseholdId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembersByHouseholdId.fulfilled, (_, action) => {
        return {
          list: action.payload,
          isLoading: false,
        };
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        return {
          ...state,
          list: state.list.filter((m) => m.id !== action.payload),
        };
      });
  },
});

export const membersReducer = membersSlice.reducer;
export const {} = membersSlice.actions;
