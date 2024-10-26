import { RootState } from '../store';

// SELECTORS
export const selectAllMembersBySelectedHousehold = (state: RootState) =>
  state.members.list;
