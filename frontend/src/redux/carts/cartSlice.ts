import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartState } from "./type";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { ApiResponse } from "../../types/responses/Api";
import { CartResponse } from "./type";

const initialState: CartState = {
  carts: [],
  carts_for_screen: [],
  cart: null,
};

export const fetchCarts = createAsyncThunk<ApiResponse<Cart[]>, {user_id: number}>('cart/fetchCarts', async ({user_id}) => {
  const response = await axios.get<ApiResponse<Cart[]>>(`${API_URL}/cart?user_id=${user_id}`);
  return response.data;
});

export const getCarts = createAsyncThunk<ApiResponse<CartResponse[]>, {user_id: number}>('cart/getCarts', async ({user_id}) => {
  const response = await axios.get<ApiResponse<CartResponse[]>>(`${API_URL}/cart/get_carts?user_id=${user_id}`);
  console.log(response.data);
  return response.data;
});

export const addToCart = createAsyncThunk<ApiResponse<Cart>, {user_id: number, product_id: number, quantity: number}>('cart/addToCart', async (cartData) => {
  const response = await axios.post<ApiResponse<Cart>>(`${API_URL}/cart`, cartData);
  return response.data;
});

export const removeFromCart = createAsyncThunk<ApiResponse<Cart>, {cart_id: number}>('cart/removeFromCart', async (cartData) => {
  const response = await axios.delete<ApiResponse<Cart>>(`${API_URL}/cart/${cartData.cart_id}`);
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
