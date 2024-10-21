import { RootState } from '../store';

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
