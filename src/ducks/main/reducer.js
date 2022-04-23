import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cart: [],
  total: 0,
  currency: "",
  isCartOpened: false,
  path: "all",

  products: [],
};

const reducer = createSlice({
  name: `Main`,
  initialState,
  reducers: {
    ADD_ITEM_TO_CART: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    DELETE_ITEM_FROM_CART: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((item, index, array) => {
          return (
            index !==
            array.findIndex(
              (element) =>
                JSON.stringify(element) === JSON.stringify(action.payload)
            )
          );
        }),
      };
    },

    CHANGE_CURRENCY: (state, action) => {
      state.currency = action.payload;
    },

    CONVERT_TOTAL: (state, action) => {
      state.total = action.payload;
    },
    CHANGE_CART_STATUS: (state) => {
      state.isCartOpened = !state.isCartOpened;
    },
    CHANGE_PATHNAME: (state, action) => {
      state.path = action.payload;
    },
    ADD_PRODUCTS: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const mainReducer = reducer.reducer;
export const {
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  CHANGE_CURRENCY,
  CHANGE_CART_STATUS,
  CHANGE_PATHNAME,
  ADD_PRODUCTS,
  CHANGE_TOTAL,
  CONVERT_TOTAL,
  ADD_DUPLICATE_TO_CART,
} = reducer.actions;
