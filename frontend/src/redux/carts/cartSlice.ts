import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartState } from "./type";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { ApiResponse } from "../../types/responses/Api";
import { CartResponse } from "./type";
import { api } from "../../constants/axios";

const initialState: CartState = {
  carts: [],
  carts_for_screen: [],
  cart: null,
};

export const fetchCarts = createAsyncThunk<ApiResponse<Cart[]>, {user_id: number}>('cart/fetchCarts', async ({user_id}) => {
  const response = await api.get<ApiResponse<Cart[]>>(`/cart?user_id=${user_id}`);
  return response.data;
});

export const getCarts = createAsyncThunk<ApiResponse<CartResponse[]>, {user_id: number}>('cart/getCarts', async ({user_id}) => {
  const response = await api.get<ApiResponse<CartResponse[]>>(`/cart/get_carts?user_id=${user_id}`);
  return response.data;
});

export const addToCart = createAsyncThunk<ApiResponse<Cart>, {user_id: number, product_id: number, quantity: number}>('cart/addToCart', async (cartData) => {
  const response = await api.post<ApiResponse<Cart>>(`/cart`, cartData);
  return response.data;
});

export const removeFromCart = createAsyncThunk<ApiResponse<Cart>, {cart_id: number}>('cart/removeFromCart', async (cartData) => {
  const response = await api.delete<ApiResponse<Cart>>(`/cart/${cartData.cart_id}`);
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartQuantity: (state, action: PayloadAction<{cart_id: number, quantity: number}>) => {
      const cart = state.carts_for_screen.find(cart => cart.id === action.payload.cart_id);
      if (cart) {
        cart.quantity = action.payload.quantity;
        cart.total_price = cart.product.price * cart.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.carts = action.payload.data;
        }
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.carts_for_screen = action.payload.data;
          state.carts = action.payload.data.map((cart: CartResponse) => ({
            id: cart.id,
            user_id: 0,
            product_id: cart.product.id,
            quantity: cart.quantity,
            created_at: cart.created_at,
            updated_at: cart.updated_at,
          }));
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.carts.push(action.payload.data);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.carts = state.carts.filter(cart => cart.id !== action.payload.data?.id);
        }
      })
  }
});

export const { updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
