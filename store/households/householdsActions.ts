import { CreateHousehold, Household } from '../../data';
import { createAppAsyncThunk } from '../hooks';

export const createHousehold = createAppAsyncThunk<Household, CreateHousehold>(
  'Household/createHousehold',
  async (createHousehold, thunkApi) => {
    const state = thunkApi.getState();
    if (!state.user.currentUser) {
      return thunkApi.rejectWithValue('No logged in user');
    }
    const household: Household = {
      id: Date.now().toString(),
      ...createHousehold,
    };
    return household;
  },
);
