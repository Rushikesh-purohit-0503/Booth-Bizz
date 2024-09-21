import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./AuthSlice/authSlice";

const store = configureStore({
    reducer : {
        auth: authSliceReducer
    }
});

export default store