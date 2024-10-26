import { RootState } from '../store';

export const selectAllHouseholdsByCurrentUser = (state: RootState) =>
  state.households.list;
