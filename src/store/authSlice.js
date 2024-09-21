import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData =  {
        uid: action.payload.userData.uid,
        email: action.payload.userData.email,
      };
    },

    logout: (state) => {
      state.status = false;
      state.userData = {
        uid: null,
        email: null,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
