import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import productSliceReducer from "./productSlice";
import stallSliceReducer from "./stallnameSlice"

const store = configureStore({
    reducer : {
        auth: authSliceReducer,
        product:productSliceReducer,
        stall:stallSliceReducer,
    },
    
   
});

export default store