export const selectCurrentUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;

export const selectCurrentRole = (state) => state.auth.role;