import { RootState } from '../store';

export const selectAllRequests = (state: RootState) => state.requests.list;
