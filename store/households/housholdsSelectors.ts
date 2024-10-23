import { RootState } from '../store';

export const selectAllHouseholds = (state: RootState) => state.households.list;
