import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import productSliceReducer from "./productSlice";

const store = configureStore({
    reducer : {
        auth: authSliceReducer,
        product:productSliceReducer,
        
    },
   
   
});

export default store