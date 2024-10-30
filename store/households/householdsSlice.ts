import { createSlice } from '@reduxjs/toolkit';

import { Household } from '../../types';
import {
  addHousehold,
  getHouseholdsByUserId,
  updateHouseholdName,
} from './householdsActions';

// state
type HouseholdState = {
  list: Household[];
  isLoading: boolean;
};
const initialState: HouseholdState = {
  list: [],
  isLoading: false,
};

// slice
const householdsSlice = createSlice({
  name: 'households',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addHousehold.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addHousehold.fulfilled, (state, action) => {
        state.list.push(action.payload.household);
        state.isLoading = false;
      })
      .addCase(getHouseholdsByUserId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getHouseholdsByUserId.fulfilled, (state, action) => {
        return { isLoading: false, list: action.payload };
      })
      .addCase(getHouseholdsByUserId.rejected, (state, action) => {
        state.isLoading = false;
      })
      // .addCase(getHouseholdByCode.fulfilled, (state, action) => {
      //   // state.selectedHousehold = action.payload;
      //   if (typeof action.payload === 'string') {
      //     console.log(action.payload); // Handle the 'No household found' message
      //   } else {
      //     state.selectedHousehold = action.payload;
      //   }
      // })
      .addCase(updateHouseholdName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHouseholdName.fulfilled, (state, action) => {
        const household = state.list.find((h) => h.id === action.payload.id);
        if (household) {
          household.name = action.payload.name;
        }
        state.isLoading = false;
      });
  },
});

// export reducer and actions
export const householdsReducer = householdsSlice.reducer;
export const {} = householdsSlice.actions;

// .addCase(getHouseholds.pending, (state) => {
//   state.isLoading = true;
// })
// .addCase(getHouseholds.fulfilled, (state, action) => {
//   return { list: action.payload, isLoading: false };
// })
