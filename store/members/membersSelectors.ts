import { RootState } from '../store';

export const selectAllMembersBySelectedHousehold = (state: RootState) =>
  state.members.list;
