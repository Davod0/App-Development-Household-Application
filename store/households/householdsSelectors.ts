import { RootState } from '../store';

export const selectAllHouseholds = (state: RootState) => state.households.list;
export const selectHouseholdId = (state: RootState) =>
  state.households.selectedHouseholdId;
