import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBasket, IProduct } from "../../interfaces";

export interface BasketState {
  value: IBasket;
}

const initialState: BasketState = {
  value: {
    basket: [],
  },
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const product = state.value.basket.find(
        (product) => product.sku === action.payload.sku
      );
      if (product) {
        product.quantity++;
      } else {
        state.value.basket.push({
          sku: action.payload.sku,
          quantity: 1,
          product: action.payload,
        });
      }
    },
    removeSingleProductFromCart(state, action: PayloadAction<number>) {
      const productIndex = state.value.basket.findIndex(
        (product) => product.sku === action.payload
      );
      const product = state.value.basket[productIndex];
      if (product?.quantity && product.quantity > 1) {
        product.quantity--;
      } else if (productIndex !== -1) {
        state.value.basket.splice(productIndex, 1);
      }
    },
    removeProductFromCart(state, action: PayloadAction<number>) {
      const productIndex = state.value.basket.findIndex(
        (product) => product.sku === action.payload
      );
      if (productIndex !== -1) {
        state.value.basket.splice(productIndex, 1);
      }
    },
    modifyProductQuantity(
      state,
      action: PayloadAction<{ sku: number; quantity: number }>
    ) {
      const product = state.value.basket.find(
        (product) => product.sku === action.payload.sku
      );
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
  },
  selectors: {
    selectTotalPrice: (state: BasketState) => {
      return state.value.basket.reduce(
        (sum, curr) => sum + curr.quantity * curr.product.price,
        0
      );
    },
    selectTotalCount: (state: BasketState) => {
      return state.value.basket.reduce((sum, curr) => sum + curr.quantity, 0);
    },
    selectCartItem: (state: BasketState, sku: number) => {
      return state.value.basket.find((product) => product.sku === sku);
    },
  },
});

export const {
  addToCart,
  removeSingleProductFromCart,
  removeProductFromCart,
  modifyProductQuantity,
} = basketSlice.actions;
export const { selectTotalPrice, selectTotalCount, selectCartItem } =
  basketSlice.selectors;

export default basketSlice.reducer;
