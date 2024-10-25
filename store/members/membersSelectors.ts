import { RootState } from '../store';

// SELECTORS
export const selectAllMembers = (state: RootState) => state.members.list;
