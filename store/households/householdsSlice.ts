import { createSlice } from '@reduxjs/toolkit';
import { mockedHouseholds } from '../../data';
import { Household } from '../../types';
import { createHousehold } from './householdsActions';

// state
type HouseholdState = {
  list: Household[];
  selectedHousehold?: Household;
};
const initialState: HouseholdState = {
  list: mockedHouseholds,
  // mocked household TODO: ta bort innan push!!
  selectedHousehold: { id: '1111', name: 'Katten', code: '12345678' },
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
