import { createSlice } from '@reduxjs/toolkit';
import { Household, mockedHouseholds, User } from '../../data';
import { createHousehold2 } from './householdsActions';

// state
type HouseholdState = {
  list: Household[];
};
const initialState: HouseholdState = {
  list: mockedHouseholds,
};

// slice
const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHousehold2.fulfilled, (state, action) => {
      state.list.push(action.payload);
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
