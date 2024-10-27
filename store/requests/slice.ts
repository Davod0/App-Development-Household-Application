import { createSlice } from '@reduxjs/toolkit';
import { Request } from '../../types';
import {
  acceptRequest,
  addRequest,
  getRequestsBySelectedHouseholdId,
  rejectRequest,
} from './actions';

// state
type RequestsState = Request[];
const initialState: RequestsState = [];

// slice
const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRequest.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(getRequestsBySelectedHouseholdId.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        return state.filter((r) => r.id !== action.payload.id);
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        return state.filter((r) => r.id !== action.payload.id);
      });
  },
});

// export reducer and actions
// export const requestsReducer = requestsSlice.reducer;
// export const {} = requestsSlice.actions;
