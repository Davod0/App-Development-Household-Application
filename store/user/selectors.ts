import { RootState } from '../store';

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserAuthenticationIsLoading = (state: RootState) =>
  state.user.isLoading;
