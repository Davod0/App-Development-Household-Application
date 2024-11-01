import { RootState } from '../store';
import { selectCurrentUser } from '../user/userSelectors';

export const selectAllMembersBySelectedHousehold = (state: RootState) =>
  state.members.list; //.filter(m => m.householdId === state.user.selectedHousehold.id);

export const selectMemberForUserInSelectedHousehold = (state: RootState) =>
  state.members.list.find((m) => m.userId === selectCurrentUser(state)?.uid);

export const selectUsedAvatarsForSelectedHousehold = (state: RootState) =>
  state.members.list.map((member) => member.avatar);
