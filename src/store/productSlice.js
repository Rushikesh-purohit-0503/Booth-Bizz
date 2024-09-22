import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    editProduct: (state, action) => {
      const index = state.findIndex(product => product.name === action.payload.name);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      return state.filter(product => product.name !== action.payload.name);
    }
  }
});

export const { setProducts, addProduct, editProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;