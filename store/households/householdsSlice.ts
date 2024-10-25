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
  isLoading?: boolean;
};
const initialState: HouseholdState = {
  list: [],
  selectedHousehold: undefined,
};

// slice
const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {
    setSelectedHousehold: (state, action: PayloadAction<Household>) => {
      state.selectedHousehold = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createHousehold.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHousehold.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.isLoading = false;
      })
      .addCase(getHouseholds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(updateHouseholdName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHouseholdName.fulfilled, (state, action) => {
        const { householdId, newName } = action.meta.arg;
        const household = state.list.find((h) => h.id === householdId);
        if (household) {
          household.name = newName;
        }
      })
      .addCase(getHouseholdsByUserId.fulfilled, (state, action) => {
        console.log('households test: ', action.payload);
        return { ...state, list: action.payload };
      });
  },
});

// export reducer and actions
export const householdReducer = householdSlice.reducer;
export const { setSelectedHousehold } = householdSlice.actions;
