import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false, items: [] };

const notificationsCenterSlice = createSlice({
  name: "notificationsCenter",
  initialState,
  reducers: {
    toggleNotificationsCenter: (state) => { state.open = !state.open; },
    addNotification:  (state, action) => { state.items.unshift(action.payload); },
    clearNotifications: (state) => { state.items = []; },
  },
});

export const {
  toggleNotificationsCenter,
  addNotification,
  clearNotifications,
} = notificationsCenterSlice.actions;
export default notificationsCenterSlice.reducer;