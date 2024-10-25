import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Household } from '../../types';
import {
  createHousehold,
  getHouseholds,
  getHouseholdsByUserId,
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
  reducers: {
    setSelectedHouseholdId: (state, action: PayloadAction<string>) => {
      state.selectedHouseholdId = action.payload;
    },
  },

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
    builder.addCase(getHouseholdsByUserId.fulfilled, (state, action) => {
      console.log('households test: ', action.payload);
      return { ...state, list: action.payload };
    });
    builder.addCase(getHouseholdsByUserId.rejected, (state, action) => {
      state.errorMessage = action.payload as string;
      state.isLoading = false;
    });
  },
});

// export reducer and actions
export const householdReducer = householdSlice.reducer;
export const { setSelectedHouseholdId } = householdSlice.actions;
