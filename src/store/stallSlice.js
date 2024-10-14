import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stall: JSON.parse(localStorage.getItem("stallDetails")) || [],
  clickedStall: JSON.parse(localStorage.getItem("clickedStall")) || null,
};

const stallSlice = createSlice({
  name: "stall",
  initialState,
  reducers: {
    clickedStall: (state, action) => {
      state.clickedStall = action.payload;
      localStorage.setItem("clickedStall", JSON.stringify(action.payload));
    },
    addStall: (state, action) => {
      state.stall.push(action.payload);
    },

    // Clear or remove a stall based on some criteria
    deleteStall: (state, action) => {
      state.stall = state.stall.filter(
        (stall) => stall.stallName !== action.payload
      );
      // Update local storage whenever a stall is deleted
      localStorage.setItem("stallDetails", JSON.stringify(state.stall));
    },
    // clearStallName: (state) => {
    //   state.stallName = ' '
    //   state.src = ' '
    // },
  },
});

export const { clickedStall, setStallName, addStall, deleteStall } =
  stallSlice.actions;
export default stallSlice.reducer;
