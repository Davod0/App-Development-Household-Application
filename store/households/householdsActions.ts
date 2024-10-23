import { CreateHousehold, Household } from '../../data';
import { createAppAsyncThunk } from '../hooks';
import { addMember, CreateMembers } from '../Members/memberSlice';

export type CreateHouseholdWithMember = {
  household: CreateHousehold;
  member: CreateMembers;
};

export const createHousehold = createAppAsyncThunk<
  Household,
  CreateHouseholdWithMember
>('Household/createHousehold', async ({ household, member }, thunkApi) => {
  const state = thunkApi.getState();

  if (!state.user.currentUser) {
    return thunkApi.rejectWithValue('No logged in user');
  }
  const id = Date.now().toString();
  const newHousehold: Household = {
    id,
    ...household,
  };
  const newMember = {
    ...member,
    householdId: id,
  };

  // Dispatch the addMember action using thunkApi.dispatch
  thunkApi.dispatch(addMember(newMember));

  return newHousehold;
});
