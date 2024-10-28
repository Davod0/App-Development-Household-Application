import { RootState } from '../store';

export const selectAllRequests = (state: RootState) => state.requests.list;
export const selectRequestIsLoading = (state: RootState) =>
  state.requests.isLoading;
export const selectRequestError = (state: RootState) =>
  state.requests.errorMessage;
