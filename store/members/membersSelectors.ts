import { RootState } from '../store';
import { selectCurrentUser } from '../user/userSelectors';

export const selectAllMembersBySelectedHousehold = (state: RootState) =>
  state.members.list;

export const selectAllIsAllowedMembers = (state: RootState) =>
  state.members.list.filter((member) => member.isAllowed === true);

export const selectMemberForUserInSelectedHousehold = (state: RootState) =>
  state.members.list.find((m) => m.userId === selectCurrentUser(state)?.uid);
