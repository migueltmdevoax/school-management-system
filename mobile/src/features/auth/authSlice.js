import { createSlice }  from "@reduxjs/toolkit";
import AsyncStorage     from "@react-native-async-storage/async-storage";

const initialState = {
  user:            null,
  token:           null,
  role:            null,
  isAuthenticated: false,
  loading:         true,
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
      state.loading         = false;
    },
    restoreSession: (state, action) => {
      const { user, token } = action.payload;
      state.user            = user;
      state.token           = token;
      state.role            = user?.role || null;
      state.isAuthenticated = !!token;
      state.loading         = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user            = null;
      state.token           = null;
      state.role            = null;
      state.isAuthenticated = false;
      state.loading         = false;
    },
  },
});

export const { setCredentials, restoreSession, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;

export const restoreSessionFromStorage = () => async (dispatch) => {
  try {
    const token    = await AsyncStorage.getItem("token");
    const userJson = await AsyncStorage.getItem("user");
    const user     = userJson ? JSON.parse(userJson) : null;
    dispatch(restoreSession({ token, user }));
  } catch (error) {
    console.error("Error restoring session:", error);
    dispatch(restoreSession({ token: null, user: null }));
  }
};

export const logoutAndClear = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
  // 🔥 Resetea el cache de RTK Query al hacer logout
  const { apiSlice } = await import("../../app/api/apiSlice");
  dispatch(apiSlice.util.resetApiState());
  dispatch(logout());
};