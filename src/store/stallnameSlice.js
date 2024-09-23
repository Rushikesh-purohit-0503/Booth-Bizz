import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stallName: '',
  src:""
};

const stallSlice = createSlice({
  name: "stall",
  initialState,
  reducers: {
    setStallName: (state, action) => {
      state.stallName = action.payload.name;
      state.src=action.payload.src;
    },

    // clearStallName: (state) => {
    //   state.stallName = ' '
    //   state.src = ' '
    // },
  },
});

export const { setStallName,clearStallName } = stallSlice.actions;
export default stallSlice.reducer;