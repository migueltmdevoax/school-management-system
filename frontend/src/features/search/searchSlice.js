import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false, query: "" };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearch:     (state) => { state.isOpen = true; },
    closeSearch:    (state) => { state.isOpen = false; },
    setSearchQuery: (state, action) => { state.query = action.payload; },
  },
});

export const { openSearch, closeSearch, setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;