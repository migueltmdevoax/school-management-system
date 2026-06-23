import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  entityId: null,
  props: null,
};

const slideOverSlice = createSlice({
  name: "slideOver",
  initialState,
  reducers: {
    openSlideOver: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type || action.payload.component || null;
      state.entityId = action.payload.entityId || null;
      state.props = action.payload.props || null;
    },
    closeSlideOver: (state) => {
      state.isOpen = false;
      state.type = null;
      state.entityId = null;
      state.props = null;
    },
  },
});

export const { openSlideOver, closeSlideOver } = slideOverSlice.actions;
export default slideOverSlice.reducer;