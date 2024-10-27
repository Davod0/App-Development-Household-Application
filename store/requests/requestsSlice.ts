import { createSlice } from '@reduxjs/toolkit';
import { Request } from '../../types';
import {
  getRequestsByHouseholdId,
  registerGoToHouseholdRequest,
} from './requestsActions';

// state
type RequestsState = {
  list: Request[];
  isLoading: boolean;
  errorMessage?: string;
};
const initialState: RequestsState = {
  list: [],
  isLoading: false,
};

// slice
const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerGoToHouseholdRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerGoToHouseholdRequest.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.isLoading = false;
      console.log('done');
    });
    builder.addCase(getRequestsByHouseholdId.fulfilled, (state, action) => {
      return { ...state, list: action.payload };
    });
    //       .addCase(updateHouseholdName.pending, (state) => {
    //         state.isLoading = true;
    //       })
    //       .addCase(updateHouseholdName.fulfilled, (state, action) => {
    //         const household = state.list.find((h) => h.id === action.payload.id);
    //         if (household) {
    //           household.name = action.payload.name;
    //         }
    //         state.isLoading = false;
    //       });
  },
});

// export reducer and actions
export const requestReducer = requestsSlice.reducer;
export const {} = requestsSlice.actions;