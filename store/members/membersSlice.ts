import { createSlice } from '@reduxjs/toolkit';
import { Member } from '../../types';
import {
  addMember,
  deleteMember,
  getMembersBySelectedHousehold,
  updateMember,
} from './membersActions';

// state
type MembersState = {
  list: Member[];
  isLoading: boolean;
};
const initialState: MembersState = {
  list: [],
  isLoading: false,
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
        const member = state.list.find((m) => m.id === action.payload.id);
        if (member) {
          Object.assign(member, action.payload);
        }
        state.isLoading = false;
      })
      .addCase(getMembersBySelectedHousehold.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembersBySelectedHousehold.fulfilled, (_, action) => {
        // .addCase(getMembersByHouseholdId.fulfilled, (state, action) => {
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
