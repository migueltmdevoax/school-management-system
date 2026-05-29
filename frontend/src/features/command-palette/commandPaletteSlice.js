import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {

  isOpen: false,

};

const commandPaletteSlice =
  createSlice({

    name:
      "commandPalette",

    initialState,

    reducers: {

      openCommandPalette:
        (state) => {

          state.isOpen =
            true;

        },



      closeCommandPalette:
        (state) => {

          state.isOpen =
            false;

        },



      toggleCommandPalette:
        (state) => {

          state.isOpen =
            !state.isOpen;

        },

    },

  });

export const {

  openCommandPalette,

  closeCommandPalette,

  toggleCommandPalette,

} = commandPaletteSlice.actions;

export default
commandPaletteSlice.reducer;