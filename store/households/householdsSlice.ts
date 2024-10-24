import { createSlice } from '@reduxjs/toolkit';
import { Household, mockedHouseholds } from '../../data';
import { createHousehold } from './householdsActions';

// state
type HouseholdState = {
  list: Household[];
  selectedHousehold?: Household;
  isLoading?: boolean;
  errorMessage?: string;
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
