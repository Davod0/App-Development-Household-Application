import { createSlice } from '@reduxjs/toolkit';
import { Request } from '../../types';
import {
  acceptRequest,
  addRequest,
  getRequestsBySelectedHouseholdId,
  rejectRequest,
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
    builder
      .addCase(getRequestsBySelectedHouseholdId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRequestsBySelectedHouseholdId.fulfilled, (state, action) => {
        return { isLoading: false, list: action.payload };
      })
      .addCase(addRequest.pending, (state) => {
        state.errorMessage = undefined;
        state.isLoading = true;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.errorMessage = undefined;
        state.isLoading = false;
      })
      .addCase(addRequest.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.isLoading = false;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        return {
          ...state,
          list: state.list.filter((r) => r.id !== action.payload.id),
        };
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        return {
          ...state,
          list: state.list.filter((r) => r.id !== action.payload.id),
        };
      });
  },
});

// export reducer and actions
export const requestsReducer = requestsSlice.reducer;
export const {} = requestsSlice.actions;
