import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type InitialState = {
  product: Product[];
};

const initialState: InitialState = {
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProduct: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
    },
    addNewProduct: (state, action: PayloadAction<Product>) => {
      state.product.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.product = state.product.filter(
        (item) => item.productId !== action.payload
      );
    },
    editProductById: (state, action: PayloadAction<Product>) => {
      const productIdx = state.product.findIndex(
        (item) => String(item.productId) === action.payload.productId
      );
      state.product[productIdx] = action.payload;
    },
  },
});

export const { getAllProduct, addNewProduct, removeProduct, editProductById } =
  productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => state.product;

export default productSlice.reducer;
