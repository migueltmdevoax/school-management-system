import { configureStore } from "@reduxjs/toolkit";
import { apiSlice }                from "./api/apiSlice";
import authReducer                 from "../features/auth/authSlice";
import notificationsReducer        from "../features/notifications/notificationsSlice";
import toastReducer                from "../features/toast/toastSlice";
import loadingReducer              from "../features/loading/loadingSlice";
import modalReducer                from "../features/modal/modalSlice";
import slideOverReducer            from "../features/slide-over/slideOverSlice";
import commandPaletteReducer       from "../features/command-palette/commandPaletteSlice";
import bulkSelectionReducer        from "../features/bulk-actions/bulkSelectionSlice";
import searchReducer               from "../features/search/searchSlice";
import globalSearchReducer         from "../features/global-search/globalSearchSlice";
import notificationsCenterReducer  from "../features/notifications-center/notificationsCenterSlice";

export const store = configureStore({
  reducer: {
    auth:                authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    notifications:       notificationsReducer,
    toast:               toastReducer,
    loading:             loadingReducer,
    modal:               modalReducer,
    slideOver:           slideOverReducer,
    commandPalette:      commandPaletteReducer,
    bulkSelection:       bulkSelectionReducer,
    search:              searchReducer,
    globalSearch:        globalSearchReducer,
    notificationsCenter: notificationsCenterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(apiSlice.middleware),
  devTools: import.meta.env.MODE !== "production",
});