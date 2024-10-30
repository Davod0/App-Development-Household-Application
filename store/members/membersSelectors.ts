import { RootState } from '../store';

export const selectAllMembersBySelectedHousehold = (state: RootState) =>
  state.members.list;

export const selectAllIsAllowedMembers = (state: RootState) =>
  state.members.list.filter((member) => member.isAllowed === true);
