import {
  createSlice,
} from "@reduxjs/toolkit";



const initialState = {

  globalLoading: false,
};



const loadingSlice =
  createSlice({

    name: "loading",

    initialState,

    reducers: {

      startGlobalLoading:
        (state) => {

          state.globalLoading = true;
        },



      stopGlobalLoading:
        (state) => {

          state.globalLoading = false;
        },
    },
  });



export const {

  startGlobalLoading,

  stopGlobalLoading,

} = loadingSlice.actions;



export default
loadingSlice.reducer;