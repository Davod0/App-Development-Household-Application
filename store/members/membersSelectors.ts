import { RootState } from '../store';
import { selectSelectedHousehold } from '../user/userSelectors';

export const selectAllMembersBySelectedHousehold = (state: RootState) =>
  state.members.list;

export const selectMemberForUserInSelectedHousehold = (state: RootState) =>
  state.members.list.find(
    (m) => m.householdId === selectSelectedHousehold(state)?.id,
  );
