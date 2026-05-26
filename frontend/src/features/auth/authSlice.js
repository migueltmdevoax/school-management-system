import { createSlice } from "@reduxjs/toolkit";

const token =
  localStorage.getItem("token");

const role =
  localStorage.getItem("role");

const initialState = {

  user: null,

  token: token || null,

  role: role || null,

  isAuthenticated:
    !!token,

  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action) => {

  const {
    user,
    token,
  } = action.payload;

  state.user = user;

  state.token = token;

  state.role =
    user?.role || null;

  state.isAuthenticated =
    true;

  localStorage.setItem(
    "token",
    token
  );

  localStorage.setItem(
    "role",
    user?.role || ""
  );
},

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;


export default authSlice.reducer;