import { createSlice } from "@reduxjs/toolkit";

const initialState = { unreadBadgePulse: false };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    triggerUnreadBadge: (state) => { state.unreadBadgePulse = true; },
    clearUnreadBadge:   (state) => { state.unreadBadgePulse = false; },
  },
});

export const { triggerUnreadBadge, clearUnreadBadge } = notificationsSlice.actions;
export default notificationsSlice.reducer;