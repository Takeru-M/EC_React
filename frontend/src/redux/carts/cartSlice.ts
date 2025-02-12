import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartState } from "./type";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { ApiResponse } from "../../types/responses/Api";

const initialState: CartState = {
  carts: [],
  cart: null,
};

export const fetchCarts = createAsyncThunk<ApiResponse<Cart[]>, {user_id: number}>('cart/fetchCarts', async ({user_id}) => {
  const response = await axios.get<Cart[]>(`${API_URL}/cart?user_id=${user_id}`);
  return response.data;
});

export const addToCart = createAsyncThunk<ApiResponse<Cart>, {user_id: number, product_id: number, quantity: number}>('cart/addToCart', async (cartData) => {
  const response = await axios.post<Cart>(`${API_URL}/cart`, cartData);
  return response.data;
});

export const removeFromCart = createAsyncThunk<ApiResponse<Cart>, {user_id: number, product_id: number}>('cart/removeFromCart', async (cartData) => {
  const response = await axios.delete<ApiResponse<Cart>>(`${API_URL}/cart`, {params: cartData});
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.carts = action.payload.data;
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

// export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
