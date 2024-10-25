import { createSlice } from '@reduxjs/toolkit';
import { Household } from '../../data';
import {
  createHousehold,
  getHouseholds,
  updateHouseholdName,
} from './householdsActions';

// state
type HouseholdState = {
  list: Household[];
  selectedHousehold?: Household;
  selectedHouseholdId?: string;
  isLoading?: boolean;
  errorMessage?: string;
};
const initialState: HouseholdState = {
  list: [],
  selectedHousehold: undefined,
  selectedHouseholdId: undefined,
};

// slice
const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHousehold.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createHousehold.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(createHousehold.rejected, (state, action) => {
      state.errorMessage = action.payload as string;
      state.isLoading = false;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(getHouseholds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
      state.errorMessage = undefined;
    });
    builder.addCase(updateHouseholdName.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = undefined;
    });
    builder.addCase(updateHouseholdName.fulfilled, (state, action) => {
      const { householdId, newName } = action.meta.arg;
      const household = state.list.find((h) => h.id === householdId);
      if (household) {
        household.name = newName;
      }
    });
    builder.addCase(updateHouseholdName.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload as string;
    });
  },
  // code for using thunks with firebase...
  // extraReducers: (builder) => {
  //   builder.addCase(addCompletedTask.fulfilled, (state, action) => {
  //     state.push(action.payload);
  //   });
  // },
});

// export reducer and actions
export const householdReducer = householdSlice.reducer;
export const {} = householdSlice.actions;
