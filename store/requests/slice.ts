// state

import { createSlice } from '@reduxjs/toolkit';
import { Request } from '../../types';
import {
  addRequest,
  deleteRequest,
  getRequestsBySelectedHouseholdId,
} from './actions';

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
      .addCase(deleteRequest.fulfilled, (state, action) => {
        return state.filter((r) => r.id !== action.payload.id);
      });
  },
});

// export reducer and actions
export const requestsReducer = requestsSlice.reducer;
export const {} = requestsSlice.actions;
