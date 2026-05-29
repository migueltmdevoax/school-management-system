import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {

  selectedIds: [],

};

const bulkSelectionSlice =
  createSlice({

    name:
      "bulkSelection",

    initialState,

    reducers: {

      toggleSelection:
        (state, action) => {

          const id =
            action.payload;

          const exists =
            state.selectedIds
              .includes(id);

          if (exists) {

            state.selectedIds =
              state.selectedIds
                .filter(
                  (item) =>
                    item !== id
                );

          } else {

            state.selectedIds
              .push(id);

          }

        },



      clearSelection:
        (state) => {

          state.selectedIds = [];

        },



      selectAll:
        (state, action) => {

          state.selectedIds =
            action.payload;

        },

    },

  });

export const {

  toggleSelection,

  clearSelection,

  selectAll,

} = bulkSelectionSlice.actions;

export default
bulkSelectionSlice.reducer;