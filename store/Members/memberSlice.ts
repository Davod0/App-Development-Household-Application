import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member, mockedMembers } from '../../data';

// Skapa en typ för att lägga till nya medlemmar (utan 'id')
export type CreateMembers = Omit<Member, 'id'>;

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
  },
});

// Exportera reducer och actions
export const membersReducer = membersSlice.reducer;
export const { addMember } = membersSlice.actions;
