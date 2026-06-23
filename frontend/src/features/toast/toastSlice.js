import { createSlice } from "@reduxjs/toolkit";

const initialState = { toasts: [] };

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push({
        id:       crypto.randomUUID(),
        type:     action.payload.type    || "info",
        title:    action.payload.title   || "",
        message:  action.payload.message || "",
        duration: action.payload.duration || 4000,
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;