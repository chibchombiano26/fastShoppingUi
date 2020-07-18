import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sumBy from "lodash/sumBy";

import api from "../../api/products";

type productsSliceProps = {
  products: any;
  itemsInCart: any;
  totalPriceCart: number;
};

const initializeData = (data: any) => {
  return data.map((e: any) => {
    return { ...e, quantity: 1 };
  });
};

const sumItems = (itemsInCart: any) => {
  //Sum (Get Total Value)
  return sumBy(itemsInCart, (item: any) => item.price * item.quantity);
};

const getProducts = createAsyncThunk("products/getProducts", async () => {
  return await api.getProducts();
});

const productsSlice = createSlice({
  name: "ProductsState",
  initialState: {
    products: [],
    itemsInCart: [],
    totalPriceCart: 0
  } as productsSliceProps,
  reducers: {
    setProducts: (state, { payload }) => {
      const data = initializeData(payload);
      return { ...state, products: data };
    },
    addToCart: (state, { payload }) => {
      // immer makes his magic here, handle the mutations for us
      const exist = state.itemsInCart.find((e: any) => e.id === payload.id);
      if (exist) {
        //  TODO: should be a better way to do this with immer
        state.itemsInCart.forEach((e: any) => {
          if (payload.id === e.id) {
            e.quantity += 1;
          }
        });
      } else {
        state.itemsInCart.push(payload);
      }

      state.totalPriceCart = sumItems(state.itemsInCart);
      return state;
    },
    changeQuantity: (state, { payload }) => {
      state.itemsInCart.forEach((item: any) => {
        if (item.id === payload.id) {
          item.quantity = payload.newQuantity;
        }
      });

      state.totalPriceCart = sumItems(state.itemsInCart);
      return state;
    },
    clean: (state, payload) => {
      state.itemsInCart = [];
      return state;
    }
  },
  extraReducers: {
    [getProducts.fulfilled.toString()]: (state, { payload }) => {
      const data = initializeData(payload);
      return { ...state, products: data };
    }
  }
});

export default productsSlice;
export const productActions = {
  getProducts,
  ...productsSlice.actions
};
