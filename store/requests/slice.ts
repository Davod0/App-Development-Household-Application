// state

import { createSlice } from '@reduxjs/toolkit';
import { Request } from '../../types';
import { addRequest } from './actions';

type RequestsState = Request[];

const initialState: RequestsState = [];

// slice
const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRequest.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

// export reducer and actions
export const requestsReducer = requestsSlice.reducer;
export const {} = requestsSlice.actions;
