import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from '../../types';
import {
  addMember,
  deleteMemberById,
  getAllMembers,
  updateMember,
} from './membersActions';

interface MembersState {
  list: Member[];
  loading: boolean;
  errorMessage: string | undefined;
}

const initialState: MembersState = {
  list: [],
  loading: false,
  errorMessage: undefined,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addMember.fulfilled,
      (state, action: PayloadAction<Member>) => {
        state.list.push(action.payload); // Access `list` to add the new member
      },
    );
    builder.addCase(addMember.rejected, (state, action) => {
      console.error('Failed to add member: ', action.payload);
    });

    builder.addCase(
      deleteMemberById.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.list = state.list.filter(
          (member) => member.id !== action.payload,
        ); // Access `list` to remove the member
      },
    );
    builder.addCase(deleteMemberById.rejected, (state, action) => {
      console.error('Failed to delete member: ', action.payload);
    });

    builder.addCase(
      updateMember.fulfilled,
      (state, action: PayloadAction<Member>) => {
        const index = state.list.findIndex(
          (member) => member.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload; // Update specific member in `list`
        }
      },
    );
    builder.addCase(updateMember.rejected, (state, action) => {
      console.error('Failed to update member: ', action.payload);
    });

    builder.addCase(getAllMembers.pending, (state) => {
      state.loading = true;
      state.errorMessage = undefined;
    });

    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state.list = action.payload; // Assign members list correctly
      state.loading = false;
      state.errorMessage = undefined;
    });

    builder.addCase(getAllMembers.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload as string;
    });
  },
});

export const memberReducer = membersSlice.reducer;
export const {} = membersSlice.actions;
