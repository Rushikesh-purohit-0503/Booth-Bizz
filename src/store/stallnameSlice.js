import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stallName: '',
  src:"",
  city:'',

};

const stallSlice = createSlice({
  name: "stall",
  initialState,
  reducers: {
    setStallName: (state, action) => {
      state.stall = { ...state.stall, ...action.payload };
    },

    // clearStallName: (state) => {
    //   state.stallName = ' '
    //   state.src = ' '
    // },
  },
});

export const { setStallName,clearStallName } = stallSlice.actions;
export default stallSlice.reducer;