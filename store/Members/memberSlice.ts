
// type CompletedTasksState = CompletedTask[];
// const initialState: CompletedTasksState = mockedCompletedTasks;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member, mockedMembers } from "../../data";


type MembersState = Member[];
const initialState: MembersState = mockedMembers;

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    addMembers: (state, action: PayloadAction<CreateMembers>) => {
      state.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
  },

});

// export reducer and actions
export const memberReducer = membersSlice.reducer;
export const { addMembers } = membersSlice.actions;