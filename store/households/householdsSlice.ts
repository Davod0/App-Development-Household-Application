import { createSlice } from '@reduxjs/toolkit';
import { Household, mockedHouseholds } from '../../data';
import { createHousehold } from './householdsActions';

// state
type HouseholdState = {
  list: Household[];
  selectedHousehold?: Household;
};
const initialState: HouseholdState = {
  list: mockedHouseholds,
  selectedHousehold: undefined,
};

// slice
const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHousehold.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    //  builder.addCase(createHousehold2.fulfilled, (state, action) => {
    //    state.list.push(action.payload.member);
    //  });
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
