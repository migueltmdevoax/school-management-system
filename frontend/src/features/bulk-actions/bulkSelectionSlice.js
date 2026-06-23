import { createSlice } from "@reduxjs/toolkit";

const initialState = { selectedIds: [] };

const bulkSelectionSlice = createSlice({
  name: "bulkSelection",
  initialState,
  reducers: {
    toggleSelection: (state, action) => {
      const id = action.payload;
      const idx = state.selectedIds.indexOf(id);
      if (idx !== -1) state.selectedIds.splice(idx, 1);
      else state.selectedIds.push(id);
    },
    clearSelection: (state) => { state.selectedIds = []; },
    selectAll:      (state, action) => { state.selectedIds = action.payload; },
  },
});

export const { toggleSelection, clearSelection, selectAll } = bulkSelectionSlice.actions;
export default bulkSelectionSlice.reducer;