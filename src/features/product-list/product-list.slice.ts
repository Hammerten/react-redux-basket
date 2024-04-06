import { IProduct } from "../../interfaces";
import data from "../../data/products.json";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductListState {
  value: IProduct[];
}

const initialState: ProductListState = {
  value: data as IProduct[],
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  selectors: {
    selectProduct: (state, sku: number) =>
      state.value.find((product) => product.sku === sku),
    selectProducts: (state) => state.value,
  },
});

export const { selectProduct, selectProducts } = productListSlice.selectors;

export default productListSlice.reducer;
