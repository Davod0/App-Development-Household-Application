import { createSlice } from '@reduxjs/toolkit';

import { Household } from '../../types';
import {
  addHousehold,
  getAllowedHouseholdsByUserId,
  getHouseholdsByUserId,
  getIsNotAllowedHouseholdsByMemberId,
  updateHouseholdName,
  // eslint-disable-next-line import/namespace
} from './householdsActions';

// state
type HouseholdState = {
  list: Household[];
  isLoading?: boolean;
};
const initialState: HouseholdState = {
  list: [],
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
        state.list.push(action.payload);
        state.isLoading = false;
      })
      .addCase(getHouseholdsByUserId.fulfilled, (state, action) => {
        return { ...state, list: action.payload };
      })
      .addCase(getAllowedHouseholdsByUserId.fulfilled, (state, action) => {
        return { ...state, list: action.payload };
      })
      .addCase(
        getIsNotAllowedHouseholdsByMemberId.fulfilled,
        (state, action) => {
          return { ...state, list: action.payload };
        },
      )
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
