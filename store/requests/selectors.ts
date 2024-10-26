import { RootState } from '../store';

export const selectAllRequestBySelectedHousehold = (state: RootState) =>
  state.requests;
