import { configureStore } from "@reduxjs/toolkit";
import { apiSlice }       from "./api/apiSlice";
import authReducer        from "../features/auth/authSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import toastReducer       from "../features/toast/toastSlice";
import modalReducer       from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    auth:                   authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    notifications:          notificationsReducer,
    toast:                  toastReducer,
    modal:                  modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(apiSlice.middleware),
});