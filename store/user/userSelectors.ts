import { RootState } from '../store';

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserAuthenticationIsLoading = (state: RootState) =>
  state.user.isLoading;
export const selectColorMode = (state: RootState) => state.user.theme;
export const selectCurrentUserMemberProfiles = (state: RootState) =>
  state.user.memberProfiles;
export const selectSelectedHousehold = (state: RootState) =>
  state.user.selectedHousehold;
