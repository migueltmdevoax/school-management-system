import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const storedRole  = localStorage.getItem("role");
const storedUser  = (() => {
  try {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  } catch { return null; }
})();

const initialState = {
  user:            storedUser || (storedToken ? { role: storedRole } : null),
  token:           storedToken || null,
  role:            storedRole  || null,
  isAuthenticated: !!storedToken,
  loading:         false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user            = user;
      state.token           = token;
      state.role            = user?.role || null;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
      localStorage.setItem("role",  user?.role || "");
      localStorage.setItem("user",  JSON.stringify(user));
    },
    logout: (state) => {
      state.user            = null;
      state.token           = null;
      state.role            = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;