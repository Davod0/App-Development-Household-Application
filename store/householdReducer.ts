import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Household, mockedHouseholds } from '../data';
import { Household } from '../data';

// // const initialState = {
// //   selected: mockedHouseholds[0],
// //   list: mockedHouseholds,
// };

// Plural
const initialState: Household = {
  id: '',
  name: '',
  code: '',
};

export const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {
    createHousehold: (state, action: PayloadAction<Household>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.code = action.payload.code;
    },
    clearHousehold: (state, action: PayloadAction<Household>) => {
      state.id = '';
      state.name = '';
      state.code = '';
    },
  },
});

export const { createHousehold, clearHousehold } = householdSlice.actions;
export default householdSlice.reducer;
