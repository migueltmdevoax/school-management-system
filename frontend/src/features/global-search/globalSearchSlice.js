import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false };

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers: {
    openGlobalSearch:   (state) => { state.open = true; },
    closeGlobalSearch:  (state) => { state.open = false; },
    toggleGlobalSearch: (state) => { state.open = !state.open; },
  },
});

export const { openGlobalSearch, closeGlobalSearch, toggleGlobalSearch } =
  globalSearchSlice.actions;
export default globalSearchSlice.reducer;