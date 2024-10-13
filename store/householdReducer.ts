import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Household } from '../data';

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
